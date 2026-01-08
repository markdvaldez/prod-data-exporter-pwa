import { DateTime } from "luxon";
import { formatToISODate, getTodayISODate } from "../DateUtils";

describe("formatToISODate", () => {
  beforeEach(() => {
    // Set timezone to UTC for consistent testing
    process.env.TZ = "UTC";
  });

  afterEach(() => {
    delete process.env.TZ;
  });

  it("formats Date object to YYYY-MM-DD", () => {
    const date = new Date("2024-03-15T10:30:00Z");
    expect(formatToISODate(date)).toBe("2024-03-15");
  });

  it("formats DateTime object to YYYY-MM-DD", () => {
    const dateTime = DateTime.fromISO("2024-12-25T15:45:30Z");
    expect(formatToISODate(dateTime)).toBe("2024-12-25");
  });

  it("formats ISO string to YYYY-MM-DD", () => {
    expect(formatToISODate("2024-06-10T08:20:15Z")).toBe("2024-06-10");
    expect(formatToISODate("2024-01-01")).toBe("2024-01-01");
  });

  it("formats MM/DD/YYYY string to YYYY-MM-DD", () => {
    expect(formatToISODate("12/25/2024")).toBe("2024-12-25");
    expect(formatToISODate("01/01/2024")).toBe("2024-01-01");
  });

  it("formats DD/MM/YYYY string to YYYY-MM-DD", () => {
    expect(formatToISODate("25/12/2024")).toBe("2024-12-25");
    expect(formatToISODate("01/01/2024")).toBe("2024-01-01");
  });

  it("formats long date string to YYYY-MM-DD", () => {
    expect(formatToISODate("December 25, 2024")).toBe("2024-12-25");
    expect(formatToISODate("January 01, 2024")).toBe("2024-01-01");
  });

  it("returns empty string for invalid dates", () => {
    expect(formatToISODate("invalid-date")).toBe("");
    expect(formatToISODate("")).toBe("");
    expect(formatToISODate("not-a-date")).toBe("");
  });

  it("returns empty string for null/undefined", () => {
    expect(formatToISODate(null as any)).toBe("");
    expect(formatToISODate(undefined)).toBe("");
  });

  it("handles edge cases", () => {
    expect(formatToISODate("2024-02-29")).toBe("2024-02-29"); // Leap year
    expect(formatToISODate("2024-13-01")).toBe(""); // Invalid month
  });
});

describe("getTodayISODate", () => {
  it("returns today's date in YYYY-MM-DD format", () => {
    const today = getTodayISODate();
    const expectedFormat = /^\d{4}-\d{2}-\d{2}$/;
    expect(today).toMatch(expectedFormat);
    
    // Verify it's actually today by comparing with DateTime.now()
    const nowFormatted = DateTime.now().toFormat("yyyy-LL-dd");
    expect(today).toBe(nowFormatted);
  });
});