import { TSearchPersonsVariables } from "@/services/store/modules/persons/types";
import { PersonResponse } from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

export const searchPersonsQuery = async ({
  searchText,
}: TSearchPersonsVariables) => {
  const params: Record<string, any> = {
    page: 0,
    pageSize: 20,
    sortBy: "displayName",
    sortDirection: 1,
  };

  const response = await apiClient.get<PersonResponse[]>(
    `/person/autocomplete/${searchText}`,
    {
      params,
    }
  );
  return response.data;
};

export const useSearchPersonsQuery = ({
  searchText,
}: TSearchPersonsVariables) =>
  useQuery<PersonResponse[], Error>({
    queryKey: ["persons", searchText],
    queryFn: () =>
      searchPersonsQuery({
        searchText,
      }),
    enabled: !!searchText,
  });
