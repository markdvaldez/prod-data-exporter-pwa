import { PersonResponse } from "@/Types/global-types";
import _ from "lodash";

export const getUserInitials = (
  userData: PersonResponse | null | undefined
): string | undefined => {
  if (userData?.name) {
    const { firstName, lastName } = userData.name;
    return `${firstName?.charAt(0).toUpperCase()}${lastName
      ?.charAt(0)
      .toUpperCase()}`;
  }
};

export const getFormattedId = (
  text: string | null | undefined,
  mask: string = "X-XXX-XXX-XXX"
): string => {
  let result = "";
  if (!text) {
    return result;
  }
  const nextText = _.split(text, "");
  result = _.chain(mask)
    .split("")
    .map((value) => {
      if (value === "X") {
        return _.pullAt(nextText, [0]);
      } else {
        return value;
      }
    })
    .join("")
    .value();

  return result;
};

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

export const getUserFullName = (
  userData: PersonResponse | null | undefined
): string | undefined => {
  if (userData?.name) {
    const { firstName, lastName } = userData.name;
    return `${firstName} ${lastName}`;
  }
};
