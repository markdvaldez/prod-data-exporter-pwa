import { getUniqId } from "@/runnersQcApp/shared/UniqId";
import { addTreatmentQuery } from "@/services/api/modules/protocols/addTreatmentQuery";
import { createProtocolQuery } from "@/services/api/modules/protocols/createProtocolQuery";
import { deleteProtocolQuery } from "@/services/api/modules/protocols/deleteProtocolQuery";
import { deleteFromProtocolQuery } from "@/services/api/modules/protocols/deletFromProtocolQuery";
import { getProtocolByIdQuery } from "@/services/api/modules/protocols/getProtocolByIdQuery";
import { allProtocolQuery } from "@/services/api/modules/protocols/getProtocolsQuery";
import { updateProtocolNameQuery } from "@/services/api/modules/protocols/updateProtocolNameQuery";
import { updateTreatmentTemplate } from "@/services/api/modules/protocols/updateTreatmentTemplate";
import { TreatmentProtocol } from "@/services/gql/graphql";
import {
  TreatmentProtocolCreateRequest,
  TreatmentProtocolResponse,
  TreatmentTemplateResponse,
} from "@/Types";
import { toast } from "@/ui-kit/hooks/useToast";
import { extractError } from "@/utils/errors";
import _ from "lodash";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  addProtocol,
  deleteProtocol,
  endAddingTreatment,
  endProtocolsFetching,
  getProtocolByIdAction,
  saveProtocols,
  startAddingTreatment,
  startProtocolsFetching,
  updateProtocols,
} from ".";
import { selectHisaPersonId } from "../auth/selectors";
import { logErrorAction } from "../logger";
import { mapProtocol, mapProtocols } from "./helpers";
import { TreatmentProtocolsActions as a } from "./sagaActions";
import { selectProtocols, selectProtocolsByUserId } from "./selectors";
import {
  TAddToProtocolAction,
  TCreateProtocolAction,
  TDeleteFromProtocolAction,
  TDeleteProtocolAction,
  TGetProtocolByIdAction,
  TUpdateProtocolNameAction,
  TUpdateTreatmentTemplateAction,
} from "./types";

export function* createProtocolSaga(action: TCreateProtocolAction) {
  const currentProtocols: TreatmentProtocolCreateRequest[] = yield select(
    selectProtocolsByUserId
  );

  const {
    payload: { protocolName, treatments, personId, isPublic },
  } = action;

  const treatmentProtocolId = getUniqId();

  try {
    const variables: TreatmentProtocolCreateRequest = {
      personId: personId,
      treatments: treatments || [],
      isPublic: isPublic,
      protocolName: protocolName,
    };

    yield put(
      addProtocol({
        protocol: {
          ...variables,
          treatmentProtocolId: treatmentProtocolId,
          protocolName: protocolName || "",
        },
      })
    );
    const data: TreatmentProtocolResponse = yield call(
      createProtocolQuery,
      variables
    );
    if (data) {
      yield put(updateProtocols({ protocol: data, treatmentProtocolId }));
      yield call(toast, {
        title: "Protocol successfully created",
        variant: "default",
      });
    }
  } catch (e) {
    const error = extractError(e);
    const queryError = extractError(error);

    yield call(toast, {
      title: queryError.message,
      variant: "destructive",
    });
    yield put(deleteProtocol({ protocolId: treatmentProtocolId }));
    yield put(
      logErrorAction({
        ...queryError,
        detail: JSON.stringify(action?.payload ?? {}),
      })
    );
  }
}

function* addToProtocolSaga(action: TAddToProtocolAction) {
  const {
    payload: { protocolId, treatment },
  } = action;
  const currentProtocols: TreatmentProtocolResponse[] = yield select(
    selectProtocols
  );
  const currentProtocol = _.find(currentProtocols, {
    treatmentProtocolId: protocolId,
  });
  try {
    yield put(startAddingTreatment());

    const data: TreatmentTemplateResponse = yield call(addTreatmentQuery, {
      protocolId: protocolId,
      data: treatment,
    });
    if (data) {
      yield put(getProtocolByIdAction({ id: protocolId }));
      yield call(toast, {
        title: "Protocol successfully updated",
        variant: "default",
      });
      yield put(endAddingTreatment());
    }
  } catch (e) {
    yield put(endAddingTreatment());
    if (currentProtocol) {
      yield put(
        updateProtocols({
          protocol: currentProtocol,
          treatmentProtocolId: protocolId,
        })
      );
    }
    const error = extractError(e);
    const queryError = extractError(error);

    yield call(toast, {
      title: queryError.message,
      variant: "destructive",
    });
    yield put(
      logErrorAction({
        ...queryError,
        detail: JSON.stringify(action?.payload ?? {}),
      })
    );
  }
}

export function* getAllProtocolsSaga() {
  try {
    yield put(startProtocolsFetching());
    const personId: string = yield select(selectHisaPersonId);

    const data: TreatmentProtocol[] = yield call(allProtocolQuery, personId);

    if (data) {
      const mappedData: TreatmentProtocolResponse[] = yield call(
        mapProtocols,
        data
      );

      yield put(saveProtocols({ protocols: mappedData.reverse() }));
    }
    yield put(endProtocolsFetching());
  } catch (e) {
    const error = extractError(e);
  } finally {
    yield put(endProtocolsFetching());
  }
}

function* deleteProtocolSaga(action: TDeleteProtocolAction) {
  try {
    const {
      payload: { protocolId },
    } = action;

    yield call(deleteProtocolQuery, {
      protocolId: protocolId,
    });
    yield call(getAllProtocolsSaga);

    yield call(toast, {
      title: "Protocol was successfully deleted",
      variant: "default",
    });
  } catch (e) {
    const error = extractError(e);
    const queryError = extractError(error);

    yield call(toast, {
      title: queryError.message,
      variant: "destructive",
    });
  }
}

function* deleteFromProtocolSaga(action: TDeleteFromProtocolAction) {
  try {
    const { payload } = action;

    yield call(deleteFromProtocolQuery, payload);
    yield put(getProtocolByIdAction({ id: payload.protocolId }));

    yield call(toast, {
      title: "Treatment was successfully deleted",
      variant: "default",
    });
  } catch (e) {
    const error = extractError(e);
    const queryError = extractError(error);

    yield call(toast, {
      title: queryError.message,
      variant: "destructive",
    });
  }
}

function* updateTreatmentTemplateSaga(action: TUpdateTreatmentTemplateAction) {
  const { payload } = action;
  const currentProtocols: TreatmentProtocolResponse[] = yield select(
    selectProtocols
  );
  const currentProtocol = _.find(currentProtocols, {
    treatmentProtocolId: payload.protocolId,
  });

  try {
    yield call(updateTreatmentTemplate, payload);
    yield put(getProtocolByIdAction({ id: payload.protocolId }));

    yield call(toast, {
      title: "Treatment was successfully updated",
      variant: "default",
    });
  } catch (e) {
    if (currentProtocol) {
      yield put(
        updateProtocols({
          protocol: currentProtocol,
          treatmentProtocolId: payload.protocolId,
        })
      );
    }

    const error = extractError(e);
    const queryError = extractError(error);

    yield call(toast, {
      title: queryError.message,
      variant: "destructive",
    });
    yield put(
      logErrorAction({
        ...queryError,
        detail: JSON.stringify(action?.payload ?? {}),
      })
    );
  }
}

function* getProtocolByIdSaga(action: TGetProtocolByIdAction) {
  try {
    const { payload } = action;

    const data: TreatmentProtocol = yield call(getProtocolByIdQuery, payload);
    if (data) {
      const newProtocol: TreatmentProtocolResponse = yield call(
        mapProtocol,
        data
      );
      yield put(
        updateProtocols({
          protocol: newProtocol,
          treatmentProtocolId: data.externalTreatmentProtocolId,
        })
      );
    }
  } catch (e) {
    const error = extractError(e);
    const queryError = extractError(error);

    yield call(toast, {
      title: queryError.message,
      variant: "destructive",
    });
  }
}

function* updateProtocolNameSaga(action: TUpdateProtocolNameAction) {
  try {
    const { payload } = action;

    const data: TreatmentProtocolResponse = yield call(
      updateProtocolNameQuery,
      payload
    );
    if (data) {
      const newProtocol: TreatmentProtocolResponse = yield call(
        mapProtocol,
        data
      );
      yield put(
        updateProtocols({
          protocol: newProtocol,
          treatmentProtocolId: data.treatmentProtocolId || "",
        })
      );
      yield call(toast, {
        title: "Protocol's name was successfully updated",
        variant: "default",
      });
    }
  } catch (e) {
    const error = extractError(e);
    const queryError = extractError(error);

    yield call(toast, {
      title: queryError.message,
      variant: "destructive",
    });

    yield put(
      logErrorAction({
        ...queryError,
        detail: JSON.stringify(action?.payload ?? {}),
      })
    );
  }
}

export function* protocolsSaga() {
  yield all([
    takeLatest(a.CREATE_PROTOCOL, createProtocolSaga),
    takeLatest(a.GET_ALL_PROTOCOLS, getAllProtocolsSaga),
    takeEvery(a.ADD_TO_PROTOCOL, addToProtocolSaga),
    takeEvery(a.DELETE_PROTOCOL, deleteProtocolSaga),
    takeEvery(a.DELETE_FROM_PROTOCOL, deleteFromProtocolSaga),
    takeEvery(a.UPDATE_TREATMENT_TEMPLATE, updateTreatmentTemplateSaga),
    takeEvery(a.GET_PROTOCOL_BY_ID, getProtocolByIdSaga),
    takeLatest(a.UPDATE_PROTOCOL_NAME, updateProtocolNameSaga),
  ]);
}
