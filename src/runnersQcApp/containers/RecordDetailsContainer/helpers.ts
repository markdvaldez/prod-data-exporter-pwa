import { HorseMedicalRecType, HorseMedicalResponse } from "@/Types";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { getFormattedTitle, getRecType } from "@/runnersQcApp/shared/TextUtils";
import {
  InspectionType,
  TFunc,
  THorseMedicalRecord,
} from "@/runnersQcApp/shared/types";
import _ from "lodash";

export type TOption = { key: string; label: string; value?: string };

export const getOptions = (
  t: TFunc,
  recType?: string
): { key: string; label: string }[] => {
  const options = [
    { key: "hisaHorseMedicalId", label: "Record ID" },
    {
      key: "hisaHorseName",
      label: "Horse",
    },
    {
      key: "hisaHorseId",
      label: "Horse HISA id",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "time",
      label: "Time",
    },
    {
      key: "recType",
      label: t("type"),
    },
    {
      key: "conditionTreated",
      label: t("conditionTreated"),
    },
    {
      key: "modality",
      label: t("modality"),
    },
    {
      key: "drugName",
      label: t("drugName"),
    },
    {
      key: "vaccine",
      label: t("vaccineName"),
    },
    {
      key: "drugDosage",
      label: t("drugDosage"),
    },
    {
      key: "limbTreated",
      label: t("limbTreated"),
    },
    {
      key: "structure",
      label: t("structure"),
    },
    {
      key: "description",
      label: t("description"),
    },
    {
      key: "testName",
      label: t("testName"),
    },
    {
      key: "testResults",
      label: t("testResults"),
    },
    {
      key: "dental",
      label: t("dental"),
    },
    {
      key: "procedure",
      label: t("treatmentType"),
    },
    {
      key: "surgery",
      label: t("surgery"),
    },
    { key: "physiotherapy", label: t("physiotherapy") },
    { key: "chiropractic", label: t("chiropractic") },
    { key: "inspectionType", label: t("inspectionType") },
    {
      key: "responsibleHisaPerson",
      label: t("responsibleHisaPerson"),
    },
    {
      key: "treatingHisaPersonId",
      label: t("treatedBy"),
    },
    {
      key: "locationName",
      label: t("treatmentLocation"),
    },
    { key: "deleteReason", label: t("deleteReason") },
    {
      key: "notes",
      label: t("notes"),
    },
  ];
  if (recType === "DrugAdministered" || recType === "IntralesionalInjection") {
    options.push({
      key: "drugRoute",
      label: t("drugRoute"),
    });
  }
  return options;
};

export const mapOptionsToProps = (
  record: THorseMedicalRecord | HorseMedicalResponse,
  config: TOption[],
  t: TFunc
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
    recType: getRecType(t, record?.recType),
  };

  return _.chain(config)
    .map((item) => {
      const value =
        item.key === "inspectionType" &&
        record.recType ===
          HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
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

export const getPreparedRecord = <T extends THorseMedicalRecord>(
  record: T
): T & { locationName: string; responsibleHisaPerson: string } => {
  return {
    ...(record || {}),
    hisaHorseName: record?.hisaHorseName || "",
    hisaHorseId: getFormattedId(record?.hisaHorseId || ""),
    locationName: getFormattedTitle({
      name: record?.locationName || "",
      hisaId: record?.locationId || "",
      programNumber: "",
    }),
    responsibleHisaPerson: getFormattedTitle({
      name: record?.responsibleHisaPersonName || "",
      hisaId: record?.responsibleHisaPersonId || "",
      programNumber: "",
    }),
    treatingHisaPersonId: getFormattedTitle({
      name: record?.treatingHisaPersonName || "",
      hisaId: record?.treatingHisaPersonId || "",
      programNumber: "",
    }),
  };
};
