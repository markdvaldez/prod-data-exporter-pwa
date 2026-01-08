import { mockRecordsData as records } from "../../../../../__mocks__/records";
import {
  compareAlpha,
  compareDate,
  compareHorseId,
  FilterRecType,
  getComparator,
  getRecTypeFilters,
  prepareRecordsToProps,
} from "../helpers";

describe("helpers", () => {
  const t = (key: string) => `_${key}_`;
  const a = {
    hisaHorseId: "H000000000",
    hisaHorseName: "John McClane",
    date: "2025-01-01",
  };
  const b = {
    hisaHorseId: "H000000001",
    hisaHorseName: "Bob Marley",
    date: "2025-02-01",
  };

  it("getRecTypeFilters", () => {
    const filters = getRecTypeFilters(t as any);
    expect(filters).toHaveLength(Object.values(FilterRecType).length);
    expect(filters[0]).toHaveProperty("id", Object.values(FilterRecType)[0]);
    expect(filters[0].title).toBe("Drug Administered");
    expect(filters[0].isSelected).toBe(false);
  });

  it("compareAlpha", () => {
    expect(compareAlpha(a as any, b as any, "hisaHorseName")).toBeGreaterThan(0);
    expect(compareAlpha(b as any, a as any, "hisaHorseName")).toBeLessThan(
      0
    );
  });

  it("compareHorseId", () => {
    expect(compareHorseId(a as any, b as any)).toBeLessThan(0);
    expect(compareHorseId(b as any, a as any)).toBeGreaterThan(0);
    expect(compareHorseId({} as any, {} as any)).toBe(0);
  });

  it("compareDate", () => {
    expect(compareDate(a as any, b as any)).toBeLessThan(0);
    expect(compareDate(b as any, a as any)).toBeGreaterThan(0);
    expect(compareDate({} as any, {} as any)).toBe(0);
  });

  it("getComparator", () => {
    const c1 = getComparator("hisaHorseId");
    expect(c1(a as any, b as any)).toBe(compareHorseId(a as any, b as any));
    const c2 = getComparator("date");
    expect(c2(a as any, b as any)).toBe(compareDate(a as any, b as any));
    const c3 = getComparator("hisaHorseName");
    expect(c3(a as any, b as any)).toBe(
      compareAlpha(a as any, b as any, "hisaHorseName")
    );
  });

  it("merges offline updates and adds new records", () => {
    const base = records;
    const offline = [
      {
        hisaHorseMedicalId: base[0].hisaHorseMedicalId,
        locationName: "Saratoga",
        description: "Description",
      } as any,
      {
        hisaHorseMedicalId: "OFFLINE01",
        hisaHorseId: "H000000000",
        hisaHorseName: "Roy Robson",
        date: "2025-07-04",
      } as any,
    ];

    const result = prepareRecordsToProps(base, offline);
    expect(result).toHaveLength(base.length + 1);

    const map = new Map(result.map((r) => [r.hisaHorseMedicalId, r]));

    const updated = map.get(base[0].hisaHorseMedicalId)!;
    expect(updated.locationName).toBe("Saratoga");
    expect(updated.description).toBe("Description");
    expect(updated.isSynced).toBe(false);

    const added = map.get("OFFLINE01")!;
    expect(added.hisaHorseId).toBe("H000000000");
    expect(added.hisaHorseName).toBe("Roy Robson");
    expect(added.date).toBe("2025-07-04");
    expect(added.isSynced).toBe(false);

    const untouched = map.get(base[1].hisaHorseMedicalId)!;
    expect(untouched).toMatchObject(base[1]);
    expect(untouched.isSynced).toBeUndefined();
  });
});
