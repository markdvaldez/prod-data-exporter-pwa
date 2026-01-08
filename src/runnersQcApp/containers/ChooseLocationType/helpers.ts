import { TFunc } from "@/runnersQcApp/shared/types";
import { LocationType } from "@/Types";

export const getTypeOptions = (t: TFunc) => {
  return [
    { id: "typeOne", value: t("typeOne") },
    { id: "typeTwo", value: t("typeTwo") },
    { id: "typeThree", value: t("typeThree") },
    { id: "typeFour", value: t("typeFour") },
    { id: "typeFive", value: t("typeFive") },
    { id: "typeSix", value: t("typeSix") },
    { id: "typeDefault", value: t("typeDefault") },
  ];
};

export const getLocationType = (id: string) => {
  switch (id) {
    case "typeOne":
      return LocationType.Racetrack;
    case "typeTwo":
      return LocationType.Farm;
    case "typeThree":
      return LocationType.Lab;
    case "typeFour":
      return LocationType.TrainingTrack;
    case "typeFive":
      return LocationType.AfterCare;
    case "typeSix":
      return LocationType.VetPractice;
    default:
      return LocationType.Other;
  }
};
