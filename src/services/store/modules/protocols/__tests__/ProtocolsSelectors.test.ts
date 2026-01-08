import {
  filterProtocolsByUserId,
  selectIsAddingTreatment,
  selectIsFetchingProtocol,
  selectProtocols,
  selectProtocolsByUserId,
} from "../selectors";

describe("protocols selectors", () => {
  const mockState = {
    protocols: {
      protocols: [
        { personId: "P000056577", protocolName: "Protocol 1" },
        { personId: "P000343598", protocolName: "Protocol 2" },
      ],
      isAddingTreatment: true,
      isProtocolsFetching: false,
    },
    auth: {
      hisaPersonId: "P000056577",
    },
  } as any;

  const state = {
    protocols: {
      protocols: [{ personId: "P000056577" }, { personId: "P000343598" }],
    },
    auth: { hisaPersonId: "P000056577" },
  } as any;

  const protocols = [
    { personId: "P000056577", name: "A" },
    { personId: "P000343598", name: "B" },
  ];

  it("selectProtocols returns all protocols", () => {
    const result = selectProtocols(mockState);
    expect(result).toEqual(mockState.protocols.protocols);
  });

  it("selectProtocolsByUserId returns only protocols for current user", () => {
    const result = selectProtocolsByUserId(mockState);
    expect(result).toEqual([
      { personId: "P000056577", protocolName: "Protocol 1" },
    ]);
  });

  it("selectProtocolsByUserId returns empty array if no userId", () => {
    const stateWithoutUserId = {
      ...mockState,
      auth: { hisaPersonId: null },
    };
    const result = selectProtocolsByUserId(stateWithoutUserId);
    expect(result).toEqual([]);
  });

  it("selectProtocolsByUserId returns empty array if no protocols", () => {
    const stateWithoutProtocols = {
      ...mockState,
      protocols: {
        ...mockState.protocols,
        protocols: [],
      },
    };
    const result = selectProtocolsByUserId(stateWithoutProtocols);
    expect(result).toEqual([]);
  });

  it("selectIsAddingTreatment returns the flag", () => {
    const result = selectIsAddingTreatment(mockState);
    expect(result).toBe(true);
  });

  it("selectIsFetchingProtocol returns the flag", () => {
    const result = selectIsFetchingProtocol(mockState);
    expect(result).toBe(false);
  });

  it("returns empty if no userId", () => {
    expect(filterProtocolsByUserId(protocols, null)).toEqual([]);
  });

  it("returns empty if no protocols", () => {
    expect(filterProtocolsByUserId([], "P000056577")).toEqual([]);
  });

  it("returns only protocols for user", () => {
    expect(filterProtocolsByUserId(protocols, "P000056577")).toEqual([
      { personId: "P000056577", name: "A" },
    ]);
  });

  it("returns filtered protocols", () => {
    expect(selectProtocolsByUserId(state)).toEqual([
      { personId: "P000056577" },
    ]);
  });
});
