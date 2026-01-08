import { useCallback, useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export type TUseTimer = {
  seconds: number;
  formattedTime: string;
  start: () => void;
  stop: () => void;
};

export const useTimer = (): TUseTimer => {
  const [seconds, setSeconds] = useState<number>(0);
  const intervalId = useRef<NodeJS.Timeout>(null);

  const start = useCallback(() => {
    intervalId.current = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  }, []);

  const stop = useCallback(() => {
    setSeconds(0);
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    seconds,
    formattedTime: formatTime(seconds),
    start,
    stop,
  };
};
