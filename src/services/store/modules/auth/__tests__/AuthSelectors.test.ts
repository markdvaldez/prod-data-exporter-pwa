import { RootState } from "@/services/store";
import { AuthPermissions, PersonResponse } from "@/Types/global-types";
import {
  selectAuthError,
  selectHasAccess,
  selectHisaPersonId,
  selectIsAuthFetching,
  selectNextStep,
  selectPermissions,
  selectUserData,
  selectUsername,
} from "../selectors";

import { NextStep } from "@/Types";
import { extractError, RequestError } from "@/utils/errors";

describe("Auth selectors functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Given state.hisaPersonId db1111, selectHisaPersonId return db1111", () => {
    return expect(
      selectHisaPersonId({ auth: { hisaPersonId: "db1111" } } as RootState)
    ).toEqual("db1111");
  });

  it("Given state.hisaPersonId abcd1234, selectHisaPersonId returns abcd1234", () => {
    expect(
      selectHisaPersonId({ auth: { hisaPersonId: "abcd1234" } } as RootState)
    ).toEqual("abcd1234");
  });

  it("Given state.hisaPersonId is empty, selectHisaPersonId returns empty string", () => {
    expect(
      selectHisaPersonId({ auth: { hisaPersonId: "" } } as RootState)
    ).toEqual("");
  });

  it("Given state.auth.hisaPersonId is undefined, selectHisaPersonId returns undefined", () => {
    expect(selectHisaPersonId({ auth: {} } as RootState)).toBeUndefined();
  });

  it('Given state.username "alexwork01", selectUsername return "alexwork01"', () => {
    return expect(
      selectUsername({ auth: { username: "alexwork01" } } as RootState)
    ).toEqual("alexwork01");
  });

  it("Given state.username is empty, selectUsername returns empty string", () => {
    expect(selectUsername({ auth: { username: "" } } as RootState)).toEqual("");
  });

  it("Given state.username is undefined, selectUsername returns undefined", () => {
    expect(selectUsername({ auth: {} } as RootState)).toBeUndefined();
  });

  it('Given state.username "test_user_123", selectUsername returns "test_user_123"', () => {
    expect(
      selectUsername({ auth: { username: "test_user_123" } } as RootState)
    ).toEqual("test_user_123");
  });

  it("Given state.userData , selectUserData return correct result", () => {
    const MockUserData: PersonResponse = {
      hisaPersonId: "H00000089",
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      birthDate: "2000-01-12",
      email: "email@example.com",
      userName: "db1111",
      id: "123-456-789",
    };
    return expect(
      selectUserData({ auth: { userData: MockUserData } } as RootState)
    ).toEqual({
      hisaPersonId: "H00000089",
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      birthDate: "2000-01-12",
      email: "email@example.com",
      userName: "db1111",
      id: "123-456-789",
    });
  });

  it("Given state.userData is undefined, selectUserData returns undefined", () => {
    expect(selectUserData({ auth: {} } as RootState)).toBeUndefined();
  });

  it("Given state.userData is partial, selectUserData returns partial object", () => {
    const partialUserData = {
      hisaPersonId: "H123",
      name: { firstName: "Alice", lastName: "" },
    };
    expect(
      selectUserData({ auth: { userData: partialUserData } } as RootState)
    ).toEqual(partialUserData);
  });

  it("Given state.userData has wrong types, selectUserData returns it as-is", () => {
    const malformedUserData = {
      hisaPersonId: 123,
      name: null,
      birthDate: false,
    };
    expect(
      selectUserData({ auth: { userData: malformedUserData } } as any)
    ).toEqual(malformedUserData);
  });

  it("Given state.permissions, selectPermissions return correct result", () => {
    const MockPermissions: AuthPermissions = {
      hisaPersonId: "H00000089",
      horses: {},
      locations: {},
      general: ["llvtapp:access"],
      generalAuthGroups: ["attending-vets"],
    };
    return expect(
      selectPermissions({ auth: { permissions: MockPermissions } } as RootState)
    ).toEqual({
      hisaPersonId: "H00000089",
      horses: {},
      locations: {},
      general: ["llvtapp:access"],
      generalAuthGroups: ["attending-vets"],
    });
  });

  it("Given empty permissions object, selectPermissions returns empty object", () => {
    const emptyPermissions: AuthPermissions = {
      hisaPersonId: "",
      horses: {},
      locations: {},
      general: [],
      generalAuthGroups: [],
    };

    expect(
      selectPermissions({
        auth: { permissions: emptyPermissions },
      } as RootState)
    ).toEqual(emptyPermissions);
  });

  it("Given multiple general permissions and groups, selectPermissions returns full data", () => {
    const fullPermissions: AuthPermissions = {
      hisaPersonId: "p00000999",
      horses: { H00000100: ["report:injury"] },
      locations: { H00000099: ["report:death"] },
      general: ["llvtapp:access", "llvtapp:edit"],
      generalAuthGroups: ["attending-vets", "super-admins"],
    };

    expect(
      selectPermissions({ auth: { permissions: fullPermissions } } as RootState)
    ).toEqual(fullPermissions);
  });
  it("Given state.hasAccess true, selectHasAccess return true", () => {
    return expect(
      selectHasAccess({ auth: { hasAccess: true } } as RootState)
    ).toBeTruthy();
  });

  it("Given state.hasAccess false, selectHasAccess return false", () => {
    return expect(
      selectHasAccess({ auth: { hasAccess: false } } as RootState)
    ).toBeFalsy();
  });

  it("Given state.hasAccess false, selectHasAccess return false", () => {
    return expect(
      selectHasAccess({ auth: { hasAccess: undefined } } as any)
    ).toBeUndefined();
  });

  it('Given state.error  "Test Error", selectAuthError return error message "Test Error"', () => {
    const MockError = extractError(new RequestError({ message: "Test Error" }));
    return expect(
      selectAuthError({ auth: { error: MockError } } as RootState)
    ).toHaveProperty("message", "Test Error");
  });

  it("Given state.error is undefined, selectAuthError returns undefined", () => {
    expect(
      selectAuthError({ auth: { error: undefined } } as RootState)
    ).toBeUndefined();
  });

  it("Given state.error has no message, selectAuthError returns object without message", () => {
    const mockError = extractError(new RequestError({}));
    expect(
      selectAuthError({ auth: { error: mockError } } as RootState)
    ).not.toHaveProperty("message", "");
  });

  it("Given state.error has custom fields, selectAuthError returns them", () => {
    const mockError = extractError(
      new RequestError({ message: "Auth failed", code: 401 })
    );
    expect(
      selectAuthError({ auth: { error: mockError } } as RootState)
    ).toMatchObject({ message: "Auth failed", code: 401 });
  });

  it("Given state.isFetching true, selectIsAuthFetching return true", () => {
    return expect(
      selectIsAuthFetching({ auth: { isFetching: true } } as RootState)
    ).toBeTruthy();
  });

  it("Given state.isFetching false, selectIsAuthFetching return false", () => {
    return expect(
      selectIsAuthFetching({ auth: { isFetching: false } } as RootState)
    ).toBeFalsy();
  });

  it("Given state.isFetching undefined, selectIsAuthFetching return undefined", () => {
    return expect(
      selectIsAuthFetching({ auth: { isFetching: undefined } } as any)
    ).toBeUndefined();
  });

  it("Given state.nextStep DASHBOARD, selectNextStep return DASHBOARD", () => {
    return expect(
      selectNextStep({ auth: { nextStep: NextStep.DASHBOARD } } as RootState)
    ).toEqual("DASHBOARD");
  });

  it("Given state.nextStep is null, selectNextStep returns null", () => {
    expect(selectNextStep({ auth: { nextStep: null } } as any)).toBeNull();
  });

  it("Given state.nextStep is undefined, selectNextStep returns undefined", () => {
    expect(selectNextStep({ auth: {} } as RootState)).toBeUndefined();
  });

  it("Given state.nextStep REQUEST_ACCESS, selectNextStep returns REQUEST_ACCESS", () => {
    expect(
      selectNextStep({
        auth: { nextStep: NextStep.REQUEST_ACCESS },
      } as RootState)
    ).toEqual("REQUEST_ACCESS");
  });

  it('Given state.nextStep is "UNKNOWN", selectNextStep returns "UNKNOWN"', () => {
    expect(
      selectNextStep({ auth: { nextStep: "UNKNOWN" as NextStep } } as RootState)
    ).toEqual("UNKNOWN");
  });
});
