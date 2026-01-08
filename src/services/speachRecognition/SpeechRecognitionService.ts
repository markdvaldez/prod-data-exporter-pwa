import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import {
  LanguageCode,
  StartMedicalStreamTranscriptionCommand,
  StartStreamTranscriptionCommand,
  TranscribeStreamingClient,
} from "@aws-sdk/client-transcribe-streaming";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { MediaRecorder, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";
import getUserMedia from "get-user-media-promise";
import MicrophoneStream from "microphone-stream";

export type TUseSpeech = {
  isActive: boolean;
  recognized: string;
  startRecord: () => void;
  stopRecord: () => Promise<TAudioFile>;
};

export type TAudioFile = {
  audioFile?: string;
};

type TOptions = {
  LanguageCode: LanguageCode;
  MediaEncoding: "pcm" | "ogg-opus" | "flac";
  MediaSampleRateHertz: number;
  Type: "CONVERSATION" | "DICTATION";
  Specialty:
    | "PRIMARYCARE"
    | "CARDIOLOGY"
    | "NEUROLOGY"
    | "ONCOLOGY"
    | "RADIOLOGY"
    | "UROLOGY";
};

type TCredential = {
  identityPoolId: string;
  region: string;
  userPoolId: string;
};

type TAuthorizeFn = () => Promise<string | null>;

type TranscriptionType = "medical" | "general";

const SAMPLE_RATE = 44100;
const DEFAULT_OPTIONS: TOptions = {
  LanguageCode: LanguageCode.EN_US,
  MediaEncoding: "pcm",
  MediaSampleRateHertz: SAMPLE_RATE,
  Type: "DICTATION",
  Specialty: "PRIMARYCARE",
};

class SpeechRecognitionService {
  private static instance: SpeechRecognitionService;
  private microphoneStream?: MicrophoneStream;
  private transcribeClient?: TranscribeStreamingClient;
  private _recognized: string = "";
  private _isActive: boolean = false;
  private identityPoolId: string;
  private region: string;
  private userPoolId: string;
  private recorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private _audioURL: string = "";

  onRecognitionChange: (() => void) | null = null;
  onRecordingComplete: (() => void) | null = null;

  constructor(
    private credentials: TCredential,
    private getToken: TAuthorizeFn,
    private transcriptionType: TranscriptionType = "medical"
  ) {
    this.identityPoolId = credentials.identityPoolId;
    this.region = credentials.region;
    this.userPoolId = credentials.userPoolId;
  }

  public static getInstance(
    credentials: TCredential,
    getToken: TAuthorizeFn,
    transcriptionType: TranscriptionType = "general"
  ): SpeechRecognitionService {
    if (!this.instance) {
      this.instance = new SpeechRecognitionService(credentials, getToken);
    }
    return this.instance;
  }

  get recognized() {
    return this._recognized;
  }

  set recognized(value: string) {
    this._recognized = value;
    this.updateRecognitionState();
  }

  get isActive() {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
    this.updateRecognitionState();
  }

  get audioURL() {
    return this._audioURL;
  }

  set audioURL(value: string) {
    this._audioURL = value;
    this.handleAudioReady();
  }

  //sets up speech recognizer and audio stream
  startRecord = async (
    language: LanguageCode = LanguageCode.EN_US,
    onError?: (error: any) => void
  ) => {
    try {
      if (this.microphoneStream || this.transcribeClient) {
        await this.stopRecord();
      }
      this.recognized = "";
      this.isActive = true;
      await this.connectRecorder();
      await this.createMicrophoneStream();
      await this.createTranscribeClient();
      await this.startRecording();
      await this.startStreaming(language);
    } catch (error) {
      console.error("Error starting recording:", error);
      if (onError) {
        onError(error);
      }
      this.isActive = false;
    }
  };

  //stops the audio stream and recognizer
  stopRecord = async () => {
    try {
      if (this.recorder) {
        this.recorder.stop();
      }
      if (this.transcribeClient) {
        this.transcribeClient.destroy();
        this.transcribeClient = undefined;
      }
      if (this.microphoneStream) {
        this.microphoneStream.stop();
        this.microphoneStream = undefined;
      }
    } catch (error) {
      console.error("Error stopping recording:", error);
    } finally {
      this.recognized = "";
      this.isActive = false;
    }
  };

  private updateRecognitionState = () => {
    if (this.onRecognitionChange) {
      this.onRecognitionChange();
    }
  };

  private handleAudioReady = () => {
    if (this.onRecordingComplete) {
      this.onRecordingComplete();
    }
  };

  private connectRecorder = async () => {
    if (!this.recorder) {
      const encoder = await connect();
      await register(encoder);
    }
  };

  private createMicrophoneStream = async () => {
    this.microphoneStream = new MicrophoneStream();
    const mediaStream = await getUserMedia({ audio: true, video: false });
    this.microphoneStream.setStream(mediaStream);
    this.recorder = new MediaRecorder(mediaStream, {
      mimeType: "audio/wav",
    }) as MediaRecorder;
  };

  private createTranscribeClient = async () => {
    try {
      const idToken = await this.getToken();
      if (!idToken) return;
      this.transcribeClient = new TranscribeStreamingClient({
        region: this.region,
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: this.region }),
          identityPoolId: this.identityPoolId,
          logins: {
            [this.userPoolId]: idToken || "",
          },
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  private startStreaming = async (
    language: LanguageCode = DEFAULT_OPTIONS.LanguageCode
  ) => {
    try {
      if (!this.transcribeClient)
        throw new Error("Transcribe client not initialized");

      let command;
      if (this.transcriptionType === "medical") {
        command = new StartMedicalStreamTranscriptionCommand({
          ...DEFAULT_OPTIONS,
          LanguageCode: language,
          AudioStream: this.getAudioStream(),
        });
      } else {
        command = new StartStreamTranscriptionCommand({
          ...DEFAULT_OPTIONS,
          LanguageCode: language,
          AudioStream: this.getAudioStream(),
        });
      }

      const data = await this.transcribeClient.send(
        command as StartStreamTranscriptionCommand
      );
      if (data?.TranscriptResultStream) {
        for await (const event of data.TranscriptResultStream) {
          this.processTranscription(event);
        }
      }
    } catch (error) {
      console.error("Error in startStreaming:", error);
    }
  };

  private startRecording = async () => {
    try {
      if (!this.recorder) throw new Error("Recorder not initialized");
      this.audioChunks = [];
      this.recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.recorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
        this.audioURL = URL.createObjectURL(audioBlob);
        this.audioChunks = [];
      };

      this.recorder.onerror = (e) => {
        console.error("Recorder error:", e.error);
      };

      this.recorder.start();
    } catch (error) {
      console.error("Error in startRecording:", error);
    }
  };

  private async *getAudioStream() {
    if (!this.microphoneStream)
      throw new Error("Microphone stream not initialized");

    for await (const chunk of this.microphoneStream as any) {
      if (chunk.length <= SAMPLE_RATE) {
        yield {
          AudioEvent: {
            AudioChunk: this.encodePCMChunk(chunk),
          },
        };
      }
    }
  }

  private encodePCMChunk = (chunk: any): Buffer<ArrayBuffer> => {
    const input: Float32Array = MicrophoneStream.toRaw(chunk);
    let offset = 0;
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return Buffer.from(buffer);
  };

  private processTranscription(event: any) {
    for (const result of event?.TranscriptEvent?.Transcript?.Results || []) {
      if (!result.IsPartial) {
        const newText = result.Alternatives?.[0]?.Transcript || "";
        if (newText) {
          this.recognized = `${this.recognized} ${newText}`.trim();
        }
      }
    }
  }
}

export { SpeechRecognitionService };
