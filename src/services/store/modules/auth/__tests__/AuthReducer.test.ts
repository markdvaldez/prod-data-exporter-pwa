import { NextStep } from "@/Types";
import reducer, {
  changeHasAccess,
  changeHisaPersonId,
  changeIsFetching,
  changeNextStep,
  changePermissions,
  changeUser,
  changeUserData,
  changeUserDataDetails,
  changeUserName,
  initialState,
  resetAuthStore,
  resetError,
  setError,
} from "..";

describe("auth reducer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle changeUserName", () => {
    const state = reducer(initialState, changeUserName({ username: "alex" }));
    expect(state.username).toBe("alex");
  });

  it("should handle changeHisaPersonId", () => {
    const state = reducer(
      initialState,
      changeHisaPersonId({ hisaPersonId: "H123" })
    );
    expect(state.hisaPersonId).toBe("H123");
  });

  it("should handle changeUser", () => {
    const user = { id: "1", userName: "john" };
    const state = reducer(initialState, changeUser({ userData: user }));
    expect(state.userData).toEqual(user);
  });

  it("should handle changePermissions", () => {
    const permissions = {
      general: ["view"],
      hisaPersonId: "H001",
      horses: {},
      locations: {},
      generalAuthGroups: [],
    };
    const state = reducer(initialState, changePermissions({ permissions }));
    expect(state.permissions).toEqual(permissions);
  });

  it("should handle changeHasAccess", () => {
    const state = reducer(initialState, changeHasAccess({ hasAccess: true }));
    expect(state.hasAccess).toBe(true);
  });

  it("should handle changeUserData", () => {
    const permissions = {
      general: ["edit"],
      hisaPersonId: "H002",
      horses: {},
      locations: {},
      generalAuthGroups: [],
    };
    const user = { id: "2", userName: "doe" };
    const state = reducer(
      initialState,
      changeUserData({ userData: user, permissions, hasAccess: true })
    );
    expect(state.userData).toEqual(user);
    expect(state.permissions).toEqual(permissions);
    expect(state.hasAccess).toBe(true);
  });

  it("should handle changeUserDataDetails", () => {
    const user = { id: "3", userName: "tester" };
    const state = reducer(
      initialState,
      changeUserDataDetails({ userData: user })
    );
    expect(state.userData).toEqual(user);
  });

  it("should handle changeIsFetching", () => {
    const state = reducer(initialState, changeIsFetching(true));
    expect(state.isFetching).toBe(true);
  });

  it("should handle setError", () => {
    const error = { message: "Something went wrong" };
    const state = reducer(initialState, setError({ error }));
    expect(state.error).toEqual(error);
  });

  it("should handle resetError", () => {
    const errorState = { ...initialState, error: { message: "Old error" } };
    const state = reducer(errorState, resetError());
    expect(state.error).toBeUndefined();
  });

  it("should handle changeNextStep", () => {
    const state = reducer(
      initialState,
      changeNextStep({ nextStep: NextStep.DASHBOARD })
    );
    expect(state.nextStep).toBe(NextStep.DASHBOARD);
  });

  it("should handle resetAuthStore", () => {
    const modifiedState = {
      username: "user",
      hisaPersonId: "H0001",
      permissions: {
        general: ["test"],
        hisaPersonId: "H0001",
        horses: {},
        locations: {},
        generalAuthGroups: [],
      },
      userData: { id: "1", userName: "alex" },
      hasAccess: true,
      error: { message: "error" },
      isFetching: true,
      nextStep: NextStep.DASHBOARD,
    };

    const state = reducer(modifiedState, resetAuthStore());
    expect(state).toEqual(initialState);
  });
});
