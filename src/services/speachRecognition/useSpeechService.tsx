import { printIdToken } from "@/services/aws/amplifyActions";
import { useToast } from "@/ui-kit/hooks/useToast";
import { extractError } from "@/utils/errors";
import { LanguageCode } from "@aws-sdk/client-transcribe-streaming";
import { useCallback, useEffect, useState } from "react";
import { SpeechRecognitionService } from "./SpeechRecognitionService";

export type TUseSpeech = {
  isActive: boolean;
  recognized: string;
  audioUrl: string;
  startRecord: () => void;
  stopRecord: () => Promise<void | TAudioFile>;
};

export type TAudioFile = {
  audioFile?: string;
};

const AWS_CONFIG = {
  region: "",
  identityPoolId: "",
  userPoolId: "",
};

const speechRecognitionService = SpeechRecognitionService.getInstance(
  AWS_CONFIG,
  printIdToken,
  "general"
);

export const useSpeechService = (): TUseSpeech => {
  const [recognized, setRecognized] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const { toast } = useToast();

  const updateRecognition = useCallback(() => {
    setRecognized(speechRecognitionService.recognized);
    setIsActive(speechRecognitionService.isActive);
  }, []);

  const handleAudioRecorded = useCallback(() => {
    setAudioUrl(speechRecognitionService.audioURL);
  }, []);

  const startRecordAudio = useCallback(() => {
    speechRecognitionService.startRecord(LanguageCode.EN_US, (error) => {
      toast({
        title: `Error starting recording: ${extractError(error).message}`,
        variant: "destructive",
      });
    });
  }, [toast]);

  useEffect(() => {
    speechRecognitionService.onRecognitionChange = updateRecognition;
    speechRecognitionService.onRecordingComplete = handleAudioRecorded;

    return () => {
      speechRecognitionService.onRecognitionChange = null;
      speechRecognitionService.onRecordingComplete = null;
    };
  }, [handleAudioRecorded, updateRecognition]);

  return {
    isActive,
    audioUrl,
    recognized,
    startRecord: startRecordAudio,
    stopRecord: speechRecognitionService.stopRecord,
  };
};
