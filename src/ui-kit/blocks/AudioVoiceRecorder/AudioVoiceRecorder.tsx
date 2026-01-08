import { useSpeech } from "@/services/speachRecognition/useSpeech";
import { MicIcon } from "@/ui-kit/components/Icons/MicIcon";
import {
  MicIndicator,
  MicIndicatorHandlers,
} from "@/ui-kit/components/MicIndicator/MicIndicator";
import { cn } from "@/ui-kit/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CirclePause } from "lucide-react";
import React, { memo, useCallback, useEffect } from "react";

type AudioVoiceRecorderProps = {
  className?: string;
  onChange: (value: string) => void;
  onAudioRecorded?: (audioFile: File) => void;
};

const containerVariants = {
  hidden: { width: 0, opacity: 0 },
  visible: {
    width: 132,
    opacity: 1,
    transition: {
      width: { type: "linier", duration: 0.2 },
      left: { type: "linier", duration: 0.2 },
      opacity: { duration: 0.2 },
    },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const BUTTON_ANIMATION = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.1 },
};

const MAX_DURATION = 30 * 1000; // 30sec

export const AudioVoiceRecorder: React.FC<AudioVoiceRecorderProps> = memo(
  ({ className, onChange, onAudioRecorded }) => {
    const timerRef = React.useRef<MicIndicatorHandlers>(null);
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const onChangeCb =
      React.useRef<AudioVoiceRecorderProps["onChange"]>(onChange);
    const onAudioRecordedCb =
      React.useRef<AudioVoiceRecorderProps["onAudioRecorded"]>(onAudioRecorded);

    const { isActive, startRecord, stopRecord, recognized, audioFile } =
      useSpeech();

    const handleStartRecord = useCallback(async () => {
      if (timerRef.current) {
        timerRef.current.startTimer();
      }
      startRecord();

      timeoutRef.current = setTimeout(() => {
        stopRecord();
        if (timerRef.current) {
          timerRef.current.stopTimer();
        }
      }, MAX_DURATION);
    }, [startRecord, stopRecord]);

    const handleStopRecord = useCallback(async () => {
      if (timerRef.current) {
        timerRef.current.stopTimer();
      }
      stopRecord();

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }, [stopRecord]);

    useEffect(() => {
      if (recognized && onChangeCb.current) {
        onChangeCb.current(recognized);
      }
    }, [recognized]);

    useEffect(() => {
      if (audioFile && onAudioRecordedCb.current) {
        onAudioRecordedCb.current(audioFile);
      }
    }, [audioFile]);

    useEffect(() => {
      return () => {
        handleStopRecord();
      };
    }, [handleStopRecord]);

    return (
      <div
        className={cn(
          "flex justify-end items-center rounded-xl relative",
          className
        )}
      >
        {isActive && (
          <motion.div
            key="animated-bg"
            className={cn(
              "absolute top-0 right-0 bottom-0 bg-tDefault rounded-xl shadow-md z-0 overflow-hidden ",
              className
            )}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
        <MicIndicator ref={timerRef} isActive={isActive} />
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.button
              key="voice-recorder-button-stop"
              onClick={handleStopRecord}
              className="p-2 z-10"
              {...BUTTON_ANIMATION}
            >
              <CirclePause color="#FF4141" size={24} />
            </motion.button>
          ) : (
            <motion.button
              key="voice-recorder-button-start"
              onClick={handleStartRecord}
              className="p-2 z-10"
              {...BUTTON_ANIMATION}
            >
              <MicIcon width={24} height={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AudioVoiceRecorder.displayName = "AudioVoiceRecorder";
