import { createSlice } from "@reduxjs/toolkit";
import { TConnectionStatusPayload, TNetInfoState } from "./types";

const initialState: TNetInfoState = {
  isConnected: null,
};

const slice = createSlice({
  name: "netInfo",
  initialState,
  reducers: {
    changeNetworkStatus: (
      state,
      { payload: { isConnected } }: TConnectionStatusPayload
    ) => {
      state.isConnected = isConnected;
    },
  },
});

// ACTIONS
export const { changeNetworkStatus } = slice.actions;

// REDUCER
export default slice.reducer;
