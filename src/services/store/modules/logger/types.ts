import { RequestErrorType } from "@/utils/errors";
import { TLoggerSagaActions } from "./sagaActions";

export type TErrorPayload = {
  payload: { error?: RequestErrorType };
};

export type TLogRequestAction = {
  type: TLoggerSagaActions.LOG_QUERY;
  payload: TRequestPayload;
};

export type TLogResponseAction = {
  type: TLoggerSagaActions.LOG_RESPONSE;
  payload: TRequestPayload;
};

export type TLogRequestErrorAction = {
  type: TLoggerSagaActions.LOG_ERROR;
  payload: RequestErrorType;
};

export type TSyncDataAction = {
  type: TLoggerSagaActions.SYNC_DATA;
};

export type TRequestPayload = {
  url: string;
  headers?: Headers;
  status?: number;
  method?: string;
  dependency?: any;
};

export type TScreenPayload = {
  screenName: string;
};

export type TLogScreenAction = {
  type: TLoggerSagaActions.LOG_SCREEN;
  payload: TScreenPayload;
};

export type TLogEventPayload = {
  eventName: string;
  [key: string]: any;
};

export type TLogEventAction = {
  type: TLoggerSagaActions.LOG_EVENT;
  payload: TLogEventPayload;
};
