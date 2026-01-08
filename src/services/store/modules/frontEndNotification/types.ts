import { TFrontendnotificationActions } from './sagaActions';

export type TLogResponsePayload = {
  frontEndNotificationId: string;
  response: string;
};

export type TLogShowPayload = {
  frontEndNotificationId: string;
};

export type TLogResponseAction = {
  type: TFrontendnotificationActions.LOG_USER_RESPONSE_REQUEST;
  payload: TLogResponsePayload;
};

export type TLogShowAction = {
  type: TFrontendnotificationActions.LOG_USER_SHOW_REQUEST;
  payload: TLogShowPayload;
};
