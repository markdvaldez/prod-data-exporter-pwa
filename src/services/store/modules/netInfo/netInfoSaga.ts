import { END, EventChannel, eventChannel } from "redux-saga";
import {
  call,
  cancelled,
  put,
  select,
  StrictEffect,
  take,
} from "redux-saga/effects";
import { changeNetworkStatus } from ".";
import { selectIsConnected } from "./selectors";

export function* watchNetInfoSaga(): Generator<StrictEffect, void, any> {
  const netInfoChannel: EventChannel<{
    type: string;
    payload: any;
  }> = eventChannel((emit) => {
    if (typeof window !== "undefined" && window.addEventListener) {
      const handleConnectivityChange = () => {
        const isConnected = navigator.onLine;
        emit(changeNetworkStatus({ isConnected }));
      };

      window.addEventListener("online", handleConnectivityChange);
      window.addEventListener("offline", handleConnectivityChange);
      window.addEventListener("load", handleConnectivityChange);

      return () => {
        emit(END);
        window.removeEventListener("online", handleConnectivityChange);
        window.removeEventListener("offline", handleConnectivityChange);
      };
    }

    return () => {
      emit(END);
    };
  });

  try {
    while (true) {
      const action = yield take(netInfoChannel);
      const isConnected = yield select(selectIsConnected);
      if (action?.payload?.isConnected !== isConnected) {
        yield put(action);
      }
    }
  } finally {
    if (yield cancelled()) {
      netInfoChannel.close();
    }
  }
}

export function* netInfoSaga() {
  try {
    yield call(watchNetInfoSaga);
  } catch (e) {}
}
