import { getLabel } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import {
  concatenateStrings,
  createVariables,
} from "@/runnersQcApp/containers/ApplyProtocolContainer/utils";
import { getSortedRecords } from "@/runnersQcApp/containers/RecentRecordsWidget/helpers";
import { getNow, getNowDate, formatToISODate } from "@/runnersQcApp/shared/DateUtils";
import { removeSpaces } from "@/runnersQcApp/shared/TextUtils";
import {
  HorseMedicalResponseSchema,
  RecordStatusType,
  THorseMedicalRecord,
} from "@/runnersQcApp/shared/types";
import { addHorseMedicalDocumentRequest } from "@/services/api/modules/horsemedical/addDocument";
import { addDocumentAws } from "@/services/api/modules/horsemedical/addDocumentAws";
import { addHorseMedicalRequest } from "@/services/api/modules/horsemedical/addHorsemedicalQuery";
import { updateHorseMedicalApi } from "@/services/api/modules/horsemedical/editHorsemedicalQuery";
import {
  getExtendedSearch,
  TGetRecordsVariables,
} from "@/services/api/modules/horsemedical/getExtendedSearch";
import { queryClient } from "@/services/api/queryClient";
import { addDocumentAwsAmplify } from "@/services/aws/addDocumentAws";
import { offlineFileService } from "@/services/offlineFileService";
import { HorseMedicalRecType, HorseMedicalResponse } from "@/Types";
import { toast } from "@/ui-kit/hooks/useToast";
import { extractError } from "@/utils/errors";
import { isFile } from "@/utils/fileUtils";
import { ActionMetaType } from "@/utils/offline";
import _, { includes, isEmpty } from "lodash";
import { DateTime } from "luxon";
import { SagaIterator } from "redux-saga";
import {
  actionChannel,
  ActionChannelEffect,
  all,
  call,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  addHorseMedical,
  addHorseMedicalBulk,
  addRecord,
  addRecordFailure,
  deleteRecord,
  editRecordFailure,
  endRecordFetching,
  endSyncing,
  endUpload,
  startRecordFetching,
  startSyncing,
  startUpload,
  syncHorseMedical,
  updateHistoryRecord,
  updateRecordsHistory,
  uploadFileRequest,
} from ".";
import { selectHisaPersonId } from "../auth/selectors";
import { selectIsConnected } from "../netInfo/selectors";
import { addToQueueAction } from "../offlineQueue";
import { THorseMedicalActions } from "./sagaActions";
import { selectHorseMedical } from "./selectors";
import {
  TAddRecordRequestAction,
  TBulkAddByProtocolAction,
  TEditRecordAction,
  TGetRecordsByHorseAction,
  TUploadHorseMedicalAction,
} from "./types";

function* getRecordsSaga() {
  try {
    const personId: string = yield select(selectHisaPersonId);
    if (personId) {
      yield put(startSyncing());
      const from = getNow().minus({ years: 1 }).startOf("month");
      const to = getNow().plus({ days: 2 }).endOf("month");
      const months: TDateRange[] = yield call(getMonthsInRange, from, to);
      let nextRecords: HorseMedicalResponse[] | [] = [];

      for (const range of months) {
        const variables: TGetRecordsVariables = {
          personIds: [personId],
          startDate: range.startDate,
          endDate: range.endDate,
        };

        const response: HorseMedicalResponse[] | [] = yield call(() =>
          queryClient.fetchQuery({
            queryKey: [
              "personsRecords",
              personId,
              range.startDate,
              range.endDate,
            ],
            queryFn: () => getExtendedSearch(variables),
            staleTime: 10000,
          })
        );

        if (!isEmpty(response)) {
          nextRecords = [...nextRecords, ...response];
          yield delay(32);
        }
      }

      if (!isEmpty(nextRecords)) {
        const prevRecords: THorseMedicalRecord[] | [] = yield select(
          selectHorseMedical
        );
        const recordsToUpdate: THorseMedicalRecord[] = yield call(
          mapRecordsToProps,
          nextRecords,
          prevRecords
        );

        const sortedRecords: THorseMedicalRecord[] = yield call(
          getSortedRecords,
          recordsToUpdate
        );

        yield put(
          updateRecordsHistory({
            horseMedical: recordsToUpdate,
          })
        );
      }
    }
  } catch (e: any) {
    const queryError = extractError(e);
    // TODO Log  errors
  } finally {
    yield put(endSyncing());
  }
}

function* getRecordsByHorseSaga(action: TGetRecordsByHorseAction) {
  try {
    const { payload } = action;
    const { horseIds } = payload;

    yield put(startSyncing());
    const from = getNow().minus({ years: 1 }).startOf("month");
    const to = getNow().plus({ days: 2 }).endOf("month");
    const months: TDateRange[] = yield call(getMonthsInRange, from, to);
    let nextRecords: HorseMedicalResponse[] | [] = [];

    for (const range of months) {
      const variables: TGetRecordsVariables = {
        horseIds: horseIds,
        startDate: range.startDate,
        endDate: range.endDate,
      };

      const response: HorseMedicalResponse[] | [] = yield call(() =>
        queryClient.fetchQuery({
          queryKey: [
            "personsRecords",
            horseIds,
            range.startDate,
            range.endDate,
          ],
          queryFn: () => getExtendedSearch(variables),
          staleTime: 10000,
        })
      );

      if (!isEmpty(response)) {
        nextRecords = [...nextRecords, ...response];
        yield delay(32);
      }
    }

    if (!isEmpty(nextRecords)) {
      const prevRecords: THorseMedicalRecord[] | [] = yield select(
        selectHorseMedical
      );
      const recordsToUpdate: THorseMedicalRecord[] = yield call(
        mapRecordsToProps,
        nextRecords,
        prevRecords
      );
      yield put(
        updateRecordsHistory({
          horseMedical: recordsToUpdate,
        })
      );
    }
  } catch (e: any) {
    const queryError = extractError(e);
    // TODO Log  errors
  } finally {
    yield put(endSyncing());
  }
}

export function* addRecordRequestSaga(action: TAddRecordRequestAction) {
  const isConnected: boolean = yield select(selectIsConnected);

  if (isConnected) {
    yield call(handleAddRecordOnlineSaga, action);
  } else {
    yield call(handleAddRecordOfflineSaga, action);
  }
}

export function* handleAddRecordOnlineSaga(
  action: TAddRecordRequestAction
): SagaIterator {
  const { payload, type } = action;
  const { variables, successMessage, errorMessage, internalId, timestamp } =
    payload;

  const personId: string = yield select(selectHisaPersonId);

  try {
    yield put(startRecordFetching());
    const data: HorseMedicalResponse = yield call(
      addHorseMedicalRequest,
      variables
    );

    if (data) {
      const nextRecord: THorseMedicalRecord = yield call(
        mapRecordToProps,
        data as THorseMedicalRecord,
        true,
        { ...variables, internalId, timestamp }
      );

      yield put(
        addRecord({
          record: nextRecord,
        })
      );
      if (data.hisaHorseMedicalId && variables.documentPaths) {
        for (const doc of variables.documentPaths) {
          yield call<any>(
            handleHorseMedicalDocumentUpload,
            data.hisaHorseMedicalId,
            doc,
            personId
          );
        }
      }

      if (
        data.hisaHorseMedicalId &&
        variables.files &&
        !_.isEmpty(variables.files)
      ) {
        for (const file of variables.files) {
          yield put(
            uploadFileRequest({
              horseMedicalId: data.hisaHorseMedicalId,
              file,
            })
          );
        }
      }
      yield call(toast, {
        title: successMessage,
        variant: "default",
      });
    }
  } catch (e: any) {
    const { data } = e.response || {};
    const queryError = extractError(data);
    const isAttendingVetError = includes(
      queryError.detail,
      "TreatingHisaPersonId must be an Attending Vet for the horse"
    );

    const isBulk = includes(type, "BULK");

    yield put(
      addRecordFailure({
        error: queryError,
      })
    );
    yield put(
      deleteRecord({ record: { ...variables, internalId, timestamp } })
    );

    const message = isBulk
      ? "Some records were uploaded successfully, but a few failed. Please review the History and try again"
      : isAttendingVetError
      ? "You must be listed as the attending veterinarian for this horse to submit this medical record"
      : errorMessage;

    yield call(toast, {
      title: message,
      variant: isBulk ? "warning" : "destructive",
      priority: 10,
    });
  } finally {
    yield put(endRecordFetching());
  }
}

export function* handleAddRecordOfflineSaga(action: TAddRecordRequestAction) {
  const { payload } = action;
  const {
    internalId,
    timestamp,
    isSynced,
    variables,
    errorMessage,
    successOfflineMessage,
  } = payload;
  try {
    yield put(addToQueueAction({ offlineAction: action }));

    const nextRecord: THorseMedicalRecord = yield call(
      mapRecordToProps,
      variables as THorseMedicalRecord,
      false,
      { internalId, timestamp, isSynced }
    );

    yield put(
      addRecord({
        record: nextRecord,
      })
    );

    if (variables.documentPaths) {
      for (const doc of variables.documentPaths) {
        yield call(
          [offlineFileService, offlineFileService.save as any],
          doc.name,
          doc
        );
      }
    }

    yield call(toast, {
      title: successOfflineMessage,
      variant: "default",
    });
  } catch (e: any) {
    const queryError = extractError(e);
    yield put(addRecordFailure({ error: queryError }));
    yield call(toast, {
      title: errorMessage,
      variant: "destructive",
    });
  }
}

export function* editRecordRequestSaga(action: TEditRecordAction) {
  const isConnected: boolean = yield select(selectIsConnected);
  if (isConnected) {
    yield call(handleEditRecordOnlineSaga, action);
  } else {
    yield call(handleEditRecordOfflineSaga, action);
  }
}

function* handleEditRecordOnlineSaga(action: TEditRecordAction): SagaIterator {
  const { payload } = action;
  const { errorMessage, variables } = payload;
  const personId: string = yield select(selectHisaPersonId);

  try {
    let data: HorseMedicalResponse;
    if (variables.hisaHorseMedicalId) {
      data = yield call(
        updateHorseMedicalApi,
        variables as HorseMedicalResponse
      );
    } else {
      data = yield call(addHorseMedicalRequest, variables);
    }

    if (data) {
      const nextRecord: THorseMedicalRecord = yield call(
        mapRecordToProps,
        data as THorseMedicalRecord,
        true,
        payload
      );

      yield put(
        updateHistoryRecord({
          record: nextRecord,
        })
      );

      if (variables.hisaHorseMedicalId && variables.documentPaths) {
        for (const doc of variables.documentPaths) {
          yield call(
            handleHorseMedicalDocumentUpload,
            variables.hisaHorseMedicalId,
            doc,
            personId
          );
        }
      }

      if (
        variables.hisaHorseMedicalId &&
        variables.files &&
        !_.isEmpty(variables.files)
      ) {
        for (const file of variables.files) {
          yield put(
            uploadFileRequest({
              horseMedicalId: variables.hisaHorseMedicalId,
              file,
            })
          );
        }
      }
      yield call(toast, {
        title: "Record updated!",
        variant: "default",
      });
    }
  } catch (e: any) {
    const { data } = e.response || {};
    const queryError = extractError(data);
    const isAttendingVetError = includes(
      queryError.detail,
      "TreatingHisaPersonId must be an Attending Vet for the horse"
    );

    yield put(editRecordFailure({ error: queryError }));

    const message = isAttendingVetError
      ? "You must be listed as the attending veterinarian for this horse to submit this medical record"
      : errorMessage;
    yield call(toast, {
      title: message,
      variant: "destructive",
    });
  } finally {
    yield put(endRecordFetching());
  }
}

function* handleEditRecordOfflineSaga(action: TEditRecordAction) {
  const { payload } = action;
  const { successOfflineMessage, variables } = payload;
  const { internalId, timestamp, isSynced } = variables;

  yield put(addToQueueAction({ offlineAction: action }));

  try {
    const nextRecord: THorseMedicalRecord = yield call(
      mapRecordToProps,
      variables as THorseMedicalRecord,
      false,
      { internalId: internalId || payload.internalId, timestamp, isSynced }
    );
    yield put(
      updateHistoryRecord({
        record: nextRecord,
      })
    );

    if (variables.documentPaths) {
      for (const doc of variables.documentPaths) {
        yield call(
          [offlineFileService, offlineFileService.save as any],
          doc.name,
          doc
        );
      }
    }

    yield call(toast, {
      title: successOfflineMessage,
      variant: "default",
    });
  } catch (e: any) {
    const queryError = extractError(e);
    yield put(editRecordFailure({ error: queryError }));
    yield call(toast, {
      title: extractError(e)?.message || "Server Error",
      variant: "destructive",
    });
  } finally {
    yield put(endRecordFetching());
  }
}

export function* handleHorseMedicalDocumentUpload(
  horseMedicalId: string,
  doc: any,
  personId: string
): SagaIterator {
  const documentData = yield call(addHorseMedicalDocumentRequest, {
    horseMedicalId,
    fileName: doc.name,
    personId,
  });

  if (!documentData) return;

  const originalFile = yield call(() =>
    isFile(doc?.originalFile) ? doc : offlineFileService.get(doc.name)
  );

  if (originalFile) {
    yield call(addDocumentAws, documentData, originalFile);
    yield call(() => offlineFileService.remove(doc.name));
  }
}

function* handleHorseMedicalRecords(action: TBulkAddByProtocolAction) {
  const {
    data,
    treatments,
    hisaPersonId,
    treatingHisaPersonName,
    treatingHisaPersonId,
    latLng,
    successMessage,
    successOfflineMessage,
    errorMessage,
  } = action.payload || {};

  if (!data.horses || _.isEmpty(treatments) || _.isEmpty(data.horses)) {
    return;
  }

  for (const curHorse of data.horses) {
    const {
      locationId: horseLocationId = "",
      locationName: horseLocationName,
      hisaHorseId: horseId,
      name: hisaHorseName,
      responsiblePersonHisaId: responsibleHisaPersonId,
      ownerHisaId,
      responsiblePersonName: responsibleHisaPersonName,
      ownerName: designatedOwnerName,
    } = curHorse;

    const sharedVariables = {
      horseLocationId,
      horseLocationName,
      horseId,
      hisaHorseName,
      hisaPersonId,
      date: data.date,
      time: data.time,
      latLng: latLng,
      responsibleHisaPersonId,
      ownerHisaId,
      locationId: data.treatmentLocation?.locationId,
      locationName: data.treatmentLocation?.locationName,
      responsibleHisaPersonName,
      designatedOwnerName,
    };

    for (const item of treatments) {
      const currentType =
        (item.recType as string) === "Tests and Diagnostics"
          ? HorseMedicalRecType.Test
          : removeSpaces(item.recType);
      const variables = createVariables({
        ...item,
        ...sharedVariables,
        treatingHisaPersonName: treatingHisaPersonName,
        treatingHisaPersonId: treatingHisaPersonId,
        recType: currentType,
        notes: concatenateStrings(item.notes, data.notes),
      });

      if (treatments.length === 1 && data.horses.length === 1) {
        yield put(
          addHorseMedical({
            variables,
            successMessage,
            successOfflineMessage,
            errorMessage,
          })
        );
      } else {
        yield put(
          addHorseMedicalBulk({
            variables,
            successMessage,
            successOfflineMessage,
            errorMessage,
          })
        );
      }

      yield delay(50);
    }
  }
}

function* uploadHorseMedicalFileSaga(action: TUploadHorseMedicalAction) {
  try {
    const personId: string = yield select(selectHisaPersonId);
    yield put(startUpload());
    const { horseMedicalId, file } = action.payload || {};

    const isExists = !!file;

    if (horseMedicalId && isExists) {
      const { data, error } = yield call(addHorseMedicalDocumentRequest, {
        horseMedicalId,
        fileName: file.name,
        personId,
      });

      if (data) {
        const variables = {
          fileName: file.name,
          file,
          config: data,
        };
        const { data: addDocData, error: addDocError } = yield call(
          addDocumentAwsAmplify,
          variables
        );
      }
    }
  } catch (e) {
  } finally {
    yield put(endUpload());
  }
}

export function* watchUploadFiles() {
  const requestBuffer: ActionChannelEffect = yield actionChannel(
    THorseMedicalActions.UPLOAD_FILE_REQUEST
  );
  while (true) {
    try {
      const action: TUploadHorseMedicalAction = yield take(
        requestBuffer as any
      );
      yield call(uploadHorseMedicalFileSaga, action);
    } catch (e) {}
  }
}

export function* horseMedicalSaga() {
  yield fork(watchUploadFiles);
  yield all([
    takeLatest(syncHorseMedical, getRecordsSaga),
    takeEvery(
      THorseMedicalActions.HORSE_MEDICAL_REQUEST_SEND,
      getRecordsByHorseSaga
    ),
    takeEvery(
      [
        THorseMedicalActions.ADD_RECORD_REQUEST_SEND,
        THorseMedicalActions.BULK_ADD_RECORD_REQUEST_SEND,
      ],
      addRecordRequestSaga
    ),
    takeEvery(
      THorseMedicalActions.EDIT_RECORD_REQUEST_SEND,
      editRecordRequestSaga
    ),
    takeEvery(
      THorseMedicalActions.BULK_ADD_RECORDS_BY_PROTOCOL,
      handleHorseMedicalRecords
    ),
  ]);
}

function mapRecordsToProps(
  next: HorseMedicalResponse[],
  prev: THorseMedicalRecord[]
): THorseMedicalRecord[] {
  const timestamp = getNow().toMillis();

  return _.chain(next)
    .map((item: THorseMedicalRecord) => {
      const prevItem =
        _.find(
          prev,
          (prevItem: THorseMedicalRecord) =>
            prevItem?.hisaHorseMedicalId === item?.hisaHorseMedicalId ||
            prevItem?.internalId === item?.internalId ||
            prevItem?.uuid === item?.uuid
        ) || {};

      return { ...prevItem, ...item };
    })
    .unionBy(prev as any, "hisaHorseMedicalId")
    .map((item: THorseMedicalRecord) => {
      const nextItem = {
        ...item,
        isSynced: item.isSynced ?? true,
        timestamp,
        lastUpdate:
          (item as HorseMedicalResponse)?.activity?.lastUpdate?.date || "",
        createdDate:
          (item as HorseMedicalResponse)?.activity?.created?.date || "",
        createdBy:
          (item as HorseMedicalResponse)?.activity?.created?.uuid || "",
        updatedBy:
          (item as HorseMedicalResponse)?.activity?.lastUpdate?.uuid || "",
        hisaHorseId:
          (item as HorseMedicalResponse)?.horseRecord?.hisaId ??
          item?.hisaHorseId,
        hisaHorseName:
          (item as HorseMedicalResponse)?.horseRecord?.name ??
          item?.hisaHorseName,
        responsibleHisaPersonId:
          (item as HorseMedicalResponse)?.responsibleHisaRecord?.hisaId ??
          item?.responsibleHisaPersonId,
        responsibleHisaPersonName:
          (item as HorseMedicalResponse)?.responsibleHisaRecord?.name ??
          item?.responsibleHisaPersonName,
        locationId:
          (item as HorseMedicalResponse)?.locationRecord?.hisaId ??
          item?.locationId,
        locationName:
          (item as HorseMedicalResponse)?.locationRecord?.name ??
          item?.locationName,
        horseLocationId:
          (item as HorseMedicalResponse)?.horseLocationRecord?.hisaId ??
          item?.horseLocationId,
        horseLocationName:
          (item as HorseMedicalResponse)?.horseLocationRecord?.name ??
          item?.horseLocationName,
        designatedOwnerId:
          (item as HorseMedicalResponse)?.designatedOwnerRecord?.hisaId ??
          item?.designatedOwnerId,
        designatedOwnerName:
          (item as HorseMedicalResponse)?.designatedOwnerRecord?.name ??
          item?.designatedOwnerName,
        treatingHisaPersonId:
          (item as HorseMedicalResponse)?.treatingHisaPersonRecord?.hisaId ??
          item?.treatingHisaPersonId,
        treatingHisaPersonName:
          (item as HorseMedicalResponse)?.treatingHisaPersonRecord?.name ??
          item?.treatingHisaPersonName,
        attendingVetId:
          (item as HorseMedicalResponse)?.attendingVetRecord?.hisaId ??
          item?.attendingVetId,
        attendingVetName:
          (item as HorseMedicalResponse)?.attendingVetRecord?.name ??
          item?.attendingVetName,
      };
      const prepare = HorseMedicalResponseSchema.safeParse(nextItem);
      return prepare.success ? prepare.data : nextItem;
    })
    .value() as any;
}

export function mapRecordToProps(
  record: THorseMedicalRecord,
  isSynced: boolean = false,
  prev: THorseMedicalRecord | object = {}
): HorseMedicalResponse {
  const nextItem = _.assign({}, prev, record, {
    limbTreated: getLabel(record.limbTreated),
    isSynced,
    timestamp: getNow().toMillis(),
    internalId:
      (prev as ActionMetaType)?.internalId || (record as any)?.internalId || "",
    lastUpdate:
      (record as any)?.lastUpdate ||
      (prev as any)?.lastUpdate ||
      (record as HorseMedicalResponse)?.activity?.lastUpdate?.date ||
      (prev as HorseMedicalResponse)?.activity?.lastUpdate?.date ||
      "",
    createdDate:
      (record as any)?.createdDate ||
      (prev as any)?.createdDate ||
      (record as HorseMedicalResponse)?.activity?.created?.date ||
      (prev as HorseMedicalResponse)?.activity?.created?.date ||
      "",
    createdBy: (record as HorseMedicalResponse)?.activity?.created?.uuid || "",
    updatedBy:
      (record as HorseMedicalResponse)?.activity?.lastUpdate?.uuid || "",
    hisaHorseId:
      (record as HorseMedicalResponse)?.horseRecord?.hisaId ??
      record?.hisaHorseId,
    hisaHorseName:
      (record as HorseMedicalResponse)?.horseRecord?.name ??
      record?.hisaHorseName,
    responsibleHisaPersonId:
      (record as HorseMedicalResponse)?.responsibleHisaRecord?.hisaId ??
      record?.responsibleHisaPersonId,
    responsibleHisaPersonName:
      (record as HorseMedicalResponse)?.responsibleHisaRecord?.name ??
      record?.responsibleHisaPersonName,
    locationId:
      (record as HorseMedicalResponse)?.locationRecord?.hisaId ??
      record?.locationId,
    locationName:
      (record as HorseMedicalResponse)?.locationRecord?.name ??
      _.replace(record?.locationName || "", / State/i, ""),
    horseLocationId:
      (record as HorseMedicalResponse)?.horseLocationRecord?.hisaId ??
      record?.horseLocationId,
    horseLocationName:
      (record as HorseMedicalResponse)?.horseLocationRecord?.name ??
      record?.horseLocationName,
    designatedOwnerId:
      (record as HorseMedicalResponse)?.designatedOwnerRecord?.hisaId ??
      record?.designatedOwnerId,
    designatedOwnerName:
      (record as HorseMedicalResponse)?.designatedOwnerRecord?.name ??
      record?.designatedOwnerName,
    treatingHisaPersonId:
      (record as HorseMedicalResponse)?.treatingHisaPersonRecord?.hisaId ??
      record?.treatingHisaPersonId,
    treatingHisaPersonName:
      (record as HorseMedicalResponse)?.treatingHisaPersonRecord?.name ??
      record?.treatingHisaPersonName,
    attendingVetId:
      (record as HorseMedicalResponse)?.attendingVetRecord?.hisaId ??
      record?.attendingVetId,
    attendingVetName:
      (record as HorseMedicalResponse)?.attendingVetRecord?.name ??
      record?.attendingVetName,
  });
  if (
    nextItem.recType ===
      HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection &&
    !nextItem.displayName
  ) {
    if (nextItem.clearedToRace && nextItem.clearedToWork) {
      nextItem.displayName = "Cleared To Race";
    } else if (nextItem.clearedToWork && !nextItem.clearedToRace) {
      nextItem.displayName = "Cleared To Work";
    } else {
      nextItem.displayName = "Not Cleared";
    }
  }
  const prepare = HorseMedicalResponseSchema.safeParse(nextItem);

  return (prepare.success ? prepare.data : nextItem) as HorseMedicalResponse;
}

export function mapEditRecordToProps(
  record: THorseMedicalRecord,
  isSynced: boolean = false,
  prev: HorseMedicalResponse | object = {}
): THorseMedicalRecord {
  const lastUpdate = validateDate(record?.lastUpdate)
    ? record.lastUpdate
    : getNowDate();
  return _.assign({}, prev, record, {
    locationName: _.replace(record?.locationName || "", / State/i, ""),
    limbTreated: getLabel(record.limbTreated),
    isSynced,
    timestamp: getNow().toMillis(),
    lastUpdate,
  });
}

function mapListToProps(next: THorseMedicalRecord[]): THorseMedicalRecord[] {
  return _.chain(next)
    .filter(
      (item) =>
        item.treatingHisaPersonId !== null || item.designatedOwnerId !== null
    )
    .map((item: THorseMedicalRecord) => {
      return {
        ...item,
        isSynced: true,
        id: item?.hisaHorseMedicalId || "",
        status: RecordStatusType.IS_SYNCED,
      };
    })
    .value() as any;
}

type TDateRange = {
  startDate: string;
  endDate: string;
};

function getMonthsInRange(from: DateTime, to: DateTime): TDateRange[] {
  let months: TDateRange[] = [];
  let current = from;
  let next = current.plus({ months: 2 });

  while (current <= to) {
    const range = {
      startDate: formatToISODate(current.startOf("month")),
      endDate: formatToISODate(next.endOf("month")),
    };
    months = [...months, range];
    current = current.plus({ months: 3 });
    next = current.plus({ months: 2 });
  }

  return months.reverse();
}

const validateDate = (date?: string) => date && date !== "0001-01-01";

export function sortRecords(allRecords: THorseMedicalRecord[]) {
  return [...allRecords].sort((a, b) => {
    const dateTimeA = DateTime.fromISO(`${a.date}T${a.time ?? "00:00:00"}`);
    const dateTimeB = DateTime.fromISO(`${b.date}T${b.time ?? "00:00:00"}`);
    return dateTimeB.toMillis() - dateTimeA.toMillis();
  });
}
