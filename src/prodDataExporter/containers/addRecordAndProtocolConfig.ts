import {
  HorseMedicalRecType,
  HorseMedicalRouteAdmin,
  TreatmentTemplateModel,
  TreatmentTemplateRequest,
} from "@/Types/global-types";
import _ from "lodash";
import { DateTime } from "luxon";
import { z } from "zod/v4";
import { getNow, getQueryDate, isValidTimeFormat, getTodayISODate } from "../shared/DateUtils";
import { formatNumber, getNumbers, removeSpaces } from "../shared/TextUtils";
import {
  DosageMeasureType,
  InspectionType,
  LimbTreated,
  Modality,
  THorseMedicalRecord,
  TMediaFile,
  TOption,
} from "../shared/types";

export const checkResult = (
  recognition?: Record<
    string,
    {
      text: string;
      label: string;
      prediction: number;
    }[]
  > | null
): boolean => {
  return (
    !!recognition &&
    _.chain(recognition)
      .values()
      .flatten()
      .some((item) => item.label !== "O")
      .value()
  );
};

export const getHorsesFromByNames = (horses: any, horseNames: any) => {
  return _.filter(horses, (horse) => {
    return _.some(horseNames, (name) =>
      _.includes(horse?.name?.toLowerCase(), name)
    );
  });
};

export function findFirstNumber(text: string): number | null {
  const numberMap: { [key: string]: number } = {
    one: 1,
    first: 1,
    two: 2,
    second: 2,
    three: 3,
    third: 3,
    four: 4,
    fourth: 4,
    five: 5,
    fifth: 5,
    six: 6,
    sixth: 6,
    seven: 7,
    seventh: 7,
    eight: 8,
    eighth: 8,
    nine: 9,
    ninth: 9,
    ten: 10,
  };

  const words = text.toLowerCase().split(/\s+/);

  for (const word of words) {
    if (word in numberMap) {
      return numberMap[word];
    } else if (/^\d+$/.test(word)) {
      return parseInt(word, 10);
    }
  }

  return null;
}

export const clearText = (text: string) =>
  _.chain(text)
    .replace(/[.;:{}()]/g, "")
    .toLower()
    .trim()
    .value();

export const ROUTE_TYPES: HorseMedicalRouteAdmin[] = [
  HorseMedicalRouteAdmin.Other,
  HorseMedicalRouteAdmin.IV,
  HorseMedicalRouteAdmin.IM,
  HorseMedicalRouteAdmin.Intralesional,
  HorseMedicalRouteAdmin.NG,
  HorseMedicalRouteAdmin.SubQ,
  HorseMedicalRouteAdmin.Topical,
  HorseMedicalRouteAdmin.Inhalation,
  HorseMedicalRouteAdmin.Transdermal,
  HorseMedicalRouteAdmin.Ophthalmic,
  HorseMedicalRouteAdmin.Oral,
];

export const MODALITY_TYPES: Modality[] = [
  Modality.PET,
  Modality.Ultrasound,
  Modality.Radiograph,
  Modality.CT,
  Modality.MRI,
  Modality.BoneScan,
  Modality.Other,
];

export const LIMB_TREATED_OPTIONS: LimbTreated[] = [
  LimbTreated.All4,
  LimbTreated.BF,
  LimbTreated.BH,
  LimbTreated.LF,
  LimbTreated.LH,
  LimbTreated.NA,
  LimbTreated.RF,
  LimbTreated.RH,
];

export const INSP_RES_TYPES: InspectionType[] = [
  InspectionType.NotCleared,
  InspectionType.ClearedToWork,
  InspectionType.ClearedToRace,
];

export const DEFAULT_VALUES = {
  clearedToWork: false,
  clearedToRace: false,
  vaccine: "",
  drugName: "",
  date: "2025-01-15", // Today's date in YYYY-MM-DD format - gets replaced by getTodayISODate() at runtime
  drugRoute: "",
  drugDosage: "",
  procedure: "",
  surgery: "",
  dental: "",
  physiotherapy: "",
  chiropractic: "",
  modality: "",
  testName: "",
  necropsyCategory: "",
  testResults: "",
  limbTreated: "",
  measure: DosageMeasureType.mg,
  notes: "",
  structure: "",
  description: "",
  category: "",
  conditionTreated: "",
  inspectionType: "",
};

export const splitCamelCase = (
  word: string | null | undefined
): string | null | undefined => {
  if (word) {
    return word
      .replace(/([a-z])([A-Z (])/g, "$1 $2")
      .replace(/\s+/g, " ")
      .trim();
  }
};

export const getLabel = (type: string | null | undefined): string => {
  switch (type) {
    case LimbTreated.All4:
      return "All 4";
  }

  return splitCamelCase(type) || "";
};

export const getLimbTreatedTypesOptions = (): TOption[] => {
  return _.map(LIMB_TREATED_OPTIONS, (type) => ({
    label: getLabel(type),
    value: type,
  }));
};

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
  measure,
  vaccine,
  procedure,
  surgery,
  dental,
  physiotherapy,
  chiropractic,
  limbTreated,
  structure,
  notes,
  files,
  description,
  latLng,
  documentPaths,
  testName,
  testResults,
  responsibleHisaPersonId,
  ownerHisaId,
  modality,
  clearedToRace,
  clearedToWork,
  locationName,
  responsibleHisaPersonName,
  treatingHisaPersonId,
  designatedOwnerName,
  treatingHisaPersonName,
}: {
  horseLocationId?: string;
  horseLocationName?: string;
  locationId?: string;
  horseId?: string;
  hisaHorseName?: string;
  hisaPersonId?: string;
  date?: string;
  time?: string;
  recType?: string;
  conditionTreated?: string;
  drugName?: string;
  drugRoute?: string;
  drugDosage?: string;
  measure?: string;
  vaccine?: string;
  procedure?: string;
  surgery?: string;
  dental?: string;
  physiotherapy?: string;
  chiropractic?: string;
  limbTreated?: string;
  structure?: string;
  notes?: string;
  files?: TMediaFile[];
  description?: string;
  latLng?: string;
  testName?: string;
  testResults?: string;
  documentPaths?: {
    path: string;
    id: string;
    name: string;
    type: string;
  }[];
  responsibleHisaPersonId?: string;
  ownerHisaId?: string;
  modality?: string;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  locationName?: string;
  responsibleHisaPersonName?: string;
  treatingHisaPersonId?: string;
  designatedOwnerName?: string;
  treatingHisaPersonName?: string;
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
    files: [],
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
    documentPaths: [],
  };
  nextVariables.horseLocationId = horseLocationId;
  nextVariables.locationId = locationId;
  nextVariables.hisaHorseId = horseId || "";
  nextVariables.treatingHisaPersonId = treatingHisaPersonId;
  nextVariables.responsibleHisaPersonId = responsibleHisaPersonId;
  nextVariables.designatedOwner = ownerHisaId;
  nextVariables.date = getQueryDate({ date });
  nextVariables.time = isValidTimeFormat(time) ? time : null;
  nextVariables.drugName = drugName;
  nextVariables.drugRoute = drugRoute as HorseMedicalRouteAdmin;
  nextVariables.drugDosage = drugDosage
    ? `${getNumbers(formatNumber(drugDosage))}${measure || ""}`
    : null;
  nextVariables.notes = notes;
  nextVariables.files = files;
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
  nextVariables.testName = testName;
  nextVariables.testResults = testResults;
  nextVariables.modality = modality as Modality;
  nextVariables.clearedToRace = clearedToRace;
  nextVariables.clearedToWork = clearedToWork;
  nextVariables.locationName = locationName;
  nextVariables.responsibleHisaPersonName = responsibleHisaPersonName;
  nextVariables.treatingHisaPersonName = treatingHisaPersonName;
  nextVariables.designatedOwnerName = designatedOwnerName;
  nextVariables.documentPaths = documentPaths;
  return nextVariables;
};
export const createProtocolVariables = ({
  clearedToRace,
  clearedToWork,
  recType,
  vaccine,
  drugName,
  drugRoute,
  drugDosage,
  procedure,
  surgery,
  dental,
  physiotherapy,
  chiropractic,
  conditionTreated,
  modality,
  testName,
  testResults,
  limbTreated,
  notes,
  structure,
  description,
  measure,
}: {
  measure?: string;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  recType?: HorseMedicalRecType | string | null;
  vaccine?: string | null;
  drugName?: string | null;
  drugRoute?: HorseMedicalRouteAdmin | null;
  drugDosage?: string | null;
  procedure?: string | null;
  surgery?: string | null;
  dental?: string | null;
  physiotherapy?: string | null;
  chiropractic?: string | null;
  conditionTreated?: string | null;
  modality?: string | null;
  testName?: string | null;
  testResults?: string | null;
  limbTreated?: string | null;
  notes?: string | null;
  structure?: string | null;
  description?: string | null;
  // classifiedAs?: string | null;
  // category?: string | null;
  // internalNotes?: string | null;
}): TreatmentTemplateRequest => {
  const nextVariables: TreatmentTemplateRequest & { name?: string | null } = {};
  nextVariables.clearedToRace = clearedToRace;
  nextVariables.clearedToWork = clearedToWork;
  nextVariables.recType = (recType as HorseMedicalRecType) || null;
  nextVariables.vaccine = vaccine || "";
  nextVariables.drugName = drugName || "";
  nextVariables.drugRoute =
    (drugRoute as HorseMedicalRouteAdmin) || HorseMedicalRouteAdmin.IV;
  nextVariables.drugDosage = drugDosage
    ? `${getNumbers(formatNumber(drugDosage))}${measure || ""}`
    : "";
  nextVariables.procedure = procedure || "";
  nextVariables.surgery = surgery || "";
  nextVariables.dental = dental || "";
  nextVariables.physiotherapy = physiotherapy || "";
  nextVariables.chiropractic = chiropractic || "";
  nextVariables.conditionTreated = conditionTreated || "";
  nextVariables.modality = (modality as Modality) || "";
  nextVariables.testName = testName || "";
  nextVariables.testResults = testResults || "";
  nextVariables.limbTreated = limbTreated || "";
  nextVariables.notes = notes || "";
  nextVariables.structure = structure || "";
  nextVariables.description = description || "";

  return nextVariables;
};
export const createEditVariables = ({
  record,
  horseLocationId,
  locationId,
  hisaHorseMedicalId,
  locationName,
  horseId,
  hisaHorseName,
  hisaPersonId,
  date,
  time,
  recType,
  conditionTreated,
  drugName,
  files,
  drugRoute,
  drugDosage,
  measure,
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
  testName,
  testResults,
  documentPaths,
  modality,
  clearedToRace,
  clearedToWork,
  horseLocationName,
  responsibleHisaPersonName,
  designatedOwner,
  attendingVet,
  treatingHisaPersonName,
  treatingHisaPersonId,
}: {
  record: THorseMedicalRecord;
  hisaHorseMedicalId: string;
  horseLocationId?: string;
  locationId?: string;
  locationName?: string;
  horseId?: string;
  hisaHorseName?: string;
  hisaPersonId?: string;
  date?: string;
  time?: string;
  recType?: string;
  conditionTreated?: string;
  drugName?: string;
  drugRoute?: string;
  drugDosage?: string;
  measure?: string;
  vaccine?: string;
  procedure?: string;
  surgery?: string;
  dental?: string;
  physiotherapy?: string;
  chiropractic?: string;
  limbTreated?: string;
  structure?: string;
  notes?: string;
  files?: TMediaFile[];
  description?: string;
  latLng?: string;
  testName?: string;
  testResults?: string;
  documentPaths?: {
    path: string;
    id: string;
    name: string;
    type: string;
  }[];
  modality?: string;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  horseLocationName?: string;
  responsibleHisaPersonName?: string;
  designatedOwner?: string;
  attendingVet: string;
  treatingHisaPersonName?: string;
  treatingHisaPersonId?: string;
}): THorseMedicalRecord => {
  const nextVariables: THorseMedicalRecord = {
    ...record,
  };
  nextVariables.hisaHorseMedicalId = hisaHorseMedicalId;
  nextVariables.locationId = locationId;
  nextVariables.horseLocationId = horseLocationId;
  nextVariables.hisaHorseId = horseId || "";
  nextVariables.treatingHisaPersonId = treatingHisaPersonId;
  nextVariables.date = getQueryDate({ date });
  nextVariables.time = isValidTimeFormat(time) ? time : null;
  nextVariables.drugName = drugName;
  nextVariables.drugRoute = drugRoute as HorseMedicalRouteAdmin;
  nextVariables.drugDosage = drugDosage
    ? `${getNumbers(formatNumber(drugDosage))}${measure || ""}`
    : null;
  nextVariables.notes = notes;
  nextVariables.files = files;
  nextVariables.recType = HorseMedicalRecType.DrugAdministered;
  nextVariables.timestamp = getNow().toMillis();
  nextVariables.locationName = locationName;
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
  nextVariables.description = description || null;
  nextVariables.latLng = latLng;
  nextVariables.testName = testName;
  nextVariables.testResults = testResults;
  nextVariables.modality = modality as Modality;
  nextVariables.clearedToRace = clearedToRace;
  nextVariables.clearedToWork = clearedToWork;
  nextVariables.horseLocationName = horseLocationName;
  nextVariables.responsibleHisaPersonName = responsibleHisaPersonName;
  nextVariables.designatedOwner = designatedOwner;
  nextVariables.attendingVet = attendingVet;
  nextVariables.treatingHisaPersonName = treatingHisaPersonName;
  nextVariables.documentPaths = documentPaths;
  return nextVariables;
};

export type Field = {
  name: string;
  key?: string;
  isRequired: boolean;
};

export type FormFieldType = {
  label: string;
  fields: Field[];
  schema: z.ZodObject;
  protocolFields: Field[];
  protocolSchema: z.ZodObject;
  applyProtocolFields: Field[];
  defaultValues?: Record<string, string | boolean | null>;
  isActive: boolean;
  editable: boolean;
};

export type FormFieldsType = Record<string, FormFieldType>;

export const FORM_FIELDS: FormFieldsType = {
  [HorseMedicalRecType.DrugAdministered]: {
    label: "Drug Administered",
    fields: [
      {
        name: "conditionTreated",
        key: "Drugadministeredcond",
        isRequired: true,
      },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: true,
      },
      { name: "drugRoute", isRequired: true },
      { name: "drugDosage", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugName: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugRoute: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugDosage: z
        .string()
        .trim()
        .nonempty("This field is required")
        .refine(
          (value) => {
            if (!value) return false;
            const num = parseFloat(value);
            return num !== 0;
          },
          { message: "Field value mustn't be 0" }
        )
        .refine((value) => value !== "0.", {
          message: 'Field value must be "0."',
        })
        .refine((value) => /^(0|0[1-9]|[1-9][0-9]*)(\.[0-9]+)?$/.test(value), {
          message: "Invalid number format",
        }),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      {
        name: "conditionTreated",
        key: "Drugadministeredcond",
        isRequired: false,
      },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: false,
      },
      { name: "drugRoute", isRequired: false },
      { name: "drugDosage", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      drugName: z.string().trim().optional().nullable(),
      drugRoute: z.string().trim().optional().nullable(),
      drugDosage: z
        .string()
        .trim()
        .optional()
        .nullable()
        .refine((value) => value !== "0.", {
          message: 'Field value must be "0."',
        }),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      {
        name: "conditionTreated",
        key: "Drugadministeredcond",
        isRequired: true,
      },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: true,
      },
      { name: "drugRoute", isRequired: true },
      { name: "drugDosage", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
      drugRoute: HorseMedicalRouteAdmin.IV,
      drugDosage: "",
      measure: DosageMeasureType.mg,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.IntraarticularInjection]: {
    label: "Intraarticular Injection",
    fields: [
      {
        name: "conditionTreated",
        key: "Intraarticularinjectioncond",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      {
        name: "structure",
        key: "HorseMedical.RecTypeIsIntraarticularinjection.Structure",
        isRequired: true,
      },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: true,
      },
      { name: "drugDosage", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      limbTreated: z
        .string("This field is required")
        .nonempty("This field is required"),
      structure: z
        .string("This field is required")
        .nonempty("This field is required"),
      drugName: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugDosage: z
        .string()
        .trim()
        .nonempty("This field is required")
        .refine(
          (value) => {
            if (!value) return false;
            const num = parseFloat(value);
            return num !== 0;
          },
          { message: "Field value mustn't be 0" }
        )
        .refine((value) => value !== "0.", {
          message: 'Field value must be "0."',
        })
        .refine((value) => /^(0|0[1-9]|[1-9][0-9]*)(\.[0-9]+)?$/.test(value), {
          message: "Invalid number format",
        }),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      {
        name: "conditionTreated",
        key: "Intraarticularinjectioncond",
        isRequired: false,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: false },
      {
        name: "structure",
        key: "HorseMedical.RecTypeIsIntraarticularinjection.Structure",
        isRequired: false,
      },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: false,
      },
      { name: "drugDosage", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      limbTreated: z.string().optional().nullable(),
      structure: z.string().optional().nullable(),
      drugName: z.string().trim().optional().nullable(),
      drugDosage: z
        .string()
        .trim()
        .optional()
        .nullable()
        .refine((value) => value !== "0.", {
          message: 'Field value must be "0."',
        }),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      {
        name: "conditionTreated",
        key: "Intraarticularinjectioncond",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      {
        name: "structure",
        key: "HorseMedical.RecTypeIsIntraarticularinjection.Structure",
        isRequired: true,
      },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: true,
      },
      { name: "drugDosage", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
      drugDosage: "",
      measure: DosageMeasureType.mg,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Endoscopy]: {
    label: "Endoscopy",
    fields: [
      { name: "conditionTreated", key: "Endoscopycond", isRequired: true },
      { name: "testResults", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      testResults: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "conditionTreated", key: "Endoscopycond", isRequired: false },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      testResults: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "conditionTreated", key: "Endoscopycond", isRequired: true },
      { name: "testResults", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.IntralesionalInjection]: {
    label: "Intralesional Injection",
    fields: [
      {
        name: "conditionTreated",
        key: "Intralesionalinjectioncond",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: true,
      },
      { name: "drugRoute", isRequired: true },
      { name: "drugDosage", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      limbTreated: z
        .string("This field is required")
        .nonempty("This field is required"),
      structure: z
        .string("This field is required")
        .nonempty("This field is required"),
      drugName: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugRoute: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugDosage: z
        .string()
        .trim()
        .nonempty("This field is required")
        .refine(
          (value) => {
            if (!value) return false;
            const num = parseFloat(value);
            return num !== 0;
          },
          { message: "Field value mustn't be 0" }
        )
        .refine((value) => value !== "0.", {
          message: 'Field value must be "0."',
        })
        .refine((value) => /^(0|0[1-9]|[1-9][0-9]*)(\.[0-9]+)?$/.test(value), {
          message: "Invalid number format",
        }),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      {
        name: "conditionTreated",
        key: "Intralesionalinjectioncond",
        isRequired: false,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: false },
      { name: "structure", key: "Structure", isRequired: false },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: false,
      },
      { name: "drugRoute", isRequired: false },
      { name: "drugDosage", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      limbTreated: z.string().optional().nullable(),
      structure: z.string().optional().nullable(),
      drugName: z.string().trim().optional().nullable(),
      drugRoute: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
      drugDosage: z
        .string()
        .trim()
        .optional()
        .nullable()
        .refine((value) => value !== "0.", {
          message: 'Field value must be "0."',
        }),
    }),
    applyProtocolFields: [
      {
        name: "conditionTreated",
        key: "Intralesionalinjectioncond",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: true,
      },
      { name: "drugRoute", isRequired: true },
      { name: "drugDosage", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
      drugRoute: HorseMedicalRouteAdmin.Intralesional,
      drugDosage: "",
      measure: DosageMeasureType.mg,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Test]: {
    label: "Tests and Diagnostics",
    fields: [
      {
        name: "conditionTreated",
        key: "Testsanddiagnosticscond",
        isRequired: true,
      },
      { name: "description", isRequired: true },
      { name: "testResults", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      description: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      testResults: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      {
        name: "conditionTreated",
        key: "Testsanddiagnosticscond",
        isRequired: false,
      },
      { name: "description", isRequired: false },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      description: z.string().trim().optional().nullable(),
      testResults: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      {
        name: "conditionTreated",
        key: "Testsanddiagnosticscond",
        isRequired: true,
      },
      { name: "description", isRequired: true },
      { name: "testResults", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Vaccine]: {
    label: "Vaccine",
    fields: [
      { name: "vaccine", key: "HorseMedical.Vaccine", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      vaccine: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "vaccine", key: "HorseMedical.Vaccine", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      vaccine: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "vaccine", key: "HorseMedical.Vaccine", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.VetInspection]: {
    label: "Vet Inspection",
    fields: [{ name: "testResults", isRequired: true }],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      testResults: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      testResults: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "testResults", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Shockwave]: {
    label: "Shockwave",
    fields: [
      { name: "conditionTreated", key: "Shockwavecond", isRequired: true },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      limbTreated: z
        .string("This field is required")
        .nonempty("This field is required"),
      structure: z
        .string("This field is required")
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "conditionTreated", key: "Shockwavecond", isRequired: false },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: false },
      { name: "structure", key: "Structure", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      limbTreated: z.string().optional().nullable(),
      structure: z.string().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "conditionTreated", key: "Shockwavecond", isRequired: true },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Deworming]: {
    label: "Deworming",
    fields: [
      {
        name: "conditionTreated",
        key: "horseMedical.RecTypeIsDeworming.ConditionTreated",
        isRequired: true,
      },
      { name: "drugName", key: "Deworming", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugName: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      {
        name: "conditionTreated",
        key: "horseMedical.RecTypeIsDeworming.ConditionTreated",
        isRequired: false,
      },
      { name: "drugName", key: "Deworming", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      drugName: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      {
        name: "conditionTreated",
        key: "horseMedical.RecTypeIsDeworming.ConditionTreated",
        isRequired: true,
      },
      { name: "drugName", key: "Deworming", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.DispensedMeds]: {
    label: "Dispensed Meds",
    fields: [
      { name: "conditionTreated", key: "Dispensedmedscond", isRequired: true },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: true,
      },
      { name: "drugDosage", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugName: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      drugDosage: z
        .string()
        .trim()
        .nonempty("This field is required")
        .refine(
          (value) => {
            if (!value) return false;
            const num = parseFloat(value);
            return num !== 0;
          },
          { message: "Field value mustn't be 0" }
        )
        .refine((value) => value !== "0.", {
          message: 'Field value must be "0."',
        })
        .refine((value) => /^(0|0[1-9]|[1-9][0-9]*)(\.[0-9]+)?$/.test(value), {
          message: "Invalid number format",
        }),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "conditionTreated", key: "Dispensedmedscond", isRequired: false },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: false,
      },
      { name: "drugDosage", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      drugName: z.string().trim().optional().nullable(),
      drugDosage: z
        .string()
        .trim()
        .optional()
        .nullable()
        .refine((value) => value !== "0.", {
          message: 'Field value must be "0."',
        }),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "conditionTreated", key: "Dispensedmedscond", isRequired: true },
      {
        name: "drugName",
        key: "HorseMedical.Drugadministered",
        isRequired: true,
      },
      { name: "drugDosage", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
      drugRoute: HorseMedicalRouteAdmin.Oral,
      drugDosage: "",
      measure: DosageMeasureType.mg,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Surgery]: {
    label: "Surgery",
    fields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsSurgery.ConditionTreated",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      { name: "description", isRequired: true },
      { name: "testResults", isRequired: false },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      limbTreated: z
        .string("This field is required")
        .nonempty("This field is required"),
      structure: z
        .string("This field is required")
        .nonempty("This field is required"),
      description: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      testResults: z.string().trim(),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsSurgery.ConditionTreated",
        isRequired: false,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: false },
      { name: "structure", key: "Structure", isRequired: false },
      { name: "description", isRequired: false },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      limbTreated: z.string().optional().nullable(),
      structure: z.string().optional().nullable(),
      description: z.string().trim().optional().nullable(),
      testResults: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsSurgery.ConditionTreated",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      { name: "description", isRequired: true },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Procedure]: {
    label: "Procedure",
    fields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsProcedure.ConditionTreated",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: false },
      { name: "description", isRequired: true },
      { name: "testResults", isRequired: false },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      limbTreated: z
        .string("This field is required")
        .nonempty("This field is required"),
      structure: z.string().optional(),
      description: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      testResults: z.string().trim().optional(),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsProcedure.ConditionTreated",
        isRequired: false,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: false },
      { name: "structure", key: "Structure", isRequired: false },
      { name: "description", isRequired: false },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      limbTreated: z.string().optional().nullable(),
      structure: z.string().optional().nullable(),
      description: z.string().trim().optional().nullable(),
      testResults: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsProcedure.ConditionTreated",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: false },
      { name: "description", isRequired: true },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Dental]: {
    label: "Dental",
    fields: [
      { name: "conditionTreated", key: "Dentalcond", isRequired: true },
      { name: "description", isRequired: false },
      { name: "testResults", isRequired: false },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      description: z.string().optional(),
      testResults: z.string().trim().optional(),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "conditionTreated", key: "Dentalcond", isRequired: false },
      { name: "description", isRequired: false },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      description: z.string().optional().nullable(),
      testResults: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "conditionTreated", key: "Dentalcond", isRequired: true },
      { name: "description", isRequired: false },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Necropsy]: {
    label: "Necropsy",
    fields: [{ name: "necropsyCategory", isRequired: true }],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      necropsyCategory: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "necropsyCategory", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      necropsyCategory: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "necropsyCategory", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: false,
    editable: true,
  },
  [HorseMedicalRecType.AlternativeTreatments]: {
    label: "Alternative Treatments",
    fields: [
      { name: "procedure", isRequired: true },
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsAlternativeTreatments.ConditionTreated",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      { name: "description", isRequired: false },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      procedure: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      limbTreated: z
        .string("This field is required")
        .nonempty("This field is required"),
      structure: z
        .string("This field is required")
        .nonempty("This field is required"),
      description: z.string().optional(),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "procedure", isRequired: false },
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsAlternativeTreatments.ConditionTreated",
        isRequired: false,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: false },
      { name: "structure", key: "Structure", isRequired: false },
      { name: "description", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      procedure: z.string().trim().optional().nullable(),
      conditionTreated: z.string().trim().optional().nullable(),
      limbTreated: z.string().optional().nullable(),
      structure: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "procedure", isRequired: true },
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsAlternativeTreatments.ConditionTreated",
        isRequired: true,
      },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      { name: "description", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.Bisphosphonates]: {
    label: "Bisphosphonates",
    fields: [],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [{ name: "notes", isRequired: false }],
    protocolSchema: z.object({
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [{ name: "notes", isRequired: false }],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: false,
    editable: true,
  },
  [HorseMedicalRecType.ClearByRegVet]: {
    label: "Clear By Reg Vet",
    fields: [],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [{ name: "notes", isRequired: false }],
    protocolSchema: z.object({
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [{ name: "notes", isRequired: false }],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: false,
    editable: true,
  },
  [HorseMedicalRecType.Imaging]: {
    label: "Imaging",
    fields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsImaging.ConditionTreated",
        isRequired: true,
      },
      { name: "modality", isRequired: true },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      { name: "testResults", isRequired: true },
    ],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      conditionTreated: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      modality: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      limbTreated: z
        .string("This field is required")
        .nonempty("This field is required"),
      structure: z
        .string("This field is required")
        .nonempty("This field is required"),
      testResults: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsImaging.ConditionTreated",
        isRequired: false,
      },
      { name: "modality", isRequired: false },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: false },
      { name: "structure", key: "Structure", isRequired: false },
      { name: "testResults", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      conditionTreated: z.string().trim().optional().nullable(),
      modality: z.string().trim().optional().nullable(),
      limbTreated: z.string().optional().nullable(),
      structure: z.string().optional().nullable(),
      testResults: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      {
        name: "conditionTreated",
        key: "HorseMedical.RecTypeIsImaging.ConditionTreated",
        isRequired: true,
      },
      { name: "modality", isRequired: true },
      { name: "limbTreated", key: "HorseMedical.Limb", isRequired: true },
      { name: "structure", key: "Structure", isRequired: true },
      { name: "testResults", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
  [HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection]: {
    label: "Mandatory Attending Vet Inspection",
    fields: [{ name: "inspectionType", isRequired: true }],
    schema: z.object({
      recType: z
        .string("This field is required")
        .nonempty("This field is required"),
      inspectionType: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
      date: z
        .string("This field is required")
        .trim()
        .nonempty("This field is required"),
    }),
    protocolFields: [
      { name: "inspectionType", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    protocolSchema: z.object({
      inspectionType: z.string().trim().optional().nullable(),
      notes: z.string().optional().nullable(),
    }),
    applyProtocolFields: [
      { name: "inspectionType", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    defaultValues: {
      ...DEFAULT_VALUES,
    },
    isActive: true,
    editable: true,
  },
};

export const getFormFields = (recType: string): FormFieldType => {
  let newRecType = "";
  if (recType === "MandatoryAttendingVetInspection") {
    newRecType = HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection;
  } else {
    newRecType = recType;
  }
  return _.get(FORM_FIELDS, [newRecType]);
};

export const splitWords = (
  text: HorseMedicalRecType | string
): HorseMedicalRecType =>
  text.replace(/([a-z])([A-Z])/g, "$1 $2") as HorseMedicalRecType;

export const getRecType = (recType: HorseMedicalRecType | string): string => {
  let newRecType = "";
  if (recType === "MandatoryAttendingVetInspection") {
    newRecType = HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection;
  } else if (recType === "TestsandDiagnostics") {
    newRecType = HorseMedicalRecType.Test;
  } else {
    newRecType = recType;
  }
  return newRecType;
};

export const getCurrentType = (
  recType: HorseMedicalRecType | string
): string => {
  let newType = "";
  if (recType === HorseMedicalRecType.Test) {
    newType = "Tests and Diagnostics";
  } else if (
    recType === HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
  ) {
    newType = "Mandatory Attending Vet Inspection";
  } else {
    newType = recType;
  }
  return newType;
};

export const isEditable = (recType: string = ""): boolean => {
  return _.get(FORM_FIELDS, [recType, "isActive"]);
};

export const getFormattedTitle = (
  textArr: (string | null | undefined)[]
): string => {
  return _.chain(textArr)
    .filter((item) => !!item)
    .join(" • ")
    .replace(/ {2,}/g, " ")
    .trim()
    .value();
};

export const getInspectionType = (
  clearedToWork?: boolean,
  clearedToRace?: boolean
) => {
  let inspType;
  if (clearedToWork === true && clearedToRace === false) {
    inspType = InspectionType.ClearedToWork;
  } else if (clearedToWork === true && clearedToRace === true) {
    inspType = InspectionType.ClearedToRace;
  } else if (clearedToWork === false && clearedToRace === false) {
    inspType = InspectionType.NotCleared;
  }
  return inspType;
};

export const limbTreatedOptions = [
  { value: "All4", label: getLabel("All4") },
  { value: "BF", label: "BF" },
  { value: "LH", label: "LH" },
  { value: "RH", label: "RH" },
  { value: "BH", label: "BH" },
  { value: "LF", label: "LF" },
  { value: "N/A", label: "N/A" },
  { value: "RF", label: "RF" },
];

export const getLimbTypes = () => [
  { label: "Left", value: "Left" },
  { label: "Right", value: "Right" },
];

export const getKeyByTreatmentType = (treatmentType?: string, key?: string) => {
  switch (treatmentType) {
    case "Chiropractic":
      return "Chiropracticcond";
    case "PhysioTherapy":
      return "Physiotherapycond";
    default:
      return key;
  }
};

export const getApplyProtocolFields = (
  recType: HorseMedicalRecType
): string[] => {
  const currentType = getRecType(removeSpaces(recType));
  const { fields } = _.get(FORM_FIELDS, [currentType]);
  return fields.filter((field) => field.isRequired).map((field) => field.name);
};

export const hasAllRequiredFields = (
  treatment: TreatmentTemplateModel,
  inspectionType: InspectionType | null | undefined,
  requiredFieldNames: string[]
) => {
  if (_.includes(requiredFieldNames, "inspectionType") && inspectionType) {
    return true;
  } else if (
    _.includes(requiredFieldNames, "inspectionType") &&
    !inspectionType
  ) {
    return false;
  } else {
    return _.every(requiredFieldNames, (fieldName) => {
      const value = _.get(treatment, fieldName);
      return value !== undefined && value !== null && value !== "";
    });
  }
};

/**
 * Get default values with today's date populated dynamically
 */
export const getDefaultValues = () => ({
  ...DEFAULT_VALUES,
  date: getTodayISODate(),
});
