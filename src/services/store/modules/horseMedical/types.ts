import {
  TFormByProtocolData,
  THorseMedicalRecord,
  TMediaFile,
} from "@/runnersQcApp/shared/types";
import { TreatmentTemplateModel } from "@/Types";
import { RequestErrorType } from "@/utils/errors";
import { ActionMetaType } from "@/utils/offline";
import { THorseMedicalActions } from "./sagaActions";

export type TDocumentAddPathPayload = {
  payload: {
    documents: { path: string; id: string; name: string; type: string }[];
  };
};
export type TDocumentDeletePathPayload = {
  payload: {
    documents: { path: string; id: string; name: string; type: string };
  };
};

export interface THorseMedicalState {
  horseMedical: THorseMedicalRecord[];
  isFetching: boolean;
  isSyncing: boolean;
  previewDocuments?: TMediaFile[];
  error?: RequestErrorType;
  preparedRecord?: THorseMedicalRecord;
  isUploading: boolean;
  documentPaths?: { path: string; id: string; name: string; type: string }[];
}

export type THorseMedicalPayload = {
  payload: { horseMedical: THorseMedicalRecord[] };
};

export type TGetHorseMedicalVariables = {
  horseId: string;
  _startDate?: string;
  _endDate?: string;
};

export type TAddDocumentVariables = {
  horseMedicalId: string;
  fileName: string;
  personId: string;
};

export type TGetDocumentsVariables = {
  horseMedicalId: string;
};

export type TGetHorseMedicalAction = {
  type: THorseMedicalActions.HORSE_MEDICAL_REQUEST_SEND;
  payload: TGetHorseMedicalVariables;
};

export type TAddRecordPayload = Partial<ActionMetaType> & {
  variables: THorseMedicalRecord;
  successMessage: string;
  errorMessage: string;
  successOfflineMessage: string;
};

export type TEditRecordPayload = {
  variables: THorseMedicalRecord;
  successMessage: string;
  errorMessage: string;
  successOfflineMessage: string;
  internalId?: string | null;
};

export type TAddRecordRequestAction = {
  type: THorseMedicalActions.ADD_RECORD_REQUEST_SEND;
  payload: TAddRecordPayload;
};

export type TRecordPayload = {
  payload: { record: THorseMedicalRecord };
};

export type TEditRecordAction = {
  type: THorseMedicalActions.EDIT_RECORD_REQUEST_SEND;
  payload: TEditRecordPayload;
};

export type TGetRecordByIdAction = {
  type: THorseMedicalActions.GET_RECORD_BY_ID_SEND;
  payload: { horseMedicalId: string };
};

export type TBulkAddByProtocolVariables = {
  data: TFormByProtocolData;
  treatments: TreatmentTemplateModel[];
  hisaPersonId: string;
  treatingHisaPersonId?: string;
  treatingHisaPersonName?: string;
  latLng?: string;
  successMessage: string;
  successOfflineMessage: string;
  errorMessage: string;
};

export type TBulkAddByProtocolAction = {
  type: THorseMedicalActions.BULK_ADD_RECORDS_BY_PROTOCOL;
  payload: TBulkAddByProtocolVariables;
};

export type TDocumentPathsPayload = {
  payload: { documents: TMediaFile[] };
};

export type TUploadHorseMedicalAction = {
  type: THorseMedicalActions.UPLOAD_FILE_REQUEST;
  payload: {
    file: TMediaFile;
    horseMedicalId: string;
  };
};

export type TGetRecordsByHorsePayload = {
  horseIds: string[];
};

export type TGetRecordsByHorseAction = {
  type: THorseMedicalActions.GET_RECORDS_BY_HORSE_SEND;
  payload: TGetRecordsByHorsePayload;
};
