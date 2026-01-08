import { IActionResult } from "@/Types/global-types";
import { apiClient } from "../../api";

export const deleteProtocolQuery = async (variables: {
  protocolId: string;
}) => {
  const { protocolId } = variables;
  const response = await apiClient.delete<IActionResult>(
    `/treatment-protocols/${protocolId}`
  );
  return response.data;
};
