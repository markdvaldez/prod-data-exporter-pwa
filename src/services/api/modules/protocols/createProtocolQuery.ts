import {
  TreatmentProtocolCreateRequest,
  TreatmentProtocolResponse,
} from "@/Types/global-types";
import { apiClient } from "../../api";

export const createProtocolQuery = async (
  variables: TreatmentProtocolCreateRequest
) => {
  const response = await apiClient.post<TreatmentProtocolResponse>(
    "/treatment-protocols",
    variables
  );
  return response.data;
};
