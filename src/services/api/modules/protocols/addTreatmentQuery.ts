import {
  TreatmentTemplateCreateRequest,
  TreatmentTemplateResponse,
} from "@/Types/global-types";
import { apiClient } from "../../api";

export const addTreatmentQuery = async (variables: {
  protocolId: string;
  data: TreatmentTemplateCreateRequest;
}) => {
  const { protocolId, data } = variables;
  const response = await apiClient.post<TreatmentTemplateResponse>(
    `/treatment-protocols/${protocolId}/templates`,
    data
  );
  return response.data;
};
