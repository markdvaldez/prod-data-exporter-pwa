import { HorseMedicalRecType } from "@/Types";
import { getSortedRecords, getThirdField } from "../helpers";

describe("helpers", () => {
  describe("getThirdField", () => {
    it("returns inspection result when descriptionText is 'Mandatory Attending Vet Inspection'", () => {
      const item = {
        recType: "",
        descriptionText: "Mandatory Attending Vet Inspection",
        displayName: "Dr. Smith",
      } as any;
      expect(getThirdField(item)).toBe("Inspection Result: Dr. Smith");
    });

    it("returns inspection result when recType matches enum", () => {
      const item = {
        recType: HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection,
        displayName: "Dr. Jones",
      } as any;
      expect(getThirdField(item)).toBe("Inspection Result: Dr. Jones");
    });

    it("returns vaccine name when descriptionText is 'Vaccine'", () => {
      const item = {
        recType: "",
        descriptionText: "Vaccine",
        vaccine: "FluShot",
      } as any;
      expect(getThirdField(item)).toBe("Vaccine Name: FluShot");
    });

    it("returns vaccine name when recType matches enum", () => {
      const item = {
        recType: HorseMedicalRecType.Vaccine,
        vaccine: "Rabies",
      } as any;
      expect(getThirdField(item)).toBe("Vaccine Name: Rabies");
    });

    it("returns results when descriptionText is 'Vet Inspection'", () => {
      const item = {
        recType: "",
        descriptionText: "Vet Inspection",
        testResults: "All clear",
      } as any;
      expect(getThirdField(item)).toBe("Results: All clear");
    });

    it("returns results when recType matches enum", () => {
      const item = {
        recType: HorseMedicalRecType.VetInspection,
        testResults: "Normal",
      } as any;
      expect(getThirdField(item)).toBe("Results: Normal");
    });

    it("returns undefined when no matching type", () => {
      const item = { recType: "OtherType", descriptionText: undefined } as any;
      expect(getThirdField(item)).toBeUndefined();
    });
  });

  describe("getSortedRecords", () => {
    it("sorts by lastUpdate descending when present", () => {
      const records = [
        { date: "2021-01-01", lastUpdate: "2021-01-02" },
        { date: "2021-01-03", lastUpdate: "2021-01-01" },
      ];
      const sorted = getSortedRecords(records as any);
      expect(sorted[0].lastUpdate).toBe("2021-01-02");
      expect(sorted[1].lastUpdate).toBe("2021-01-01");
    });

    it("sorts by date descending when lastUpdate missing", () => {
      const records = [
        { date: "2021-01-01" },
        { date: "2021-01-03" },
        { date: "2021-01-02" },
      ];
      const sorted = getSortedRecords(records as any);
      expect(sorted.map((r) => r.date)).toEqual([
        "2021-01-03",
        "2021-01-02",
        "2021-01-01",
      ]);
    });

    it("handles mix of lastUpdate and date fields", () => {
      const records = [
        { date: "2021-01-01", lastUpdate: "2021-01-05" },
        { date: "2021-01-06" },
        { date: "2021-01-03", lastUpdate: "2021-01-02" },
      ];
      const sorted = getSortedRecords(records as any);
      expect(sorted[0].date).toBe("2021-01-06");
      expect(sorted[1].lastUpdate).toBe("2021-01-05");
      expect(sorted[2].lastUpdate).toBe("2021-01-02");
    });

    it("returns empty array when input is empty", () => {
      expect(getSortedRecords([])).toEqual([]);
    });
  });
});
