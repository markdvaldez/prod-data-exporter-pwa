"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { Loader } from "../Loader";

export type DocxPreviewProps = {
  content: string | null;
  loadingContent: boolean;
};

export const DocxPreview: React.FC<DocxPreviewProps> = ({
  content,
  loadingContent,
}) => {
  const t = useTranslations("FilesUpload");
  if (loadingContent) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }
  return content ? (
    <div
      className="bg-white p-4 w-full h-full overflow-auto"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  ) : (
    <div className="p-4 text-center">{t("docError")}</div>
  );
};
