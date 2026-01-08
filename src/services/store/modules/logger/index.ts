import { RequestErrorType } from "@/utils/errors";
import { createAction } from "@reduxjs/toolkit";
import { TLoggerSagaActions } from "./sagaActions";
import { TLogEventPayload, TRequestPayload, TScreenPayload } from "./types";

export const logRequestAction = createAction<TRequestPayload>(
  TLoggerSagaActions.LOG_QUERY
);
export const logResponseAction = createAction<TRequestPayload>(
  TLoggerSagaActions.LOG_RESPONSE
);
export const logErrorAction = createAction<RequestErrorType>(
  TLoggerSagaActions.LOG_ERROR
);
export const logScreenAction = createAction<TScreenPayload>(
  TLoggerSagaActions.LOG_SCREEN
);
export const clearLogAction = createAction(TLoggerSagaActions.LOG_CLEAR);
export const logInAction = createAction(TLoggerSagaActions.LOG_LOGIN);
export const logEventAction = createAction<TLogEventPayload>(
  TLoggerSagaActions.LOG_EVENT
);
