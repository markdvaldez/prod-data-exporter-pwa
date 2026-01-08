import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";

export const getFormattedLocation = ({
  name,
  hisaId,
}: {
  name?: string | null;
  hisaId?: string | null;
}): string => {
  let result = "";
  if (name) {
    result += ` ${name}`;
  }
  if (hisaId) {
    result += ` (${getFormattedId(hisaId)})`;
  }

  return result;
};

export const getFormattedLocationWithQuotes = ({
  name,
  hisaId,
}: {
  name?: string | null;
  hisaId?: string | null;
}): string => {
  let result = "";
  if (name) {
    result += `"${name}"`;
  }
  if (hisaId) {
    result += ` (${getFormattedId(hisaId)})`;
  }

  return result;
};
