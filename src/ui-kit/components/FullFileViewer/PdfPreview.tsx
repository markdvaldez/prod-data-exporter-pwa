"use client";

import React from "react";

export type PdfPreviewProps = {
  file: File;
  previewUrl: string | null;
};

export const PdfPreview: React.FC<PdfPreviewProps> = ({ file, previewUrl }) => {
  return previewUrl ? (
    <iframe src={previewUrl} title={file.name} className="w-full h-full" />
  ) : null;
};
