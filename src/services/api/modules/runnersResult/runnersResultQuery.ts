import { graphql } from "@/services/gql/gql";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from 'graphql-request';
import { requestWithAuth } from "../../graphqlApi";
import { 
  RunnersResult,
  RunnersResultResponse 
} from '@/Types/runners-result.types';
import { 
  RunnersResultQueryQuery,
  RunnersResultQueryQueryVariables,
  RunnersResultQueryParamsInput,
  RunnersResultDataFilterInput,
  RunnersResultDataSortInput,
  SortEnumType,
  DateTimeOperationFilterInput,
  StringOperationFilterInput,
  BooleanOperationFilterInput
} from "@/services/gql/graphql";
import { fi } from "date-fns/locale";

// Updated GraphQL query to match the actual schema
const getRunnersResultDataDocument = gql/* GraphQL */ `
  query RunnersResultQuery(
    $skip: Int
    $take: Int
    $filter: RunnersResultQueryParamsInput!
    $where: RunnersResultDataFilterInput
    $order: [RunnersResultDataSortInput!]
  ) {
    runnersResult(
      skip: $skip
      take: $take 
      where: $where
      filter: $filter 
      order: $order
    ) {
      items {
        id
        timestamp
        currentAsOf
        currentAsOfIncremental
        hisaCriteriaRace
        locationId
        raceClaimingPrice
        raceCondition
        raceCountry
        raceCourse
        raceDate
        raceDescription
        raceDistance
        raceDistanceFurlong
        raceDistanceFurlongRound
        raceFootnote
        raceOffTime
        racePostTime
        racePurse
        raceRaceNumber
        raceTrackId
        raceTrackName
        raceType
        starterClaimedPriceUsa
        starterClaimIndicator
        starterClaimingPriceWaived
        starterDnf
        starterEarnings
        starterHisaRegulated
        starterHorseBreedType
        starterHorseColor
        starterHorseDamName
        starterHorseFoaled
        starterHorseHisaId
        starterHorseMicrochips
        starterHorseName
        starterHorseReferenceNumber
        starterHorseRegistry
        starterHorseSex
        starterHorseSireName
        starterHorseTattoo
        starterJockeyFirstName
        starterJockeyHisaId
        starterJockeyLastName
        starterJockeyReferenceNumber
        starterJockeyType
        starterLengthBehindAtFinish
        starterOdds
        starterOfficialPosition
        starterOwnerFirstName
        starterOwnerHisaId
        starterOwnerLastName
        starterOwnerReferenceNumber
        starterOwnerType
        starterPositionAtPointOfCall1
        starterPositionAtPointOfCall2
        starterPositionAtPointOfCall3
        starterPositionAtPointOfCall4
        starterPositionAtPointOfCall5
        starterPostPosition
        starterProgramNumber
        starterRecordType
        starterScratched
        starterShakes
        starterTrainerFirstName
        starterTrainerHisaId
        starterTrainerLastName
        starterTrainerReferenceNumber
        starterTrainerType
        starterVoidIndicator
        starterVoidReason
      }
      totalCount
    }
  }
`;

export interface RunnersResultVariables {
  skip?: number;
  take?: number;
  filter?: RunnersResultQueryParamsInput;
  where?: RunnersResultDataFilterInput;
  order?: RunnersResultDataSortInput[];
}

// GraphQL query function - now enabled with the actual schema
export const getRunnersResultQuery = async (
  variables: RunnersResultVariables
): Promise<RunnersResultResponse> => {

  const response = await requestWithAuth(getRunnersResultDataDocument, variables) as RunnersResultQueryQuery;
  
  
  // Transform the GraphQL response to match our expected format
  const items = response.runnersResult?.items?.map((item) => ({
        id: item?.id || "",
        timestamp: item?.timestamp || "",
        currentAsOf: item?.currentAsOf || "",
        currentAsOfIncremental: item?.currentAsOfIncremental || 0,
        hisaCriteriaRace: item?.hisaCriteriaRace || false,
        locationId: item?.locationId || "",
        raceClaimingPrice: item?.raceClaimingPrice || 0,
        raceCondition: item?.raceCondition || "",
        raceCountry: item?.raceCountry || "",
        raceCourse: item?.raceCourse || "",
        raceDate: item?.raceDate || "",
        raceDescription: item?.raceDescription || "",
        raceDistance: item?.raceDistance || "",
        raceDistanceFurlong: item?.raceDistanceFurlong || "",
        raceDistanceFurlongRound: item?.raceDistanceFurlongRound || 0,
        raceFootnote: item?.raceFootnote || "",
        raceOffTime: item?.raceOffTime || "",      
        racePostTime: item?.racePostTime || "",        
        racePurse: item?.racePurse || 0,
        raceRaceNumber: item?.raceRaceNumber || 0,
        raceTrackId: item?.raceTrackId || "",
        raceTrackName: item?.raceTrackName || "",
        raceType: item?.raceType || "",
        starterClaimedPriceUsa: item?.starterClaimedPriceUsa || "",
        starterClaimIndicator: item?.starterClaimIndicator || "",
        starterClaimingPriceWaived: item?.starterClaimingPriceWaived || "",
        starterDnf: item?.starterDnf || false,
        starterEarnings: item?.starterEarnings || 0,
        starterHisaRegulated: item?.starterHisaRegulated || false,
        starterHorseBreedType: item?.starterHorseBreedType || "",
        starterHorseColor: item?.starterHorseColor || "",
        starterHorseDamName: item?.starterHorseDamName || "",
        starterHorseFoaled: item?.starterHorseFoaled || "",
        starterHorseHisaId: item?.starterHorseHisaId || "",
        starterHorseMicrochips: item?.starterHorseMicrochips || "",
        starterHorseName: item?.starterHorseName || "",
        starterHorseReferenceNumber: item?.starterHorseReferenceNumber || 0,
        starterHorseRegistry: item?.starterHorseRegistry || "",
        starterHorseSex: item?.starterHorseSex || "",
        starterHorseSireName: item?.starterHorseSireName || "",
        starterHorseTattoo: item?.starterHorseTattoo || "",
        starterJockeyFirstName: item?.starterJockeyFirstName || "",
        starterJockeyHisaId: item?.starterJockeyHisaId || "",
        starterJockeyLastName: item?.starterJockeyLastName || "",
        starterJockeyReferenceNumber: item?.starterJockeyReferenceNumber || 0,
        starterJockeyType: item?.starterJockeyType || "",
        starterLengthBehindAtFinish: item?.starterLengthBehindAtFinish || 0,
        starterOdds: item?.starterOdds || 0,
        starterOfficialPosition: item?.starterOfficialPosition || 0,
        starterOwnerFirstName: item?.starterOwnerFirstName || "",
        starterOwnerHisaId: item?.starterOwnerHisaId || "",
        starterOwnerLastName: item?.starterOwnerLastName || "",
        starterOwnerReferenceNumber: item?.starterOwnerReferenceNumber || 0,
        starterOwnerType: item?.starterOwnerType || "",
        starterPositionAtPointOfCall1: item?.starterPositionAtPointOfCall1 || 0,
        starterPositionAtPointOfCall2: item?.starterPositionAtPointOfCall2 || 0,
        starterPositionAtPointOfCall3: item?.starterPositionAtPointOfCall3 || 0,
        starterPositionAtPointOfCall4: item?.starterPositionAtPointOfCall4 || 0,
        starterPositionAtPointOfCall5: item?.starterPositionAtPointOfCall5 || 0,
        starterPostPosition: item?.starterPostPosition || 0,
        starterProgramNumber: item?.starterProgramNumber || "",
        starterRecordType: item?.starterRecordType || "",
        starterScratched: item?.starterScratched || false,
        starterShakes: item?.starterShakes || 0,
        starterTrainerFirstName: item?.starterTrainerFirstName || "",
        starterTrainerHisaId: item?.starterTrainerHisaId || "",
        starterTrainerLastName: item?.starterTrainerLastName || "",
        starterTrainerReferenceNumber: item?.starterTrainerReferenceNumber || 0,
        starterTrainerType: item?.starterTrainerType || "",
        starterVoidIndicator: item?.starterVoidIndicator || "",      
        starterVoidReason: item?.starterVoidReason || "",
    })) || [];

  const totalCount = response.runnersResult?.totalCount || 0;
  const pageSize = variables.take || 10;
  const currentPage = variables.skip ? Math.floor(variables.skip / pageSize) + 1 : 1;
  
  return {
    items,
    count: items.length,
    totalCount,
    currentPage,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize),
    hasNextPage: (variables.skip || 0) + pageSize < totalCount,
    hasPreviousPage: (variables.skip || 0) > 0,
  };
};

// TanStack Query hook for GraphQL - now enabled
export const useRunnersResultQuery = (
  variables: RunnersResultVariables,
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    staleTime?: number;
  }
) => {
  return useQuery<RunnersResultResponse, Error>({
    queryKey: ["runnersResult", variables],
    queryFn: () => getRunnersResultQuery(variables),
    // Now enabled with the actual schema
    enabled: true,
    ...options,
  });
};

// Helper function to convert search filters to GraphQL filter format
export const convertFiltersToGraphQL = (filters: Record<string, any>): RunnersResultDataFilterInput => {
  const where: RunnersResultDataFilterInput = {};
  const conditions: RunnersResultDataFilterInput[] = [];

  const id = filters?.id?.trim();
  const timestamp = filters?.timestamp?.trim(); 

  // Build specific field filters as a single condition
  const fieldFilters: RunnersResultDataFilterInput = {};

  if (filters.id) {
    fieldFilters.id = { contains: filters.id };
  }

  if (filters.timestamp) {
    fieldFilters.timestamp = { contains: filters.timestamp };
  }

  // Add field filters to conditions if any exist
  if (Object.keys(fieldFilters).length > 0) {
    conditions.push(fieldFilters);
  }
  console.log(filters, fieldFilters, conditions);
  // Combine all conditions
  if (conditions.length === 0) {
    return where; // Return empty filter
  } else if (conditions.length === 1) {
    return conditions[0]; // Return single condition directly
  } else {
    // Multiple conditions - use AND to combine them
    where.and = conditions;
    return where;
  }
};

// Helper function to convert pagination parameters for skip/take
export const convertPaginationToGraphQL = (page: number, pageSize: number) => {
  return {
    skip: page > 0 ? page * pageSize : page,
    take: pageSize,
  };
};

export const convertQueryParamsToGraphQL = (params: Record<string, any>): RunnersResultQueryParamsInput => {
  const queryParams: RunnersResultQueryParamsInput = {};

  // Handle date range
  if (params.dateRange) {
    const startDate = params.dateRange.startDate;
    const endDate = params.dateRange.endDate;
    queryParams.dateRange = {};
    if (startDate) queryParams.dateRange.startDate = startDate;
    if (endDate) queryParams.dateRange.endDate = endDate;
  }

  return queryParams;
};
