import { HorseMedicalRecType, TreatmentProtocol } from "@/services/gql/graphql";
import _ from "lodash";

export const getEnumKeyByValue = <T extends Record<string, string>>(
  enumObj: T,
  value: string
): keyof T | undefined => {
  return (Object.keys(enumObj) as (keyof T)[]).find(
    (key) => enumObj[key] === value
  );
};

export enum HorseMedicalRouteAdmin {
  Cream = "CREAM",
  IA = "IA",
  IM = "IM",
  Inhalation = "INHALATION",
  Intralesional = "INTRALESIONAL",
  Intranasal = "INTRANASAL",
  IV = "IV",
  NG = "NG",
  Ophthalmic = "OPHTHALMIC",
  Oral = "ORAL",
  Other = "OTHER",
  PO = "PO",
  SubQ = "SUB_Q",
  Topical = "TOPICAL",
  Transdermal = "TRANSDERMAL",
  Unknown = "UNKNOWN",
  Unspecified = "UNSPECIFIED",
}

export const mapProtocols = (protocols: TreatmentProtocol[]): any => {
  const newProtocols = _.map(protocols, (protocol) => {
    const newTreatments = _.map(protocol.treatments, (treatment) => {
      return {
        ...treatment,
        treatmentTemplateId: treatment.externalTreatmentTemplateId,
        treatmentProtocolId: treatment.externalTreatmentProtocolId,
        recType: getEnumKeyByValue(
          HorseMedicalRecType,
          treatment.recType || ""
        ),
        drugRoute: getEnumKeyByValue(
          HorseMedicalRouteAdmin,
          treatment.drugRoute || ""
        ),
      };
    });
    return {
      treatmentProtocolId: protocol.externalTreatmentProtocolId,
      protocolName: protocol.protocolName,
      personId: protocol.personId,
      treatments: newTreatments,
      isPublic: protocol.isPublic,
      createdDateTime: protocol.createdDateTime,
      lastUpdatedDateTime: protocol.lastUpdatedDateTime,
    };
  });
  return newProtocols;
};

export const mapProtocol = (protocol: any): any => {
  const newTreatments = _.map(protocol.treatments, (treatment) => {
    return {
      ...treatment,
      treatmentTemplateId:
        treatment.externalTreatmentTemplateId || treatment.treatmentTemplateId,
      treatmentProtocolId:
        treatment.externalTreatmentProtocolId || treatment.treatmentProtocolId,
      recType: getEnumKeyByValue(HorseMedicalRecType, treatment.recType || ""),
      drugRoute: getEnumKeyByValue(
        HorseMedicalRouteAdmin,
        treatment.drugRoute || ""
      ),
    };
  });

  return {
    treatmentProtocolId:
      protocol.externalTreatmentProtocolId || protocol.treatmentProtocolId,
    protocolName: protocol.protocolName,
    personId: protocol.personId,
    treatments: newTreatments,
    isPublic: protocol.isPublic,
    createdDateTime: protocol.createdDateTime,
    lastUpdatedDateTime: protocol.lastUpdatedDateTime,
  };
};
