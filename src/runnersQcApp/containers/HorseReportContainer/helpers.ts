import { getRecType } from "@/runnersQcApp/shared/TextUtils";
import { TFunc, THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { DateTime } from "luxon";

export enum FilterRecType {
  DrugAdministered = "DrugAdministered",
  IntraarticularInjection = "IntraarticularInjection",
  Endoscopy = "Endoscopy",
  IntralesionalInjection = "IntralesionalInjection",
  Test = "Test",
  Vaccine = "Vaccine",
  VetInspection = "VetInspection",
  Shockwave = "Shockwave",
  Deworming = "Deworming",
  DispensedMeds = "DispensedMeds",
  Surgery = "Surgery",
  Procedure = "Procedure",
  Dental = "Dental",
  Necropsy = "Necropsy",
  AlternativeTreatments = "AlternativeTreatments",
  Bisphosphonates = "Bisphosphonates",
  ClearByRegVet = "ClearByRegVet",
  Imaging = "Imaging",
  MandatoryPreRaceAndPreWorkVetInspection = "MandatoryPreRaceAndPreWorkVetInspection",
}

export const getRecTypeFilters = (t: TFunc) =>
  Object.values(FilterRecType).map((recType) => ({
    id: recType,
    title: getRecType(t, recType),
    isSelected: false,
  }));

export const compareAlpha = (
  a: THorseMedicalRecord,
  b: THorseMedicalRecord,
  key: keyof THorseMedicalRecord
) => {
  const valA = a[key] ? (a[key] as string).toLowerCase() : "";
  const valB = b[key] ? (b[key] as string).toLowerCase() : "";
  return valA.localeCompare(valB);
};

export const compareHorseMedicalId = (
  a: THorseMedicalRecord,
  b: THorseMedicalRecord
) => {
  const extractNumber = (id: string | undefined) => {
    if (!id) return 0;
    return parseInt(id.replace(/\D/g, ""), 10);
  };
  return (
    extractNumber(a.hisaHorseMedicalId as string) -
    extractNumber(b.hisaHorseMedicalId as string)
  );
};

export const compareDate = (a: THorseMedicalRecord, b: THorseMedicalRecord) => {
  const dateA = a.date ? DateTime.fromISO(a.date).toMillis() : 0;
  const dateB = b.date ? DateTime.fromISO(b.date).toMillis() : 0;
  return dateA - dateB;
};

export const getComparator = (column: string) => {
  if (column === "hisaHorseId") {
    return compareHorseMedicalId;
  }
  if (column === "date") {
    return compareDate;
  }
  return (a: THorseMedicalRecord, b: THorseMedicalRecord) =>
    compareAlpha(a, b, column as keyof THorseMedicalRecord);
};

export const rowClassName =
  "px-4 py-4 whitespace-nowrap overflow-hidden text-ellipsis min-w-0 cursor-pointer";
export const columnHeaderCN =
  "flex flex-row items-center px-4 cursor-pointer group";
export const columnHeaderTitleCN =
  "whitespace-nowrap overflow-hidden text-ellipsis min-w-0 pr-2";
