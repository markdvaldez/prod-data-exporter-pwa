import { getUniqId } from "@/runnersQcApp/shared/UniqId";
import { DocumentFileResponse, TMediaFile } from "@/Types";

export interface TExtendedMediaFile extends TMediaFile {
  originalFile: File;
}

export const getFilePath = (file: File): string => {
  return URL.createObjectURL(file);
};

export const mapFileToMediaFile = (
  file: File,
  withDeleteIcon?: boolean
): TExtendedMediaFile => ({
  id: getUniqId(),
  path: getFilePath(file),
  name: file.name,
  type: file.type,
  originalFile: file,
  ...(withDeleteIcon !== undefined ? { withDeleteIcon } : {}),
});

export const mapFilesToMediaFiles = (
  files: File[],
  withDeleteIcon?: boolean
): TExtendedMediaFile[] => {
  return files.map((file) => mapFileToMediaFile(file, withDeleteIcon));
};

export const mimeMapping: { [key: string]: string } = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  heic: "image/heic",
  mp4: "video/mp4",
  mov: "video/quicktime",
  avi: "video/x-msvideo",
  pdf: "application/pdf",
  txt: "text/plain",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  mp3: "audio/mpeg",
  wav: "audio/wav",
};

export async function documentResponseToFile(
  doc: DocumentFileResponse
): Promise<File> {
  if (!doc.presignedURL || !doc.filename) {
    throw new Error("Invalid document response");
  }

  const response = await fetch(doc.presignedURL);
  const blob = await response.blob();

  const ext = doc.filename.split(".").pop()?.toLowerCase() || "";
  const mimeType = mimeMapping[ext] || blob.type || "application/octet-stream";

  const file = new File([blob], doc.filename, { type: mimeType });
  return file;
}

export function isFile(mayBeFile?: any): mayBeFile is File {
  return typeof mayBeFile === "object" && mayBeFile instanceof File;
}
