import { graphql } from "@/services/gql/gql";
import { useQuery } from "@tanstack/react-query";
import { requestWithAuth } from "../../graphqlApi";
import { 
  RunnersData, 
  RunnersDataResponse 
} from '@/Types/runners-qc.types';
import { 
  RunnersQueryQuery, 
  RunnersQueryQueryVariables,
  RunnersDataFilterInput,
  RunnersDataSortInput,
  SortEnumType,
  DateTimeOperationFilterInput,
  StringOperationFilterInput,
  BooleanOperationFilterInput
} from "@/services/gql/graphql";

// Updated GraphQL query to match the actual schema
const getRunnersDataDocument = graphql(/* GraphQL */ `
  query RunnersQuery(
    $skip: Int
    $take: Int
    $filter: RunnersDataQueryParamsInput!
    $where: RunnersDataFilterInput
    $order: [RunnersDataSortInput!]
  ) {
    runnersData(
      skip: $skip 
      take: $take 
      where: $where
      filter: $filter  
      order: $order
    ) {
      items {
          id
          timestampRunnerNumber
          runnerDeath
          runnerDNF
          runnerRaceDeath
          runnerScratched
          runnerStart
          locked
          preferredCurrentAsOfIncremental
          preferredRecType
          raceBreedTb
          raceCountry
          raceDate
          raceDistanceFurlong
          raceNumber
          raceOnTheFlat
          raceSurface
          raceSurfaceCondition
          raceTrackId
          raceType
          runnerDnf
          runnerHisaId
          runnerHorseBreed
          runnerIncludeInMetricsReport
          runnerScratched2
          runnerTjcNumber
      }
      totalCount
    }
  }
`);

export interface RunnersDataVariables {
  skip?: number;
  take?: number;
  where?: RunnersDataFilterInput;
  order?: RunnersDataSortInput[];
}

// GraphQL query function - now enabled with the actual schema
export const getRunnersDataQuery = async (
  variables: RunnersDataVariables
): Promise<RunnersDataResponse> => {
  const response = await requestWithAuth(getRunnersDataDocument, variables) as RunnersQueryQuery;
  console.log('RunnersQC GraphQL response:', response);
  
  // Transform the GraphQL response to match our expected format
  const items = response.runnersData?.items?.map((item) => ({
      id: item?.id || "",
      timestampRunnerNumber: item?.timestampRunnerNumber || "",
      runnerDeath: item?.runnerDeath || "",
      runnerDNF: item?.runnerDNF || false,
      runnerRaceDeath: item?.runnerRaceDeath || "",
      runnerScratched: item?.runnerScratched || "",
      runnerStart: item?.runnerStart || "",
      locked: item?.locked || "",
      preferredCurrentAsOfIncremental:
        item?.preferredCurrentAsOfIncremental || "",
      preferredRecType: item?.preferredRecType || "",
      raceBreedTb: item?.raceBreedTb || "",
      raceCountry: item?.raceCountry || "",
      raceDate: item?.raceDate || "",
      raceDistanceFurlong: item?.raceDistanceFurlong || "",
      raceNumber: item?.raceNumber || "",
      raceOnTheFlat: item?.raceOnTheFlat || "",
      raceSurface: item?.raceSurface || "",
      raceSurfaceCondition: item?.raceSurfaceCondition || "",
      raceTrackId: item?.raceTrackId || "",
      raceType: item?.raceType || "",
      runnerDnf: item?.runnerDnf || "",
      runnerHisaId: item?.runnerHisaId || "",
      runnerHorseBreed: item?.runnerHorseBreed || "",
      runnerIncludeInMetricsReport: item?.runnerIncludeInMetricsReport || "",
      runnerScratched2: item?.runnerScratched2 || "",
      runnerTjcNumber: item?.runnerTjcNumber || "",
    })) || [];

  const totalCount = response.runnersData?.totalCount || 0;
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
export const useRunnersDataQuery = (
  variables: RunnersDataVariables,
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    staleTime?: number;
  }
) => {
  return useQuery<RunnersDataResponse, Error>({
    queryKey: ["runnersData", variables],
    queryFn: () => getRunnersDataQuery(variables),
    // Now enabled with the actual schema
    enabled: true,
    ...options,
  });
};

// Helper function to convert search filters to GraphQL filter format
export const convertFiltersToGraphQL = (filters: Record<string, any>): RunnersDataFilterInput => {
  const where: RunnersDataFilterInput = {};
  const conditions: RunnersDataFilterInput[] = [];

  // Handle general search term - search across multiple fields using OR condition
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.trim();
    if (searchTerm) {
      conditions.push({
        or: [
          { id: { contains: searchTerm } },
          { timestampRunnerNumber: { contains: searchTerm } },
          { runnerDeath: { contains: searchTerm } },
          { runnerDNF: { eq: searchTerm } },
          { runnerRaceDeath: { contains: searchTerm } },
          { runnerScratched: { contains: searchTerm } },
          { runnerStart: { contains: searchTerm } },
          { locked: { contains: searchTerm } },
          { preferredCurrentAsOfIncremental: { contains: searchTerm } },
          { preferredRecType: { contains: searchTerm } },
          { raceBreedTb: { contains: searchTerm } },
          { raceCountry: { contains: searchTerm } },
          { raceDate: { contains: searchTerm } },
          { raceDistanceFurlong: { contains: searchTerm } },
          { raceNumber: { contains: searchTerm } },
          { raceOnTheFlat: { contains: searchTerm } },
          { raceSurface: { contains: searchTerm } },
          { raceSurfaceCondition: { contains: searchTerm } },
          { raceTrackId: { contains: searchTerm } },
          { raceType: { contains: searchTerm } },
          { runnerDnf: { contains: searchTerm } },
          { runnerHisaId: { contains: searchTerm } },
          { runnerHorseBreed: { contains: searchTerm } },
          { runnerIncludeInMetricsReport: { contains: searchTerm } },
          { runnerScratched2: { contains: searchTerm } },
          { runnerTjcNumber: { contains: searchTerm } },
        ]
      });
    }
  }

  // Build specific field filters as a single condition
  const fieldFilters: RunnersDataFilterInput = {};

  if (filters.id) {
    fieldFilters.id = { contains: filters.id };
  }

  // Add field filters to conditions if any exist
  if (Object.keys(fieldFilters).length > 0) {
    conditions.push(fieldFilters);
  }

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
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
};