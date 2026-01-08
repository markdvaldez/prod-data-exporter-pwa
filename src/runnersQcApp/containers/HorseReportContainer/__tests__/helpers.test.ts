import {
  compareAlpha,
  compareDate,
  compareHorseMedicalId,
  FilterRecType,
  getComparator,
  getRecTypeFilters,
} from "../helpers";

describe("helpers", () => {
  const t = (key: string) => `_${key}_`;
  const a = {
    hisaHorseMedicalId: "M000000000",
    hisaHorseName: "John McClane",
    date: "2025-01-01",
  };
  const b = {
    hisaHorseMedicalId: "M000000001",
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
    expect(compareAlpha(a as any, b as any, "hisaHorseName")).toBeGreaterThan(
      0
    );
    expect(compareAlpha(b as any, a as any, "hisaHorseName")).toBeLessThan(0);
  });

  it("compareHorseMedicalId", () => {
    expect(compareHorseMedicalId(a as any, b as any)).toBeLessThan(0);
    expect(compareHorseMedicalId(b as any, a as any)).toBeGreaterThan(0);
    expect(compareHorseMedicalId({} as any, {} as any)).toBe(0);
  });

  it("compareDate", () => {
    expect(compareDate(a as any, b as any)).toBeLessThan(0);
    expect(compareDate(b as any, a as any)).toBeGreaterThan(0);
    expect(compareDate({} as any, {} as any)).toBe(0);
  });

  it("getComparator", () => {
    const c1 = getComparator("hisaHorseId");
    expect(c1(a as any, b as any)).toBe(
      compareHorseMedicalId(a as any, b as any)
    );
    const c2 = getComparator("date");
    expect(c2(a as any, b as any)).toBe(compareDate(a as any, b as any));
    const c3 = getComparator("hisaHorseName");
    expect(c3(a as any, b as any)).toBe(
      compareAlpha(a as any, b as any, "hisaHorseName")
    );
  });
});
