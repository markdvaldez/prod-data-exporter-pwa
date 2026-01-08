import { checkAction, TOfflineAction } from "@/utils/offline";
import _ from "lodash";
import {
  all,
  call,
  delay,
  put,
  putResolve,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  addAction,
  deleteAction,
  forceUpload,
  startQueueSyncing,
  stopQueueSyncing,
  updateAction,
} from ".";
import { changePermissions } from "../auth";
import { changeNetworkStatus } from "../netInfo";
import { selectIsConnected } from "../netInfo/selectors";
import { TConnectionStatusPayload } from "../netInfo/types";
import { TOfflineQueueActions as a } from "./sagaActions";
import { selectActionsQueue } from "./selectors";

export function* addActionSaga(action: TOfflineAction) {
  try {
    const nextAction = action.payload?.offlineAction;
    const queueIfOffline: boolean = yield call(checkAction, nextAction);
    if (queueIfOffline) {
      const currentActions: TOfflineAction[] = yield select(selectActionsQueue);
      const keysToCompare = ["uuid", "internalId", "hisaHorseMedicalId"];

      const existent = _.find(currentActions, (item) => {
        const isMatchingPayload = _.some(
          keysToCompare,
          (key) =>
            (item?.payload?.[key] &&
              nextAction?.payload?.[key] &&
              item.payload[key] === nextAction.payload[key]) ||
            (item?.payload?.variables?.[key] &&
              nextAction?.payload?.variables?.[key] &&
              item.payload.variables[key] === nextAction.payload.variables[key])
        );

        return isMatchingPayload;
      });

      if (existent) {
        yield put(updateAction({ offlineAction: nextAction }));
        return;
      }
      yield put(addAction({ offlineAction: nextAction }));
      yield put({ ...nextAction, type: `${nextAction.type}_OFFLINE` });
    }
  } catch (e: any) {}
}

export function* syncQueueSaga() {
  try {
    yield put(startQueueSyncing());
    const queueActions: TOfflineAction[] = yield select(selectActionsQueue);
    if (!_.isEmpty(queueActions)) {
      for (const action of queueActions) {
        console.log({ "queueActions action": action });
        yield putResolve(
          deleteAction({ internalId: action?.payload?.internalId })
        );
        yield put({ ...action });
        yield delay(100);
      }
    }
  } catch (e: any) {
  } finally {
    yield delay(200);
    yield put(stopQueueSyncing());
  }
}

export function* uploadQueueSaga({ payload }: TConnectionStatusPayload) {
  try {
    const isConnected: boolean = payload?.isConnected;
    const hasAccess: boolean = yield select(selectIsConnected);
    if (isConnected && hasAccess) {
      yield delay(3000);
      yield call(syncQueueSaga);
    }
  } catch (e: any) {}
}

export function* forceUploadSaga() {
  try {
    const isConnected: boolean = yield select(selectIsConnected);
    const hasAccess: boolean = yield select(selectIsConnected);
    if (isConnected && hasAccess) {
      yield call(syncQueueSaga);
    }
  } catch (e: any) {}
}

export function* offlineQueueSaga() {
  yield all([
    takeEvery(a.ADD_OFFLINE_ACTION, addActionSaga),
    takeLatest([changeNetworkStatus], uploadQueueSaga),
    takeLatest(
      [a.FORCE_UPLOAD_ACTION, changePermissions, forceUpload],
      forceUploadSaga
    ),
  ]);
}
