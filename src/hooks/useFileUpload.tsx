import { toast } from "@/ui-kit/hooks/useToast";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export const acceptedFileTypes = {
  "image/*": [".jpg", ".jpeg", ".png", ".gif", ".heic"],
  "video/*": [".mp4", ".mov", ".avi"],
  "application/pdf": [".pdf"],
  "text/plain": [".txt"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "audio/mp3,audio/wav,audio/mpeg": [".mp3", ".wav"],
};

export type UseFileUploadType = {
  files: File[];
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
  onDrop: (acceptedFiles: File[]) => void;
  open: () => void;
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  removeFile: (file: File) => void;
  isDragActive: boolean;
};

const getFileKey = (file: File): string =>
  `${file.name}_${file.size}_${file.lastModified}`;

export const useFileUpload = (): UseFileUploadType => {
  const t = useTranslations("FilesUpload");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.filter((file) => {
        const key = getFileKey(file);
        return !files.some((existing) => getFileKey(existing) === key);
      });

      if (newFiles.length < acceptedFiles.length) {
        toast({ title: t("fileAlreadyAdded"), variant: "destructive" });
      }

      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files, t]
  );

  const { getInputProps, open, getRootProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: true,
  });

  const removeFile = useCallback((file: File) => {
    setFiles((prev) => prev.filter((f) => getFileKey(f) !== getFileKey(file)));
  }, []);

  return {
    files,
    selectedFile,
    setSelectedFile,
    onDrop,
    open,
    getInputProps,
    getRootProps,
    removeFile,
    isDragActive,
  };
};
