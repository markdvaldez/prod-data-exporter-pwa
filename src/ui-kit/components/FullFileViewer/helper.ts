export const isPreviewSupported = (file: File): boolean => {
  switch (true) {
    case file.type.startsWith("image/"):
    case file.type === "application/pdf":
    case file.type === "text/plain":
    case file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return true;
    case file.type.startsWith("video/"):
      const supportedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
      return supportedVideoTypes.includes(file.type);
    default:
      return false;
  }
};
