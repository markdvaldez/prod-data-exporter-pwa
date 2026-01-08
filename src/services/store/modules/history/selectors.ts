import { RootState } from "../..";

export const selectHistoryDateFrom = (state: RootState) => state.history.dateFrom;
export const selectHistoryDateTo = (state: RootState) => state.history.dateTo;
export const selectHistoryRecTypes = (state: RootState) => state.history.recTypes;
export const selectHistoryKeepFilters = (state: RootState) => state.history.keepFilters;