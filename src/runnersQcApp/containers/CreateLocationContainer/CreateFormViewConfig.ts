import { LocationType } from "@/Types";
import { z } from "zod/v4";

export type Field = {
  name: string;
  isRequired: boolean;
};

export type FormFieldType = {
  fields: Field[];
  schema: z.ZodObject;
  defaultValues?: Record<string, string>;
  isActive: boolean;
  editable: boolean;
};

export type FormFieldsType = Record<string, FormFieldType>;

export const FORM_FIELDS: FormFieldsType = {
  [LocationType.Racetrack]: {
    fields: [
      { name: "locationName", isRequired: true },
      { name: "equibaseCode", isRequired: true },
      { name: "street", isRequired: true },
      { name: "city", isRequired: true },
      { name: "state", isRequired: true },
      { name: "zipPostalCode", isRequired: true },
      { name: "country", isRequired: true },
      { name: "notes", isRequired: false },
    ],
    schema: z.object({
      locationName: z.string().nonempty("This field is required"),
      street: z.string().nonempty("This field is required"),
      city: z.string().trim().nonempty("This field is required"),
      state: z.string().trim().nonempty("This field is required"),
      zipPostalCode: z.string().trim().nonempty("This field is required"),
      equibaseCode: z.string().trim().nonempty("This field is required"),
      country: z.string().trim().nonempty("This field is required"),
      unitAptBoxNumber: z.string().optional(),
    }),
    isActive: true,
    editable: true,
  },
  [LocationType.Farm]: {
    fields: [
      { name: "locationName", isRequired: true },
      { name: "street", isRequired: true },
      { name: "city", isRequired: true },
      { name: "state", isRequired: true },
      { name: "zipPostalCode", isRequired: true },
      { name: "country", isRequired: true },
      { name: "unitAptBoxNumber", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    schema: z.object({
      locationName: z.string().nonempty("This field is required"),
      street: z.string().nonempty("This field is required"),
      city: z.string().trim().nonempty("This field is required"),
      state: z.string().trim().nonempty("This field is required"),
      zipPostalCode: z.string().trim().nonempty("This field is required"),
      country: z.string().trim().nonempty("This field is required"),
      unitAptBoxNumber: z.string().optional(),
    }),
    isActive: true,
    editable: true,
  },
  [LocationType.AfterCare]: {
    fields: [
      { name: "locationName", isRequired: true },
      { name: "street", isRequired: true },
      { name: "city", isRequired: true },
      { name: "state", isRequired: true },
      { name: "zipPostalCode", isRequired: true },
      { name: "country", isRequired: true },
      { name: "unitAptBoxNumber", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    schema: z.object({
      locationName: z.string().nonempty("This field is required"),
      street: z.string().nonempty("This field is required"),
      city: z.string().trim().nonempty("This field is required"),
      state: z.string().trim().nonempty("This field is required"),
      zipPostalCode: z.string().trim().nonempty("This field is required"),
      country: z.string().trim().nonempty("This field is required"),
      unitAptBoxNumber: z.string().optional(),
    }),
    isActive: true,
    editable: true,
  },
  [LocationType.Lab]: {
    fields: [
      { name: "locationName", isRequired: true },
      { name: "street", isRequired: true },
      { name: "city", isRequired: true },
      { name: "state", isRequired: true },
      { name: "zipPostalCode", isRequired: true },
      { name: "country", isRequired: true },
      { name: "unitAptBoxNumber", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    schema: z.object({
      locationName: z.string().nonempty("This field is required"),
      street: z.string().nonempty("This field is required"),
      city: z.string().trim().nonempty("This field is required"),
      state: z.string().trim().nonempty("This field is required"),
      zipPostalCode: z.string().trim().nonempty("This field is required"),
      country: z.string().trim().nonempty("This field is required"),
      unitAptBoxNumber: z.string().optional(),
    }),
    isActive: true,
    editable: true,
  },
  [LocationType.TrainingTrack]: {
    fields: [
      { name: "locationName", isRequired: true },
      { name: "street", isRequired: true },
      { name: "city", isRequired: true },
      { name: "state", isRequired: true },
      { name: "zipPostalCode", isRequired: true },
      { name: "country", isRequired: true },
      { name: "unitAptBoxNumber", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    schema: z.object({
      locationName: z.string().nonempty("This field is required"),
      street: z.string().nonempty("This field is required"),
      city: z.string().trim().nonempty("This field is required"),
      state: z.string().trim().nonempty("This field is required"),
      zipPostalCode: z.string().trim().nonempty("This field is required"),
      country: z.string().trim().nonempty("This field is required"),
      unitAptBoxNumber: z.string().optional(),
    }),
    isActive: true,
    editable: true,
  },
  [LocationType.VetPractice]: {
    fields: [
      { name: "locationName", isRequired: true },
      { name: "street", isRequired: true },
      { name: "city", isRequired: true },
      { name: "state", isRequired: true },
      { name: "zipPostalCode", isRequired: true },
      { name: "country", isRequired: true },
      { name: "unitAptBoxNumber", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    schema: z.object({
      locationName: z.string().nonempty("This field is required"),
      street: z.string().nonempty("This field is required"),
      city: z.string().trim().nonempty("This field is required"),
      state: z.string().trim().nonempty("This field is required"),
      zipPostalCode: z.string().trim().nonempty("This field is required"),
      country: z.string().trim().nonempty("This field is required"),
      unitAptBoxNumber: z.string().optional(),
    }),
    isActive: true,
    editable: true,
  },
  [LocationType.Other]: {
    fields: [
      { name: "locationName", isRequired: true },
      { name: "street", isRequired: true },
      { name: "city", isRequired: true },
      { name: "state", isRequired: true },
      { name: "zipPostalCode", isRequired: true },
      { name: "country", isRequired: true },
      { name: "unitAptBoxNumber", isRequired: false },
      { name: "notes", isRequired: false },
    ],
    schema: z.object({
      locationName: z.string().nonempty("This field is required"),
      street: z.string().nonempty("This field is required"),
      city: z.string().trim().nonempty("This field is required"),
      state: z.string().trim().nonempty("This field is required"),
      zipPostalCode: z.string().trim().nonempty("This field is required"),
      country: z.string().trim().nonempty("This field is required"),
      unitAptBoxNumber: z.string().optional(),
    }),
    isActive: true,
    editable: true,
  },
};
