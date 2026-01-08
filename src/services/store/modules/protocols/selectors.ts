import { createDraftSafeSelector } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../..";
import { selectHisaPersonId } from "../auth/selectors";

export const selectProtocols = (state: RootState) => state.protocols.protocols;

export const filterProtocolsByUserId = (
  protocols: any[],
  userId: string | null
) => {
  if (!userId || _.isEmpty(protocols)) {
    return [];
  }

  return _.filter(protocols, (protocol) => protocol.personId === userId);
};

export const selectProtocolsByUserId = createDraftSafeSelector(
  selectProtocols,
  selectHisaPersonId,
  filterProtocolsByUserId
);

export const selectIsAddingTreatment = (state: RootState) =>
  state.protocols.isAddingTreatment;

export const selectIsFetchingProtocol = (state: RootState) =>
  state.protocols.isProtocolsFetching;
