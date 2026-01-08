import { getNow, formatToISODate } from "@/runnersQcApp/shared/DateUtils";
import { createSlice } from "@reduxjs/toolkit";
import { HistoryState } from "./types";

const today = formatToISODate(getNow());
const defaultFrom = formatToISODate(getNow().minus({ years: 1 }));

const initialState: HistoryState = {
  dateFrom: defaultFrom,
  dateTo: today,
  recTypes: [],
  keepFilters: false,
};

const slice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const { dateFrom, dateTo, recTypes } = action.payload;
      state.dateFrom = dateFrom;
      state.dateTo = dateTo;
      state.recTypes = recTypes;
    },
    resetFilters: (state) => {
      state.dateFrom = defaultFrom;
      state.dateTo = today;
      state.recTypes = [];
    },
    setKeepFilters: (state) => {
      state.keepFilters = true;
    },
    clearKeepFilters: (state) => {
      state.keepFilters = false;
    },
  },
});

export const { setFilters, resetFilters, setKeepFilters, clearKeepFilters } =
  slice.actions;
export default slice.reducer;
