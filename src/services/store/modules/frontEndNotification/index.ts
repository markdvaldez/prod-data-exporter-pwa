import { createAction } from '@reduxjs/toolkit';
import { TFrontendnotificationActions } from './sagaActions';
import { TLogResponsePayload, TLogShowPayload } from './types';

// ACTIONS
export const logResponseAction = createAction<TLogResponsePayload>(
  TFrontendnotificationActions.LOG_USER_RESPONSE_REQUEST,
);

export const logShowAction = createAction<TLogShowPayload>(
  TFrontendnotificationActions.LOG_USER_SHOW_REQUEST,
);
