import { IActionResult, TreatmentTemplateModel } from "@/Types/global-types";
import { apiClient } from "../../api";

export const updateTreatmentTemplate = async (variables: {
  protocolId: string;
  template: TreatmentTemplateModel;
}) => {
  const { protocolId, template } = variables;
  const response = await apiClient.put<IActionResult>(
    `/treatment-protocols/${protocolId}/templates/${template.treatmentTemplateId}`,
    template
  );
  return response.data;
};
