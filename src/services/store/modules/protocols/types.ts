import {
  TreatmentProtocolResponse,
  TreatmentTemplateCreateRequest,
  TreatmentTemplateModel,
  TreatmentTemplateRequest,
} from "@/Types";
import { RequestErrorType } from "@/utils/errors";
import { TreatmentProtocolsActions } from "./sagaActions";

export interface TProtocolsState {
  protocols: TreatmentProtocolResponse[];
  error?: RequestErrorType;
  isAddingTreatment?: boolean;
  isProtocolsFetching?: boolean;
}

export type DeleteTreatmentProtocolPayload = {
  payload: { protocolId: string };
};

export type TreatmentProtocolPayload = {
  payload: { protocol: TreatmentProtocolResponse };
};

export type SaveProtocolsPayload = {
  payload: { protocols: TreatmentProtocolResponse[] };
};

export type TCreateProtocolPayload = {
  protocolName?: string | null;
  treatments?: TreatmentTemplateRequest[] | null;
  personId?: string | null;
  isPublic?: boolean;
};

export type TCreateProtocolAction = {
  type: TreatmentProtocolsActions.CREATE_PROTOCOL;
  payload: TCreateProtocolPayload;
};

export type TUpdateProtocolPayload = {
  payload: {
    protocol: TreatmentProtocolResponse;
    treatmentProtocolId: string;
  };
};

export type TLocalProtocol = {
  treatmentTemplateId: string;
} & TreatmentTemplateRequest;

export type TEditProtocolAction = {
  type: TreatmentProtocolsActions.EDIT_PROTOCOL;
  payload: { id: string };
};

export type TAddToProtocolPayload = {
  treatment: TreatmentTemplateCreateRequest;
  protocolId: string;
};

export type TAddToProtocolAction = {
  type: TreatmentProtocolsActions.ADD_TO_PROTOCOL;
  payload: TAddToProtocolPayload;
};

export type TDeleteProtocolAction = {
  type: TreatmentProtocolsActions.DELETE_PROTOCOL;
  payload: { protocolId: string };
};

export type TDeleteFromProtocolAction = {
  type: TreatmentProtocolsActions.DELETE_FROM_PROTOCOL;
  payload: { protocolId: string; templateId: string };
};

export type TUpdateTreatmentTemplateAction = {
  type: TreatmentProtocolsActions.UPDATE_TREATMENT_TEMPLATE;
  payload: { protocolId: string; template: TreatmentTemplateModel };
};

export type TGetProtocolByIdAction = {
  type: TreatmentProtocolsActions.GET_PROTOCOL_BY_ID;
  payload: { id: string };
};

export type TUpdateProtocolNameAction = {
  type: TreatmentProtocolsActions.UPDATE_PROTOCOL_NAME;
  payload: { protocolId: string; protocolName: string };
};
