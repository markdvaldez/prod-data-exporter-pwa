import { detectSearchType, SearchType } from "../helpers";

describe("detectSearchType", () => {
  it("should return BY_GEOLOCATION for valid lat,long input", () => {
    expect(detectSearchType("40.751788517847466, -73.97930906733187")).toBe(
      SearchType.BY_GEOLOCATION
    );
    expect(detectSearchType("40.751, -73.979309")).toBe(
      SearchType.BY_GEOLOCATION
    );
    expect(detectSearchType("  40.751 , -73.9793090 ")).toBe(
      SearchType.BY_GEOLOCATION
    );
  });

  it("should return BY_NAME for non-lat/long inputs", () => {
    expect(detectSearchType("New York")).toBe(SearchType.BY_NAME);
    expect(detectSearchType("L000000815")).toBe(SearchType.BY_NAME);
    expect(detectSearchType("Gulfstream Park")).toBe(SearchType.BY_NAME);
    expect(detectSearchType("")).toBe(SearchType.BY_NAME);
    expect(detectSearchType("     ")).toBe(SearchType.BY_NAME);
  });

  it("should handle edge cases gracefully", () => {
    expect(detectSearchType("41.307")).toBe(SearchType.BY_NAME);
    expect(detectSearchType("lat,long")).toBe(SearchType.BY_NAME);
    expect(detectSearchType(",,,")).toBe(SearchType.BY_NAME);
  });
});
