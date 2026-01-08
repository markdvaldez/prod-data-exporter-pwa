import { LocationType } from "@/Types";

import { TFunc } from "@/runnersQcApp/shared/types";
import { getFormattedLocation } from "@/utils/locationId";
import _ from "lodash";
import { FORM_FIELDS, FormFieldType } from "./CreateFormViewConfig";
import { IdType, ValueType } from "./types";

export const getFormCreateLocationFields = (
  locationType: LocationType
): FormFieldType => {
  return _.get(FORM_FIELDS, [locationType]);
};

export const stateOptions = [
  { value: "Alabama, AL", label: "AL" },
  { value: "Alaska, AK", label: "AK" },
  { value: "Arizona, AZ", label: "AZ" },
  { value: "Arkansas, AR", label: "AR" },
  { value: "California, CA", label: "CA" },
  { value: "Colorado, CO", label: "CO" },
  { value: "Connecticut, CT", label: "CT" },
  { value: "Delaware, DE", label: "DE" },
  { value: "Florida, FL", label: "FL" },
  { value: "Georgia, GA", label: "GA" },
  { value: "Hawaii, HI", label: "HI" },
  { value: "Illinois, IL", label: "IL" },
  { value: "Indiana, IN", label: "IN" },
  { value: "Iowa, IA", label: "IA" },
  { value: "Kansas, KS", label: "KS" },
  { value: "Kentucky, KY", label: "KY" },
  { value: "Louisiana, LA", label: "LA" },
  { value: "Maine, ME", label: "ME" },
  { value: "Maryland, MD", label: "MD" },
  { value: "Massachusetts, MA", label: "MA" },
  { value: "Michigan, MI", label: "MI" },
  { value: "Minnesota, MN", label: "MN" },
  { value: "Mississippi, MS", label: "MS" },
  { value: "Missouri, MO", label: "MO" },
  { value: "Montana, MT", label: "MT" },
  { value: "Nebraska, NE", label: "NE" },
  { value: "Nevada, NV", label: "NV" },
  { value: "New Hampshire, NH", label: "NH" },
  { value: "New Jersey, NJ", label: "NJ" },
  { value: "New Mexico, NM", label: "NM" },
  { value: "New York, NY", label: "NY" },
  { value: "North Carolina, NC", label: "NC" },
  { value: "North Dakota, ND", label: "ND" },
  { value: "Ohio, OH", label: "OH" },
  { value: "Oklahoma, OK", label: "OK" },
  { value: "Oregon, OR", label: "OR" },
  { value: "Pennsylvania, PA", label: "PA" },
  { value: "Rhode Island, RI", label: "RI" },
  { value: "South Carolina, SC", label: "SC" },
  { value: "South Dakota, SD", label: "SD" },
  { value: "Tennessee, TN", label: "TN" },
  { value: "Texas, TX", label: "TX" },
  { value: "Utah, UT", label: "UT" },
  { value: "Vermont, VT", label: "VT" },
  { value: "Virginia, VA", label: "VA" },
  { value: "Washington, WA", label: "WA" },
  { value: "West Virginia, WV", label: "WV" },
  { value: "Wisconsin, WI", label: "WI" },
  { value: "Wyoming, WY", label: "WY" },
];

export const countryOptions = [
  { label: "USA", value: "USA" },
  { label: "Canada", value: "Canada" },
  { label: "Mexico", value: "Mexico" },
  { label: "UK", value: "UK" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "Ireland", value: "Ireland" },
  { label: "Australia", value: "Australia" },
];

export const filterStatesByInput = (
  array: { label: string; value: string }[],
  input: string
) => {
  return _.filter(
    array,
    (obj) =>
      _.startsWith(_.toLower(obj.label), _.toLower(input)) ||
      _.includes(_.toLower(obj.value), _.toLower(input))
  );
};

export const stateMap: { [key in IdType]: ValueType } = {
  [IdType.AL]: ValueType.Alabama,
  [IdType.AK]: ValueType.Alaska,
  [IdType.AZ]: ValueType.Arizona,
  [IdType.AR]: ValueType.Arkansas,
  [IdType.CA]: ValueType.California,
  [IdType.CO]: ValueType.Colorado,
  [IdType.CT]: ValueType.Connecticut,
  [IdType.DE]: ValueType.Delaware,
  [IdType.FL]: ValueType.Florida,
  [IdType.GA]: ValueType.Georgia,
  [IdType.HI]: ValueType.Hawaii,
  [IdType.ID]: ValueType.Idaho,
  [IdType.IL]: ValueType.Illinois,
  [IdType.IN]: ValueType.Indiana,
  [IdType.IA]: ValueType.Iowa,
  [IdType.KS]: ValueType.Kansas,
  [IdType.KY]: ValueType.Kentucky,
  [IdType.LA]: ValueType.Louisiana,
  [IdType.ME]: ValueType.Maine,
  [IdType.MD]: ValueType.Maryland,
  [IdType.MA]: ValueType.Massachusetts,
  [IdType.MI]: ValueType.Michigan,
  [IdType.MN]: ValueType.Minnesota,
  [IdType.MS]: ValueType.Mississippi,
  [IdType.MO]: ValueType.Missouri,
  [IdType.MT]: ValueType.Montana,
  [IdType.NE]: ValueType.Nebraska,
  [IdType.NV]: ValueType.Nevada,
  [IdType.NH]: ValueType.NewHampshire,
  [IdType.NJ]: ValueType.NewJersey,
  [IdType.NM]: ValueType.NewMexico,
  [IdType.NY]: ValueType.NewYork,
  [IdType.NC]: ValueType.NorthCarolina,
  [IdType.ND]: ValueType.NorthDakota,
  [IdType.OH]: ValueType.Ohio,
  [IdType.OK]: ValueType.Oklahoma,
  [IdType.OR]: ValueType.Oregon,
  [IdType.PA]: ValueType.Pennsylvania,
  [IdType.RI]: ValueType.RhodeIsland,
  [IdType.SC]: ValueType.SouthCarolina,
  [IdType.SD]: ValueType.SouthDakota,
  [IdType.TN]: ValueType.Tennessee,
  [IdType.TX]: ValueType.Texas,
  [IdType.UT]: ValueType.Utah,
  [IdType.VT]: ValueType.Vermont,
  [IdType.VA]: ValueType.Virginia,
  [IdType.WA]: ValueType.Washington,
  [IdType.WV]: ValueType.WestVirginia,
  [IdType.WI]: ValueType.Wisconsin,
  [IdType.WY]: ValueType.Wyoming,
};

export const getStateByCode = (code: string | null | undefined) => {
  return stateMap[code as IdType] || code || "";
};

export const getStateCodeByName = (name: string | null | undefined) => {
  return _.findKey(stateMap, (v) => v === name) || name || "";
};

export const getShortZipCode = (zipCode: string | null | undefined) => {
  if (!zipCode) {
    return;
  }
  return _.split(zipCode, "", 5).join("");
};

export const getLocationNameForSuccess = (
  name: string | null | undefined,
  locationId: string | null | undefined,
  t: TFunc
) => {
  return `${t("locationName")}: ${getFormattedLocation({
    name,
    hisaId: locationId,
  })}`;
};
