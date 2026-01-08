import { createAction, createSlice } from "@reduxjs/toolkit";
import { forEach } from "lodash";
import { TPersonsActions } from "./sagaActions";
import { TPersonPayload, TPersonState, TSearchPersonsVariables } from "./types";

const initialState: TPersonState = {
  isFetching: false,
  error: undefined,
  persons: {},
};

const slice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    resetPersons: () => initialState,
    startPersonsFetching: (state) => {
      state.isFetching = true;
      state.error = undefined;
    },
    endPersonsFetching: (state) => {
      state.isFetching = false;
    },
    updatePersonsList: (state, { payload }: TPersonPayload) => {
      state.error = undefined;
      forEach(payload.persons, (person) => {
        state.persons[person.hisaPersonId] = person;
      });
    },
  },
});

// ACTIONS
export const searchPersonsAction = createAction<TSearchPersonsVariables>(
  TPersonsActions.PERSONS_SEARCH
);

export const {
  resetPersons,
  startPersonsFetching,
  endPersonsFetching,
  updatePersonsList,
} = slice.actions;

// REDUCER
export default slice.reducer;
