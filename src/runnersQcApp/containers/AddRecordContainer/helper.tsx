import { InspectionType, TFunc } from "@/runnersQcApp/shared/types";
import { HorseMedicalRecType } from "@/Types";
import _ from "lodash";
import { getRecType } from "../addRecordAndProtocolConfig";

export type TOption = { key: string; label: string; value?: string };

export const mapOptionsToProps = (
  t: TFunc,
  record: any,
  config: TOption[]
): TOption[] => {
  const inspectionType = (() => {
    if (record.clearedToWork && !record.clearedToRace) {
      return InspectionType.ClearedToWork;
    } else if (record.clearedToWork && record.clearedToRace) {
      return InspectionType.ClearedToRace;
    } else {
      return InspectionType.NotCleared;
    }
  })();

  const newRecord = {
    ...record,
    recType: getRecType(record.recType),
    drugDosage: record.drugDosage
      ? record.measure
        ? `${record.drugDosage}${record.measure}`
        : record.drugDosage
      : null,
  };

  return _.chain(config)
    .map((item) => {
      const value =
        item.key === "inspectionType" &&
        (record.recType ===
          HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection ||
          record.recType === "Mandatory Attending Vet Inspection")
          ? inspectionType
          : _.get(newRecord, [item.key]);
      return {
        ...item,
        value,
      };
    })
    .filter((item) => !!item.value)
    .value();
};

export const getMainOptions = (
  t: TFunc,
  recType?: string
): { key: string; label: string }[] => {
  const options = [
    {
      key: "recType",
      label: t("HistoryDetails.type"),
    },
    {
      key: "conditionTreated",
      label: t("AddRecord.conditionTreated"),
    },
    {
      key: "modality",
      label: t("AddRecord.modality"),
    },
    {
      key: "drugName",
      label: t("AddRecord.drugName"),
    },
    {
      key: "vaccine",
      label: t("AddRecord.vaccineName"),
    },
    {
      key: "drugDosage",
      label: t("AddRecord.drugDosage"),
    },
    {
      key: "limbTreated",
      label: t("AddRecord.limbTreated"),
    },
    {
      key: "structure",
      label: t("AddRecord.structure"),
    },
    {
      key: "description",
      label: t("AddRecord.description"),
    },
    {
      key: "testName",
      label: t("AddRecord.testName"),
    },
    {
      key: "testResults",
      label: t("AddRecord.testResults"),
    },
    {
      key: "dental",
      label: t("AddRecord.dental"),
    },
    {
      key: "procedure",
      label: t("AddRecord.treatmentType"),
    },
    {
      key: "surgery",
      label: t("AddRecord.surgery"),
    },
    { key: "physiotherapy", label: t("AddRecord.physiotherapy") },
    { key: "chiropractic", label: t("AddRecord.chiropractic") },
    { key: "inspectionType", label: t("AddRecord.inspectionType") },
    {
      key: "notes",
      label: t("AddRecord.notes"),
    },
  ];
  if (recType === "DrugAdministered" || recType === "IntralesionalInjection") {
    options.push({
      key: "drugRoute",
      label: t("AddRecord.drugRoute"),
    });
  }
  return options;
};

export const getInspectionType = (data: any) => {
  if (data.inspectionType === InspectionType.ClearedToRace) {
    return { ...data, clearedToRace: true, clearedToWork: true };
  } else if (data.inspectionType === InspectionType.ClearedToWork) {
    return { ...data, clearedToWork: true, clearedToRace: false };
  } else {
    return { ...data, clearedToWork: false, clearedToRace: false };
  }
};
