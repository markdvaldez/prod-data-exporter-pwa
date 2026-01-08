export * from "./global-types";
export * from "./transaction-log.types";
export * from "./verified-permissions";
import { THorseMedicalRecord } from "../runnersQcApp/shared/types";
import { RequestErrorType } from "../utils/errors";

export type { HorseMedicalResponse } from "./global-types";

export type TPerson = {
  hisaPersonId: string;
  hisaPersonName: string;
};

// export type THorse = {
//   hisaHorseId?: string;
//   name?: string;
//   yearOfBirth?: number;
//   damName?: string;
//   ownerHisaId?: string;
//   ownerName?: string;
//   responsiblePersonHisaId?: string;
//   responsiblePersonName?: string;
//   attendingVet?: string[];
//   attendingVetName?: string[];
//   location?: HorseLocationModel[];
//   canRace?: boolean;
//   canRaceReason?: string;
//   canWork?: boolean;
//   canWorkReason?: string;
//   isOnVetsList?: boolean;
//   lastStartDate?: string;
//   lastWorkDate?: string;
//   nextStartDate?: string;
//   lastStartDateNotNull?: string;
//   createdDateTime?: string;
//   isActive?: boolean;
//   locationId?: string;
//   locationName?: string;
//   timestamp?: number;
//   responsiblePerson?: TPerson;
//   activity?: RecordActivity | null;
// };

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
  treatments: TTreatment[];
  userId: string;
};

export type TTreatment = THorseMedicalRecord & {
  treatmentTemplateId: string;
};

export type TMediaFile = {
  id: string;
  path: string;
  name: string;
  type: string;
  withDeleteIcon?: boolean;
};
