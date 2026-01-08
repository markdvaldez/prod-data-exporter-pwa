import { RootState } from "../..";

export const selectHorseMedicalFetching = (state: RootState) =>
  state.horseMedical.isFetching;
export const selectHorseMedicalError = (state: RootState) =>
  state.horseMedical.error;
export const selectHorseMedical = (state: RootState) =>
  state.horseMedical.horseMedical;
export const selectIsSyncing = (state: RootState) =>
  state.horseMedical.isSyncing;
export const selectDocumentPaths = (state: RootState) =>
  state.horseMedical.documentPaths;
