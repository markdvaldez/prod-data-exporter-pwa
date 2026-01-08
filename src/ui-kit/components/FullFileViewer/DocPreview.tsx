"use client";

import { useTranslations } from "next-intl";
import React from "react";

export type DocPreviewProps = {
  content: string | null;
};

export const DocPreview: React.FC<DocPreviewProps> = ({ content }) => {
  const t = useTranslations("FilesUpload");
  return (
    <div className="bg-white p-4 w-full h-full flex items-center justify-center">
      {content || t("docError")}
    </div>
  );
};
