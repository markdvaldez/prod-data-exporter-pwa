import {
  HorseDeathReason,
  HorseLocationModel,
  HorseMedicalRecType,
  HorseMedicalResponse,
  HorseMedicalRouteAdmin,
  HorseRetireReason,
  LocationType,
  QCStatus,
} from "@/Types/global-types";
import { useTranslations } from "next-intl";
import { z } from "zod/v4";

export type TOption = {
  label: string;
  value: string | null | undefined;
  key?: string;
};

export enum Modality {
  PET = "PET",
  Ultrasound = "Ultrasound",
  Radiograph = "Radiograph",
  CT = "CT",
  MRI = "MRI",
  BoneScan = "BoneScan",
  Other = "Other",
}

export enum LimbTreated {
  All4 = "All4",
  BF = "BF",
  LH = "LH",
  RH = "RH",
  BH = "BH",
  LF = "LF",
  NA = "N/A",
  RF = "RF",
}

export enum InspectionType {
  NotCleared = "Not cleared",
  ClearedToWork = "Cleared to work",
  ClearedToRace = "Cleared to race",
}

export enum DosageMeasureType {
  ml = "ml",
  mg = "mg",
}

export type TMediaFileType =
  | "audio"
  | "photo"
  | "video"
  | "image"
  | "pdf"
  | "unknown";

export type TMediaFile = {
  id: string;
  path: string;
  name: string;
  type: string;
  withDeleteIcon?: boolean;
};

export enum RecordStatusType {
  IDLE = "idle",
  IS_SYNCED = "isSynced",
  QUEUE = "queue",
}

export type HorseMedicalResponseType = HorseMedicalResponse & {
  id: string;
  isSynced: boolean;
  timestamp: number;
  status: RecordStatusType;
  locationName?: string;
  location?: HorseLocationModel;
  treatmentLocationName?: string;
  hisaHorseName?: string;
  descriptionText?: string | null;
  createdByPersonId?: string;
  createdDateTime?: string;
  responsibleHisaPerson?: string;
  createdDate?: string;
  //   drug: string;
  files?: TMediaFile[];
  documentPaths?: {
    path: string;
    id: string;
    name: string;
    type: string;
  }[];
};

export type TPerson = {
  hisaPersonId: string;
  hisaPersonName: string;
};

export type TFormFields = {
  horses: THorse[] | null;
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
  limbTreated?: string;
  structure?: string;
  prescribingVet?: string;
  description?: string;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  inspectionType?: string;
  testResults?: string;
};

export type TFieldName = keyof TFormFields;

export type TFormByProtocolData = TFormFields;

export type TFunc = ReturnType<typeof useTranslations>;

export const HorseSchema = z.object({
  hisaHorseId: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  name: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  yearOfBirth: z.number().optional(),
  damName: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  ownerHisaId: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  ownerName: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  responsiblePersonHisaId: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  responsiblePersonName: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  attendingVet: z.array(z.string()).optional(),
  attendingVetName: z.array(z.string()).optional(),
  locationId: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  locationName: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  canRace: z.boolean().optional(),
  canRaceReason: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  canWork: z.boolean().optional(),
  canWorkReason: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  lastUpdate: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
});

export type THorse = z.infer<typeof HorseSchema>;

// Enums
export const RecTypeSchema = z.enum(
  Object.values(HorseMedicalRecType).filter(
    (value) => typeof value === "string"
  ) as [string, ...string[]]
);

export const RouteAdminSchema = z.enum(
  Object.values(HorseMedicalRouteAdmin).filter(
    (value) => typeof value === "string"
  ) as [string, ...string[]]
);

export const HorseRetireReasonSchema = z.enum(
  Object.values(HorseRetireReason).filter(
    (value) => typeof value === "string"
  ) as [string, ...string[]]
);

export const HorseDeathReasonSchema = z.enum(
  Object.values(HorseDeathReason).filter(
    (value) => typeof value === "string"
  ) as [string, ...string[]]
);

export const QCStatusSchema = z.enum(
  Object.values(QCStatus).filter((value) => typeof value === "string") as [
    string,
    ...string[]
  ]
);

export const HorseMedicalRecognizedNameSchema = z.object({
  name: z.string().nullable().optional(),
  expiry: z.string().optional(),
  administeredDate: z.string().optional(),
});

export const DocumentSchema = z.object({
  path: z.string(),
  id: z.string(),
  name: z.string(),
  type: z.string(),
  originalFile: z.any().optional(),
});

export const HorseMedicalResponseSchema = z.object({
  locationId: z.string().nullable().optional(),
  horseLocationId: z.string().nullable().optional(),
  hisaHorseId: z.string().min(1),
  designatedOwnerId: z.string().nullable().optional(),
  designatedOwner: z.string().nullable().optional(),
  responsibleHisaPersonId: z.string().nullable().optional(),
  createdBy: z.string().nullable().optional(),
  updatedBy: z.string().nullable().optional(),
  treatingHisaPersonId: z.string().nullable().optional(),
  attendingVetId: z.string().nullable().optional(),
  attendingVet: z.string().nullable().optional(),
  date: z.string().optional(),
  time: z.string().nullable().optional(),
  clearedToWork: z.boolean().optional(),
  clearedToRace: z.boolean().optional(),
  recType: RecTypeSchema,
  vaccine: z.string().nullable().optional(),
  drugName: z.string().nullable().optional(),
  drugRoute: RouteAdminSchema.optional(),
  drugDosage: z.string().nullable().optional(),
  procedure: z.string().nullable().optional(),
  surgery: z.string().nullable().optional(),
  dental: z.string().nullable().optional(),
  physiotherapy: z.string().nullable().optional(),
  chiropractic: z.string().nullable().optional(),
  modality: z.string().nullable().optional(),
  testName: z.string().nullable().optional(),
  necropsyCategory: z.string().nullable().optional(),
  testResults: z.string().nullable().optional(),
  limbTreated: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  associatedDocumentUrls: z.array(z.string()).nullable().optional(),
  structure: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  relatedVetsListId: z.string().nullable().optional(),
  classifiedAs: z.string().nullable().optional(),
  retireReason: HorseRetireReasonSchema.nullable().optional(),
  dateOfDeath: z.string().nullable().optional(),
  deathReason: HorseDeathReasonSchema.nullable().optional(),
  latLng: z.string().nullable().optional(),
  drugPerscribingVetHisaId: z.string().nullable().optional(),
  treatingPersonRole: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  internalNotes: z.string().nullable().optional(),
  includeInStatus: z.boolean().nullable().optional(),
  qcStatus: QCStatusSchema.nullable().optional(),
  hisaHorseMedicalId: z.string().nullable().optional(),
  uuid: z.string().nullable().optional(),
  isDeleted: z.boolean().optional(),
  locationName: z.string().nullable().optional(),
  horseLocationName: z.string().nullable().optional(),
  hisaHorseName: z.string().nullable().optional(),
  responsibleHisaPersonName: z.string().nullable().optional(),
  treatingHisaPersonName: z.string().nullable().optional(),
  designatedOwnerName: z.string().nullable().optional(),
  attendingVetName: z.string().nullable().optional(),
  displayName: z.string().nullable().optional(),
  conditionTreated: z.string().nullable().optional(),
  recognizedVaccines: z
    .array(HorseMedicalRecognizedNameSchema)
    .nullable()
    .optional(),
  recognizedTests: z
    .array(HorseMedicalRecognizedNameSchema)
    .nullable()
    .optional(),
  //
  lastUpdate: z.string().optional(),
  createdDate: z.string().optional(),
  internalId: z.string().nullable().optional(),
  isSynced: z.boolean().optional(),
  timestamp: z.number().optional(),
  files: z.array(z.any()).optional(),
  documentPaths: z.array(DocumentSchema).optional(),
});

export type THorseMedicalRecord = z.infer<typeof HorseMedicalResponseSchema>;

export const locationTypes = [
  LocationType.Racetrack,
  LocationType.AfterCare,
  LocationType.Farm,
  LocationType.HISA,
  LocationType.HIWU,
  LocationType.Lab,
  LocationType.Other,
  LocationType.OwnershipLLC,
  LocationType.StateRacingCommission,
  LocationType.TrainingTrack,
  LocationType.VetPractice,
];
