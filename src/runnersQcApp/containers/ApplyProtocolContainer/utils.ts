import { HorseMedicalRecType, HorseMedicalRouteAdmin } from "@/Types";

import {
  getNow,
  getQueryDate,
  isValidTimeFormat,
} from "@/runnersQcApp/shared/DateUtils";
import { Modality, THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import _ from "lodash";
import { TSelectValue } from "../CreateLocationContainer/components/CreateLocationField";

export const ROUTE_TYPES: HorseMedicalRouteAdmin[] = [
  HorseMedicalRouteAdmin.IV,
  HorseMedicalRouteAdmin.IM,
  HorseMedicalRouteAdmin.Intralesional,
  HorseMedicalRouteAdmin.NG,
  HorseMedicalRouteAdmin.SubQ,
  HorseMedicalRouteAdmin.Topical,
  HorseMedicalRouteAdmin.Other,
  HorseMedicalRouteAdmin.Unknown,
  HorseMedicalRouteAdmin.Inhalation,
  HorseMedicalRouteAdmin.Transdermal,
  HorseMedicalRouteAdmin.Ophthalmic,
  HorseMedicalRouteAdmin.Oral,
];

export const getRouteTypesOptions = (): TSelectValue[] =>
  _.map(ROUTE_TYPES, (type) => ({ label: type, value: type }));

export const createVariables = ({
  horseLocationId,
  horseLocationName,
  locationId,
  horseId,
  hisaHorseName,
  hisaPersonId,
  date,
  time,
  recType,
  conditionTreated,
  drugName,
  drugRoute,
  drugDosage,
  vaccine,
  procedure,
  surgery,
  dental,
  physiotherapy,
  chiropractic,
  limbTreated,
  structure,
  notes,
  description,
  latLng,
  responsibleHisaPersonId,
  ownerHisaId,
  modality,
  testResults,
  clearedToRace,
  clearedToWork,
  locationName,
  responsibleHisaPersonName,
  treatingHisaPersonName,
  treatingHisaPersonId,
  designatedOwnerName,
}: {
  horseLocationId?: string | null;
  horseLocationName?: string | null;
  locationId?: string | null;
  horseId?: string;
  hisaHorseName?: string;
  hisaPersonId?: string;
  date?: string;
  time?: string | null;
  recType?: string | null;
  conditionTreated?: string | null;
  drugName?: string | null;
  drugRoute?: string | null;
  drugDosage?: string | null;
  mesure?: string | null;
  vaccine?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  limbTreated?: string | null;
  structure?: string | null;
  notes?: string | null;
  description?: string | null;
  latLng?: string | null;
  responsibleHisaPersonId?: string | null;
  ownerHisaId?: string | null;
  modality?: string | null;
  testResults?: string | null;
  clearedToWork?: boolean | null;
  clearedToRace?: boolean | null;
  locationName?: string | null;
  responsibleHisaPersonName?: string | null;
  treatingHisaPersonId?: string | null;
  designatedOwnerName?: string | null;
  treatingHisaPersonName?: string | null;
}): THorseMedicalRecord => {
  const nextVariables: THorseMedicalRecord = {
    hisaHorseMedicalId: null,
    locationId: null,
    horseLocationId: null,
    hisaHorseId: "",
    responsibleHisaPersonId: null,
    treatingHisaPersonId: null,
    designatedOwner: null,
    attendingVet: null,
    latLng: null,
    treatingPersonRole: null,
    date: "",
    time: "",
    recType: HorseMedicalRecType.DrugAdministered,
    vaccine: null,
    drugName: null,
    drugRoute: HorseMedicalRouteAdmin.IV,
    drugDosage: null,
    drugPerscribingVetHisaId: null,
    procedure: null,
    surgery: null,
    dental: null,
    physiotherapy: null,
    chiropractic: null,
    conditionTreated: null,
    testName: null,
    testResults: null,
    limbTreated: null,
    necropsyCategory: null,
    notes: null,
    associatedDocumentUrls: null,
    isDeleted: false,
    structure: null,
    description: null,
    retireReason: null,
    relatedVetsListId: null,
    classifiedAs: null,
    uuid: null,
    dateOfDeath: null,
    deathReason: null,
    isSynced: false,
    timestamp: 0,
    modality: Modality.PET,
    clearedToRace: false,
    clearedToWork: false,
    locationName: "",
    responsibleHisaPersonName: "",
    designatedOwnerName: "",
    treatingHisaPersonName: "",
  };
  nextVariables.horseLocationId = horseLocationId;
  nextVariables.locationId = locationId;
  nextVariables.hisaHorseId = horseId || "";
  nextVariables.treatingHisaPersonId = hisaPersonId;
  nextVariables.date = getQueryDate({ date });
  nextVariables.time = isValidTimeFormat(time) ? time : null;
  nextVariables.drugName = drugName;
  nextVariables.drugRoute = drugRoute as HorseMedicalRouteAdmin;
  nextVariables.drugDosage = drugDosage;
  nextVariables.notes = notes;
  nextVariables.treatingHisaPersonId = hisaPersonId;
  nextVariables.responsibleHisaPersonId = responsibleHisaPersonId;
  nextVariables.designatedOwner = ownerHisaId;
  nextVariables.recType = HorseMedicalRecType.DrugAdministered;
  nextVariables.timestamp = getNow().toMillis();
  nextVariables.horseLocationName = horseLocationName;
  nextVariables.hisaHorseName = hisaHorseName;
  nextVariables.limbTreated = limbTreated;
  nextVariables.recType = recType as HorseMedicalRecType;
  nextVariables.conditionTreated = conditionTreated;
  nextVariables.vaccine = vaccine;
  nextVariables.procedure = procedure;
  nextVariables.surgery = surgery;
  nextVariables.dental = dental;
  nextVariables.physiotherapy = physiotherapy;
  nextVariables.chiropractic = chiropractic;
  nextVariables.limbTreated = limbTreated;
  nextVariables.structure = structure;
  nextVariables.description = description;
  nextVariables.latLng = latLng;
  nextVariables.modality = modality as Modality;
  nextVariables.testResults = testResults;
  nextVariables.clearedToRace = clearedToRace ?? undefined;
  nextVariables.clearedToWork = clearedToWork ?? undefined;
  nextVariables.locationName = locationName ?? undefined;
  nextVariables.responsibleHisaPersonName = responsibleHisaPersonName;
  nextVariables.treatingHisaPersonName = treatingHisaPersonName;
  nextVariables.treatingHisaPersonId = treatingHisaPersonId;
  nextVariables.designatedOwnerName = designatedOwnerName;
  return nextVariables;
};

export const concatenateStrings = (
  str1?: string | null,
  str2?: string | null
): string => {
  let result = `${str1 || ""}`;
  if (str2) {
    result += `\n${str2}`;
  }
  return result;
};
