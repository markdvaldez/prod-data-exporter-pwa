import { InspectionType } from "@/runnersQcApp/shared/types";
import { HorseMedicalRecType } from "@/Types";
import { getRecType } from "../../addRecordAndProtocolConfig";
import {
  getInspectionType,
  getMainOptions,
  mapOptionsToProps,
} from "../helper";

jest.mock("../../addRecordAndProtocolConfig", () => {
  const actual = jest.requireActual("../../addRecordAndProtocolConfig");
  return {
    ...actual,
    getRecType: jest.fn((x) => x),
  };
});

describe("addRecordAndProtocolConfig", () => {
  describe("mapOptionsToProps", () => {
    const t = Object.assign((key: string) => key, {
      rich: () => "rich",
      markup: () => "markup",
      raw: () => "raw",
      has: () => true,
    });
    it("returns drugDosage + measure correctly", () => {
      const record = { drugDosage: "10", measure: "mg" };
      const config = [{ key: "drugDosage", label: "Dosage" }];
      const result = mapOptionsToProps(t, record, config);
      expect(result[0]).toEqual({
        key: "drugDosage",
        label: "Dosage",
        value: "10mg",
      });
      expect(getRecType).toHaveBeenCalledWith(undefined);
    });

    it("returns drugDosage without measure", () => {
      const record = { drugDosage: "50" };
      const config = [{ key: "drugDosage", label: "Dosage" }];
      const result = mapOptionsToProps(t, record, config);
      expect(result[0].value).toBe("50");
    });

    it("maps inspectionType to ClearedToWork", () => {
      const record = {
        clearedToWork: true,
        clearedToRace: false,
        recType: HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection,
      };
      const config = [{ key: "inspectionType", label: "Inspection" }];
      const result = mapOptionsToProps(t, record, config);
      expect(result[0].value).toBe(InspectionType.ClearedToWork);
    });

    it("maps inspectionType to ClearedToRace", () => {
      const record = {
        clearedToWork: true,
        clearedToRace: true,
        recType: "Mandatory Attending Vet Inspection",
      };
      const config = [{ key: "inspectionType", label: "Inspection" }];
      const result = mapOptionsToProps(t, record, config);
      expect(result[0].value).toBe(InspectionType.ClearedToRace);
    });

    it("maps inspectionType to NotCleared", () => {
      const record = {
        clearedToWork: false,
        clearedToRace: false,
        recType: HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection,
      };
      const config = [{ key: "inspectionType", label: "Inspection" }];
      const result = mapOptionsToProps(t, record, config);
      expect(result[0].value).toBe(InspectionType.NotCleared);
    });

    it("uses _.get fallback for other keys", () => {
      const record = { customField: "ABC" };
      const config = [{ key: "customField", label: "Custom" }];
      const result = mapOptionsToProps(t, record, config);
      expect(result[0].value).toBe("ABC");
    });

    it("filters out keys with no value", () => {
      const record = {};
      const config = [{ key: "someEmpty", label: "Empty" }];
      const result = mapOptionsToProps(t, record, config);
      expect(result).toEqual([]);
    });
  });

  describe("getMainOptions", () => {
    const t = Object.assign((key: string) => key, {
      rich: () => "rich",
      markup: () => "markup",
      raw: () => "raw",
      has: () => true,
    });
    it("returns base options without drugRoute", () => {
      const result = getMainOptions(t);
      const keys = result.map((o) => o.key);
      expect(keys).not.toContain("drugRoute");
    });

    it("adds drugRoute for DrugAdministered", () => {
      const result = getMainOptions(t, "DrugAdministered");
      const keys = result.map((o) => o.key);
      expect(keys).toContain("drugRoute");
    });

    it("adds drugRoute for IntralesionalInjection", () => {
      const result = getMainOptions(t, "IntralesionalInjection");
      const keys = result.map((o) => o.key);
      expect(keys).toContain("drugRoute");
    });
  });

  describe("getInspectionType", () => {
    it("returns ClearedToRace flags", () => {
      const data = { inspectionType: InspectionType.ClearedToRace };
      const result = getInspectionType(data);
      expect(result).toEqual({
        inspectionType: InspectionType.ClearedToRace,
        clearedToRace: true,
        clearedToWork: true,
      });
    });

    it("returns ClearedToWork flags", () => {
      const data = { inspectionType: InspectionType.ClearedToWork };
      const result = getInspectionType(data);
      expect(result).toEqual({
        inspectionType: InspectionType.ClearedToWork,
        clearedToWork: true,
        clearedToRace: false,
      });
    });

    it("returns NotCleared flags", () => {
      const data = { inspectionType: "OtherType" };
      const result = getInspectionType(data);
      expect(result).toEqual({
        inspectionType: "OtherType",
        clearedToWork: false,
        clearedToRace: false,
      });
    });
  });
});
