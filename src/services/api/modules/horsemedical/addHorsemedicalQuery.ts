import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { HorseMedicalResponse } from "@/Types";
import { apiClient } from "../../api";
import { queryClient } from "../../queryClient";

export const addHorseMedicalQuery = async (variables: THorseMedicalRecord) => {
  const response = await apiClient.post("/horsemedical", variables);
  return response.data as HorseMedicalResponse;
};

export const addHorseMedicalRequest = (variables: THorseMedicalRecord) =>
  queryClient.fetchQuery({
    queryKey: ["addHorseMedicalQuery", variables],
    queryFn: () => addHorseMedicalQuery(variables),
  });
