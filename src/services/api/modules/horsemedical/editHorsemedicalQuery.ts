import { HorseMedicalResponse } from "@/Types";
import { apiClient } from "../../api";

export const updateHorseMedicalApi = async (
  variables: HorseMedicalResponse
) => {
  const response = await apiClient.put<HorseMedicalResponse>(
    `/horsemedical/${variables.hisaHorseMedicalId}`,
    variables
  );
  return response.data;
};
