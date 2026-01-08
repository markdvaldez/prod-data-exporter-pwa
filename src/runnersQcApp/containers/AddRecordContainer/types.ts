import { THorse, TMediaFile } from "@/runnersQcApp/shared/types";

export type TFormFields = {
  horses: THorse[];
  recType: string;
  conditionTreated?: string;
  drugName?: string;
  drugRoute?: string;
  drugDosage?: string;
  measure?: string;
  date?: string;
  time?: string;
  vaccine?: string;
  procedure?: string;
  surgery?: string;
  dental?: string;
  physiotherapy?: string;
  chiropractic?: string;
  notes?: string;
  files?: TMediaFile[];
  limbTreated?: string;
  structure?: string;
  prescribingVet?: string;
  description?: string;
  modality?: string;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  inspectionType?: string;
  treatmentLocation?: { locationId: string; locationName: string };
  treatedByPerson?: any;
};

export type TFieldName = keyof TFormFields;

export enum TSteps {
  AddHorses = 1,
  FillOutTheForm,
  SetDateAndTime,
  Overview,
}
