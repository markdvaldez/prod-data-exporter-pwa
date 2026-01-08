import { createAction, createSlice } from "@reduxjs/toolkit";
import { forEach } from "lodash";
import { TRunnersResultActions } from "./sagaActions";
import { TRunnersResultPayload, TRunnersResultState, TSearchRunnersResultVariables } from "./types";

const initialState: TRunnersResultState = {
  isFetching: false,
  error: undefined,
  runnersResult: {},
};

const slice = createSlice({
  name: "runnersResult",
  initialState,
  reducers: {
    resetRunnersResult: () => initialState,
    startRunnersResultFetching: (state) => {
      state.isFetching = true;
      state.error = undefined;
    },
    endRunnersResultFetching: (state) => {
      state.isFetching = false;
    },
    updateRunnersResultList: (state, { payload }: TRunnersResultPayload) => {
      state.error = undefined;
      forEach(payload.runnersResult, (runnersResult) => {
        state.runnersResult[runnersResult.id] = runnersResult;
      });
    },
  },
});

// ACTIONS
export const searchPersonsAction = createAction<TSearchRunnersResultVariables>(
  TRunnersResultActions.RUNNERSRESULT_SEARCH
);

export const {
  resetRunnersResult,
  startRunnersResultFetching,
  endRunnersResultFetching,
  updateRunnersResultList,
} = slice.actions;

// REDUCER
export default slice.reducer;
