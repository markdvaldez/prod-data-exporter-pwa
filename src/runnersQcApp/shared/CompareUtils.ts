import { HorseMedicalRecType } from "@/Types/global-types";
import _ from "lodash";

export const normalizeString = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
};

export const checkNormalizedMatch = (
  originalId: string | null | undefined,
  searchQuery: string
): boolean => {
  const raw = normalizeString(originalId);
  const query = normalizeString(searchQuery);
  return _.includes(raw, query);
};

export const checkSubstring = (
  text1?: HorseMedicalRecType | null | string,
  text2?: string
): boolean => {
  return normalizeString(text1).includes(normalizeString(text2));
};

export const checkString = (
  text1?: HorseMedicalRecType | null | string,
  text2?: string
): boolean => {
  const res = _.startsWith(normalizeString(text1), normalizeString(text2));
  return _.startsWith(normalizeString(text1), normalizeString(text2));
};
