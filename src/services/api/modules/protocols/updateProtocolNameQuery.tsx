import { IActionResult } from "@/Types/global-types";
import { apiClient } from "../../api";

export const updateProtocolNameQuery = async (variables: {
  protocolId: string;
  protocolName: string;
}) => {
  const { protocolId } = variables;
  const response = await apiClient.put<IActionResult>(
    `/treatment-protocols/${protocolId}/update`,
    variables
  );
  return response.data;
};
