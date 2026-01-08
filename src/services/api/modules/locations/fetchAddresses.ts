import { TSearchLocationsVariables } from "@/services/store/modules/locations/types";
import { Address } from "@/Types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

export const fetchAddressesQuery = async ({
  text,
}: TSearchLocationsVariables) => {
  const params: Record<string, any> = {
    page: 0,
    pageSize: 100,
    sortBy: "name",
    sortDirection: 1,
  };

  const response = await apiClient.get<Address[]>(
    `/address/autocomplete/${text}`,
    {
      params,
    }
  );
  return response.data;
};

export const useFetchAddressesQuery = ({ text }: TSearchLocationsVariables) =>
  useQuery<Address[], Error>({
    queryKey: ["addresses", text],
    queryFn: () =>
      fetchAddressesQuery({
        text,
      }),
    enabled: !!text,
  });
