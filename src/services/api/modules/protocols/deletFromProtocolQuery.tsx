import { IActionResult } from "@/Types/global-types";
import { apiClient } from "../../api";

export const deleteFromProtocolQuery = async (variables: {
  protocolId: string;
  templateId: string;
}) => {
  const { protocolId, templateId } = variables;
  const response = await apiClient.delete<IActionResult>(
    `/treatment-protocols/${protocolId}/templates/${templateId}`
  );
  return response.data;
};
