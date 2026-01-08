import { act, renderHook } from "@testing-library/react";
import { useUserLocation } from "../useUserLocation";

jest.mock("@/utils/errors", () => ({
  extractError: (err: any) => err,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => ((key: string) => key) as any,
}));

describe("useUserLocation", () => {
  const originalGeolocation = navigator.geolocation;

  afterEach(() => {
    (navigator as any).geolocation = originalGeolocation;
  });

  it("rejects when geolocation is not supported", async () => {
    delete (navigator as any).geolocation;
    const { result } = renderHook(() => useUserLocation());
    let response;
    await act(async () => {
      response = await result.current.getCurrentLocation();
    });
    expect(response).toEqual({
      position: undefined,
      error: "geolocationIsNotSupported",
    });
    expect(result.current.userLocation).toBeUndefined();
  });

  it("resolves position and updates userLocation when geolocation succeeds", async () => {
    const mockPos = { coords: { latitude: 10, longitude: 20 } };
    (navigator as any).geolocation = {
      getCurrentPosition: (success: any) => success(mockPos),
    };
    const { result } = renderHook(() => useUserLocation());
    let response;
    await act(async () => {
      response = await result.current.getCurrentLocation();
    });
    expect(response).toEqual({
      position: "10, 20",
      error: undefined,
    });
    expect(result.current.userLocation).toBe("10, 20");
  });

  it("returns error when geolocation fails", async () => {
    (navigator as any).geolocation = {
      getCurrentPosition: (_: any, fail: any) =>
        fail({ code: 1, message: "permission denied" }),
    };
    const { result } = renderHook(() => useUserLocation());
    let response;
    await act(async () => {
      response = await result.current.getCurrentLocation();
    });
    expect(response).toEqual({
      position: undefined,
      error: "thisBrowserDoesNotHaveLocationsEnabled",
    });
    expect(result.current.userLocation).toBeUndefined();
  });
});
