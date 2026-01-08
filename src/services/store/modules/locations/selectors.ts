import { createDraftSafeSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../..";

export const selectLocations = (state: RootState) => state.locations.locations;
export const selectIsFetching = (state: RootState) =>
  state.locations.isFetching;
export const selectFetchError = (state: RootState) => state.locations.error;
export const selectLocationsList = createDraftSafeSelector(
  selectLocations,
  (locationsMap) => {
    if (_.isEmpty(locationsMap)) {
      return [];
    }

    return _.chain(locationsMap).values().value();
  }
);
export const selectDefaultLocations = (state: RootState) =>
  state.locations.defaultLocations;

export const selectLocationDescription = (state: RootState) =>
  state.locations.description;

export const selectAddresses = (state: RootState) => state.locations.addresses;

export const selectTreatmentLocation = (state: RootState) =>
  state.locations.treatmentLocation;

export const selectFavoriteLocations = (state: RootState) =>
  state.locations.favorites;

export const selectNearestLocations = (state: RootState) =>
  state.locations.nearestLocations;
