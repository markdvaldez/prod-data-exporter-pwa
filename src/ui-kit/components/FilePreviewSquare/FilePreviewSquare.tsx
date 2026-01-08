"use client";

import { useHeicConversion } from "@/hooks/useHeicConversion";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { isPreviewSupported } from "../FullFileViewer/helper";
import { CloseIcon } from "../Icons/CloseIcon";
import { Loader } from "../Loader";

export type FilePreviewSquareProps = {
  file: File;
  onRemove?: () => void;
  onClick: () => void;
  withDownload?: boolean;
  withDeleteIcon?: boolean;
};

export const FilePreviewSquare: React.FC<FilePreviewSquareProps> = ({
  file,
  onRemove,
  onClick,
  withDownload,
  withDeleteIcon = true,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const isHeic =
    file.name.toLowerCase().endsWith(".heic") ||
    file.type === "image/heic" ||
    file.type === "image/heif";

  const {
    convertedUrl,
    loading: heicLoading,
    error: heicError,
  } = useHeicConversion(isHeic ? file : null);
  useEffect(() => {
    if (!isHeic && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, isHeic]);
  const fileExtension = file.name.split(".").pop()?.toUpperCase() || "";
  const handleDownload = () => {
    const downloadUrl = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(downloadUrl);
  };
  const handleClick = () => {
    if (withDownload && !isPreviewSupported(file)) {
      handleDownload();
    } else {
      onClick();
    }
  };
  const renderThumbnail = () => {
    if (isHeic) {
      if (heicLoading)
        return (
          <div className="flex items-center justify-center w-full h-full text-xs">
            <Loader size="sm" />
          </div>
        );
      if (heicError)
        return (
          <div className="flex items-center justify-center w-full h-full text-xs">
            {heicError}
          </div>
        );
      return convertedUrl ? (
        <Image
          src={convertedUrl}
          alt={file.name}
          fill
          className="object-cover rounded-sm"
        />
      ) : null;
    }
    if (file.type.startsWith("image/")) {
      return previewUrl ? (
        <Image
          src={previewUrl}
          alt={file.name}
          fill
          className="object-cover rounded-sm"
        />
      ) : null;
    }
    return (
      <div className="flex items-center justify-center w-full h-full text-xs font-bold">
        {`.${fileExtension}`}
      </div>
    );
  };
  return (
    <div className="relative w-20 h-20 xl:w-16 xl:h-16">
      <div
        className="w-full h-full border border-gray-300 rounded-sm overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {renderThumbnail()}
      </div>
      {withDeleteIcon ? (
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          <div
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="rounded-full border border-tPlaceholder bg-w0"
          >
            <CloseIcon width={16} height={16} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
