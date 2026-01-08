export interface TNetInfoState {
  isConnected?: boolean | null;
}

export type TConnectionStatusPayload = {
  payload: { isConnected: boolean };
};
