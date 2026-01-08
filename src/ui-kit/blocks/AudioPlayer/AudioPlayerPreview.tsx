import { useObjectURL } from "@/hooks/useObjectURL";
import React, { memo, useCallback } from "react";
import { AudioPlayer, AudioPlayerHandlers } from "./AudioPlayer";

type AudioPlayerPreview = {
  id: string;
  file: File;
  className?: string;
  showIcon?: boolean;
  onDelete?: (file: File) => void;
  outerRef?: (ref: AudioPlayerHandlers | null) => void;
  onPlayPause?: (id: string, isPlaying: boolean) => void;
};

export const AudioPlayerPreview: React.FC<AudioPlayerPreview> = memo(
  ({ file, outerRef, onDelete, ...props }) => {
    const audioFile = useObjectURL(file);

    const handleDelete = useCallback(() => {
      onDelete?.(file);
    }, [file, onDelete]);

    return audioFile ? (
      <AudioPlayer
        ref={outerRef}
        audioFile={audioFile}
        onDelete={handleDelete}
        {...props}
      />
    ) : null;
  }
);

AudioPlayerPreview.displayName = "AudioPlayerPreview";
