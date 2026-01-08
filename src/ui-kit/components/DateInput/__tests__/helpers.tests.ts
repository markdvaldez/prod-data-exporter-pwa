import {
  convertJSDateToISODate,
  convertJSDateToString,
  convertToJSDate,
} from "../helpers";

describe("convertToJSDate", () => {
  test("should convert a valid ISO string to a JavaScript Date", () => {
    const input = "2023-12-22";
    const result = convertToJSDate(input);

    expect(result).toBeInstanceOf(Date);
    expect(result?.toISOString()).toBe("2023-12-22T00:00:00.000Z");
  });

  test("should return undefined for an empty string", () => {
    expect(convertToJSDate("")).toBeUndefined();
  });

  test("should return undefined for undefined input", () => {
    expect(convertToJSDate(undefined)).toBeUndefined();
  });

  test("should return undefined for invalid date strings", () => {
    expect(convertToJSDate("invalid-date")).toBeUndefined();
  });

  test("should handle time zone differences correctly", () => {
    const input = "2023-12-22T15:30:00Z";
    const result = convertToJSDate(input);

    expect(result).toBeInstanceOf(Date);
    expect(result?.toISOString()).toBe("2023-12-22T00:00:00.000Z");
  });
});

describe("convertJSDateToString", () => {
  test("should convert a valid Date object to a formatted string", () => {
    const date = new Date(Date.UTC(2025, 1, 21)); // 21st Feb 2025 in UTC
    const result = convertJSDateToString(date);

    expect(result).toBe("02/21/2025"); // Expected format "MM/dd/yyyy"
  });

  test("should return an empty string for undefined input", () => {
    expect(convertJSDateToString(undefined)).toBe("");
  });

  test("should return an empty string for null input", () => {
    expect(convertJSDateToString(null as unknown as Date)).toBe("");
  });

  test("should handle different months and days correctly", () => {
    const date = new Date(Date.UTC(2023, 4, 5)); // May 5th, 2023 (month is 0-based)
    expect(convertJSDateToString(date)).toBe("05/05/2023");
  });

  test("should handle December correctly", () => {
    const date = new Date(Date.UTC(2024, 11, 31)); // Dec 31st, 2024
    expect(convertJSDateToString(date)).toBe("12/31/2024");
  });

  test("should handle invalid dates gracefully", () => {
    const invalidDate = new Date("invalid-date"); // Invalid date
    expect(convertJSDateToString(invalidDate)).toBe("");
  });
});

describe("convertJSDateToISODate", () => {
  test("should convert a valid Date object to a formatted ISO string", () => {
    const date = new Date(Date.UTC(2024, 0, 2)); // 2nd Jan 2024 (UTC)
    const result = convertJSDateToISODate(date);

    expect(result).toBe("2024-01-02"); // Expected format "yyyy-LL-dd"
  });

  test("should return an empty string for undefined input", () => {
    expect(convertJSDateToISODate(undefined)).toBe("");
  });

  test("should return an empty string for null input", () => {
    expect(convertJSDateToISODate(null as unknown as Date)).toBe("");
  });

  test("should handle different months and days correctly", () => {
    const date = new Date(Date.UTC(2024, 5, 15)); // June 15th, 2024
    expect(convertJSDateToISODate(date)).toBe("2024-06-15");
  });

  test("should handle December correctly", () => {
    const date = new Date(Date.UTC(2024, 11, 31)); // December 31st, 2024
    expect(convertJSDateToISODate(date)).toBe("2024-12-31");
  });

  test("should handle invalid dates gracefully", () => {
    const invalidDate = new Date("invalid-date"); // Invalid date
    expect(convertJSDateToISODate(invalidDate)).toBe("");
  });
});
