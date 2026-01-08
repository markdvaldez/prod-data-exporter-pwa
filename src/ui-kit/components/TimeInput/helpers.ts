import { DateTime } from "luxon";

export const hours = [
  "12",
  ...Array.from({ length: 11 }, (_, i) => String(i + 1).padStart(2, "0")),
];

export const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

export const convertTo24HourFormat = (
  hour: string,
  minute: string,
  period: string
): string => {
  const dt = DateTime.fromFormat(
    `${hour}:${minute} ${period}`.toUpperCase(),
    "hh:mm a"
  );
  return dt.isValid ? dt.toFormat("HH:mm:ss") : "";
};

export const parse24HourFormat = (
  time24: string
): {
  hour: string;
  minute: string;
  period: string;
} => {
  const result = {
    hour: "12",
    minute: "00",
    period: "PM",
  };
  const dt = DateTime.fromFormat(time24, "HH:mm:ss");
  if (dt.isValid) {
    result.hour = dt.toFormat("hh");
    result.minute = dt.toFormat("mm");
    result.period = dt.toFormat("a");
  }
  return result;
};
