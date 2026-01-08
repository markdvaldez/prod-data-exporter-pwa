import { DateTime } from "luxon";

export const getQueryDate = ({ date = "" }: { date?: string }): string => {
  const isValidDate = DateTime.fromISO(date).isValid;
  return isValidDate
    ? date
    : DateTime.fromFormat(date, "LL/dd/yyyy").toFormat("yyyy-LL-dd");
};

export const isValidTimeFormat = (input: any): boolean => {
  const parsedDate = DateTime.fromFormat(input, "HH:mm:ss", { zone: "utc" });
  return (
    parsedDate.isValid &&
    parsedDate.hour !== undefined &&
    parsedDate.minute !== undefined &&
    parsedDate.second !== undefined
  );
};

/**
 * Formats a date to YYYY-MM-DD format
 * @param date - Can be a Date object, DateTime object, ISO string, or various date string formats
 * @returns Formatted date string in YYYY-MM-DD format, or empty string if invalid
 */
export const formatToISODate = (date?: Date | DateTime | string): string => {
  if (!date) {
    return '';
  }

  let dt: DateTime;

  if (date instanceof Date) {
    dt = DateTime.fromJSDate(date);
  } else if (DateTime.isDateTime(date)) {
    dt = date;
  } else if (typeof date === 'string') {
    // Try parsing as ISO first, then common formats
    dt = DateTime.fromISO(date);
    if (!dt.isValid) {
      dt = DateTime.fromFormat(date, 'LL/dd/yyyy');
    }
    if (!dt.isValid) {
      dt = DateTime.fromFormat(date, 'yyyy-LL-dd');
    }
    if (!dt.isValid) {
      dt = DateTime.fromFormat(date, 'dd/LL/yyyy');
    }
    if (!dt.isValid) {
      dt = DateTime.fromFormat(date, 'LLLL dd, yyyy');
    }
  } else {
    return '';
  }

  return dt.isValid ? dt.toFormat('yyyy-LL-dd') : '';
};

export const getNow = (): DateTime => DateTime.now();

export const getNowUTC = (): string => DateTime.now().toUTC().toISO();

export const getNowDate = (): string => getTodayISODate();

/**
 * Gets today's date in YYYY-MM-DD format (alias for getNowDate)
 * @returns Today's date string in YYYY-MM-DD format
 */
export const getTodayISODate = (): string => formatToISODate(DateTime.now());

export const getWeekDayISO = (date: string = ""): string => {
  if (!date) {
    return "";
  }
  const parsedDate = DateTime.fromISO(date);
  return parsedDate.isValid ? parsedDate.toFormat("EEE") : "";
};

export const getDayISO = (date: string = ""): string => {
  if (!date) {
    return "";
  }
  const parsedDate = DateTime.fromISO(date);
  return parsedDate.isValid ? parsedDate.toFormat("d") : "";
};

export const getMonthISO = (date: string = ""): string => {
  if (!date) {
    return "";
  }
  const parsedDate = DateTime.fromISO(date);
  return parsedDate.isValid ? parsedDate.toFormat("LLLL") : "";
};

export const getShortMonthISO = (date: string = ""): string => {
  if (!date) {
    return "";
  }
  const parsedDate = DateTime.fromISO(date);
  return parsedDate.isValid ? parsedDate.toFormat("LLL").toUpperCase() : "";
};

export const getDateTime = (date?: string): DateTime | undefined =>
  date ? DateTime.fromFormat(date, 'yyyy-LL-dd', {}) : undefined;

  export const checkDateWithZone = ({
    dt1,
    dt2,
    maxDays,
  }: {
    dt1: DateTime;
    dt2: DateTime;
    maxDays: number;
  }): boolean => {
    dt1 = dt1.startOf('day').setZone('America/New_York');
    dt2 = dt2.startOf('day').setZone('America/New_York');
  
    return dt1 && dt2 && dt1.diff(dt2, 'days').days <= maxDays;
  };

  export const convertTime24To12h = (time: string = ''): string => {
    const parsedDate = DateTime.fromFormat(time, 'hh:mm:ss');
    return parsedDate?.isValid &&
      parsedDate.hour !== undefined &&
      parsedDate.minute !== undefined &&
      parsedDate.second !== undefined
      ? parsedDate.toFormat('hh:mm a')
      : '';
  };

  export const getFormattedDate = (date: string = ''): string => {
    if (!date) {
      return '';
    }
    const parsedDate = DateTime.fromFormat(date, 'yyyy-LL-dd');
    return parsedDate.isValid ? parsedDate.toFormat('LLLL dd, yyyy') : '';
  };

// END OF FILE
