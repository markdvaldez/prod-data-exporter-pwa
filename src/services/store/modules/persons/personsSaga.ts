import { searchPersonsQuery } from "@/services/api/modules/persons/searchPersonsQuery";
import { CoveredPersonAutocompleteResponse } from "@/Types/global-types";
import { extractError } from "@/utils/errors";
import _ from "lodash";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { endPersonsFetching, startPersonsFetching, updatePersonsList } from ".";
import { logErrorAction } from "../logger";
import { TPersonsActions } from "./sagaActions";
import { TPerson, TSearchPersonsAction } from "./types";

export function* searchPersonsSaga({ payload }: TSearchPersonsAction) {
  try {
    yield put(startPersonsFetching());
    const data: CoveredPersonAutocompleteResponse[] = yield call(
      searchPersonsQuery,
      payload
    );
    if (data) {
      console.log("data", data);
      const personsList: TPerson[] = yield call(mapPersonToProps, data);
      yield put(updatePersonsList({ persons: personsList }));
    }
  } catch (e) {
    yield put(logErrorAction(extractError(e)));
  } finally {
    yield put(endPersonsFetching());
  }
}

export function* personsSaga() {
  yield all([takeEvery(TPersonsActions.PERSONS_SEARCH, searchPersonsSaga)]);
}

export const mapPersonToProps = (
  data: CoveredPersonAutocompleteResponse[] | []
): TPerson[] | [] =>
  _.chain(data)
    .compact()
    .map((item) => ({
      hisaPersonId: item?.hisaPersonId || "",
      hisaPersonName: item?.name || "",
    }))
    .value();
