import { NextStep } from "@/Types";
import { AuthPermissions, PersonResponse } from "@/Types/global-types";
import { RequestErrorType } from "@/utils/errors";
import { AuthUser } from "@aws-amplify/auth/";
import { TAuthSagaActions } from "./sagaActions";

export interface AuthState {
  username: string;
  hisaPersonId: string;
  permissions?: AuthPermissions;
  userData?: PersonResponse;
  hasAccess: boolean;
  error?: RequestErrorType;
  isFetching: boolean;
  nextStep?: NextStep;
}

export type TAuthRequestPayload = {
  username: string;
  password: string;
};

export type TUser = AuthUser | undefined;

export type TUserData = {
  username?: string;
  name?: string;
  hisaPersonId?: string;
  password?: string;
};

export type THisaPersonIdPayload = {
  payload: {
    hisaPersonId: string;
  };
};

export type TUserPermissionsPayload = {
  payload: {
    permissions?: AuthPermissions;
    hasAccess?: boolean;
  };
};

export type TUserDataPayload = {
  payload: {
    userData: PersonResponse;
  };
};

export type THasAccessPayload = {
  payload: {
    hasAccess: boolean;
  };
};

export type TUserPDataPayload = {
  payload: {
    permissions?: AuthPermissions;
    hasAccess: boolean;
    userData: PersonResponse;
  };
};

export type TUserDetailsPayload = {
  payload: {
    userData: PersonResponse;
  };
};

export type TGetPersonAction = {
  type: TAuthSagaActions.GET_PERSON_SEND;
  payload: { personId: string };
};

export type TNextStepPayload = {
  payload: {
    nextStep: NextStep;
  };
};
