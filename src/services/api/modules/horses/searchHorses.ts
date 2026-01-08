import { CoveredHorseSearchResponse } from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

const searchHorses = async (
  searchText: string
): Promise<CoveredHorseSearchResponse[]> => {
  const response = await apiClient.get<CoveredHorseSearchResponse[]>(
    "/horse/search",
    {
      params: { searchText },
    }
  );
  return response.data;
};

export const useSearchHorses = (searchText: string, enabled: boolean = true) =>
  useQuery<CoveredHorseSearchResponse[], Error>({
    queryKey: ["searchHorses", searchText],
    queryFn: () => searchHorses(searchText),
    enabled: !!searchText && enabled,
  });
