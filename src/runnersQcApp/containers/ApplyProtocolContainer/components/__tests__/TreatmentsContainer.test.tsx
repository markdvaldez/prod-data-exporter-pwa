import { HorseMedicalRecType, TreatmentTemplateModel } from "@/Types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { treatments } from "../../../../../../__mocks__/protocols";
import * as ConfigModule from "../../../addRecordAndProtocolConfig";
import { TreatmentsContainer } from "../TreatmentsContainer";

jest.mock("@/ui-kit/components/Button", () => ({
  Button: (props: any) => (
    <button onClick={props.onClick}>{props.title}</button>
  ),
}));
jest.mock("@/ui-kit/blocks/AddTreatmentPanel", () => ({
  AddTreatmentPanel: ({ isOpen }: any) =>
    isOpen ? <div data-testid="AddTreatmentPanel">Panel Open</div> : null,
}));

jest.mock("../../../MyProtocolsContainer/ProtocolListItem", () => ({
  ProtocolsListItem: jest.fn(({ id }: any) => (
    <div data-testid="ProtocolsListItem">{id}</div>
  )),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../../addRecordAndProtocolConfig", () => ({
  getApplyProtocolFields: jest.fn(() => []),
  getCurrentType: jest.fn(() => "DrugAdministered"),
  getFormattedTitle: jest.fn(() => "SubTitle"),
  getInspectionType: jest.fn(() => "InspectionType"),
  getRecType: jest.fn(() => "DrugAdministered"),
  hasAllRequiredFields: jest.fn(() => true),
  splitCamelCase: jest.fn(() => "SplitCamelCase"),
}));

jest.mock("../../../addRecordAndProtocolConfig", () => ({
  ...jest.requireActual("../../../addRecordAndProtocolConfig"),
  getApplyProtocolFields: jest.fn(() => []),
  getCurrentType: jest.fn(() => "DrugAdministered"),
  getFormattedTitle: jest.fn(() => "SubTitle"),
  getInspectionType: jest.fn(() => "InspectionType"),
  getRecType: jest.fn(() => "DrugAdministered"),
  hasAllRequiredFields: jest.fn(() => true),
  splitCamelCase: jest.fn(() => "SplitCamelCase"),
}));

describe("<TreatmentsContainer />", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  it("renders derived treatments", () => {
    const spy = jest.fn();
    render(
      <TreatmentsContainer
        treatments={treatments as TreatmentTemplateModel[]}
        onTreatmentsChange={jest.fn()}
        handleDeleteTreatment={jest.fn()}
        handleEdit={jest.fn()}
        handleSetHasTreatmentAllFields={spy}
      />
    );

    const items = screen.getAllByTestId("ProtocolsListItem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("TPT000000077");
    expect(items[1]).toHaveTextContent("TPT000000082");
  });

  it("calls handleSetHasTreatmentAllFields when all valid", () => {
    const spy = jest.fn();

    render(
      <TreatmentsContainer
        treatments={treatments as TreatmentTemplateModel[]}
        onTreatmentsChange={jest.fn()}
        handleDeleteTreatment={jest.fn()}
        handleEdit={jest.fn()}
        handleSetHasTreatmentAllFields={spy}
      />
    );

    expect(spy).toHaveBeenCalledWith(true);
  });

  it("scrolls into view on mount", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    render(
      <TreatmentsContainer
        treatments={treatments as TreatmentTemplateModel[]}
        onTreatmentsChange={jest.fn()}
        handleDeleteTreatment={jest.fn()}
        handleEdit={jest.fn()}
      />
    );

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it("toggles AddTreatmentPanel", async () => {
    render(
      <TreatmentsContainer
        treatments={[]}
        onTreatmentsChange={jest.fn()}
        handleDeleteTreatment={jest.fn()}
        handleEdit={jest.fn()}
      />
    );

    const addButton = screen.getByRole("button", {
      name: "Protocols.addNewTreatment",
    });

    expect(screen.queryByTestId("AddTreatmentPanel")).not.toBeInTheDocument();

    await userEvent.click(addButton);

    expect(screen.getByTestId("AddTreatmentPanel")).toBeInTheDocument();
  });

  it("sets inspectionType when recType is MandatoryPreRaceAndPreWorkVetInspection", () => {
    (ConfigModule.getRecType as jest.Mock).mockReturnValue(
      HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
    );

    render(
      <TreatmentsContainer
        onTreatmentsChange={jest.fn()}
        handleDeleteTreatment={jest.fn()}
        handleEdit={jest.fn()}
        handleSetHasTreatmentAllFields={jest.fn()}
        treatments={treatments as TreatmentTemplateModel[]}
      />
    );

    expect(ConfigModule.getInspectionType).toHaveBeenCalledWith(false, false);
  });

  it("sets drugRoute when recType is DrugAdministered", () => {
    const treatments = [
      {
        recType: "DrugAdministered",
        drugRoute: "Oral",
        treatmentTemplateId: "1",
      },
    ];

    render(
      <TreatmentsContainer
        treatments={treatments as TreatmentTemplateModel[]}
        onTreatmentsChange={jest.fn()}
        handleDeleteTreatment={jest.fn()}
        handleEdit={jest.fn()}
      />
    );

    expect(ConfigModule.getFormattedTitle).toHaveBeenCalledWith(
      expect.arrayContaining(["Oral"])
    );
  });

  it("sets drugRoute when recType is IntralesionalInjection", () => {
    const treatments = [
      {
        recType: "IntralesionalInjection",
        drugRoute: "Injected",
        treatmentTemplateId: "2",
      },
    ];

    render(
      <TreatmentsContainer
        treatments={treatments as TreatmentTemplateModel[]}
        onTreatmentsChange={jest.fn()}
        handleDeleteTreatment={jest.fn()}
        handleEdit={jest.fn()}
      />
    );

    expect(ConfigModule.getFormattedTitle).toHaveBeenCalledWith(
      expect.arrayContaining(["Injected"])
    );
  });

  it("sets drugRoute to null when recType is something else", () => {
    const spy = jest.spyOn(ConfigModule, "getFormattedTitle");

    const treatments = [
      {
        recType: "OtherType",
        drugRoute: "ShouldNotAppear",
        treatmentTemplateId: "3",
      },
    ];

    render(
      <TreatmentsContainer
        treatments={treatments as TreatmentTemplateModel[]}
        onTreatmentsChange={jest.fn()}
        handleDeleteTreatment={jest.fn()}
        handleEdit={jest.fn()}
      />
    );

    const calls = spy.mock.calls;

    const usedArgs = calls.flat();
    expect(usedArgs).not.toEqual(expect.arrayContaining(["ShouldNotAppear"]));

    spy.mockRestore();
  });
});
