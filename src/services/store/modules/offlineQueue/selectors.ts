import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../..";

export const selectActionsQueue = (state: RootState) =>
  state.offlineQueue.actionsQueue;
export const selectLastUpdated = (state: RootState) =>
  state.offlineQueue.lastUpdated;
export const selectIsDataSynced = (state: RootState) =>
  _.isEmpty(state.offlineQueue.actionsQueue);
export const selectIsQueueSyncing = (state: RootState) =>
  state.offlineQueue.isSyncing;
export const selectOfflineRecords = createDraftSafeSelector(
  selectActionsQueue,
  (actionsQueue) => {
    return _.chain(actionsQueue)
      .map((action) => action?.payload?.variables)
      .compact()
      .value() as THorseMedicalRecord[];
  }
);
