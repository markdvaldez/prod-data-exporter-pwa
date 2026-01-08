import { TOfflineAction } from "@/utils/offline";

export interface TOfflineQueueState {
  actionsQueue: TOfflineAction[];
  lastUpdated: number;
  isSyncing: boolean;
}

export type TOfflineActionPayload = {
  payload: { offlineAction: TOfflineAction };
};

export type TDeleteActionPayload = {
  payload: { internalId?: string };
};
