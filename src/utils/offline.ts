import { getNow } from "@/runnersQcApp/shared/DateUtils";
import { getUniqId } from "@/runnersQcApp/shared/UniqId";
import { get, isObjectLike } from "lodash";

export type ActionMetaType = {
  internalId: string;
  queueIfOffline: boolean;
  timestamp: number;
  isSynced: boolean;
};

export type TOfflineAction = {
  type: string;
  payload: any;
  meta?: ActionMetaType;
};

export function createOfflineAction<P = void, T extends string = string>(
  type: T
) {
  return function prepare(payload: P): {
    type: T;
    payload: P;
    meta: ActionMetaType;
  } {
    const meta: ActionMetaType = {
      internalId:
        get(payload, ["internalId"]) ||
        get(payload, ["variables", "internalId"]) ||
        getUniqId(),
      queueIfOffline: true,
      isSynced: false,
      timestamp: getNow().toMillis(),
    };
    if (isObjectLike(payload)) {
      return {
        type,
        payload: {
          ...payload,
          ...meta,
        },
        meta,
      };
    }

    return {
      type,
      payload,
      meta,
    };
  };
}

export const checkAction = (action: any): boolean =>
  get(action, ["meta", "queueIfOffline"], false);
