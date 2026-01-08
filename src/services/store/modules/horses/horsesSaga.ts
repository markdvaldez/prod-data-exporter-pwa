import {
  CoveredHorseResponse,
  CoveredHorseSearchResponse,
} from "@/Types/global-types";
import { THorse } from "@/runnersQcApp/shared/types";
import { fetchHorsesByPerson } from "@/services/api/modules/horses/fetchHorsesByPerson";
import { fetchResponsiblePersonHorses } from "@/services/api/modules/horses/fetchHorsesByResponsiblePerson";
import { queryClient } from "@/services/api/queryClient";
import { extractError } from "@/utils/errors";
import { isEmpty } from "lodash";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  endHorsesFetching,
  getHorsesByPersonFailure,
  startHorsesFetching,
  updateHorsesList,
} from ".";
import { mapHorsesToProps } from "./helpers";
import { THorsesActions as a } from "./sagaActions";
import { TGetPersonHorsesAction } from "./types";

export function* getHorsesByPersonSaga(action: TGetPersonHorsesAction) {
  try {
    const { payload } = action;
    yield put(startHorsesFetching());
    let horsesToUpdate: THorse[] | [] = [];

    const data: CoveredHorseResponse[] = yield call(() =>
      queryClient.fetchQuery({
        queryKey: ["personHorses", payload.personId],
        queryFn: () => fetchHorsesByPerson({ personId: payload.personId }),
      })
    );

    if (data) {
      const nextHorses: THorse[] = yield call(mapHorsesToProps, data);
      horsesToUpdate = [...nextHorses];
      // yield put(updateHorsesList({ horses: nextHorses }));
    }
    const responseData: CoveredHorseSearchResponse[] = yield call(() =>
      queryClient.fetchQuery({
        queryKey: ["responseData", payload.personId],
        queryFn: () =>
          fetchResponsiblePersonHorses({ personId: payload.personId }),
      })
    );
    if (data) {
      const nextHorses: THorse[] = yield call(mapHorsesToProps, responseData);
      horsesToUpdate = [...horsesToUpdate, ...nextHorses];
    }
    if (!isEmpty(horsesToUpdate)) {
      yield put(updateHorsesList({ horses: horsesToUpdate }));
    }
  } catch (e) {
    const error = extractError(e);
    yield put(getHorsesByPersonFailure({ error }));
  } finally {
    yield put(endHorsesFetching());
  }
}

export function* horsesSaga() {
  yield all([
    takeLatest(a.GET_HORSE_BY_PERSON_REQUEST_SEND, getHorsesByPersonSaga),
  ]);
}
