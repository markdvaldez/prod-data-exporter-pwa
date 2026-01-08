import { RootState } from "../..";

export const selectIsConnected = (state: RootState) =>
  !!state.netInfo.isConnected;
