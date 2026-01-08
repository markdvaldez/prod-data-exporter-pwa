import { THorse } from "@/runnersQcApp/shared/types";
import { CoveredHorseSearchResponse } from "@/Types";
import { RequestErrorType } from "@/utils/errors";
import { THorsesActions } from "./sagaActions";

export interface THorsesState {
  horses: Record<string, THorse>;
  searchHorses: Record<string, THorse>;
  isSearching: boolean;
  isFetching: boolean;
  error?: RequestErrorType;
  horse?: CoveredHorseSearchResponse;
  selectedHorses: THorse[];
}

export type TSearchHorsesVariables = {
  name: string;
};

export type TGetPersonHorsesVariables = {
  personId: string;
};

export type THorsesPayload = {
  payload: {
    horses: THorse[];
  };
};

export type GetPersonHorsesPayload = {
  payload: {
    personId: string;
  };
};

// export type TSearchHorsesAction = {
//   type: THorsesActions.SEARCH_HORSE_REQUEST;
//   payload: TSearchHorsesVariables;
// };

export type TSearchHorseByIdVariables = {
  hisaHorseId: string;
};

export type TSearchHorsesListVariables = {
  ids: string[];
};

export type THorsePayload = {
  payload: {
    horse: CoveredHorseSearchResponse;
  };
};

// export type TSearchHorseByIdAction = {
//   type: THorsesActions.SEARCH_HORSE_BY_ID_REQUEST;
//   payload: TSearchHorseByIdVariables;
// };

export type TGetPersonHorsesAction = {
  type: THorsesActions.GET_HORSE_BY_PERSON_REQUEST;
  payload: TGetPersonHorsesVariables;
};

// export type TSearchHorsesListAction = {
//   type: THorsesActions.SEARCH_HORSE_BY_IDS_REQUEST;
//   payload: TSearchHorsesListVariables;
// };

// export type TSyncHorseByIdAction = {
//   type: THorsesActions.SYNC_HORSE_BY_ID;
//   payload: {
//     hisaHorseId: string;
//   };
// };

export type TErrorPayload = {
  payload: { error?: RequestErrorType };
};
