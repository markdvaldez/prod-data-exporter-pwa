import { Dialog, DialogTitle } from "@/ui-kit/components/Dialog";
import { useTranslations } from "next-intl";
import React, { memo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloudIcon } from "../Icons/UploadCloudIcon";
import { NotificationContent } from "./NotificationContent";

export type DragNDropModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDrop: (acceptedFiles: File[]) => void;
};

const acceptedFileTypes = {
  "image/*": [".jpg", ".jpeg", ".png", ".gif", ".heic"],
  "video/*": [".mp4", ".mov", ".avi"],
  "application/pdf": [".pdf"],
  "text/plain": [".txt"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

export const DragNDropModal: React.FC<DragNDropModalProps> = memo(
  ({ isOpen, onClose, onDrop }) => {
    const t = useTranslations("FilesUpload");
    const onDropInternal = useCallback(
      (acceptedFiles: File[]) => {
        onDrop(acceptedFiles);
        onClose();
      },
      [onDrop, onClose]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: onDropInternal,
      accept: acceptedFileTypes,
      multiple: true,
    });
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <NotificationContent className="flex flex-col px-4 pt-4 w-3/4">
          <DialogTitle className="flex justify-center text-xl">
            {t("chooseFile")}
          </DialogTitle>
          <div
            {...getRootProps()}
            className={`flex flex-col border-2 border-dashed p-16 rounded-sm cursor-pointer items-center justify-center ${
              isDragActive ? "border-blue" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloudIcon className="pb-4" />
            <span>{t("chooseFileOrDrag")}</span>
          </div>
        </NotificationContent>
      </Dialog>
    );
  }
);
DragNDropModal.displayName = "DragNDropModal";
