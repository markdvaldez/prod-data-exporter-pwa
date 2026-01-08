"use client";

import { useHeicConversion } from "@/hooks/useHeicConversion";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import mammoth from "mammoth";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeftIcon } from "../Icons/ChevronLeftIcon";
import { DownloadIcon } from "../Icons/DownloadIcon";
import { DocPreview } from "./DocPreview";
import { DocxPreview } from "./DocxPreview";
import { FallbackPreview } from "./FallbackPreview";
import { ImagePreview } from "./ImagePreview";
import { PdfPreview } from "./PdfPreview";
import { TextPreview } from "./TextPreview";
import { VideoPreview } from "./VideoPreview";

export type FullFileViewerProps = {
  file: File;
  onClose: () => void;
  withDownload?: boolean;
};

export const FullFileViewer: React.FC<FullFileViewerProps> = ({
  file,
  onClose,
  withDownload,
}) => {
  const t = useTranslations("FilesUpload");
  const isMobile = useIsMobile();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);

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
    if (
      !isHeic &&
      (file.type.startsWith("image/") ||
        file.type.startsWith("video/") ||
        file.type === "application/pdf")
    ) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file, isHeic]);

  useEffect(() => {
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = () => setContent(reader.result as string);
      reader.readAsText(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setLoadingContent(true);
      const reader = new FileReader();
      reader.onload = async () => {
        const arrayBuffer = reader.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          try {
            const result = await mammoth.convertToHtml({ arrayBuffer });
            setContent(result.value);
          } catch (error) {
            setContent(t("docError"));
          } finally {
            setLoadingContent(false);
          }
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (file.type === "application/msword") {
      setContent(t("docError"));
    }
  }, [file, t]);

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

  const renderContent = () => {
    switch (true) {
      case file.type.startsWith("image/"):
        return (
          <ImagePreview
            file={file}
            previewUrl={previewUrl}
            convertedUrl={convertedUrl}
            heicLoading={heicLoading}
            heicError={heicError}
          />
        );
      case file.type.startsWith("video/"):
        return <VideoPreview file={file} previewUrl={previewUrl} />;
      case file.type === "application/pdf":
        return <PdfPreview file={file} previewUrl={previewUrl} />;
      case file.type === "text/plain":
        return <TextPreview content={content} />;
      case file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return (
          <DocxPreview content={content} loadingContent={loadingContent} />
        );
      case file.type === "application/msword":
        return <DocPreview content={content} />;
      default:
        return <FallbackPreview file={file} />;
    }
  };

  const containerClass = isMobile
    ? "fixed inset-0 z-50 bg-black flex items-center justify-center w-screen h-screen"
    : "fixed inset-0 z-50 bg-black flex items-center justify-center w-screen h-screen p-10";

  const innerContainerClass = isMobile
    ? "relative w-full h-full overflow-auto"
    : "relative w-full h-full overflow-auto p-10";

  const modal = (
    <div className={containerClass}>
      <div className={innerContainerClass}>
        <div className="absolute bg-black bg-opacity-50 top-0 left-0 right-0 h-12 content-center z-10">
          <div className="flex flex-row justify-between pr-4 pl-2 z-10">
            <div onClick={onClose}>
              <ChevronLeftIcon />
            </div>
            {withDownload ? (
              <div
                className="flex h-8 w-8 items-center justify-center bg-a0 rounded-sm z-10"
                onClick={handleDownload}
              >
                <DownloadIcon className="cursor-pointer" />
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
          {renderContent()}
        </div>
      </div>
    </div>
  );

  return isMobile && typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : modal;
};
