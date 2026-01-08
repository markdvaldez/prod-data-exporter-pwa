import { LocationSearchResponse } from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

const fetchDefaultLocations = async () => {
  const response = await apiClient.get<LocationSearchResponse[]>(
    "/location/all-default-locations"
  );
  return response.data;
};

export const useFetchDefaultLocationsQuery = () =>
  useQuery<LocationSearchResponse[], Error>({
    queryKey: ["defaultLocations"],
    queryFn: () => fetchDefaultLocations(),
  });
