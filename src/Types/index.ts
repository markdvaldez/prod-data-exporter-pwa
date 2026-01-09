export * from "./global-types";
export * from "./transaction-log.types";
export * from "./verified-permissions";
import { RequestErrorType } from "../utils/errors";

export type { HorseMedicalResponse } from "./global-types";

export type TPerson = {
  hisaPersonId: string;
  hisaPersonName: string;
};

export type TErrorPayload = {
  payload: { error?: RequestErrorType };
};

export enum NextStep {
  SIGN_IN = "SIGN_IN",
  REQUEST_ACCESS = "REQUEST_ACCESS",
  MFA_CODE = "MFA_CODE",
  MFA_PHONE = "MFA_PHONE",
  DASHBOARD = "DASHBOARD",
}

export type TProtocol = {
  id: string;
  name: string;
  userId: string;
};

export type TMediaFile = {
  id: string;
  path: string;
  name: string;
  type: string;
  withDeleteIcon?: boolean;
};
