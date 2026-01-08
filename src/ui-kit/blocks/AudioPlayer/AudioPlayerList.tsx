import _ from "lodash";
import React, { memo, useCallback, useRef } from "react";
import { AudioPlayerHandlers } from "./AudioPlayer";
import { AudioPlayerPreview } from "./AudioPlayerPreview";

type AudioPlayerListProps = {
  files: File[];
  onDelete?: (file: File) => void;
  showIcon?: boolean;
};

export const AudioPlayerList: React.FC<AudioPlayerListProps> = memo(
  ({ files, showIcon, onDelete }) => {
    const refs = useRef<Record<string, AudioPlayerHandlers | null>>({});

    const handlePlayPause = useCallback((id: string, isPlaying: boolean) => {
      if (isPlaying) {
        _.forEach(refs.current, (ref, key) => {
          if (key !== id && ref?.onPause) {
            ref.onPause();
          }
        });
      }
    }, []);

    return (
      <>
        {_.map(files, (file) => (
          <AudioPlayerPreview
            key={`audio-${file.name}`}
            outerRef={(ref) => (refs.current[file.name] = ref)}
            className="my-2"
            id={file.name}
            file={file}
            onDelete={onDelete}
            onPlayPause={handlePlayPause}
            showIcon={showIcon}
          />
        ))}
      </>
    );
  }
);

AudioPlayerList.displayName = "AudioPlayerList";
