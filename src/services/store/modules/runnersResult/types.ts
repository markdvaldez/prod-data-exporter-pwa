import { RequestErrorType } from "@/utils/errors";
import { TRunnersResultActions } from "./sagaActions";

export interface TRunnersResultState {
  isFetching: boolean;
  error?: RequestErrorType;
  runnersResult: Record<string, TRunnersResult>;
}

export type TErrorPayload = {
  payload: { error?: RequestErrorType };
};

export type TGetRunnersResultByIdAction = {
  type: TRunnersResultActions.RUNNERSRESULT_REQUEST_BY_ID;
  payload: { id: string };
};

export type TSyncRunnersResultAction = {
  type: TRunnersResultActions.RUNNERSRESULT_SYNC;
  payload: { runnersResult: TRunnersResult[] };
};

export type TRunnersResult = {
  id: string;
  timestamp: string;
};

export type TSearchRunnersResultAction = {
  type: TRunnersResultActions.RUNNERSRESULT_SEARCH;
  payload: TSearchRunnersResultVariables;
};

export type TSearchRunnersResultVariables = {
  searchText: string;
};

export type TRunnersResultPayload = {
  payload: { runnersResult: TRunnersResult[] };
};
