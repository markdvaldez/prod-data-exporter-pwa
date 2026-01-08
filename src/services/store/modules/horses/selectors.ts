import { THorse } from "@/runnersQcApp/shared/types";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../..";
import { selectHisaPersonId } from "../auth/selectors";
export const selectSearchHorsesMap = (state: RootState) =>
  state.horses.searchHorses;
export const selectHorsesMap = (state: RootState) => state.horses.horses;
export const selectPersonHorses = (state: RootState) =>
  state.horses.selectedHorses;
export const selectIsSearching = (state: RootState) => state.horses.isSearching;
export const selectSearchHorseById = (state: RootState) => state.horses.horse;
export const selectIsFetching = (state: RootState) => state.horses.isFetching;
export const selectError = (state: RootState) => state.horses.error;
export const selectHorsesByPerson = createDraftSafeSelector(
  selectHorsesMap,
  selectHisaPersonId,
  (horsesMap, personId) => {
    if (!personId || _.isEmpty(horsesMap)) {
      return [];
    }

    return _.chain(horsesMap)
      .values()
      .filter(
        (horse) =>
          horse.responsiblePersonHisaId === personId ||
          _.includes(horse?.attendingVet, personId)
      )
      .orderBy([(horse: THorse) => horse?.lastUpdate], ["desc"])
      .value();
  }
);
export const selectSearchHorsesResult = createDraftSafeSelector(
  selectSearchHorsesMap,
  (horsesMap) => {
    if (_.isEmpty(horsesMap)) {
      return [];
    }

    return _.chain(horsesMap).values().value();
  }
);
