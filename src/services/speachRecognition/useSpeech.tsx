import { getNow } from "@/runnersQcApp/shared/DateUtils";
import { getUniqId } from "@/runnersQcApp/shared/UniqId";
import { printIdToken as getToken } from "@/services/aws/amplifyActions";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { TAudioFile } from "./useSpeechService";
import {
  TCredential,
  useTranscribeCredentials,
} from "./useTranscribeCredentials";

export type TUseSpeech = {
  isActive: boolean;
  recognized: string;
  audioFile?: File;
  startRecord: () => Promise<void>;
  stopRecord: () => Promise<void | TAudioFile>;
};

const SAMPLE_RATE = 44100;

const DEFAULT_OPTIONS = {
  LanguageCode: LanguageCode.EN_US,
  MediaEncoding: "pcm" as const,
  MediaSampleRateHertz: SAMPLE_RATE,
  Type: "DICTATION" as const,
  Specialty: "PRIMARYCARE" as const,
};

type TranscriptionType = "medical" | "general";

export const useSpeech = (
  transcriptionType: TranscriptionType = "medical"
): TUseSpeech => {
  const [recognized, setRecognized] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [audioFile, setAudioFile] = useState<File>();

  const credentials: TCredential = useTranscribeCredentials();
  const transcribeClientRef = useRef<TranscribeStreamingClient>(null);
  const micStreamRef = useRef<MicrophoneStream>(null);
  const recorderRef = useRef<MediaRecorder>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const connectRecorder = useCallback(async () => {
    try {
      if (!recorderRef.current) {
        const encoder = await connect();
        await register(encoder);
      }
    } catch (error) {}
  }, []);

  const createMicStream = useCallback(async () => {
    const stream = await getUserMedia({ audio: true, video: false });
    const micStream = new MicrophoneStream();
    micStream.setStream(stream);
    micStreamRef.current = micStream;

    const recorder = new MediaRecorder(stream, {
      mimeType: "audio/wav",
    }) as MediaRecorder;

    audioChunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/wav",
      });
      const audioFile = new File([audioBlob], `${getUniqId()}.wav`, {
        type: "audio/wav",
        lastModified: getNow().toMillis(),
      });

      setAudioFile(audioFile);
      audioChunksRef.current = [];
    };

    recorder.onerror = (e) => {
      console.error("Recorder error:", e.error);
    };

    recorderRef.current = recorder;
  }, []);

  const createTranscribeClient = useCallback(async () => {
    const idToken = await getToken();
    if (!idToken) return;
    transcribeClientRef.current = new TranscribeStreamingClient({
      region: credentials.region,
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: credentials.region }),
        identityPoolId: credentials.identityPoolId,
        logins: {
          [credentials.userPoolId]: idToken,
        },
      }),
    });
  }, [credentials]);

  const encodePCMChunk = (chunk: any): Buffer => {
    const input = MicrophoneStream.toRaw(chunk);
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);
    input.forEach((sample, i) => {
      const s = Math.max(-1, Math.min(1, sample));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    });
    return Buffer.from(buffer);
  };

  const getAudioStream = useCallback(async function* () {
    const micStream = micStreamRef.current;
    if (!micStream) throw new Error("Mic stream not initialized");
    for await (const chunk of micStream as any) {
      if (chunk.length <= SAMPLE_RATE) {
        yield {
          AudioEvent: {
            AudioChunk: encodePCMChunk(chunk),
          },
        };
      }
    }
  }, []);

  const processTranscription = useCallback((event: any) => {
    for (const result of event?.TranscriptEvent?.Transcript?.Results || []) {
      if (!result.IsPartial) {
        const newText = result.Alternatives?.[0]?.Transcript || "";
        if (newText) setRecognized(newText);
      }
    }
  }, []);

  const startStreaming = useCallback(
    async (language: LanguageCode) => {
      try {
        const client = transcribeClientRef.current;
        if (!client) throw new Error("Transcribe client not initialized");

        const command =
          transcriptionType === "medical"
            ? new StartMedicalStreamTranscriptionCommand({
                ...DEFAULT_OPTIONS,
                LanguageCode: language,
                AudioStream: getAudioStream(),
              })
            : new StartStreamTranscriptionCommand({
                ...DEFAULT_OPTIONS,
                LanguageCode: language,
                AudioStream: getAudioStream(),
              });

        const data = await client.send(
          command as StartStreamTranscriptionCommand
        );
        if (data?.TranscriptResultStream) {
          for await (const event of data.TranscriptResultStream) {
            processTranscription(event);
          }
        }
      } catch (error) {
        console.log("DEBUG ==> Error streaming:", error);
      }
    },
    [transcriptionType, getAudioStream, processTranscription]
  );

  const stopRecord = useCallback(async () => {
    try {
      recorderRef.current?.stop();
      micStreamRef.current?.stop();
      transcribeClientRef.current?.destroy();
      micStreamRef.current = null;
      transcribeClientRef.current = null;
    } catch (error) {
      console.error("Error stopping recording:", error);
    } finally {
      setIsActive(false);
      setRecognized("");
    }
  }, []);

  const startRecord = useCallback(
    async (
      language: LanguageCode = LanguageCode.EN_US,
      onError?: (err: any) => void
    ) => {
      try {
        if (micStreamRef.current || transcribeClientRef.current) {
          await stopRecord();
        }
        setRecognized("");
        setIsActive(true);
        await connectRecorder();
        await createMicStream();
        await createTranscribeClient();
        recorderRef.current?.start();
        await startStreaming(language);
      } catch (err) {
        console.error("Recording error:", err);
        setIsActive(false);
        if (onError) onError(err);
      }
    },
    [
      connectRecorder,
      createMicStream,
      createTranscribeClient,
      startStreaming,
      stopRecord,
    ]
  );

  useEffect(() => {
    return () => {
      stopRecord();
    };
  }, [stopRecord]);

  return {
    isActive,
    recognized,
    audioFile,
    startRecord,
    stopRecord,
  };
};
