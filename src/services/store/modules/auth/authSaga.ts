import { navigateToLogin } from "@/routes/utils";
import {
  fetchPermissions,
  fetchUserData,
} from "@/services/api/modules/auth/fetchAuthUser";
import {
  getUserId,
  handleSignIn,
  signOutGlobal,
} from "@/services/aws/amplifyActions";
import { debugLog } from "@/services/aws/verifiedPermissions";
import { checkTransactionLogAccessAPI } from "@/services/api/transactionLogAccessApi";
import { clearAllCookies } from "@/services/aws/simplifiedCookieStorage";
import { clearPwaInstallation } from "@/services/pwa/usePWAInstall";
import { ednSession, setUserId } from "@/services/pwa/utils";
import { AuthPermissions, NextStep, PersonResponse } from "@/Types";
import { TransactionLogAccessRequest } from "@/Types/verified-permissions";
import { extractError, RequestError, RequestErrorType } from "@/utils/errors";
import { SignInOutput } from "@aws-amplify/auth";
import _ from "lodash";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import {
  changeHasAccess,
  changeHisaPersonId,
  changeIsFetching,
  changeNextStep,
  changePermissions,
  changeUserDataDetails,
  changeUserName,
  checkAuthData,
  checkPermissionAction,
  getPersonRequest,
  resetAuthStore,
  resetError,
  restartAuth,
  setError,
} from ".";
import { logErrorAction, logEventAction } from "../logger";
import { getAllProtocolsAction, resetProtocols } from "../protocols";
import { TAuthSagaActions } from "./sagaActions";
import { selectHisaPersonId } from "./selectors";
import { TAuthRequestPayload, TGetPersonAction } from "./types";

const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;

export function* loginSaga({
  payload,
}: {
  type: TAuthSagaActions.REQUEST;
  payload: TAuthRequestPayload;
}) {
  try {
    const { username, password } = payload || {};
    yield put(resetError());
    yield put(changeIsFetching(true));

    const { nextStep }: SignInOutput = yield call(
      handleSignIn,
      username,
      password
    );
    yield put(changeUserName({ username }));

    if (
      nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE" ||
      nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_EMAIL_CODE" ||
      nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE"
    ) {
      // yield call(handleMfaStep as any, user, username, maskedPhone);
    } else {
      yield call(handleSuccessfulSignIn);
    }
  } catch (e) {
    yield* handleRequestError(e);
  }
}

export function* handleSuccessfulSignIn() {
  const userId: string | undefined = yield call(getUserId);

  if (!userId) {
    throw new RequestError({
      code: -5,
      message: "Your username or password is incorrect. Please try again",
    });
  }

  yield call(setUserId, userId);

  const hisaPersonId: string = yield select(selectHisaPersonId);

  yield put(changeHisaPersonId({ hisaPersonId: userId }));

  const { hasPermissions, error } = yield call(permissionsRequestSaga);

  if (error) {
    yield put(resetAuthStore());
    yield call(signOutGlobal);
    yield call(handleRequestError, error);
    return;
  }
  yield put(getPersonRequest({ personId: userId }));
  yield put(getAllProtocolsAction());

  if (hasPermissions) {
    yield put(changeHasAccess({ hasAccess: true }));
    yield put(changeNextStep({ nextStep: NextStep.DASHBOARD }));
    yield put(logEventAction({ eventName: "Sign_in_success" }));
  } else {
    yield put(changeNextStep({ nextStep: NextStep.REQUEST_ACCESS }));
    yield put(changeHasAccess({ hasAccess: false }));
    yield put(logEventAction({ eventName: "Request_Access" }));
  }
  yield put(changeIsFetching(false));
}

export function* handleRequestError(e: any) {
  const queryError = extractError(e);

  const errorCodes = [-5, -6];
  const isNetworkError =
    queryError?.message === "Network error" || "No internet connection";

  let error: RequestErrorType = {
    code: -3,
    message: "Your username or password is incorrect. Please try again",
  };

  if (_.includes(errorCodes, queryError?.code) || isNetworkError) {
    error = queryError;
  }

  yield put(setError({ error }));
  yield put(changeIsFetching(false));
  yield put(logErrorAction(error));
}

export function* permissionsRequestSaga(): Generator<any, { hasPermissions: boolean; error?: RequestErrorType }, any> {
  try {
    const personId: string = yield select(selectHisaPersonId);

    debugLog('Starting permission request saga', { personId });

    // Fetch user data for context (but not for permission checking)
    // Note: We only use AWS Verified Permissions (AVP) for authorization decisions
    let userData: PersonResponse | undefined;
    let userPermissions: AuthPermissions | undefined;
    try {
      userData = yield call(fetchUserData, personId);
      userPermissions = yield call(fetchPermissions, personId);
    } catch (fetchError) {
      debugLog("Failed to fetch user data, proceeding with AVP check only", { error: fetchError });
    }

    // Use AWS Verified Permissions (AVP) exclusively for authorization via API
    // No legacy permission fallbacks - AVP API is the single source of truth
    debugLog('Checking application access via Transaction Log Access API', { 
      personId, 
      userPermissionsExists: !!userPermissions,
      generalAuthGroups: userPermissions?.generalAuthGroups,
      generalAuthGroupsLength: userPermissions?.generalAuthGroups?.length,
      hasHisaStaff: userPermissions?.generalAuthGroups?.includes('HisaStaff'),
      hasHelpDesk: userPermissions?.generalAuthGroups?.includes('HelpDesk'),
      allGroups: userPermissions?.generalAuthGroups
    });

    // Create authorization request for basic app access via API
    // This uses the Transaction Log Access API which internally uses Cedar policies
    const authRequest: TransactionLogAccessRequest = {
      userId: personId,
      logsId: 'app-access', // Special logs ID for application access
      action: 'view', // Matches LongLivedTransactionsViewer::Action::"view"
      context: {
        userPermissions: {
          generalAuthGroups: userPermissions?.generalAuthGroups || [] // Policy checks for HisaStaff or HelpDesk
        },
        userData: userData,
        authenticatedPersonId: personId,
        requestSource: 'auth-saga-permission-check',
        timestamp: new Date().toISOString()
      }
    };

    debugLog('Authorization request being sent to API:', {
      userId: authRequest.userId,
      logsId: authRequest.logsId,
      action: authRequest.action,
      contextKeys: Object.keys(authRequest.context || {}),
      generalAuthGroups: authRequest.context?.userPermissions?.generalAuthGroups,
      userPermissionsExists: !!authRequest.context?.userPermissions,
      hasHisaStaffInRequest: authRequest.context?.userPermissions?.generalAuthGroups?.includes('HisaStaff')
    });

    // Check application access using the Transaction Log Access API
    const authResult = yield call(
      checkTransactionLogAccessAPI,
      authRequest
    );
    const hasAppAccess = authResult.decision === 'ALLOW';

    debugLog('Transaction Log Access API authorization result', {
      personId,
      hasAppAccess,
      decision: authResult.decision,
      errors: authResult.errors,
      // Add detailed debugging about the decision
      authResultKeys: Object.keys(authResult || {}),
      hasErrors: !!(authResult.errors && authResult.errors.length > 0),
      errorDetails: authResult.errors,
      requestWasSent: true,
      apiResponseReceived: !!authResult
    });

    if (hasAppAccess) {
      // Create permissions object based on AVP result
      const permissions: AuthPermissions = {
        hisaPersonId: personId,
        general: ["runners-qc-app:access"],
        generalAuthGroups: ["HisaStaff"], // Standard auth group for approved users
        horses: {}, // Empty initially, will be populated by other services
        locations: {}, // Empty initially, will be populated by other services
      };

      yield put(changePermissions({ permissions, hasAccess: true }));

      return {
        hasPermissions: true,
        error: undefined,
      };
    } else {
      debugLog("Transaction Log Access API denied access", {
        personId,
        decision: authResult.decision,
        errors: authResult.errors
      });

      // Create minimal permissions object for denied access
      const permissions: AuthPermissions = {
        hisaPersonId: personId,
        general: [],
        generalAuthGroups: [],
        horses: {},
        locations: {},
      };

      yield put(changePermissions({ permissions, hasAccess: false }));

      return {
        hasPermissions: false,
        error: undefined,
      };
    }
  } catch (error: any) {
    debugLog("Transaction Log Access API service error", { error: extractError(error) });

    return {
      hasPermissions: false,
      error: extractError(error)
    };
  }
}

export function* getPersonSaga(action: TGetPersonAction) {
  try {
    const personId = action?.payload?.personId;
    const data: PersonResponse = yield call(fetchUserData, personId);
    if (data) {
      yield put(changeUserDataDetails({ userData: data }));
    }
  } catch (e: any) {
    yield put(logErrorAction(extractError(e)));
  }
}

export function* checkAuth() {
  try {
    const userId: string | undefined = yield call(getUserId);

    if (!userId) {
      throw new RequestError({
        code: -5,
        message: "No user is logged in",
      });
    }

    yield call(setUserId, userId);

    const hisaPersonId: string = yield select(selectHisaPersonId);

    yield put(changeHisaPersonId({ hisaPersonId: userId }));
    yield put(getPersonRequest({ personId: userId }));
    yield put(getAllProtocolsAction());
  } catch (e) {
    yield put(logErrorAction(extractError(e)));
    yield put(restartAuth());
  }
}

export function* restartAuthSaga() {
  yield call(clearAllCookies);
  yield put(changeNextStep({ nextStep: NextStep.SIGN_IN }));
  yield call(signOutGlobal);
  yield call(navigateToLogin);
}

export function* syncDataSaga() {
  const personId: string = yield select(selectHisaPersonId);
}

export function* logoutSaga() {
  try {
    yield call(clearAllCookies);
    yield call(clearPwaInstallation);
    yield put(resetProtocols());
    yield call(signOutGlobal);
    yield call(ednSession);
  } catch (e) { }
}

export function* authSaga() {
  yield all([
    takeLatest(TAuthSagaActions.REQUEST, loginSaga),
    takeEvery(resetAuthStore, logoutSaga),
    takeEvery(restartAuth, restartAuthSaga),
    takeLatest(getPersonRequest, getPersonSaga),
    throttle(ONE_MINUTE, checkPermissionAction, permissionsRequestSaga),
    takeLatest(TAuthSagaActions.SYNC_DATA, syncDataSaga),
    takeLatest(checkAuthData, checkAuth),
  ]);
}
