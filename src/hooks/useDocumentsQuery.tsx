import { useFetchHorseMedicalDocuments } from "@/services/api/modules/horsemedical/fetchDocumentsQuery";
import { DocumentFileResponse } from "@/Types";
import { documentResponseToFile } from "@/utils/fileUtils";
import _ from "lodash";
import { useEffect, useState } from "react";

export const useDocumentsQuery = (hisaHorseMedicalId: string) => {
  const { data, isLoading, refetch } =
    useFetchHorseMedicalDocuments(hisaHorseMedicalId);
  const [files, setFiles] = useState<File[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    async function convertDocuments() {
      if (data && _.isArray(data)) {
        try {
          setIsConverting(true);
          const filePromises = data.map((doc: DocumentFileResponse) =>
            documentResponseToFile(doc)
          );
          const fileResults = await Promise.all(filePromises);
          setFiles(fileResults);
        } catch (error) {
          console.error("Error converting documents:", error);
        } finally {
          setIsConverting(false);
        }
      }
    }
    convertDocuments();
  }, [data]);

  return { files, isLoading, isConverting, refetch };
};
