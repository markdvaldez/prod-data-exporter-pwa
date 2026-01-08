import { logUserResponseFn } from "@/services/api/modules/frontEndNotification/logUserResponse";
import { logUserShowFn } from "@/services/api/modules/frontEndNotification/logUserShow";
import { SagaIterator } from "redux-saga";
import { all, call, takeEvery } from "redux-saga/effects";
import { TFrontendnotificationActions as a } from "./sagaActions";
import { TLogResponseAction, TLogShowAction } from "./types";

function* logResponseSaga(action: TLogResponseAction): SagaIterator {
  try {
    const { payload } = action;
    const data: any = yield call(logUserResponseFn, payload);
    console.log("logResponseSaga success:", data);
  } catch (e: any) {
    console.log("logResponseSaga error:", e);
  }
}

function* logShowSaga(action: TLogShowAction): SagaIterator {
  try {
    const { payload } = action;
    const data: any = yield call(logUserShowFn, payload);
    console.log("logResponseSaga success:", data);
  } catch (e: any) {
    console.log("logResponseSaga error:", e);
  }
}

export function* frontEndNotificationSaga() {
  yield all([
    takeEvery(a.LOG_USER_RESPONSE_REQUEST, logResponseSaga),
    takeEvery(a.LOG_USER_SHOW_REQUEST, logShowSaga),
  ]);
}
