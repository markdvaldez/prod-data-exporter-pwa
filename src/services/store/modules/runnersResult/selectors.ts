import { createDraftSafeSelector } from "@reduxjs/toolkit";
import _, { isEmpty } from "lodash";
import { RootState } from "../..";

export const selectRunnersResult = (state: RootState) => state.runnersResult.runnersResult;
export const selectIsFetching = (state: RootState) => state.runnersResult.isFetching;
export const selectFetchError = (state: RootState) => state.runnersResult.error;
export const selectRunnersResultList = createDraftSafeSelector(
  selectRunnersResult,
  (runnersResultMap) => {
    if (isEmpty(runnersResultMap)) {
      return [];
    }

    return _.chain(runnersResultMap).values().value();
  }
);
