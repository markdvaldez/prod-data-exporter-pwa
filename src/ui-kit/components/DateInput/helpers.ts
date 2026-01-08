import { DateTime } from "luxon";
import { formatToISODate } from "@/runnersQcApp/shared/DateUtils";

export const convertToJSDate = (isoString?: string): Date | undefined => {
  if (!isoString) return;
  const dt = DateTime.fromISO(isoString).startOf("day");
  return dt.isValid ? dt.toJSDate() : undefined; // 2024-01-02 to Date
};

export const convertJSDateToString = (jsDate?: Date | undefined): string => {
  if (!jsDate) return "";
  const dt = DateTime.fromJSDate(jsDate);
  return dt.isValid ? dt.toFormat("LL/dd/yyyy") : ""; // 02/21/2025
};

export const convertJSDateToISODate = (jsDate?: Date | undefined): string => {
  return formatToISODate(jsDate);
};
