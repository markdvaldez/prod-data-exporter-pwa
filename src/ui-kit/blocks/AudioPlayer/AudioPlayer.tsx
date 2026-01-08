import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { PauseIcon } from "@/ui-kit/components/Icons/PauseIcon";
import { PlayIcon } from "@/ui-kit/components/Icons/PlayIcon";
import { cn } from "@/ui-kit/lib/utils";
import { useWavesurfer } from "@wavesurfer/react";
import _ from "lodash";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

type AudioPlayerProps = {
  id: string;
  audioFile: string;
  className?: string;
  showIcon?: boolean;
  onDelete?: (id: string) => void;
  onPlayPause?: (id: string, isPlaying: boolean) => void;
};

const OPTIONS = {
  barGap: 1,
  barWidth: 0.8,
  cursorWidth: 0,
  barHeight: 2,
  barRadius: 2,
  height: 40,
  hideScrollbar: true,
  responsive: true,
  normalize: true,
  progressColor: "#687968",
  waveColor: "#A9B3A9",
};

export type AudioPlayerHandlers = {
  onPause: () => void;
};

export const AudioPlayer = memo(
  forwardRef<AudioPlayerHandlers, AudioPlayerProps>(
    (
      {
        id,
        className,
        audioFile,
        showIcon,
        onDelete,
        onPlayPause: handlePlayPause,
      },
      ref
    ) => {
      const containerRef = useRef(null);
      const [recordDuration, setRecordDuration] = useState<number>(0);

      const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
        container: containerRef,
        url: audioFile,
        ...OPTIONS,
      });

      const onPlayPause = useCallback(() => {
        if (!wavesurfer) return;
        wavesurfer.playPause();
        handlePlayPause?.(id, !isPlaying);
      }, [handlePlayPause, id, isPlaying, wavesurfer]);

      const onPause = useCallback(() => {
        if (!wavesurfer) return;
        wavesurfer.pause();
      }, [wavesurfer]);

      const handleDelete = useCallback(() => {
        onDelete?.(id);
      }, [id, onDelete]);

      const duration = useMemo(() => {
        return formatTime(currentTime || recordDuration || 0);
      }, [currentTime, recordDuration]);

      useEffect(() => {
        if (!wavesurfer) return;
        wavesurfer.on("ready", () => {
          const durationSec = wavesurfer?.getDuration?.();
          setRecordDuration(durationSec || 0);
        });
      }, [duration, wavesurfer]);

      useImperativeHandle(ref, () => ({
        onPause,
      }));

      return (
        <div
          className={cn(
            "flex items-center h-12 px-2 max-w-sm bg-a8 rounded-xl shadow",
            className
          )}
        >
          <button onClick={onPlayPause}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className="flex-1 px-2">
            <div ref={containerRef} />
          </div>
          {duration && (
            <div className="flex items-center mr-2 text-sm text-tDefault w-8 select-none">
              {duration}
            </div>
          )}
          {showIcon && (
            <button onClick={handleDelete} className="px-2">
              <CloseIcon />
            </button>
          )}
        </div>
      );
    }
  )
);

AudioPlayer.displayName = "AudioPlayer";

function formatTime(seconds: number) {
  const m = _.parseInt(String((seconds % (60 * 60)) / 60));
  const s = _.parseInt(String(seconds % 60));

  return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
}
