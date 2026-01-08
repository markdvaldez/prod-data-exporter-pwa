import { apiClient } from "../../api";
import { queryClient } from "../../queryClient";

export const addHorseMedicalDocumentQuery = async ({
  horseMedicalId,
  fileName,
  personId,
}: {
  horseMedicalId: string;
  fileName: string;
  personId: string;
}) => {
  const formData = new FormData();
  formData.append("fileName", fileName);
  formData.append("personId", personId);

  const response = await apiClient.post(
    `/horsemedical/${horseMedicalId}/document/add`,
    formData
  );
  return response.data;
};

export const addHorseMedicalDocumentRequest = ({
  horseMedicalId,
  fileName,
  personId,
}: {
  horseMedicalId: string;
  fileName: string;
  personId: string;
}) =>
  queryClient.fetchQuery({
    queryKey: [
      "addHorseMedicalDocumentQuery",
      horseMedicalId,
      fileName,
      personId,
    ],
    queryFn: () =>
      addHorseMedicalDocumentQuery({ horseMedicalId, fileName, personId }),
  });
