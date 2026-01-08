import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { ProtocolList } from "../ProtocolListContainer";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock nested components to isolate tests
jest.mock("../ProtocolName", () => ({
  ProtocolName: ({ protocolName, handleChangeName, handleClear }: any) => {
    const [value, setValue] = useState(protocolName || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      handleChangeName(e.target.value);
    };

    return (
      <div data-testid="ProtocolName">
        Mock ProtocolName
        <input
          data-testid="protocol-input"
          value={value}
          onChange={handleChange}
        />
        <button data-testid="clear-button" onClick={handleClear}>
          Clear
        </button>
      </div>
    );
  },
}));

jest.mock("@/ui-kit/components/TreatmentCard", () => ({
  TreatmentCard: ({ id, index, title, subTitle, onEdit, onDelete }: any) => (
    <div data-testid="TreatmentCard">
      {id} {index} {title} {subTitle}
      <button onClick={() => onEdit && onEdit(id)}>Edit</button>
      <button onClick={() => onDelete && onDelete(id)}>Delete</button>
    </div>
  ),
}));

jest.mock("@/ui-kit/components/ErrorMessage", () => ({
  ErrorMessage: ({ message }: any) => (
    <div data-testid="ErrorMessage">{message}</div>
  ),
}));

jest.mock("../../../addRecordAndProtocolConfig", () => ({
  ...jest.requireActual("../../../addRecordAndProtocolConfig"),
  getInspectionType: jest.fn(() => "MOCK_INSPECTION"),
  getCurrentType: jest.fn(() => "SomeType"),
  getFormattedTitle: jest.fn(() => "FormattedTitle"),
  splitWords: jest.fn((s) => s),
}));

import { TreatmentTemplateRequest } from "@/Types";
import {
  getCurrentType,
  getFormattedTitle,
  getInspectionType,
} from "../../../addRecordAndProtocolConfig";

describe("<ProtocolList />", () => {
  const mockOnChangeName = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockHandleClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls getInspectionType for MandatoryPreRaceAndPreWorkVetInspection", () => {
    const treatments = [
      {
        treatmentTemplateId: "1",
        recType: "MandatoryPreRaceAndPreWorkVetInspection",
        clearedToWork: true,
        clearedToRace: false,
      },
    ];

    render(
      <ProtocolList
        name="Test"
        treatments={treatments as TreatmentTemplateRequest[]}
        onChangeName={jest.fn()}
        handleClear={jest.fn()}
      />
    );

    expect(getInspectionType).toHaveBeenCalledWith(true, false);
    expect(screen.getByText(/FormattedTitle/)).toBeInTheDocument();
  });

  it("does NOT call getInspectionType for other recTypes", () => {
    const treatments = [
      {
        treatmentTemplateId: "2",
        recType: "SomeOtherType",
      },
    ];

    render(
      <ProtocolList
        name="Test"
        treatments={treatments as TreatmentTemplateRequest[]}
        onChangeName={jest.fn()}
        handleClear={jest.fn()}
      />
    );

    expect(getInspectionType).not.toHaveBeenCalled();
  });

  it("renders ProtocolName with correct props", () => {
    render(
      <ProtocolList
        name="Protocol X"
        onChangeName={mockOnChangeName}
        handleClear={mockHandleClear}
      />
    );

    expect(screen.getByTestId("ProtocolName")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Protocol X")).toBeInTheDocument();
  });

  it("calls onChangeName when typing in ProtocolName", async () => {
    render(
      <ProtocolList
        name=""
        onChangeName={mockOnChangeName}
        handleClear={mockHandleClear}
      />
    );

    const input = screen.getByTestId("protocol-input");
    await userEvent.type(input, "My Protocol");

    expect(mockOnChangeName).toHaveBeenCalledWith("M");
    expect(mockOnChangeName).toHaveBeenCalledWith("My");
    expect(mockOnChangeName).toHaveBeenCalledWith("My ");
    // etc.
  });

  it("calls handleClear when clear button is clicked", async () => {
    render(
      <ProtocolList
        name="Some"
        onChangeName={mockOnChangeName}
        handleClear={mockHandleClear}
      />
    );

    const clearButton = screen.getByTestId("clear-button");
    await userEvent.click(clearButton);
    expect(mockHandleClear).toHaveBeenCalledTimes(1);
  });

  it("shows ErrorMessage when error is passed", () => {
    render(
      <ProtocolList
        name=""
        error="Something went wrong"
        onChangeName={mockOnChangeName}
        handleClear={mockHandleClear}
      />
    );

    expect(screen.getByTestId("ErrorMessage")).toHaveTextContent(
      "Something went wrong"
    );
  });

  it("renders TreatmentCards for each treatment", () => {
    const treatments = [
      {
        treatmentTemplateId: "1",
        recType: "DrugAdministered",
        drugName: "A",
      },
      {
        treatmentTemplateId: "2",
        recType: "Procedure",
        procedure: "X-Ray",
      },
    ];

    render(
      <ProtocolList
        name=""
        treatments={treatments as any}
        onChangeName={mockOnChangeName}
        handleClear={mockHandleClear}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const cards = screen.getAllByTestId("TreatmentCard");
    expect(cards).toHaveLength(2);
  });

  it("calls onEdit and onDelete when TreatmentCard buttons clicked", async () => {
    const treatments = [
      { treatmentTemplateId: "1", recType: "Procedure", procedure: "X" },
    ];

    render(
      <ProtocolList
        name=""
        treatments={treatments as any}
        onChangeName={mockOnChangeName}
        handleClear={mockHandleClear}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByText("Edit");
    const deleteButton = screen.getByText("Delete");

    await userEvent.click(editButton);
    await userEvent.click(deleteButton);

    expect(mockOnEdit).toHaveBeenCalledWith("1");
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("calls getCurrentType and getFormattedTitle with correct args and passes result to TreatmentCard", () => {
    const treatments = [
      {
        treatmentTemplateId: "abc123",
        recType: "DrugAdministered",
        drugName: "DrugX",
        vaccine: "VaccineY",
        drugRoute: "IV",
        drugDosage: "5mg",
        limbTreated: "Left Leg",
        conditionTreated: "Injury",
        procedure: "ProcedureZ",
        modality: "ModalityA",
        structure: "StructureB",
        description: "DescriptionC",
        testName: "TestD",
        testResults: "ResultE",
        dental: "DentalF",
        clearedToWork: false,
        clearedToRace: false,
        notes: "Some notes",
      },
    ];

    render(
      <ProtocolList
        name="Test"
        treatments={treatments as TreatmentTemplateRequest[]}
        onChangeName={jest.fn()}
        handleClear={jest.fn()}
      />
    );

    expect(getCurrentType).toHaveBeenCalledWith("DrugAdministered");

    expect(getFormattedTitle).toHaveBeenCalledWith([
      "DrugX",
      "VaccineY",
      "IV",
      "5mg",
      "Left Leg",
      "Injury",
      "ProcedureZ",
      "ModalityA",
      "StructureB",
      "DescriptionC",
      "TestD",
      "ResultE",
      "DentalF",
      "", // inspectionType
      "Some notes",
    ]);

    const treatmentCard = screen.getByTestId("TreatmentCard");

    expect(treatmentCard).toHaveTextContent("SomeType");
    expect(treatmentCard).toHaveTextContent("FormattedTitle");
  });
});
