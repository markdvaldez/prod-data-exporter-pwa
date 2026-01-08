import {
  HorseMedicalRecType,
  HorseMedicalResponse,
} from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

export type TGetRecordsVariables = {
  personIds?: string[];
  startDate?: string;
  endDate?: string;
  recTypes?: HorseMedicalRecType[];
  horseIds?: string[];
  page?: number;
  pageSize?: number;
  sortBy?: string;
};

export const getExtendedSearch = async ({
  personIds,
  startDate,
  endDate,
  recTypes,
  horseIds,
  page = 0,
  pageSize = 10000,
}: TGetRecordsVariables) => {
  const params: Record<string, any> = {
    personIds,
    horseIds,
    startDate,
    endDate,
    page,
    pageSize,
    sortBy: "date",
    sortDirection: 2,
  };

  if (recTypes) {
    params.recTypes = recTypes;
  }
  if (horseIds) {
    params.horseIds = horseIds;
  }

  const response = await apiClient.get<HorseMedicalResponse[]>(
    `/horsemedical/extended/search`,
    {
      params,
    }
  );
  return response.data;
};

export const useGetExtendedSearch = ({
  personIds,
  startDate,
  endDate,
  recTypes,
  horseIds,
  page = 0,
  pageSize = 10000,
}: TGetRecordsVariables) =>
  useQuery<HorseMedicalResponse[], Error>({
    queryKey: ["personsRecords", personIds, horseIds, startDate, endDate],
    queryFn: () =>
      getExtendedSearch({
        personIds,
        startDate,
        endDate,
        recTypes,
        horseIds,
        page,
        pageSize,
      }),
    enabled: true,
    refetchOnReconnect: true,
  });
