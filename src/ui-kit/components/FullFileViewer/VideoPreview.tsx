"use client";

import { useTranslations } from "next-intl";
import React from "react";

export type VideoPreviewProps = {
  file: File;
  previewUrl: string | null;
};

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  file,
  previewUrl,
}) => {
  const t = useTranslations("FilesUpload");
  const supportedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
  if (supportedVideoTypes.includes(file.type)) {
    return previewUrl ? (
      <video controls className="w-full h-full object-contain bg-black">
        <source src={previewUrl} type={file.type} />
        {t("videoCannotBePlayed")}
      </video>
    ) : null;
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-black text-white">
      {t("videoCannotBePlayed")}
    </div>
  );
};
