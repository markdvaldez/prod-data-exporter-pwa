import { useQuery } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';
import { requestWithAuth } from "../../graphqlApi";
import { 
  RunnersResult, 
  RunnersResultResponse 
} from '@/Types/runners-result.types';

// 1. Define the GraphQL Query string
const getRunnersDataById = gql`
  query RunnersResultQueryById($id: String, $timestamp: String) {
    runnersResultById(id: $id, timestamp: $timestamp) {
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
  }
`;

interface QueryVariables {
  id?: string | null;
  timestamp?: string | null;
}

interface QueryResponse  {
  runnersResultById: RunnersResult | null;
}

// 2. Create the custom hook
export const useRunnersResultById = (variables: QueryVariables) => {
  return useQuery<RunnersResult | null, Error, RunnersResult | null>({
    // A unique query key is essential for caching and invalidation
    queryKey: ['runnerResult', variables.id, variables.timestamp],
    // The function that performs the data fetching
    queryFn: () => fetchRunnerResult(variables),
    // Optional: Keep data fresh based on certain conditions
    enabled: !!variables.id, // Only run the query if 'id' is present
  })
};

export const fetchRunnerResult  = async (
  variables: QueryVariables
): Promise<RunnersResult > => {

  const response = await requestWithAuth(getRunnersDataById, variables);
   return response.runnersResultById;
};

