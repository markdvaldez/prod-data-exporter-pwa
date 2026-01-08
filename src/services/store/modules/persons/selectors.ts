import { createDraftSafeSelector } from "@reduxjs/toolkit";
import _, { isEmpty } from "lodash";
import { RootState } from "../..";

export const selectPersons = (state: RootState) => state.persons.persons;
export const selectIsFetching = (state: RootState) => state.persons.isFetching;
export const selectFetchError = (state: RootState) => state.persons.error;
export const selectPersonsList = createDraftSafeSelector(
  selectPersons,
  (personsMap) => {
    if (isEmpty(personsMap)) {
      return [];
    }

    return _.chain(personsMap).values().value();
  }
);
