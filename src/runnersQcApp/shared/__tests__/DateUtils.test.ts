import { DateTime } from "luxon";
import {
  checkDateWithZone,
  convertTime24To12h,
  getDateTime,
  getDayISO,
  getFormattedDate,
  getMonthISO,
  getNow,
  getNowDate,
  getNowUTC,
  getQueryDate,
  getShortMonthISO,
  getWeekDayISO,
  isValidTimeFormat,
} from "../DateUtils";

describe("DateUtils", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getQueryDate", () => {
    it("returns the ISO date unchanged if valid", () => {
      const iso = "2021-07-15";
      expect(getQueryDate({ date: iso })).toBe(iso);
    });

    it("converts MM/dd/yyyy to yyyy-LL-dd when ISO invalid", () => {
      const input = "12/31/2021";
      expect(getQueryDate({ date: input })).toBe("2021-12-31");
    });
  });

  describe("isValidTimeFormat", () => {
    it("returns true for valid HH:mm:ss", () => {
      expect(isValidTimeFormat("14:30:00")).toBe(true);
    });
    it("handles edge-case '24:00:00' as valid", () => {
      expect(isValidTimeFormat("24:00:00")).toBe(true);
    });
    it("returns false for completely invalid strings", () => {
      expect(isValidTimeFormat("not a time")).toBe(false);
    });
  });

  describe("getNow, getNowUTC, getNowDate", () => {
    const fakeNow = DateTime.fromISO("2022-01-02T03:04:05.000Z");
    beforeEach(() => {
      jest.spyOn(DateTime, "now").mockImplementation(() => fakeNow as any);
    });

    it("getNow returns the current DateTime", () => {
      expect(getNow()).toBe(fakeNow);
    });

    it("getNowUTC returns ISO string in UTC", () => {
      expect(getNowUTC()).toBe(fakeNow.toUTC().toISO());
    });

    it("getNowDate returns formatted date yyyy-LL-dd", () => {
      expect(getNowDate()).toBe("2022-01-02");
    });
  });

  describe("weekday, day, month, short month formats", () => {
    const date = "2021-12-25T00:00:00.000Z"; // Saturday
    it("getWeekDayISO returns short weekday", () => {
      expect(getWeekDayISO(date)).toBe("Sat");
    });
    it("getDayISO returns day of month without leading zero", () => {
      expect(getDayISO(date)).toBe("25");
    });
    it("getMonthISO returns full month name", () => {
      expect(getMonthISO(date)).toBe("December");
    });
    it("getShortMonthISO returns uppercase short month", () => {
      expect(getShortMonthISO(date)).toBe("DEC");
    });
    it("returns empty string for empty input", () => {
      expect(getWeekDayISO("")).toBe("");
      expect(getDayISO("")).toBe("");
      expect(getMonthISO("")).toBe("");
      expect(getShortMonthISO("")).toBe("");
    });
  });

  describe("getDateTime", () => {
    it("parses yyyy-LL-dd format into DateTime", () => {
      const dt = getDateTime("2021-05-05");
      expect(dt?.isValid).toBe(true);
      expect(dt?.toISODate()).toBe("2021-05-05");
    });
    it("returns undefined when no date provided", () => {
      expect(getDateTime(undefined)).toBeUndefined();
    });
  });

  describe("checkDateWithZone", () => {
    it("returns true when difference in days ≤ maxDays in EST", () => {
      const dt1 = DateTime.fromISO("2021-06-10T12:00:00.000Z");
      const dt2 = DateTime.fromISO("2021-06-08T23:00:00.000Z");
      expect(checkDateWithZone({ dt1, dt2, maxDays: 2 })).toBe(true);
    });
    it("returns false when difference in days > maxDays", () => {
      const dt1 = DateTime.fromISO("2021-06-11T00:00:00.000Z");
      const dt2 = DateTime.fromISO("2021-06-08T23:00:00.000Z");
      expect(checkDateWithZone({ dt1, dt2, maxDays: 2 })).toBe(false);
    });
  });

  describe("convertTime24To12h", () => {
    it("converts 24h to 12h format with am/pm", () => {
      expect(convertTime24To12h("14:05:00")).toBe("02:05 PM");
      expect(convertTime24To12h("00:00:00")).toBe("12:00 AM");
    });
    it("returns empty for invalid input", () => {
      expect(convertTime24To12h("invalid")).toBe("");
    });
  });

  describe("getFormattedDate", () => {
    it("formats yyyy-LL-dd to 'LLLL dd, yyyy'", () => {
      expect(getFormattedDate("2021-07-04")).toBe("July 04, 2021");
    });
    it("returns empty for empty or invalid date", () => {
      expect(getFormattedDate("")).toBe("");
      expect(getFormattedDate("not-a-date")).toBe("");
    });
  });
});
