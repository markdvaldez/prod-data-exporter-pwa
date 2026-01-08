import { THorse, THorseMedicalRecord } from "@/runnersQcApp/shared/types";

export const getHorseProps = (record: THorseMedicalRecord): THorse | null => {
  if (!record?.hisaHorseId) {
    return null;
  }
  return {
    hisaHorseId: record.hisaHorseId,
    name: record.hisaHorseName || "",
    locationId: record?.horseLocationId || "",
    locationName: record.horseLocationName || "",
    ownerHisaId: record?.designatedOwner || "",
    responsiblePersonHisaId: record.responsibleHisaPersonId || "",
  } as THorse;
};
