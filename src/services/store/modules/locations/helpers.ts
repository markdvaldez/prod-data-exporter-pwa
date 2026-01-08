import { LocationSearchResponse } from "@/Types/global-types";
import _, { map } from "lodash";
import { TLocation } from "./types";

export const mapLocationToProps = (
  data: LocationSearchResponse
): TLocation => ({
  locationId: data?.locationId || "",
  locationName: data?.name || "",
  latLng: data?.latLng || "",
  type: data?.type || undefined,
  address: data?.address,
  phone: data?.phone || "",
});

export const mapLocationsToProps = (
  data: LocationSearchResponse[] | []
): TLocation[] | [] =>
  _.chain(data)
    .compact()
    .map((item) => ({
      locationId: item?.locationId || "",
      locationName: item?.name || "",
      latLng: item?.latLng || "",
      type: item?.type,
      address: item?.address,
      phone: item?.phone || "",
    }))
    .value();

export const mapLocationsResponseToProps = (
  data: LocationSearchResponse[] | [],
  latLng?: string
): TLocation[] | [] =>
  _.chain(data)
    .compact()
    .map((item) => ({
      locationId: item?.locationId || "",
      locationName: item?.name || "",
      latLng: item?.latLng || "",
      type: item?.type,
      distance:
        latLng && item?.latLng
          ? getDistanceFromLatLngStrings(latLng, item?.latLng)
          : undefined,
      address: item?.address,
    }))
    .sortBy("distance", "asc")
    .value();

export const mapStatesToProps = (
  data: LocationSearchResponse[] | []
): TLocation[] | [] =>
  _.chain(data)
    .compact()
    .map((item) => ({
      locationId: item?.locationId || "",
      locationName: _.replace(item?.name || "", / State/i, ""),
    }))
    .value();

export function getDistanceFromLatLngStrings(latLng1: string, latLng2: string) {
  const toRad = (angle: number) => (angle * Math.PI) / 180;
  const R = 3958.8;

  const [lat1, lon1] = latLng1.split(",").map(Number);
  const [lat2, lon2] = latLng2.split(",").map(Number);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

export const createVariables = (locations: TLocation[]): TLocation[] =>
  map(locations, (l: TLocation) => ({
    locationId: l.locationId || "",
    locationName: l.locationName || "",
  }));
