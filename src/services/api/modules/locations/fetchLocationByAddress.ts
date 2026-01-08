import { locationTypes } from "@/runnersQcApp/shared/types";
import {
  Address,
  LocationSearchResponse,
  LocationType,
} from "@/Types/global-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { apiClient } from "../../api";

type TSearchByAddressVariables = {
  address: Address;
  types?: LocationType[];
};

export const fetchLocationByAddressQuery = async ({
  address,
  types,
}: TSearchByAddressVariables) => {
  const typesArr = isEmpty(types) ? locationTypes : types;

  const params: Record<string, any> = {
    page: 0,
    pageSize: 100,
    locationTypes: typesArr,
    "address.street": address.street,
    "address.city": address.city,
    "address.state": address.state,
    "address.country": address.country,
    "address.zipPostalCode": address.zipPostalCode,
  };

  const response = await apiClient.get<LocationSearchResponse[]>(
    `/location/extended/search`,
    {
      params,
    }
  );
  return response.data;
};

export const useSearchLocationsByAddressQuery = ({
  address,
  types,
}: TSearchByAddressVariables) =>
  useQuery<LocationSearchResponse[], Error>({
    queryKey: ["locations", address, locationTypes],
    queryFn: () =>
      fetchLocationByAddressQuery({
        address,
        types,
      }),
    enabled: !!address,
  });

export const useFetchLocationByAddressQuery = () =>
  useMutation({
    mutationFn: fetchLocationByAddressQuery,
  });
