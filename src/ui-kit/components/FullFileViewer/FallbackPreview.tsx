"use client";

import React from "react";

export type FallbackPreviewProps = {
  file: File;
};

export const FallbackPreview: React.FC<FallbackPreviewProps> = ({ file }) => {
  return (
    <div className="flex items-center justify-center w-full h-full text-2xl">
      {file.name}
    </div>
  );
};
