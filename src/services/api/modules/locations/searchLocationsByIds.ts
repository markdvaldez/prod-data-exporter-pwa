import { LocationSearchResponse } from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

export const searchLocationsByIdsQuery = async ({
  locationIds,
}: {
  locationIds: string[];
}) => {
  const params: Record<string, any> = {
    locationIds,
    page: 0,
    pageSize: 200,
    sortBy: "name",
    sortDirection: 1,
  };

  const response = await apiClient.get<LocationSearchResponse[]>(
    `/location/extended/search`,
    {
      params,
    }
  );
  return response.data;
};

export const useSearchLocationsByIds = ({
  locationIds,
}: {
  locationIds: string[];
}) =>
  useQuery<LocationSearchResponse[], Error>({
    queryKey: ["locations", locationIds],
    queryFn: () =>
      searchLocationsByIdsQuery({
        locationIds,
      }),
    enabled: !!locationIds.length,
  });
