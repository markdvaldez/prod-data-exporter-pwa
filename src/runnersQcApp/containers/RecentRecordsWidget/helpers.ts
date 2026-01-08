import { TFunc, THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { HorseMedicalRecType } from "@/Types";
import _ from "lodash";

export const getThirdField = (
  item: THorseMedicalRecord & { descriptionText?: string },
  t?: TFunc
) => {
  switch (item?.descriptionText || item?.recType) {
    case "Mandatory Attending Vet Inspection":
    case HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection:
      return `Inspection Result: ${item?.displayName}`;
    case "Vaccine":
    case HorseMedicalRecType.Vaccine:
      return `Vaccine Name: ${item?.vaccine}`;
    case "Vet Inspection":
    case HorseMedicalRecType.VetInspection:
      return `Results: ${item?.testResults}`;
  }
};

export const getSortedRecords = (recentRecords: any) =>
  _.orderBy(
    recentRecords,
    [(record) => new Date(record?.lastUpdate || record?.date || 0)],
    ["desc"]
  );
