import { checkSubstring } from "@/runnersQcApp/shared/CompareUtils";
import { TPerson } from "@/Types";
import _ from "lodash";

export type FilterParams = {
  searchWord?: string;
};

export type FilterFunction = (record: TPerson, params: FilterParams) => boolean;

// filters
export const searchWordFilterFn: FilterFunction = (record, params): boolean => {
  if (_.isEmpty(params.searchWord)) {
    return true;
  }
  return (
    checkSubstring(record.hisaPersonId, params.searchWord) ||
    checkSubstring(record.hisaPersonName, params.searchWord)
  );
};

export function filterRecords(
  records: TPerson[],
  filters: FilterFunction[],
  params: FilterParams
): TPerson[] {
  return records.filter((record) => {
    return filters.every((filter) => filter(record, params));
  });
}
