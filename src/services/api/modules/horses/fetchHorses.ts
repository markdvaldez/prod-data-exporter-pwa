import { HorseAutocomplete } from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

type TSearchHorsesVariables = {
  name: string;
};

const fetchHorses = async ({ name }: TSearchHorsesVariables) => {
  const response = await apiClient.get<HorseAutocomplete[]>(
    `/horse/autocomplete/${name}`
  );
  return response.data;
};

export const useSearchHorsesQuery = (name: string) =>
  useQuery<HorseAutocomplete[], Error>({
    queryKey: ["searchHorses", name],
    queryFn: () => fetchHorses({ name }),
    enabled: !!name,
  });
