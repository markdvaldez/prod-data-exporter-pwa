import {
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  spawn,
} from "redux-saga/effects";
import { authSaga } from "./modules/auth/authSaga";
import { cacheInvalidationSaga } from "./modules/cache/cacheInvalidationSaga";
import { frontEndNotificationSaga } from "./modules/frontEndNotification/FrontEndNotificationSaga";
import { loggerSaga } from "./modules/logger/loggerSaga";
import { netInfoSaga } from "./modules/netInfo/netInfoSaga";
import { protocolsSaga } from "./modules/protocols/protocolsSaga";

type TSagaFn = () =>
  | Generator<AllEffect<ForkEffect<never>>, void, unknown>
  | Generator<CallEffect<void>, void, unknown>
  | Generator<AllEffect<ForkEffect<never>> | ForkEffect<void>, void, unknown>
  | Iterator<any, any, any>;

function* rootSaga() {
  const sagas: TSagaFn[] = [
    netInfoSaga,
    authSaga,
    cacheInvalidationSaga,
    protocolsSaga,
    frontEndNotificationSaga,
    loggerSaga,
  ];

  yield* sagas.map((saga) =>
    spawn(function* sagaGuard() {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    })
  );
}

export { rootSaga };
