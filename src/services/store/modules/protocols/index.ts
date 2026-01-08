import {
  TreatmentProtocolCreateRequest,
  TreatmentTemplateModel,
} from "@/Types";
import { createAction, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { TreatmentProtocolsActions } from "./sagaActions";
import {
  DeleteTreatmentProtocolPayload,
  SaveProtocolsPayload,
  TAddToProtocolPayload,
  TProtocolsState,
  TreatmentProtocolPayload,
  TUpdateProtocolPayload,
} from "./types";

export const initialState: TProtocolsState = {
  protocols: [],
  error: undefined,
  isAddingTreatment: false,
  isProtocolsFetching: false,
};

const slice = createSlice({
  name: "protocols",
  initialState,
  reducers: {
    saveProtocols: (
      state,
      { payload: { protocols } }: SaveProtocolsPayload
    ) => {
      state.protocols = protocols;
    },
    startAddingTreatment: (state) => {
      state.isAddingTreatment = true;
    },
    endAddingTreatment: (state) => {
      state.isAddingTreatment = false;
    },
    addProtocol: (
      state,
      { payload: { protocol } }: TreatmentProtocolPayload
    ) => {
      state.protocols.unshift(protocol);
    },
    deleteProtocol: (
      state,
      { payload: { protocolId } }: DeleteTreatmentProtocolPayload
    ) => {
      state.protocols = _.filter(
        state.protocols,
        (item) => item.treatmentProtocolId !== protocolId
      );
      state.error = undefined;
    },

    updateProtocols: (
      state,
      { payload: { protocol, treatmentProtocolId } }: TUpdateProtocolPayload
    ) => {
      const index = state.protocols.findIndex(
        (item) => item.treatmentProtocolId === treatmentProtocolId
      );

      if (index !== -1) {
        state.protocols[index] = protocol;
      }
    },

    startProtocolsFetching: (state) => {
      state.isProtocolsFetching = true;
    },
    endProtocolsFetching: (state) => {
      state.isProtocolsFetching = false;
    },
    resetProtocols: () => initialState,
  },
});

// ACTIONS
export const createProtocolAction =
  createAction<TreatmentProtocolCreateRequest>(
    TreatmentProtocolsActions.CREATE_PROTOCOL
  );

export const addToProtocolAction = createAction<TAddToProtocolPayload>(
  TreatmentProtocolsActions.ADD_TO_PROTOCOL
);

export const getAllProtocolsAction = createAction(
  TreatmentProtocolsActions.GET_ALL_PROTOCOLS
);

export const deleteProtocolsAction = createAction<{ protocolId: string }>(
  TreatmentProtocolsActions.DELETE_PROTOCOL
);

export const getProtocolByIdAction = createAction<{ id: string }>(
  TreatmentProtocolsActions.GET_PROTOCOL_BY_ID
);

export const deleteFromProtocolsAction = createAction<{
  protocolId: string;
  templateId: string;
}>(TreatmentProtocolsActions.DELETE_FROM_PROTOCOL);

export const updateTreatmentTemplateAction = createAction<{
  protocolId: string;
  template: TreatmentTemplateModel;
}>(TreatmentProtocolsActions.UPDATE_TREATMENT_TEMPLATE);

export const updateProtocolNameAction = createAction<{
  protocolId: string;
  protocolName: string;
}>(TreatmentProtocolsActions.UPDATE_PROTOCOL_NAME);

export const {
  addProtocol,
  startAddingTreatment,
  saveProtocols,
  endAddingTreatment,
  startProtocolsFetching,
  endProtocolsFetching,
  // editProtocol,
  deleteProtocol,
  resetProtocols,
  updateProtocols,
} = slice.actions;

// REDUCER
export default slice.reducer;
