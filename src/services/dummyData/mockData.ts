import { time } from "console";
import { RunnerQCRow } from "@/ui-kit/components/RunnersQCTable";
import {
  RunnersResult,
  RunnersResultResponse,
} from "@/Types/runners-result.types";

export interface SearchFilters {
  searchTerm?: string;
  id?: string;
  timestamp?: string;
}

/**
 * Enhanced search utilities with startsWith and contains functionality
 */
const searchUtils = {
  /**
   * Check if text starts with search term (case-insensitive)
   */
  startsWith: (text: string, searchTerm: string): boolean => {
    return text.toLowerCase().startsWith(searchTerm.toLowerCase());
  },

  /**
   * Check if text contains search term (case-insensitive)
   */
  contains: (text: string, searchTerm: string): boolean => {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  },

  /**
   * Enhanced multi-field search with priority scoring
   */
  searchMultipleFields: (
    fields: string[],
    searchTerm: string
  ): { matches: boolean; score: number } => {
    let score = 0;
    let matches = false;
    const term = searchTerm.toLowerCase();

    for (const field of fields) {
      const fieldLower = field.toLowerCase();

      // Exact match gets highest score
      if (fieldLower === term) {
        score += 100;
        matches = true;
      }
      // Starts with gets high score
      else if (fieldLower.startsWith(term)) {
        score += 50;
        matches = true;
      }
      // Contains gets lower score
      else if (fieldLower.includes(term)) {
        score += 10;
        matches = true;
      }
    }

    return { matches, score };
  },
};

export function getMockRunnersData(): RunnerQCRow[] {
  return Array.from({ length: 50 }, (_, i) => {
    const n = i + 1;
    return {
      partitionKey: `RUN#${String(n).padStart(3, "0")}`,
      sortKey: `2025-01-${String((n % 28) + 1).padStart(2, "0")}`,
      runnerDeath: "No",
      runnerDNF: n % 7 === 0 ? "Yes" : "No",
      runnerRaceDeath: "No",
      runnerStart: n % 5 === 0 ? "No" : "Yes",
      locked: n % 9 === 0 ? "Yes" : "No",
      note: `Sample note ${n}`,
      preferredCurrentAsOf: `2025-01-${String((n % 15) + 1).padStart(2, "0")}`,
      preferredRectype: n % 3 === 0 ? "Type B" : "Type A",
      raceBreed: "TB",
      raceCountry: ["USA", "CAN", "AUS"][n % 3],
      raceDate: `2025-01-${String((n % 27) + 1).padStart(2, "0")}`,
      raceDistanceFurlong: `${5 + (n % 4)}.0`,
      raceNumber: `${(n % 10) + 1}`,
      raceOnTheFlat: n % 2 === 0 ? "Yes" : "No",
      raceSurface: ["Dirt", "Turf", "Synthetic"][n % 3],
      raceSurfaceCondition: ["Fast", "Good", "Sloppy"][n % 3],
      raceTrackId: ["CD", "SA", "GP"][n % 3],
      raceType: ["Allowance", "Claiming", "Stakes"][n % 3],
      runnerHisaId: `HISA${10000 + n}`,
      runnerHorseBreed: "Thoroughbred",
      runnerIncludeInMetrics: n % 6 === 0 ? "No" : "Yes",
      runnerScratched: n % 11 === 0 ? "Yes" : "No",
      runnerTjcNumber: `TJC${90000 + n}`,
    };
  });
}

export const filterRunnersResult = (
  results: RunnersResult[],
  filters: SearchFilters
): RunnersResult[] => {
  let filteredResults = results.filter((result) => {
    // Global search term - searches across multiple fields with enhanced algorithm
    if (filters.searchTerm) {
      const searchableFields = [
        result.id,
        //result.Action,
        //result.Status,
        //result.Hisa_Treatment_ID,
        //result.MessageBody || '',
        //result.Transaction_ID
      ];

      const searchResult = searchUtils.searchMultipleFields(
        searchableFields,
        filters.searchTerm
      );
      if (!searchResult.matches) {
        return false;
      }
    }

    // Enhanced Entity ID search - prioritize startsWith for ID-like searches
    if (filters.id) {
      const entityIdMatch =
        searchUtils.startsWith(result.id, filters.id) ||
        searchUtils.contains(result.id, filters.id);
      if (!entityIdMatch) {
        return false;
      }
    }

    return true;
  });

  // If there's a search term, sort by relevance score
  if (filters.searchTerm) {
    filteredResults = filteredResults
      .map((result) => {
        const searchableFields = [result.id];
        const searchResult = searchUtils.searchMultipleFields(
          searchableFields,
          filters.searchTerm!
        );
        return { result, score: searchResult.score };
      })
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .map((item) => item.result);
  }

  return filteredResults;
};

export function getMockRunnersResultData(): RunnersResult[] {
  return Array.from({ length: 50 }, (_, i) => {
    const n = i + 1;

    return {
      id: `RUN#${String(n).padStart(3, "0")}`,
      timestamp: `2025-01-${String((n % 28) + 1).padStart(2, "0")}`,

      currentAsOf: `2025-10-24 02:35:${String(10 + (n % 50)).padStart(
        2,
        "0"
      )}.522125`,
      currentAsOfIncremental: 1761273312 + n,

      hisaCriteriaRace: n % 4 === 0,
      locationId: "LOC" + String(100 + n),

      raceClaimingPrice: 0,
      raceCondition: ["Good", "Firm", "Soft"][n % 3],
      raceCountry: ["ENG", "USA", "CAN"][n % 3],
      raceCourse: ["Turf", "Dirt"][n % 2],
      raceDate: `2022-07-${String((n % 28) + 1).padStart(2, "0")}`,
      raceDescription: "NOVICE WEIGHT FOR AGE",
      raceDistance: "About 1 1/2 Miles",
      raceDistanceFurlong: (10 + (n % 5)).toFixed(6),
      raceDistanceFurlongRound: 10 + (n % 5),
      raceFootnote: "Footnote " + String(n),
      raceOffTime: "Off Time " + String(n),
      racePostTime: "Post Time " + String(n),
      racePurse: 15000 + n * 10,
      raceRaceNumber: (n % 10) + 1,
      raceTrackId: ["DON", "ASC", "YOR"][n % 3],
      raceTrackName: ["DONCASTER", "ASCOT", "YORK"][n % 3],
      raceType: ["WN", "CLM", "STK"][n % 3],

      starterClaimedPriceUsa: "0.0000",
      starterClaimIndicator: n % 6 === 0 ? "Y" : "N",
      starterClaimingPriceWaived: n % 6 === 0 ? "Y" : "N",
      starterDnf: n % 7 === 0,
      starterEarnings: n % 5 === 0 ? 5000 : 0,
      starterHisaRegulated: true,

      starterHorseBreedType: "TB",
      starterHorseColor: ["Chestnut", "Bay", "Grey"][n % 3],
      starterHorseDamName: `Sample Dam ${n}`,
      starterHorseFoaled: `2016-04-${String((n % 27) + 1).padStart(2, "0")}`,
      starterHorseHisaId: `H0000${49659 + n}`,
      starterHorseMicrochips: `${985101045200000 + n}`,
      starterHorseName: `Mock Horse ${n}`,
      starterHorseReferenceNumber: 10119200 + n,
      starterHorseRegistry: "T",
      starterHorseSex: ["Gelding", "Filly", "Mare"][n % 3],
      starterHorseSireName: `Mock Sire ${n}`,
      starterHorseTattoo: "",

      starterJockeyFirstName: ["Ben", "John", "Alex"][n % 3],
      starterJockeyHisaId: `P9999999${90 + (n % 10)}`,
      starterJockeyLastName: ["Robinson", "Smith", "Brown"][n % 3],
      starterJockeyReferenceNumber: 165430 + n,
      starterJockeyType: ["JF", "JA"][n % 2],

      starterLengthBehindAtFinish: parseFloat((5 + (n % 15)).toFixed(2)),
      starterOdds: 5 + (n % 14),
      starterOfficialPosition: (n % 12) + 1,

      starterOwnerFirstName: "",
      starterOwnerHisaId: `P9999999${80 + (n % 10)}`,
      starterOwnerLastName: `Owner ${n}`,
      starterOwnerReferenceNumber: 2213300 + n,
      starterOwnerType: ["OF", "OT"][n % 2],

      starterPositionAtPointOfCall1: 0,
      starterPositionAtPointOfCall2: 0,
      starterPositionAtPointOfCall3: 0,
      starterPositionAtPointOfCall4: 0,
      starterPositionAtPointOfCall5: 0,

      starterPostPosition: (n % 12) + 1,
      starterProgramNumber: "" + String((n % 20) + 1).padStart(2, "0"),
      starterRecordType: "result",
      starterScratched: n % 13 === 0,
      starterShakes: n % 9,

      starterTrainerFirstName: ["Brian", "Mark", "Sam"][n % 3],
      starterTrainerHisaId: `P9999999${70 + (n % 10)}`,
      starterTrainerLastName: ["Ellison", "Clark", "Wells"][n % 3],
      starterTrainerReferenceNumber: 143410 + n,
      starterTrainerType: ["TF", "TA"][n % 2],

      starterVoidIndicator: n % 20 === 0 ? "Y" : "N",
      starterVoidReason: "Void Reason",
    };
  });
}

export const generateDummyRunnersResultData = (
  count: number = 50
): RunnersResult[] => {
  const results: RunnersResult[] = [];

  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const n = i + 1;

    results.push({
      id: ["DON", "RET", "BET", "CAN", "YYZ", "TRF", "AZN", "NYK", "AZL"][
        n % 9
      ],
      timestamp: `2025-01-${String((n % 28) + 1).padStart(2, "0")}${n}${String(
        n
      ).padStart(3, "0")}`,

      currentAsOf: `2025-10-24 02:35:${String(10 + (n % 50)).padStart(
        2,
        "0"
      )}.522125`,
      currentAsOfIncremental: 1761273312 + n,

      hisaCriteriaRace: n % 4 === 0,
      locationId: "LOC" + String(100 + n),

      raceClaimingPrice: 0,
      raceCondition: ["Good", "Firm", "Soft"][n % 3],
      raceCountry: ["ENG", "USA", "CAN"][n % 3],
      raceCourse: [
        "Churchill Downs",
        "Ascot Racecourse",
        "Meydan Racecourse",
        "Aintree Racecourse",
        "Flemington Racecourse",
        "Saratoga Race Course",
        "Tokyo Racecourse",
        "Longchamp Racecourse",
        "Epsom Downs",
        "Santa Anita Park",
      ][n % 9],
      raceDate: `2022-07-${String((n % 28) + 1).padStart(2, "0")}`,
      raceDescription: [
        "Flat Racing",
        "Steeplechase",
        "Harness Racing",
        "Maiden Race",
        "Handicap Race",
        "Furlong",
        "Blinkers",
        "Photo Finish",
        "In the Money",
      ][n % 9],
      raceDistance: "About 1 1/2 Miles",
      raceDistanceFurlong: (10 + (n % 5)).toFixed(6),
      raceDistanceFurlongRound: 10 + (n % 5),
      raceFootnote: "Footnote " + String(n),
      raceOffTime: "Off Time " + String(n),
      racePostTime: "Post Time " + String(n),
      racePurse: 15000 + n * 10,
      raceRaceNumber: (n % 10) + 1,
      raceTrackId: ["DON", "ASC", "YOR"][n % 3],
      raceTrackName: ["DONCASTER", "ASCOT", "YORK"][n % 3],
      raceType: ["WN", "CLM", "STK"][n % 3],

      starterClaimedPriceUsa: "0.0000",
      starterClaimIndicator: n % 6 === 0 ? "Y" : "N",
      starterClaimingPriceWaived: n % 6 === 0 ? "Y" : "N",
      starterDnf: n % 7 === 0,
      starterEarnings: n % 5 === 0 ? 5000 : 0,
      starterHisaRegulated: true,

      starterHorseBreedType: "TB",
      starterHorseColor: ["Chestnut", "Bay", "Grey"][n % 3],
      starterHorseDamName: `Sample Dam ${n}`,
      starterHorseFoaled: `2016-04-${String((n % 27) + 1).padStart(2, "0")}`,
      starterHorseHisaId: `H0000${49659 + n}`,
      starterHorseMicrochips: `${985101045200000 + n}`,
      starterHorseName: `Mock Horse ${n}`,
      starterHorseReferenceNumber: 10119200 + n,
      starterHorseRegistry: "T",
      starterHorseSex: ["Male", "Female", "Unknown"][n % 3],
      starterHorseSireName: `Mock Sire ${n}`,
      starterHorseTattoo: "",

      starterJockeyFirstName: ["Ben", "John", "Alex"][n % 3],
      starterJockeyHisaId: `P9999999${90 + (n % 10)}`,
      starterJockeyLastName: ["Robinson", "Smith", "Brown"][n % 3],
      starterJockeyReferenceNumber: 165430 + n,
      starterJockeyType: ["JF", "JA"][n % 2],

      starterLengthBehindAtFinish: parseFloat((5 + (n % 15)).toFixed(2)),
      starterOdds: 5 + (n % 14),
      starterOfficialPosition: (n % 12) + 1,

      starterOwnerFirstName: "",
      starterOwnerHisaId: `P9999999${80 + (n % 10)}`,
      starterOwnerLastName: `Owner ${n}`,
      starterOwnerReferenceNumber: 2213300 + n,
      starterOwnerType: ["OF", "OT"][n % 2],

      starterPositionAtPointOfCall1: 0,
      starterPositionAtPointOfCall2: 0,
      starterPositionAtPointOfCall3: 0,
      starterPositionAtPointOfCall4: 0,
      starterPositionAtPointOfCall5: 0,

      starterPostPosition: (n % 12) + 1,
      starterProgramNumber: "" + String((n % 20) + 1).padStart(2, "0"),
      starterRecordType: "result",
      starterScratched: n % 13 === 0,
      starterShakes: n % 9,

      starterTrainerFirstName: ["Brian", "Mark", "Sam"][n % 3],
      starterTrainerHisaId: `P9999999${70 + (n % 10)}`,
      starterTrainerLastName: ["Ellison", "Clark", "Wells"][n % 3],
      starterTrainerReferenceNumber: 143410 + n,
      starterTrainerType: ["TF", "TA"][n % 2],

      starterVoidIndicator: n % 20 === 0 ? "Y" : "N",
      starterVoidReason: "Void Reason",
    });
  }

  // Sort by timestamp descending (most recent first)
  return results.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

export const getMockRunnersResultPaginated = (
  page: number = 1,
  pageSize: number = 5,
  filters?: SearchFilters
): RunnersResultResponse & { totalPages: number; currentPage: number } => {
  let allLResults = generateDummyRunnersResultData(500); // Larger dataset for pagination demo

  // Apply search filters if provided
  if (filters) {
    console.log("filters:", filters);
    allLResults = filterRunnersResult(allLResults, filters);
  }
  
  const totalCount = allLResults.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const items = allLResults //allLResults.slice(startIndex, endIndex);
  console.log("Filtered Results Count:", allLResults.length, totalPages, startIndex, endIndex, items, pageSize);

  return {
    items,
    nextToken: endIndex < totalCount ? endIndex.toString() : undefined,
    count: items.length,
    total: totalCount,
    totalPages,
    currentPage: page,
  };
};
