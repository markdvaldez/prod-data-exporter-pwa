import heic2any from "heic2any";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const useHeicConversion = (file: File | null) => {
  const t = useTranslations("FilesUpload");

  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setConvertedUrl(null);
      setLoading(false);
      setError(null);
      return;
    }
    const fileName = file.name.toLowerCase();
    if (
      fileName.endsWith(".heic") ||
      file.type === "image/heic" ||
      file.type === "image/heif"
    ) {
      setLoading(true);
      heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 })
        .then((result) => {
          const blob = result instanceof Blob ? result : result[0];
          const url = URL.createObjectURL(blob);
          setConvertedUrl(url);
        })
        .catch((err) => {
          console.error(t("heicConversionError"), err);
          setError(t("heicConversionError"));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setConvertedUrl(null);
      setLoading(false);
      setError(null);
    }
  }, [t, file]);

  return { convertedUrl, loading, error };
};
