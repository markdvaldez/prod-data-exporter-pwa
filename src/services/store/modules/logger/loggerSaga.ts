import { AppConfig, getConfig } from "@/services/appConfig";
import { logError } from "@/services/pwa/utils";
import { all, call, takeEvery, takeLatest } from "redux-saga/effects";
import { changeUser } from "../auth";
import { TUserDataPayload } from "../auth/types";
import { TLoggerSagaActions } from "./sagaActions";
import {
  TLogEventAction,
  TLogRequestAction,
  TLogRequestErrorAction,
  TLogResponseAction,
  TLogScreenAction,
} from "./types";

export function* logRequestSaga(action: TLogRequestAction) {
  try {
    // console.log("DEBUG ==> logRequestSaga", action.payload);
  } catch (e: any) {}
}

export function* logResponseSaga(action: TLogResponseAction) {
  try {
    // console.log("DEBUG ==> logResponseSaga", action.payload);
  } catch (e: any) {}
}

export function* logErrorSaga(action: TLogRequestErrorAction) {
  try {
    const appConfig: AppConfig = yield call(getConfig);
    if (appConfig?.useAnalytics) {
      // yield call(analytics.logError, action.payload);
    }
    yield call(logError, action.payload);
  } catch (e: any) {}
}

export function* logScreenSaga(action: TLogScreenAction) {
  try {
    const appConfig: AppConfig = yield call(getConfig);
    if (appConfig.useAnalytics && action?.payload?.screenName) {
      // const analytics = AnalyticsService.getInstance();
      // yield call(analytics.logScreenView, action.payload.screenName);
    }
  } catch (e: any) {}
}

export function* clearAnalyticsSaga() {
  try {
    const appConfig: AppConfig = yield call(getConfig);
    if (appConfig.useAnalytics) {
      // const analytics = AnalyticsService.getInstance();
      // yield call(analytics.logEvent, "logOut");
      // yield call(analytics.clear);
    }
  } catch (e: any) {}
}

export function* changeUserSaga({ payload }: TUserDataPayload) {
  try {
    const appConfig: AppConfig = yield call(getConfig);
    const hisaPersonId = payload?.userData?.hisaPersonId;
    if (appConfig.useAnalytics && hisaPersonId) {
      // const analytics = AnalyticsService.getInstance();
      // yield call(analytics.setUserId, hisaPersonId);
    }
    // yield call(dynatraceService.setUserId, hisaPersonId);
  } catch (e: any) {}
}

export function* logLogIn() {
  try {
    const appConfig: AppConfig = yield call(getConfig);
    if (appConfig.useAnalytics) {
      // const analytics = AnalyticsService.getInstance();
      // yield call(analytics.logLogin);
    }
  } catch (e: any) {}
}

export function* logEvent(action: TLogEventAction) {
  try {
    const appConfig: AppConfig = yield call(getConfig);
    const { eventName, ...data } = action?.payload || {};
    if (appConfig.useAnalytics) {
      // const analytics = AnalyticsService.getInstance();
      // yield call(analytics.logEvent, eventName, data);
      // yield call(dynatraceService.logEvent, eventName);
    }
    // yield call(dynatraceService.logEvent, eventName);
  } catch (e: any) {}
}

export function* loggerSaga() {
  yield all([
    takeEvery(TLoggerSagaActions.LOG_QUERY, logRequestSaga),
    takeEvery(TLoggerSagaActions.LOG_RESPONSE, logResponseSaga),
    takeEvery(TLoggerSagaActions.LOG_ERROR, logErrorSaga),
    takeEvery(TLoggerSagaActions.LOG_SCREEN, logScreenSaga),
    takeEvery(TLoggerSagaActions.LOG_CLEAR, clearAnalyticsSaga),
    takeEvery(TLoggerSagaActions.LOG_LOGIN, logLogIn),
    takeEvery(TLoggerSagaActions.LOG_EVENT, logEvent),
    takeLatest(changeUser, changeUserSaga),
  ]);
}
