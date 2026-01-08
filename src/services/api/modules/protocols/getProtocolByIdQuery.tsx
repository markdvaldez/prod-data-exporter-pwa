import { graphql } from "@/services/gql/gql";
import { TreatmentProtocol } from "@/services/gql/graphql";
import { useQuery } from "@tanstack/react-query";
import { requestWithAuth } from "../../graphqlApi";

const getProtocolById = graphql(/* GraphQL */ `
  query TreatmentProtocolById($id: String!) {
    treatmentProtocolById(id: $id) {
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
`);

type TGetProtocolByIdResponse = TreatmentProtocol | null | undefined;

export const getProtocolByIdQuery = async ({
  id,
}: {
  id: string;
}): Promise<TGetProtocolByIdResponse> => {
  const response = await requestWithAuth(getProtocolById, { id });

  return response.treatmentProtocolById as TGetProtocolByIdResponse;
};

export const useGetProtocolByIdQuery = (id: string) =>
  useQuery<TreatmentProtocol, Error>({
    queryKey: ["protocolById", id],
    queryFn: () => getProtocolByIdQuery({ id }) as any,
  });
