import { convertTo24HourFormat, parse24HourFormat } from "../helpers";

describe("convertTo24HourFormat", () => {
  test("converts AM times correctly", () => {
    expect(convertTo24HourFormat("12", "00", "AM")).toBe("00:00:00");
    expect(convertTo24HourFormat("01", "30", "AM")).toBe("01:30:00");
    expect(convertTo24HourFormat("06", "15", "AM")).toBe("06:15:00");
    expect(convertTo24HourFormat("11", "59", "AM")).toBe("11:59:00");
  });

  test("converts PM times correctly", () => {
    expect(convertTo24HourFormat("12", "00", "PM")).toBe("12:00:00");
    expect(convertTo24HourFormat("01", "45", "PM")).toBe("13:45:00");
    expect(convertTo24HourFormat("06", "30", "PM")).toBe("18:30:00");
    expect(convertTo24HourFormat("11", "59", "PM")).toBe("23:59:00");
  });

  test("handles invalid inputs", () => {
    expect(convertTo24HourFormat("", "30", "AM")).toBe("");
    expect(convertTo24HourFormat("10", "60", "AM")).toBe("");
    expect(convertTo24HourFormat("10", "30", "XX")).toBe("");
  });
});

describe("parse24HourFormat", () => {
  test("converts 24-hour format to 12-hour AM/PM format", () => {
    expect(parse24HourFormat("00:00:00")).toEqual({
      hour: "12",
      minute: "00",
      period: "AM",
    });
    expect(parse24HourFormat("06:15:30")).toEqual({
      hour: "06",
      minute: "15",
      period: "AM",
    });
    expect(parse24HourFormat("11:59:59")).toEqual({
      hour: "11",
      minute: "59",
      period: "AM",
    });
    expect(parse24HourFormat("12:00:00")).toEqual({
      hour: "12",
      minute: "00",
      period: "PM",
    }); // Noon
    expect(parse24HourFormat("13:45:10")).toEqual({
      hour: "01",
      minute: "45",
      period: "PM",
    });
    expect(parse24HourFormat("18:30:05")).toEqual({
      hour: "06",
      minute: "30",
      period: "PM",
    });
    expect(parse24HourFormat("23:59:59")).toEqual({
      hour: "11",
      minute: "59",
      period: "PM",
    });
  });
});
