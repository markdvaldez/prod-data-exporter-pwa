export interface RunnersData {
  id: string;
  timestampRunnerNumber: string;
  runnerDeath: string;
  runnerDNF: boolean;
  runnerRaceDeath: string;
  runnerScratched: string;
  runnerStart: string;
  locked: string;
  preferredCurrentAsOfIncremental: string;
  preferredRecType: string;
  raceBreedTb: string;
  raceCountry: string;
  raceDate: string;
  raceDistanceFurlong: string;
  raceNumber: string;
  raceOnTheFlat: string;
  raceSurface: string;
  raceSurfaceCondition: string;
  raceTrackId: string;
  raceType: string;
  runnerDnf: string;
  runnerHisaId: string;
  runnerHorseBreed: string;
  runnerIncludeInMetricsReport: string;
  runnerScratched2: string;
  runnerTjcNumber: string;
}

export interface RunnersDataResponse {
  items: RunnersData[];
  nextToken?: string;
  count: number;
  total?: number;
  // Additional fields for pagination support
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export enum RunnersDataStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress", 
  COMPLETED = "Completed",
  FAILED = "Failed",
  TIMED_OUT = "Timed Out - Not confirmed",
  CANCELLED = "Cancelled"
}

export enum RunnersDataAction {
  TR_QC_HITL = "TR-QC-HITL",
  CREATE_RECORD = "CREATE_RECORD",
  UPDATE_RECORD = "UPDATE_RECORD", 
  DELETE_RECORD = "DELETE_RECORD",
  APPLY_PROTOCOL = "APPLY_PROTOCOL",
  VALIDATE_TREATMENT = "VALIDATE_TREATMENT"
}