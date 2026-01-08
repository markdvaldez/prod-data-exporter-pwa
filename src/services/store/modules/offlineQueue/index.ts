import { getNow } from "@/runnersQcApp/shared/DateUtils";
import { TOfflineAction } from "@/utils/offline";
import { createAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { TOfflineQueueActions } from "./sagaActions";
import {
  TDeleteActionPayload,
  TOfflineActionPayload,
  TOfflineQueueState,
} from "./types";

export const initialState: TOfflineQueueState = {
  actionsQueue: [],
  lastUpdated: 0,
  isSyncing: false,
};

const slice = createSlice({
  name: "offlineQueue",
  initialState,
  reducers: {
    addAction: (
      state,
      { payload: { offlineAction } }: TOfflineActionPayload
    ) => {
      state.actionsQueue.push(offlineAction);
    },
    updateAction: (
      state,
      { payload: { offlineAction } }: TOfflineActionPayload
    ) => {
      const indexToUpdate = _.findIndex(
        state.actionsQueue,
        (item) =>
          item?.payload.internalId === offlineAction?.payload?.internalId ||
          item?.payload?.uuid === offlineAction.payload?.uuid
      );
      if (indexToUpdate !== -1) {
        state.actionsQueue[indexToUpdate] = {
          ...state.actionsQueue[indexToUpdate],
          payload: offlineAction?.payload,
          meta: offlineAction?.meta,
        };
      }
    },
    deleteAction: (
      state,
      { payload: { internalId } }: TDeleteActionPayload
    ) => {
      state.actionsQueue = _.filter(
        state.actionsQueue,
        (item) => item.payload?.internalId !== internalId
      );
    },
    updateTime: (state) => {
      state.lastUpdated = getNow().toMillis();
    },
    startQueueSyncing: (state) => {
      state.isSyncing = true;
    },
    stopQueueSyncing: (state) => {
      state.isSyncing = false;
    },
    resetQueue: () => initialState,
  },
});

// ACTIONS
export const addToQueueAction = createAction<{ offlineAction: TOfflineAction }>(
  TOfflineQueueActions.ADD_OFFLINE_ACTION
);

export const forceUpload = createAction(
  TOfflineQueueActions.FORCE_UPLOAD_ACTION
);

export const {
  addAction,
  updateAction,
  deleteAction,
  updateTime,
  resetQueue,
  startQueueSyncing,
  stopQueueSyncing,
} = slice.actions;

// REDUCER
export default slice.reducer;
