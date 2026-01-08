import { FrontEndNotificationFullResponse } from "@/Types/global-types";
import { DateTime } from "luxon";
import { mapNotificationToProps, TIMEOUT } from "../helpers";

describe("helpers utilities", () => {
  it("TIMEOUT should be 600000 ms", () => {
    expect(TIMEOUT).toBe(10 * 60 * 1000);
  });

  it("returns undefined for undefined or empty data", () => {
    expect(mapNotificationToProps(undefined)).toBeUndefined();
    expect(mapNotificationToProps([])).toBeUndefined();
  });

  it("returns undefined when first element is falsy", () => {
    expect(mapNotificationToProps([undefined] as any)).toBeUndefined();
  });

  it("maps valid notification correctly with isValid = true", () => {
    const fakeNow = DateTime.fromISO("2025-06-15T12:00:00.000Z");
    jest.spyOn(DateTime, "now").mockImplementation(() => fakeNow as any);

    const data: FrontEndNotificationFullResponse[] = [
      {
        frontEndNotificationId: "notif-1",
        activeFrom: "2025-01-01T00:00:00.000Z",
        activeTo: "2025-12-31T23:59:59.999Z",
        isDeleted: false,
        messageTitle: "Test Title",
      },
    ];
    const result = mapNotificationToProps(data)!;
    expect(result.frontEndNotificationId).toBe("notif-1");
    expect(result.messageTitle).toBe("Test Title");
    expect(result.isValid).toBe(true);
  });

  it("sets isValid = false when notification isDeleted = true", () => {
    const fakeNow = DateTime.fromISO("2025-06-15T12:00:00.000Z");
    jest.spyOn(DateTime, "now").mockImplementation(() => fakeNow as any);

    const data: FrontEndNotificationFullResponse[] = [
      {
        frontEndNotificationId: "notif-2",
        activeFrom: "2025-01-01T00:00:00.000Z",
        activeTo: "2025-12-31T23:59:59.999Z",
        isDeleted: true,
        messageTitle: "Deleted Title",
      },
    ];
    const result = mapNotificationToProps(data)!;
    expect(result.isValid).toBe(false);
  });

  it("sets isValid = false when current time is before activeFrom", () => {
    const fakeNow = DateTime.fromISO("2024-01-01T00:00:00.000Z");
    jest.spyOn(DateTime, "now").mockImplementation(() => fakeNow as any);

    const data: FrontEndNotificationFullResponse[] = [
      {
        frontEndNotificationId: "notif-3",
        activeFrom: "2025-01-01T00:00:00.000Z",
        activeTo: "2025-12-31T23:59:59.999Z",
        isDeleted: false,
        messageTitle: "Future Title",
      },
    ];
    const result = mapNotificationToProps(data)!;
    expect(result.isValid).toBe(false);
  });

  it("sets isValid = false when current time is after activeTo", () => {
    const fakeNow = DateTime.fromISO("2026-01-01T00:00:00.000Z");
    jest.spyOn(DateTime, "now").mockImplementation(() => fakeNow as any);

    const data: FrontEndNotificationFullResponse[] = [
      {
        frontEndNotificationId: "notif-4",
        activeFrom: "2025-01-01T00:00:00.000Z",
        activeTo: "2025-12-31T23:59:59.999Z",
        isDeleted: false,
        messageTitle: "Expired Title",
      },
    ];
    const result = mapNotificationToProps(data)!;
    expect(result.isValid).toBe(false);
  });
});
