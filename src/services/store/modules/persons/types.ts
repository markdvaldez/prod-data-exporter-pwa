import { RequestErrorType } from "@/utils/errors";
import { TPersonsActions } from "./sagaActions";

export interface TPersonState {
  isFetching: boolean;
  error?: RequestErrorType;
  persons: Record<string, TPerson>;
}

export type TErrorPayload = {
  payload: { error?: RequestErrorType };
};

export type TGetPersonByIdAction = {
  type: TPersonsActions.PERSONS_REQUEST_BY_ID;
  payload: { hisaPersonId: string };
};

export type TSyncPersonsAction = {
  type: TPersonsActions.PERSONS_SYNC;
  payload: { persons: TPerson[] };
};

export type TPerson = {
  hisaPersonId: string;
  hisaPersonName: string;
};

export type TSearchPersonsAction = {
  type: TPersonsActions.PERSONS_SEARCH;
  payload: TSearchPersonsVariables;
};

export type TSearchPersonsVariables = {
  searchText: string;
};

export type TPersonPayload = {
  payload: { persons: TPerson[] };
};
