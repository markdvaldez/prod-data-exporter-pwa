import { HorseMedicalResponse } from "@/Types";
import { apiClient } from "../../api";

export const fetchHorseMedical = async (
  horseMedicalId: string
): Promise<HorseMedicalResponse> => {
  const response = await apiClient.get<HorseMedicalResponse>(
    `/horsemedical/${horseMedicalId}`
  );
  return response.data;
};
