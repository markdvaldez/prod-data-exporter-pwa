import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { getHorseProps } from "../helpers";

describe("getHorseProps", () => {
  it("returns a THorse object when hisaHorseId is present", () => {
    const record: THorseMedicalRecord = {
      hisaHorseId: "H123",
      hisaHorseName: "Thunder",
      horseLocationId: "LOC001",
      horseLocationName: "Stable A",
      designatedOwner: "OWNER123",
      responsibleHisaPersonId: "RESP456",
      recType: "",
    };

    const result = getHorseProps(record);

    expect(result).toEqual({
      hisaHorseId: "H123",
      name: "Thunder",
      locationId: "LOC001",
      locationName: "Stable A",
      ownerHisaId: "OWNER123",
      responsiblePersonHisaId: "RESP456",
    });
  });

  it("returns null when hisaHorseId is missing", () => {
    const record: Partial<THorseMedicalRecord> = {
      hisaHorseName: "No ID Horse",
    };

    const result = getHorseProps(record as THorseMedicalRecord);

    expect(result).toBeNull();
  });

  it("returns empty strings for optional fields if they are missing", () => {
    const record: Partial<THorseMedicalRecord> = {
      hisaHorseId: "H456",
    };

    const result = getHorseProps(record as THorseMedicalRecord);

    expect(result).toEqual({
      hisaHorseId: "H456",
      name: "",
      locationId: "",
      locationName: "",
      ownerHisaId: "",
      responsiblePersonHisaId: "",
    });
  });
});
