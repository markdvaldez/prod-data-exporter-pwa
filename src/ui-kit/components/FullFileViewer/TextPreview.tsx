"use client";

import React from "react";
import { Loader } from "../Loader";

export type TextPreviewProps = {
  content: string | null;
};

export const TextPreview: React.FC<TextPreviewProps> = ({ content }) => {
  return content ? (
    <div className="bg-white p-4 w-full h-full overflow-auto">
      <pre className="whitespace-pre-wrap">{content}</pre>
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
};
