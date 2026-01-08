import { NextStep, TErrorPayload } from "@/Types";
import { createAction, createSlice } from "@reduxjs/toolkit";
import { TAuthSagaActions } from "./sagaActions";
import {
  AuthState,
  TAuthRequestPayload,
  THasAccessPayload,
  THisaPersonIdPayload,
  TNextStepPayload,
  TUserDataPayload,
  TUserDetailsPayload,
  TUserPDataPayload,
  TUserPermissionsPayload,
} from "./types";

export const initialState: AuthState = {
  username: "",
  hisaPersonId: "",
  permissions: undefined,
  userData: undefined,
  hasAccess: false,
  error: undefined,
  isFetching: false,
  nextStep: NextStep.SIGN_IN,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUserName: (
      state,
      { payload: { username } }: { payload: { username: string } }
    ) => {
      state.username = username || "";
    },
    changeHisaPersonId: (
      state,
      { payload: { hisaPersonId } }: THisaPersonIdPayload
    ) => {
      state.hisaPersonId = hisaPersonId || "";
    },
    changeUser: (state, { payload: { userData } }: TUserDataPayload) => {
      state.userData = userData;
    },
    changePermissions: (
      state,
      { payload: { permissions, hasAccess } }: TUserPermissionsPayload
    ) => {
      state.permissions = permissions;
      state.hasAccess = hasAccess || false;
    },
    changeHasAccess: (state, { payload: { hasAccess } }: THasAccessPayload) => {
      state.hasAccess = hasAccess;
    },
    changeUserData: (
      state,
      { payload: { permissions, hasAccess, userData } }: TUserPDataPayload
    ) => {
      state.permissions = permissions;
      state.hasAccess = hasAccess;
      state.userData = userData;
    },
    changeUserDataDetails: (
      state,
      { payload: { userData } }: TUserDetailsPayload
    ) => {
      state.userData = userData;
    },
    resetAuthStore: (state) => {
      state.username = "";
      state.hisaPersonId = "";
      state.permissions = undefined;
      state.userData = undefined;
      state.hasAccess = false;
      state.isFetching = false;
      state.error = undefined;
      state.nextStep = NextStep.SIGN_IN;
    },
    changeIsFetching: (state, { payload }: { payload: boolean }) => {
      state.isFetching = payload;
    },
    setError: (state, { payload: { error } }: TErrorPayload) => {
      state.error = error;
    },
    resetError: (state) => {
      state.error = undefined;
    },
    changeNextStep: (state, { payload: { nextStep } }: TNextStepPayload) => {
      state.nextStep = nextStep;
    },
  },
});

// ACTIONS
export const {
  changeUser,
  changeUserName,
  changeHisaPersonId,
  changePermissions,
  changeHasAccess,
  resetAuthStore,
  changeUserData,
  changeIsFetching,
  resetError,
  changeUserDataDetails,
  setError,
  changeNextStep,
} = slice.actions;

export const loginRequest = createAction<TAuthRequestPayload>(
  TAuthSagaActions.REQUEST
);

export const getPersonRequest = createAction<{ personId: string }>(
  TAuthSagaActions.GET_PERSON_SEND
);

export const restartAuth = createAction(TAuthSagaActions.RESTART_AUTH);

export const checkPermissionAction = createAction(
  TAuthSagaActions.CHECK_PERMISSION_SEND
);

export const syncDataAction = createAction(TAuthSagaActions.SYNC_DATA);

export const checkAuthData = createAction(TAuthSagaActions.CHECK_AUTH_DATA);

// REDUCER
export default slice.reducer;
