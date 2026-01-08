import { getUserId, handleSignIn } from "@/services/aws/amplifyActions";
import { setUserId } from "@/services/pwa/utils";
import { NextStep } from "@/Types";
import { signIn } from "@aws-amplify/auth";
import { call, put, select } from "redux-saga/effects";
import {
  changeHasAccess,
  changeHisaPersonId,
  changeIsFetching,
  changeNextStep,
  changeUserName,
  getPersonRequest,
  resetError,
} from "..";
import { syncHorseMedical } from "../../horseMedical";
import { getPersonHorses } from "../../horses";
import { updateFavorites } from "../../locations";
import { selectFavoriteLocations } from "../../locations/selectors";
import { TLocation } from "../../locations/types";
import { logEventAction } from "../../logger";
import { getAllProtocolsAction } from "../../protocols";
import {
  handleSuccessfulSignIn,
  loginSaga,
  permissionsRequestSaga,
} from "../authSaga";
import { TAuthSagaActions } from "../sagaActions";
import { selectHisaPersonId } from "../selectors";

jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  request: jest.fn(),
}));

jest.mock("@aws-amplify/auth", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  fetchAuthSession: jest.fn(),
  fetchUserAttributes: jest.fn(),
}));

jest.mock("@/services/aws/amplifyActions", () => ({
  getUserId: jest.fn(),
  handleSignIn: jest.fn(),
}));

const mockPayload = {
  username: "alex",
  password: "pass123",
};

describe("Auth saga functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("handles successful login and calls handleSuccessfulSignIn", () => {
    const mockNextStep = { nextStep: NextStep.DASHBOARD };
    (signIn as jest.Mock).mockResolvedValue(mockNextStep);

    const gen = loginSaga({
      type: TAuthSagaActions.REQUEST,
      payload: mockPayload,
    });

    expect(gen.next().value).toEqual(put(resetError()));
    expect(gen.next().value).toEqual(put(changeIsFetching(true)));
    expect(gen.next().value).toEqual(
      call(handleSignIn, mockPayload.username, mockPayload.password)
    );
    const mockSignInOutput = {
      nextStep: NextStep.DASHBOARD,
    };
    expect(gen.next(mockSignInOutput as any).value).toEqual(
      put(changeUserName({ username: "alex" }))
    );
    expect(gen.next().value).toEqual(call(handleSuccessfulSignIn));
    expect(gen.next().done).toBe(true);
  });

  it("handles successful sign-in with permissions", () => {
    (getUserId as jest.Mock).mockResolvedValue("H123");

    const gen = handleSuccessfulSignIn();

    const mockUserId = "H123";
    const mockFavorites: TLocation[] = [
      { locationId: "L123", locationName: "Barn A" },
    ];
    const mockPermissionsResult = { hasPermissions: true, error: undefined };

    expect(gen.next().value).toEqual(call(getUserId));

    expect(gen.next(mockUserId as any).value).toEqual(
      call(setUserId, mockUserId)
    );

    expect(gen.next().value).toEqual(select(selectHisaPersonId));

    expect(gen.next(mockUserId as any).value).toEqual(
      select(selectFavoriteLocations)
    );

    expect(gen.next(mockFavorites as any).value).toEqual(
      put(updateFavorites({ favorites: mockFavorites }))
    );

    expect(gen.next().value).toEqual(
      put(changeHisaPersonId({ hisaPersonId: mockUserId }))
    );

    expect(gen.next().value).toEqual(call(permissionsRequestSaga));

    expect(gen.next(mockPermissionsResult as any).value).toEqual(
      put(getPersonRequest({ personId: mockUserId }))
    );

    expect(gen.next().value).toEqual(put(syncHorseMedical()));
    expect(gen.next().value).toEqual(
      put(getPersonHorses({ personId: mockUserId }))
    );
    expect(gen.next().value).toEqual(put(getAllProtocolsAction()));

    expect(gen.next().value).toEqual(put(changeHasAccess({ hasAccess: true })));
    expect(gen.next().value).toEqual(
      put(changeNextStep({ nextStep: NextStep.DASHBOARD }))
    );
    expect(gen.next().value).toEqual(
      put(logEventAction({ eventName: "Sign_in_success" }))
    );

    expect(gen.next().value).toEqual(put(changeIsFetching(false)));

    expect(gen.next().done).toBe(true);
  });
});
