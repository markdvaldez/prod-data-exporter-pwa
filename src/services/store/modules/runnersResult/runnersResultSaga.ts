import { searchPersonsQuery } from "@/services/api/modules/persons/searchPersonsQuery";
import { RunnersResult } from "@/Types/runners-result.types";
import { extractError } from "@/utils/errors";
import _ from "lodash";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { endRunnersResultFetching, startRunnersResultFetching, updateRunnersResultList } from ".";
import { logErrorAction } from "../logger";
import { TRunnersResultActions } from "./sagaActions";
import { TRunnersResult, TSearchRunnersResultAction } from "./types";

export function* searchRunnersResultSaga({ payload }: TSearchRunnersResultAction) {
  try {
    yield put(startRunnersResultFetching());
    const data: RunnersResult[] = yield call(
      searchPersonsQuery,
      payload
    );
    if (data) {
      console.log("data", data);
      const runnerResultList: TRunnersResult[] = yield call(mapRunnersResultToProps, data);
      yield put(updateRunnersResultList({ runnersResult: runnerResultList }));
    }
  } catch (e) {
    yield put(logErrorAction(extractError(e)));
  } finally {
    yield put(endRunnersResultFetching());
  }
}

export function* runnersResultSaga() {
  yield all([takeEvery(TRunnersResultActions.RUNNERSRESULT_SEARCH, searchRunnersResultSaga)]);
}

export const mapRunnersResultToProps = (
  data: RunnersResult[] | []
): TRunnersResult[] | [] =>
  _.chain(data)
    .compact()
    .map((item) => ({
      id: item?.id || "",
      timestamp: item?.timestamp || "",
    }))
    .value();
