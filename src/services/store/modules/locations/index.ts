import { createAction, createSlice } from "@reduxjs/toolkit";
import _, { forEach } from "lodash";
import { TLocationsActions } from "./sagaActions";
import {
  TAddressesPayload,
  TAddToUserSettingsVariables,
  TDescriptionPayload,
  TErrorPayload,
  TFavoritesPayload,
  TLocation,
  TLocationPayload,
  TLocationsPayload,
  TLocationState,
  TSearchLocationsVariables,
  TSearchNearestLocationsVariables,
  TTreatmentLocationPayload,
} from "./types";

const initialState: TLocationState = {
  locations: {},
  isFetching: false,
  isFetchingSettings: false,
  error: undefined,
  favorites: [],
  defaultLocations: [],
  description: "",
  treatmentLocation: {} as TLocation,
  addresses: [],
  nearestLocations: [],
};

const slice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    updateLocation: (state, { payload }: TLocationPayload) => {
      state.error = undefined;
    },
    updateLocationsList: (state, { payload }: TLocationsPayload) => {
      state.error = undefined;
      forEach(payload.locations, (location) => {
        state.locations[location.locationId] = location;
      });
    },
    updateLocationsFailure: (state, { payload: { error } }: TErrorPayload) => {
      state.error = error;
    },
    resetLocations: () => initialState,
    startLocationsFetching: (state) => {
      state.isFetching = true;
      state.error = undefined;
    },
    endLocationsFetching: (state) => {
      state.isFetching = false;
    },
    startTracksFetching: (state) => {
      state.isFetching = true;
      state.error = undefined;
    },
    endTracksFetching: (state) => {
      state.isFetching = false;
    },
    updateDefaultLocations: (
      state,
      { payload: { locations } }: TLocationsPayload
    ) => {
      state.error = undefined;
      state.defaultLocations = locations;
    },
    updateNearestLocations: (
      state,
      { payload: { locations } }: TLocationsPayload
    ) => {
      state.error = undefined;
      state.nearestLocations = locations;
    },
    updateDescription: (state, { payload: { text } }: TDescriptionPayload) => {
      state.description = text;
    },
    setTreatmentLocation: (
      state,
      { payload: { location } }: TTreatmentLocationPayload
    ) => {
      state.treatmentLocation = location;
    },
    resetTracks: () => initialState,
    updateAddresses: (state, { payload: { addresses } }: TAddressesPayload) => {
      state.addresses = addresses || [];
    },
    addToFavorites: (state, { payload: { location } }: TLocationPayload) => {
      state.favorites = _.chain(state.favorites)
        .filter((l) => l.locationId !== location.locationId)
        .unshift(location)
        .value();
    },
    updateFavorites: (state, { payload: { favorites } }: TFavoritesPayload) => {
      state.favorites = favorites;
    },
    startSettingsFetching: (state) => {
      state.isFetchingSettings = true;
    },
    endSettingsFetching: (state) => {
      state.isFetchingSettings = false;
    },
  },
});

// ACTIONS
export const syncLocations = createAction<{
  locations: string[];
}>(TLocationsActions.LOCATIONS_SYNC);

export const searchLocationsById = createAction<{
  locationId: string;
}>(TLocationsActions.LOCATIONS_REQUEST_BY_ID);

export const searchLocations = createAction<TSearchLocationsVariables>(
  TLocationsActions.LOCATIONS_REQUEST_SEND
);

export const searchAddresses = createAction<TSearchLocationsVariables>(
  TLocationsActions.ADDRESS_REQUEST_SEND
);

export const searchNearestLocations =
  createAction<TSearchNearestLocationsVariables>(
    TLocationsActions.LOCATIONS_NEAREST_REQUEST
  );
export const addToUserSettings = createAction<TAddToUserSettingsVariables>(
  TLocationsActions.ADD_TO_USER_SETTINGS_REQUEST_SEND
);

export const fetchUserSettingsSettings = createAction(
  TLocationsActions.USER_SETTINGS_REQUEST_SEND
);

export const {
  updateLocation,
  updateLocationsFailure,
  resetLocations,
  startLocationsFetching,
  endLocationsFetching,
  updateLocationsList,
  startTracksFetching,
  endTracksFetching,
  updateDefaultLocations,
  updateDescription,
  setTreatmentLocation,
  updateAddresses,
  addToFavorites,
  updateFavorites,
  resetTracks,
  updateNearestLocations,
  startSettingsFetching,
  endSettingsFetching,
} = slice.actions;

// REDUCER
export default slice.reducer;
