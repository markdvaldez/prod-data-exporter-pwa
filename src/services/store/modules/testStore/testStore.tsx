import { configureStore } from "@reduxjs/toolkit";
import { RootState } from "../..";
import rootReducer from "../../rootReducer";

export const createTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
