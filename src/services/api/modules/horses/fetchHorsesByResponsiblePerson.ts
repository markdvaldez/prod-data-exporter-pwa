import { TGetPersonHorsesVariables } from "@/services/store/modules/horses/types";
import {
  CoveredHorseResponse,
  CoveredHorseSearchResponse,
} from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

export const fetchResponsiblePersonHorses = async ({
  personId,
}: TGetPersonHorsesVariables): Promise<CoveredHorseResponse[]> => {
  const params: Record<string, any> = {
    responsiblePersonHisaId: personId,
    page: 0,
    pageSize: 1000,
  };
  const response = await apiClient.get<CoveredHorseResponse[]>(
    `/horse/search`,
    { params }
  );
  return response.data;
};

export const useResponsiblePersonHorsesQuery = (personId: string) =>
  useQuery<CoveredHorseSearchResponse[], Error>({
    queryKey: ["responsiblePersonHorses", personId],
    queryFn: () => fetchResponsiblePersonHorses({ personId }),
    enabled: !!personId,
  });
