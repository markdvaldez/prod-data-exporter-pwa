import { TSearchLocationsVariables } from "@/services/store/modules/locations/types";
import { LocationSearchResponse, LocationType } from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { apiClient } from "../../api";

export const searchLocationsQuery = async ({
  text,
  locationTypes,
}: TSearchLocationsVariables) => {
  const typesArr = isEmpty(locationTypes)
    ? [LocationType.Racetrack]
    : locationTypes;

  const params: Record<string, any> = {
    searchText: text,
    page: 0,
    pageSize: 100,
    sortBy: "name",
    sortDirection: 1,
    locationTypes: typesArr,
  };

  const response = await apiClient.get<LocationSearchResponse[]>(
    `/location/extended/search`,
    {
      params,
    }
  );
  return response.data;
};

export const useSearchLocationsQuery = ({
  text,
  locationTypes,
}: TSearchLocationsVariables) =>
  useQuery<LocationSearchResponse[], Error>({
    queryKey: ["locations", text, locationTypes],
    queryFn: () =>
      searchLocationsQuery({
        text,
        locationTypes,
      }),
    enabled: !!text,
  });
