import { RootState } from "../..";

export const selectHisaPersonId = (state: RootState) => state.auth.hisaPersonId;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectUserData = (state: RootState) => state.auth.userData;
export const selectPermissions = (state: RootState) => state.auth.permissions;
export const selectHasAccess = (state: RootState) => state.auth.hasAccess;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthFetching = (state: RootState) => state.auth.isFetching;
export const selectNextStep = (state: RootState) => state.auth.nextStep;
