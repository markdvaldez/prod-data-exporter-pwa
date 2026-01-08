import { checkString } from "@/runnersQcApp/shared/CompareUtils";
import { TLocation } from "@/services/store/modules/locations/types";
import { LocationType } from "@/Types";
import _ from "lodash";

export enum SearchType {
  BY_NAME = "BY_NAME",
  BY_GEOLOCATION = "BY_GEOLOCATION",
}

export type FilterParams = {
  distance?: number;
  types?: LocationType[];
  searchWord?: string;
};

export type FilterFunction = (
  record: TLocation,
  params: FilterParams
) => boolean;

export function detectSearchType(input: string = ""): SearchType {
  const trimmed = input.trim();

  if (/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(trimmed))
    return SearchType.BY_GEOLOCATION;

  return SearchType.BY_NAME;
}

// filters
export const typeFilterFn: FilterFunction = (record, params): boolean => {
  if (_.isEmpty(params.types)) {
    return true;
  }
  return _.includes(params.types, record.type);
};

export const distanceFilterFn: FilterFunction = (record, params): boolean => {
  if (!params.distance) return true;
  return (record?.distance || 0) <= params?.distance;
};

export const searchWordFilterFn: FilterFunction = (record, params): boolean => {
  if (_.isEmpty(params.searchWord)) {
    return true;
  }
  return (
    checkString(record.locationName, params.searchWord) ||
    checkString(record.locationId, params.searchWord)
  );
};

export function filterRecords(
  records: TLocation[],
  filters: FilterFunction[],
  params: FilterParams
): TLocation[] {
  return records.filter((record) => {
    return filters.every((filter) => filter(record, params));
  });
}

export const clearSearchText = (text: string | null | undefined): string =>
  _.trim((text || "").replace(/\s+/g, " "))
    .replace(/[“”‘’`‛⁂]+/g, "'")
    .toLowerCase();
