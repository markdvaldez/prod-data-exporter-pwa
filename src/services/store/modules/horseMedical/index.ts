import { THorseMedicalRecord, TMediaFile } from "@/runnersQcApp/shared/types";
import { TErrorPayload } from "@/Types";
import { createOfflineAction } from "@/utils/offline";
import { createAction, createSlice } from "@reduxjs/toolkit";
import _, { find, findIndex, merge } from "lodash";
import { THorseMedicalActions } from "./sagaActions";
import {
  TAddRecordPayload,
  TBulkAddByProtocolVariables,
  TDocumentAddPathPayload,
  TDocumentDeletePathPayload,
  TDocumentPathsPayload,
  TEditRecordPayload,
  TGetRecordsByHorsePayload,
  THorseMedicalPayload,
  THorseMedicalState,
  TRecordPayload,
} from "./types";

export const initialState: THorseMedicalState = {
  horseMedical: [],
  isFetching: false,
  isSyncing: false,
  error: undefined,
  preparedRecord: undefined,
  documentPaths: [],
  previewDocuments: undefined,
  isUploading: false,
};

const slice = createSlice({
  name: "horseMedical",
  initialState,
  reducers: {
    updateRecordsHistory: (
      state,
      { payload: { horseMedical } }: THorseMedicalPayload
    ) => {
      state.horseMedical = horseMedical;
    },
    startRecordFetching: (state) => {
      state.isFetching = true;
      state.error = undefined;
    },
    endRecordFetching: (state) => {
      state.isFetching = false;
    },
    startSyncing: (state) => {
      state.isSyncing = true;
      state.error = undefined;
    },
    endSyncing: (state) => {
      state.isSyncing = false;
    },
    updateHistoryRecord: (state, { payload: { record } }: TRecordPayload) => {
      const updatedRecord = find(
        state.horseMedical,
        (r) =>
          r.hisaHorseMedicalId === record.hisaHorseMedicalId ||
          r.uuid === record?.uuid ||
          r.internalId === record.internalId
      );

      if (updatedRecord) {
        merge(updatedRecord, record);
      }
    },
    addRecord: (state, { payload: { record } }: TRecordPayload) => {
      const index = findIndex(
        state.horseMedical,
        (r) =>
          r.hisaHorseMedicalId === record.hisaHorseMedicalId ||
          r.uuid === record?.uuid ||
          r.internalId === record.internalId
      );

      if (index !== -1) {
        state.horseMedical[index] = record;
      } else {
        state.horseMedical.unshift(record);
      }
    },
    addRecordFailure: (state, { payload: { error } }: TErrorPayload) => {
      state.error = error;
    },
    editRecordFailure: (state, { payload: { error } }: TErrorPayload) => {
      state.error = error;
    },
    deleteRecord: (state, { payload: { record } }: TRecordPayload) => {
      const index = findIndex(
        state.horseMedical,
        (r) =>
          r.hisaHorseMedicalId === record.hisaHorseMedicalId ||
          r.uuid === record?.uuid ||
          r.internalId === record.internalId
      );
      if (index !== -1) {
        state.horseMedical.splice(index, 1);
      }
    },
    resetHorsemedical: () => initialState,
    updateDocument: (
      state,
      { payload: { documents } }: TDocumentAddPathPayload
    ) => {
      state.documentPaths = documents;
    },
    deleteDocument: (
      state,
      { payload: { documents } }: TDocumentDeletePathPayload
    ) => {
      state.documentPaths = _.filter(state.documentPaths, (item) => {
        return item?.id !== documents?.id;
      });
    },
    resetDocuments: (state) => {
      state.documentPaths = [];
    },
    updatePreviewDocuments: (
      state,
      { payload: { documents } }: TDocumentPathsPayload
    ) => {
      state.previewDocuments = documents;
    },
    startUpload: (state) => {
      state.isUploading = true;
    },
    endUpload: (state) => {
      state.isUploading = false;
    },
    resetPreviewDocuments: (state) => {
      state.previewDocuments = [];
    },
  },
});

// ACTIONS
export const addHorseMedical = createOfflineAction<TAddRecordPayload>(
  THorseMedicalActions.ADD_RECORD_REQUEST_SEND
);

export const addHorseMedicalBulk = createOfflineAction<TAddRecordPayload>(
  THorseMedicalActions.BULK_ADD_RECORD_REQUEST_SEND
);

export const editHorseMedical = createOfflineAction<TEditRecordPayload>(
  THorseMedicalActions.EDIT_RECORD_REQUEST_SEND
);

export const getHorseMedical = createAction<TGetRecordsByHorsePayload>(
  THorseMedicalActions.HORSE_MEDICAL_REQUEST_SEND
);

export const syncHorseMedical = createAction(
  THorseMedicalActions.SYNC_RECORDS_REQUEST
);

export const syncHorseMedicalById = createAction<{
  record: THorseMedicalRecord;
}>(THorseMedicalActions.SYNC_RECORD_BY_ID);

export const addDocument = createAction(
  THorseMedicalActions.ADD_DOCUMENT_REQUEST
);

export const getRecordById = createAction<{ horseMedicalId: string }>(
  THorseMedicalActions.GET_RECORD_BY_ID
);

export const bulkAddRecordsByProtocol =
  createAction<TBulkAddByProtocolVariables>(
    THorseMedicalActions.BULK_ADD_RECORDS_BY_PROTOCOL
  );

export const uploadFileRequest = createOfflineAction<{
  file: TMediaFile;
  horseMedicalId: string;
}>(THorseMedicalActions.UPLOAD_FILE_REQUEST);

export const {
  startRecordFetching,
  endRecordFetching,
  updateRecordsHistory,
  startSyncing,
  endSyncing,
  updateHistoryRecord,
  addRecordFailure,
  editRecordFailure,
  deleteRecord,
  resetHorsemedical,
  updateDocument,
  deleteDocument,
  resetDocuments,
  updatePreviewDocuments,
  startUpload,
  endUpload,
  addRecord,
} = slice.actions;

// REDUCER
export default slice.reducer;
