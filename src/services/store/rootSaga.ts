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
import { horseMedicalSaga } from "./modules/horseMedical/horseMedicalSaga";
import { horsesSaga } from "./modules/horses/horsesSaga";
import { locationsSaga } from "./modules/locations/locationsSaga";
import { loggerSaga } from "./modules/logger/loggerSaga";
import { netInfoSaga } from "./modules/netInfo/netInfoSaga";
import { offlineQueueSaga } from "./modules/offlineQueue/OfflineQueueSaga";
import { personsSaga } from "./modules/persons/personsSaga";
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
    horsesSaga,
    horseMedicalSaga,
    locationsSaga,
    protocolsSaga,
    offlineQueueSaga,
    frontEndNotificationSaga,
    loggerSaga,
    personsSaga,
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
