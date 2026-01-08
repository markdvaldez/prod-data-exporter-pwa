"use client";

import Image from "next/image";
import React from "react";
import { Loader } from "../Loader";

export type ImagePreviewProps = {
  file: File;
  previewUrl: string | null;
  convertedUrl: string | null;
  heicLoading: boolean;
  heicError: string | null;
};

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  file,
  previewUrl,
  convertedUrl,
  heicLoading,
  heicError,
}) => {
  const isHeic =
    file.name.toLowerCase().endsWith(".heic") ||
    file.type === "image/heic" ||
    file.type === "image/heif";
  if (isHeic) {
    if (heicLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <Loader size="lg" />
        </div>
      );
    }
    if (heicError) {
      return <div className="p-4 text-center">{heicError}</div>;
    }
    return convertedUrl ? (
      <div className="relative w-full h-full">
        <Image
          src={convertedUrl}
          alt={file.name}
          fill
          className="object-contain"
        />
      </div>
    ) : null;
  }
  return previewUrl ? (
    <div className="relative w-full h-full">
      <Image src={previewUrl} alt={file.name} fill className="object-contain" />
    </div>
  ) : null;
};
