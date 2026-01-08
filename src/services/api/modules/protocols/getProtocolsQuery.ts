import { graphql } from "@/services/gql/gql";
import { TreatmentProtocol } from "@/services/gql/graphql";
import { useQuery } from "@tanstack/react-query";
import { requestWithAuth } from "../../graphqlApi";

const allProtocolsDocument = graphql(/* GraphQL */ `
  query TreatmentProtocols($personId: String!) {
    treatmentProtocols(
      take: 1000
      where: { personId: { eq: $personId }, isDeleted: { neq: true } }
    ) {
      items {
        externalTreatmentProtocolId
        personId
        protocolName
        isPublic
        createdDateTime
        lastUpdatedDateTime
        isDeleted
        treatments {
          externalTreatmentTemplateId
          externalTreatmentProtocolId
          clearedToWork
          clearedToRace
          recType
          vaccine
          drugName
          drugRoute
          drugDosage
          procedure
          surgery
          dental
          physiotherapy
          chiropractic
          conditionTreated
          modality
          testName
          testResults
          limbTreated
          notes
          structure
          description
          classifiedAs
          category
          internalNotes
          isDeleted
        }
      }
    }
  }
`);

type TAllProtocolResponse = (TreatmentProtocol | null)[] | undefined | null;

export const allProtocolQuery = async (
  personId: string
): Promise<TAllProtocolResponse> => {
  const response = await requestWithAuth(allProtocolsDocument, { personId });

  return response.treatmentProtocols?.items as TAllProtocolResponse;
};

export const useAllProtocolsQuery = (personId: string) =>
  useQuery<TreatmentProtocol[], Error>({
    queryKey: ["allProtocols", personId],
    queryFn: () => allProtocolQuery(personId) as any,
  });
