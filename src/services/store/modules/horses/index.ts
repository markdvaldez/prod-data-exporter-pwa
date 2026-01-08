import { THorse } from "@/runnersQcApp/shared/types";
import { createAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { THorsesActions } from "./sagaActions";
import {
  TErrorPayload,
  TGetPersonHorsesVariables,
  THorsePayload,
  THorsesPayload,
  THorsesState,
} from "./types";

const initialState: THorsesState = {
  horses: {},
  searchHorses: {},
  isSearching: false,
  isFetching: false,
  error: undefined,
  horse: undefined,
  selectedHorses: [],
};

const slice = createSlice({
  name: "horses",
  initialState,
  reducers: {
    // updateHorses: (state, { payload }: THorsesPayload) => {},
    updateHorsesList: (state, { payload }: THorsesPayload) => {
      state.horses = _.keyBy(payload.horses, "hisaHorseId");
    },
    getHorsesByPersonFailure: (
      state,
      { payload: { error } }: TErrorPayload
    ) => {
      state.error = error;
    },
    searchHorsesFailure: (state, { payload: { error } }: TErrorPayload) => {
      state.error = error;
    },
    startHorsesSearching: (state) => {
      state.isSearching = true;
      state.error = undefined;
    },
    endHorsesSearching: (state) => {
      state.isSearching = false;
    },
    resetSearch: (state) => {
      state.error = undefined;
      state.searchHorses = {};
    },
    getHorseById: (state, { payload: { horse } }: THorsePayload) => {
      state.horse = horse;
    },
    startHorseFetching: (state) => {
      state.isFetching = true;
      state.error = undefined;
    },
    endHorseFetching: (state) => {
      state.isFetching = false;
    },
    startHorsesFetching: (state) => {
      state.isSearching = true;
      state.error = undefined;
    },
    endHorsesFetching: (state) => {
      state.isSearching = false;
    },
    addSelectedHorse: (
      state,
      { payload: { horse } }: { payload: { horse: THorse } }
    ) => {
      if (
        !state.selectedHorses.some((h) => h.hisaHorseId === horse.hisaHorseId)
      ) {
        state.selectedHorses.push(horse);
      }
    },
    removeSelectedHorse: (
      state,
      { payload: { horseId } }: { payload: { horseId?: string } }
    ) => {
      state.selectedHorses = state.selectedHorses.filter(
        (h) => h.hisaHorseId !== horseId
      );
    },
    updateSearchHorseResults: (
      state,
      { payload: { horses } }: { payload: { horses: THorse[] } }
    ) => {
      state.searchHorses = {
        ...state.searchHorses,
        ..._.keyBy(horses, "hisaHorseId"), // Convert array to object with keys
      };
    },

    resetHorses: () => initialState,
  },
});

// export const searchHorses = createAction<TSearchHorsesVariables>(
//   THorsesActions.SEARCH_HORSE_REQUEST,
// );
export const getPersonHorses = createAction<TGetPersonHorsesVariables>(
  THorsesActions.GET_HORSE_BY_PERSON_REQUEST_SEND
);
// export const searchHorseById = createAction<TSearchHorseByIdVariables>(
//   THorsesActions.SEARCH_HORSE_BY_ID_REQUEST,
// );
// export const searchHorsesListById = createAction<TSearchHorsesListVariables>(
//   THorsesActions.SEARCH_HORSE_BY_IDS_REQUEST,
// );

// export const syncHorseById = createAction<{
//   hisaHorseId: string;
// }>(THorsesActions.SYNC_HORSE_BY_ID);

// ACTIONS
export const {
  // updateHorses,
  searchHorsesFailure,
  resetSearch,
  getHorseById,
  startHorseFetching,
  endHorseFetching,
  startHorsesSearching,
  endHorsesSearching,
  startHorsesFetching,
  endHorsesFetching,
  updateHorsesList,
  getHorsesByPersonFailure,
  addSelectedHorse,
  removeSelectedHorse,
  updateSearchHorseResults,
  resetHorses,
  // startSyncHorses,
  // endSyncHorses,
} = slice.actions;

// REDUCER
export default slice.reducer;
