import { HorseMedicalRecType } from "@/Types";
import _ from "lodash";
import { getFormattedId } from "../pages/MainPage/helpers";
import { TFunc } from "./types";

export const getNumbers = (text?: string) =>
  (text || "").replace(/[^0-9.]/g, "");

export const formatNumber = (text: string): string => {
  text = text.replace(/^0+(\d+)/, "$1");

  const firstDotIndex = text.indexOf(".");

  if (firstDotIndex !== -1) {
    const beforeDot = text.substring(0, firstDotIndex);
    let afterDot = text.substring(firstDotIndex + 1);

    const cleanedAfterDot = afterDot.replace(/\./g, "");

    afterDot = cleanedAfterDot.replace(/0+$/, "");

    if (afterDot === "") {
      text = beforeDot;
    } else {
      text = beforeDot + "." + afterDot;
    }
  }

  return text;
};

export function getMeasure(text: string = ""): string {
  const match = (text || "").match(/(mg|ml)/i);

  return match ? match[0].toLowerCase() : "";
}

export const formatInput = (text?: string | null): string => {
  if (!text) {
    return "";
  }
  text = text.replace(/^0+(\d+)/, "$1");
  const [beforeDot, afterDot = ""] = text.split(".");
  return afterDot ? `${beforeDot}.${afterDot.replace(/\./g, "")}` : beforeDot;
};

export const removeSpaces = (str?: string | null) =>
  (str || "").replace(/\s+/g, "");

export const getRecType = (t: TFunc, recType?: string | null) => {
  if (!recType) {
    return "";
  }

  if (recType === HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection) {
    return t("mandatoryAttendingVetInsp");
  }
  if (recType === HorseMedicalRecType.Test) {
    return t("testAndDiagnostics");
  }

  return recType.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const clearSearchText = (text: string | null | undefined): string =>
  _.trim((text || "").replace(/\s+/g, " "))
    .replace(/[“”‘’`‛⁂]+/g, "'")
    .toLowerCase();

export const getFormattedTitle = ({
  name,
  hisaId,
  programNumber,
}: {
  name?: string | null;
  hisaId?: string | null;
  programNumber?: string | null;
}): string => {
  let result = "";
  if (programNumber) {
    result += `${programNumber}.`;
  }
  if (name) {
    result += ` ${name}`;
  }
  if (hisaId) {
    result += ` (${getFormattedId(hisaId)})`;
  }

  return result;
};

export const splitCamelCase = (str: string): string => {
  if (!str) return "";
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export const getTruncatedText = (
  text: string = "",
  maxLength: number = 100
) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

export const mergeText = (
  text1?: string,
  text2?: string,
  delimiter?: string
): string => {
  return `${text1 || ""}${delimiter || ""}${text2 || ""}`.trim();
};

export function joinAddressParts(
  ...parts: (string | undefined | null)[]
): string {
  return parts.filter(Boolean).join(", ");
}

export const escapeRegExp = (str: string): string =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');