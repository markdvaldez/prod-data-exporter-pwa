import { TGetPersonHorsesVariables } from "@/services/store/modules/horses/types";
import { CoveredHorseResponse } from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

export const fetchHorsesByPerson = async ({
  personId,
}: TGetPersonHorsesVariables): Promise<CoveredHorseResponse[]> => {
  const params: Record<string, any> = {
    page: 0,
    pageSize: 1000,
  };
  const response = await apiClient.get<CoveredHorseResponse[]>(
    `/horse/search-by-person/${personId}`,
    { params }
  );
  return response.data;
};

export const useFetchHorsesByPerson = (personId: string) =>
  useQuery<CoveredHorseResponse[], Error>({
    queryKey: ["personHorses", personId],
    queryFn: () => fetchHorsesByPerson({ personId }),
    enabled: !!personId,
  });
