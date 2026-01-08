import reducer, {
  addProtocol,
  addToProtocolAction,
  createProtocolAction,
  deleteFromProtocolsAction,
  deleteProtocol,
  deleteProtocolsAction,
  endAddingTreatment,
  endProtocolsFetching,
  getAllProtocolsAction,
  getProtocolByIdAction,
  initialState,
  resetProtocols,
  saveProtocols,
  startAddingTreatment,
  startProtocolsFetching,
  updateProtocolNameAction,
  updateProtocols,
  updateTreatmentTemplateAction,
} from "..";

import { protocol_1, protocol_2 } from "../../../../../../__mocks__/protocols";

describe("protocols slice reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle saveProtocols", () => {
    const mockProtocols = [protocol_1];
    const newState = reducer(
      initialState,
      saveProtocols({ protocols: mockProtocols as any })
    );
    expect(newState.protocols).toEqual(mockProtocols);
  });

  it("should handle startAddingTreatment", () => {
    const newState = reducer(initialState, startAddingTreatment());
    expect(newState.isAddingTreatment).toBe(true);
  });

  it("should handle endAddingTreatment", () => {
    const state = { ...initialState, isAddingTreatment: true };
    const newState = reducer(state, endAddingTreatment());
    expect(newState.isAddingTreatment).toBe(false);
  });

  it("should handle addProtocol", () => {
    const newProtocol = protocol_2;
    const state = {
      ...initialState,
      protocols: [protocol_1 as any],
    };
    const newState = reducer(
      state,
      addProtocol({ protocol: newProtocol as any })
    );
    expect(newState.protocols[0]).toEqual(newProtocol);
    expect(newState.protocols.length).toBe(2);
  });

  it("should handle deleteProtocol", () => {
    const state = {
      ...initialState,
      protocols: [protocol_1 as any, protocol_2 as any],
    };
    const newState = reducer(
      state,
      deleteProtocol({ protocolId: "TRP000000045" })
    );
    expect(newState.protocols).toEqual([protocol_2]);
    expect(newState.error).toBeUndefined();
  });

  it("should handle updateProtocols when match found", () => {
    const updatedProtocol = {
      treatmentProtocolId: "TRP000000045",
      name: "Updated",
    };
    const state = {
      ...initialState,
      protocols: [
        { treatmentProtocolId: "TRP000000045", name: "Old" },
        { treatmentProtocolId: "TRP000000040" },
      ],
    };
    const newState = reducer(
      state,
      updateProtocols({
        protocol: updatedProtocol,
        treatmentProtocolId: "TRP000000045",
      })
    );
    expect(newState.protocols[0]).toEqual(updatedProtocol);
  });

  it("should handle updateProtocols when no match found", () => {
    const state = { ...initialState, protocols: [] };
    const newState = reducer(
      state,
      updateProtocols({ protocol: {}, treatmentProtocolId: "unknown" })
    );
    expect(newState.protocols).toEqual([]);
  });

  it("should handle startProtocolsFetching", () => {
    const newState = reducer(initialState, startProtocolsFetching());
    expect(newState.isProtocolsFetching).toBe(true);
  });

  it("should handle endProtocolsFetching", () => {
    const state = { ...initialState, isProtocolsFetching: true };
    const newState = reducer(state, endProtocolsFetching());
    expect(newState.isProtocolsFetching).toBe(false);
  });

  it("should handle resetProtocols", () => {
    const state = {
      ...initialState,
      protocols: [protocol_1 as any],
      isProtocolsFetching: true,
      isAddingTreatment: true,
    };
    const newState = reducer(state, resetProtocols());
    expect(newState).toEqual(initialState);
  });
});

describe("protocols slice actions", () => {
  it("should create createProtocolAction", () => {
    const payload = { protocolName: "New", personId: "123", treatments: [] };
    const action = createProtocolAction(payload as any);
    expect(action.type).toBe("protocol/CREATE_PROTOCOL");
    expect(action.payload).toEqual(payload);
  });

  it("should create addToProtocolAction", () => {
    const payload = { protocolId: "1", treatment: {} } as any;
    const action = addToProtocolAction(payload);
    expect(action.type).toBe("protocol/ADD_TO_PROTOCOL");
    expect(action.payload).toEqual(payload);
  });

  it("should create getAllProtocolsAction", () => {
    const action = getAllProtocolsAction();
    expect(action.type).toBe("protocol/GET_ALL_PROTOCOLS");
  });

  it("should create deleteProtocolsAction", () => {
    const action = deleteProtocolsAction({ protocolId: "TRP000000045" });
    expect(action.type).toBe("protocol/DELETE_PROTOCOL");
    expect(action.payload).toEqual({ protocolId: "TRP000000045" });
  });

  it("should create getProtocolByIdAction", () => {
    const action = getProtocolByIdAction({ id: "TRP000000045" });
    expect(action.type).toBe("protocol/GET_PROTOCOL_BY_ID");
    expect(action.payload).toEqual({ id: "TRP000000045" });
  });

  it("should create deleteFromProtocolsAction", () => {
    const action = deleteFromProtocolsAction({
      protocolId: "TRP000000045",
      templateId: "TRP000000040",
    });
    expect(action.type).toBe("protocol/DELETE_FROM_PROTOCOL");
    expect(action.payload).toEqual({
      protocolId: "TRP000000045",
      templateId: "TRP000000040",
    });
  });

  it("should create updateTreatmentTemplateAction", () => {
    const payload = { protocolId: "TRP000000045", template: {} } as any;
    const action = updateTreatmentTemplateAction(payload);
    expect(action.type).toBe("protocol/UPDATE_TREATMENT_TEMPLATE");
    expect(action.payload).toEqual(payload);
  });

  it("should create updateProtocolNameAction", () => {
    const payload = { protocolId: "TRP000000045", protocolName: "New Name" };
    const action = updateProtocolNameAction(payload);
    expect(action.type).toBe("protocol/UPDATE_PROTOCOL_NAME");
    expect(action.payload).toEqual(payload);
  });
});
