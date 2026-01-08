import {
  Address,
  LocationAccreditation,
  LocationResponse,
  LocationType,
} from "@/Types";
import { RequestErrorType } from "@/utils/errors";
import { z } from "zod/v4";
import { TLocationsActions } from "./sagaActions";

export type TLocation = {
  locationId: string;
  locationName: string;
  latLng?: string;
  type?: LocationType;
  distance?: number;
  address?: Address | null;
  phone?: string;
};

export type TLocationAddress = {
  addressId: string;
  address: string;
  item?: Address;
};

export type TRaceTrack = {
  locationId: string;
  location: LocationResponse;
  activeRaceNumber?: string;
  address?: Address | null;
  trackCode?: string | null;
  type?: LocationType;
  email?: string | null;
  phone?: string | null;
  webSite?: string | null;
  name?: string | null;
  accreditation?: LocationAccreditation | null;
};

export interface TLocationState {
  locations: Record<string, TLocation>;
  isFetching: boolean;
  isFetchingSettings: boolean;
  error?: RequestErrorType;
  favorites: TLocation[] | [];
  defaultLocations: TLocation[] | [];
  description: string;
  treatmentLocation: TLocation;
  addresses: Address[] | [];
  nearestLocations: TLocation[] | [];
}

export type TLocationsPayload = {
  payload: { locations: TLocation[] | [] };
};

export type TLocationPayload = {
  payload: { location: TLocation };
};

export type TFavoritesPayload = {
  payload: { favorites: TLocation[] };
};

export type TErrorPayload = {
  payload: { error?: RequestErrorType };
};

export type TSyncAction = {
  type: TLocationsActions.SYNC_LOCATION;
  payload: { location: TLocation };
};

export type TSearchLocationsByIdAction = {
  type: TLocationsActions.LOCATIONS_REQUEST_BY_ID_SEND;
  payload: { locationId: string };
};

export type TSyncLocationsAction = {
  type: TLocationsActions.LOCATIONS_SYNC;
  payload: { locations: string[] };
};

export type TSearchLocationsVariables = {
  text: string;
  locationTypes?: LocationType[];
  latLong?: string;
  distanceMeters?: number;
};

export type TSearchLocationsAction = {
  type: TLocationsActions.LOCATIONS_REQUEST_SEND;
  payload: TSearchLocationsVariables;
};

export type TTreatmentLocationPayload = {
  payload: {
    location: TLocation;
  };
};

export type TDescriptionPayload = {
  payload: { text: string };
};

export type TSearchNearestLocationsVariables = {
  text: string;
  locationTypes?: LocationType[];
  latLong?: string;
  distanceMeters?: number;
};

export type TSearchAddressesAction = {
  type: TLocationsActions.ADDRESS_REQUEST_SEND;
  payload: TSearchLocationsVariables;
};

export type TAddressesPayload = {
  payload: { addresses?: Address[] };
};

export type TSearchNearestLocationAction = {
  type: TLocationsActions.LOCATIONS_NEAREST_REQUEST;
  payload: TSearchNearestLocationsVariables;
};

export type TAddToUserSettingsVariables = {
  location: TLocation;
};

export type TAddToUserSettingsAction = {
  type: TLocationsActions.ADD_TO_USER_SETTINGS_REQUEST_SEND;
  payload: TAddToUserSettingsVariables;
};

const locationSchema = z.object({
  locationName: z.string(),
  locationId: z.string(),
});

export const locationsArraySchema = z.array(locationSchema);
