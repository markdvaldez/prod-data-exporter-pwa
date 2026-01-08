import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as addRecordAndProtocolConfig from "../../../addRecordAndProtocolConfig";
import { FormContainer } from "../FormContainer";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `AddRecord.${key}`,
}));

jest.mock("../../../addRecordAndProtocolConfig", () => ({
  getCurrentType: jest.fn((type) => type),
  getKeyByTreatmentType: jest.fn(() => "mockedKey"),
  getLimbTreatedTypesOptions: jest.fn(() => ["option1", "option2"]),
  getRecTypesOptions: jest.fn(() => ["Option1", "Option2"]),
}));

jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  request: jest.fn(),
}));

jest.mock("@/ui-kit/components/Accordion/RecordAccordion", () => ({
  __esModule: true,
  RecordAccordion: () => <div>Mocked Accordion</div>,
}));

jest.mock("@/ui-kit/blocks/FormFields/RecordTypeField", () => ({
  RecordTypeField: ({ label }: any) => (
    <div data-testid="RecordTypeField">{label}</div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/FormFieldAutocomplete", () => ({
  FormFieldAutocomplete: ({ name, label }: any) => (
    <div data-testid={`FormFieldAutocomplete-${name}`}>{label}</div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/FormFieldAutocomplete", () => ({
  FormFieldAutocomplete: ({ name, label, placeholder }: any) => (
    <div data-testid={`FormFieldAutocomplete-${name}`}>
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/ResultsField", () => ({
  TestResultsField: ({ name, label }: any) => (
    <div data-testid={`TestResultsField-${name}`}>
      <label>{label}</label>
      <input placeholder={label} />
    </div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/FormFieldAutocomplete", () => ({
  FormFieldAutocomplete: ({ name, label, placeholder }: any) => (
    <div data-testid={`FormFieldAutocomplete-${name}`}>
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/FormFieldAutocomplete", () => ({
  FormFieldAutocomplete: ({ name, label, placeholder }: any) => (
    <div data-testid={`FormFieldAutocomplete-${name}`}>
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/InspectionTypeField", () => ({
  InspectionTypeField: ({ fieldKey, value, name, label }: any) => (
    <div data-testid={`InspectionTypeField`}>
      <span>{fieldKey}</span>
      <span>{value}</span>
      <span>{name}</span>
      <span>{label}</span>
    </div>
  ),
}));

jest.mock("@/ui-kit/components/FieldLabel", () => ({
  FieldLabel: ({ label }: { label: string }) => (
    <div data-testid="FieldLabel">{label}</div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/TextField", () => ({
  TextField: ({
    fieldKey,
    name,
    label,
  }: {
    fieldKey: string;
    name: string;
    label: string;
  }) => (
    <div data-testid="TextField">
      <span>{fieldKey}</span>
      <span>{name}</span>
      <span>{label}</span>
    </div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/LimbTreatedField", () => ({
  LimbTreatedField: ({ value, label, placeholder }: any) => (
    <div data-testid="LimbTreatedField">
      <span>{value}</span>
      <span>{label}</span>
      <span>{placeholder}</span>
    </div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/DrugDosageFormField", () => ({
  DrugDosageFormField: ({ label }: any) => (
    <div data-testid="DrugDosageFormField">{label}</div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/ModalityField", () => ({
  ModalityField: ({ value, label }: any) => (
    <div data-testid="ModalityField">
      <span>{value}</span>
      <span>{label}</span>
    </div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/RouteAdministeredField", () => ({
  RouteAdministeredField: ({ value, label }: any) => (
    <div data-testid="RouteAdministeredField">
      <span>{value}</span>
      <span>{label}</span>
    </div>
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/FormFieldAutocomplete", () => ({
  FormFieldAutocomplete: ({ name, label, placeholder }: any) => (
    <div data-testid={`FormFieldAutocomplete-${name}`}>
      <label>{label}</label>
      <input placeholder={placeholder} />
    </div>
  ),
}));

describe("<FormContainer />", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  const mockFields = [
    { name: "conditionTreated", key: "conditionTreated", isRequired: true },
    { name: "drugName", key: "drugName", isRequired: false },
    { name: "procedure", key: "procedure", isRequired: true },
  ];

  const Wrapper: React.FC<{ fields: any; isReady: boolean }> = ({
    fields,
    isReady,
  }) => {
    const methods = useForm({
      defaultValues: {
        drugRoute: "Oral",
        recType: "SomeType",
        modality: "Ultrasound",
        inspectionType: "Initial",
        procedure: "Procedure1",
        limbTreated: "Left Front",
      },
    });

    return (
      <QueryClientProvider client={queryClient}>
        <FormProvider {...methods}>
          <FormContainer fields={fields} isReady={isReady} />
        </FormProvider>
      </QueryClientProvider>
    );
  };

  it("does not render fields when isReady is false", () => {
    render(<Wrapper fields={mockFields} isReady={false} />);
    expect(screen.queryByText("fillForm")).not.toBeInTheDocument();
  });

  it("renders fields when isReady is true", () => {
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(screen.getByText("AddRecord.fillForm")).toBeInTheDocument();
    expect(screen.getByText("AddRecord.horse*")).toBeInTheDocument();
    expect(screen.getByText("AddRecord.recordType")).toBeInTheDocument();
    expect(screen.getByText("AddRecord.conditionTreated*")).toBeInTheDocument();
    expect(screen.getByText("AddRecord.drugName")).toBeInTheDocument();
    expect(screen.getByText("AddRecord.treatmentType*")).toBeInTheDocument();
  });

  it("calls scrollIntoView on mount", () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it("renders RecordTypeField if isRecTypeVisible is true", () => {
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(screen.getByText("AddRecord.fillForm")).toBeInTheDocument();
    expect(screen.getByTestId("RecordTypeField")).toBeInTheDocument();
  });

  it("renders a FormFieldAutocomplete for supported fields", () => {
    const fields = [
      { name: "conditionTreated", isRequired: true },
      { name: "drugName", isRequired: false },
    ];
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(
      screen.getByTestId("FormFieldAutocomplete-conditionTreated")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("FormFieldAutocomplete-drugName")
    ).toBeInTheDocument();
  });

  it("renders conditionTreated label without * when not required", () => {
    const fields = [{ name: "conditionTreated", isRequired: false }];
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(
      screen.getByTestId("FormFieldAutocomplete-conditionTreated")
    ).toHaveTextContent("conditionTreated");
  });

  it("renders dental field correctly", () => {
    const mockFields = [{ name: "dental", key: "DentalKey", isRequired: true }];
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(screen.getByText("AddRecord.medicalName*")).toBeInTheDocument();
  });

  it("renders vaccine field correctly", () => {
    const mockFields = [
      {
        name: "vaccine",
        key: "VaccineKey",
        isRequired: true,
      },
    ];
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(
      screen.getByTestId("FormFieldAutocomplete-vaccine")
    ).toHaveTextContent("AddRecord.vaccineName*");
    expect(
      screen.getByPlaceholderText("AddRecord.vaccineName")
    ).toBeInTheDocument();
  });

  it("renders testResults field correctly", () => {
    const mockFields = [
      {
        name: "testResults",
        key: "TestResultsKey",
        isRequired: true,
      },
    ];
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(
      screen.getByTestId("TestResultsField-testResults")
    ).toHaveTextContent("AddRecord.results*");
    expect(
      screen.getByPlaceholderText("AddRecord.results*")
    ).toBeInTheDocument();
  });

  it("renders testName field correctly", () => {
    const mockFields = [
      {
        name: "testName",
        key: "SomeTestKey",
        isRequired: true,
      },
    ];
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(
      screen.getByTestId("FormFieldAutocomplete-testName")
    ).toBeInTheDocument();
    expect(
      screen.getByText("AddRecord.testAndDiagnostics*")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("AddRecord.testAndDiagnostics")
    ).toBeInTheDocument();
  });

  it("renders surgery field correctly", () => {
    const mockFields = [
      {
        name: "surgery",
        key: "SomeSurgeryKey",
        isRequired: true,
      },
    ];
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(
      screen.getByTestId("FormFieldAutocomplete-surgery")
    ).toBeInTheDocument();
    expect(
      screen.getByText("AddRecord.surgeryDescription*")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("AddRecord.surgeryDescription")
    ).toBeInTheDocument();
  });

  it("renders inspectionType field correctly", () => {
    const mockFields = [
      {
        name: "inspectionType",
        key: "someInspectionKey",
        isRequired: true,
      },
    ];

    render(<Wrapper fields={mockFields} isReady={true} />);
    const field = screen.getByTestId("InspectionTypeField");
    expect(field).toBeInTheDocument();
    expect(field).toHaveTextContent("inspectionType");
    expect(field).toHaveTextContent("inspectionType");
    expect(field).toHaveTextContent("AddRecord.inspectionType*");
  });

  it("renders default field with FieldLabel and TextField", () => {
    const mockFields = [
      {
        name: "customField",
        key: "customFieldKey",
        isRequired: false,
      },
    ];

    render(<Wrapper fields={mockFields} isReady={true} />);
    const labels = screen.getAllByTestId("FieldLabel");
    expect(labels.some((el) => el.textContent === "AddRecord.field:")).toBe(
      true
    );
    const textField = screen.getByTestId("TextField");
    expect(textField).toHaveTextContent("customField");
    expect(textField).toHaveTextContent("AddRecord.customField");
  });

  it("renders description field correctly", () => {
    const mockFields = [
      {
        name: "description",
        key: "Description",
        isRequired: true,
      },
    ];
    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(
      screen.getByTestId("FormFieldAutocomplete-description")
    ).toBeInTheDocument();
    expect(screen.getByText("AddRecord.description*")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("AddRecord.leaveMoreInformation")
    ).toBeInTheDocument();
  });

  it("renders limbTreated field correctly", () => {
    const mockFields = [
      {
        name: "limbTreated",
        key: "SomeLimbKey",
        isRequired: true,
      },
    ];

    render(<Wrapper fields={mockFields} isReady={true} />);
    const field = screen.getByTestId("LimbTreatedField");
    expect(field).toBeInTheDocument();
    expect(field).toHaveTextContent("Left Front"); // matches your Wrapper defaultValues
    expect(field).toHaveTextContent("AddRecord.limbTreated*");
    expect(field).toHaveTextContent("AddRecord.startTyping");
  });

  it("renders drugDosage field correctly", () => {
    const mockFields = [
      {
        name: "drugDosage",
        key: "SomeDrugDosageKey",
        isRequired: true,
      },
    ];

    render(<Wrapper fields={mockFields} isReady={true} />);
    const field = screen.getByTestId("DrugDosageFormField");
    expect(field).toBeInTheDocument();
    expect(field).toHaveTextContent("AddRecord.drugDosage*");
  });

  it("renders modality field correctly", () => {
    const mockFields = [
      {
        name: "modality",
        key: "SomeModalityKey",
        isRequired: true,
      },
    ];

    render(<Wrapper fields={mockFields} isReady={true} />);

    const field = screen.getByTestId("ModalityField");
    expect(field).toBeInTheDocument();
    expect(field).toHaveTextContent("Ultrasound");
    expect(field).toHaveTextContent("AddRecord.modality*");
  });

  it("renders drugRoute field correctly", () => {
    const mockFields = [
      {
        name: "drugRoute",
        key: "SomeDrugRouteKey",
        isRequired: true,
      },
    ];

    render(<Wrapper fields={mockFields} isReady={true} />);
    const field = screen.getByTestId("RouteAdministeredField");
    expect(field).toBeInTheDocument();
    expect(field).toHaveTextContent("Oral");
    expect(field).toHaveTextContent("AddRecord.routeAdministered*");
  });

  it("renders drugName field correctly", () => {
    const mockFields = [
      {
        name: "drugName",
        key: "SomeDrugNameKey",
        isRequired: true,
      },
    ];

    render(<Wrapper fields={mockFields} isReady={true} />);
    expect(
      screen.getByTestId("FormFieldAutocomplete-drugName")
    ).toBeInTheDocument();
    expect(screen.getByText("AddRecord.drugName*")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("AddRecord.drugName")
    ).toBeInTheDocument();
  });

  it("renders conditionTreated field correctly when recType is AlternativeTreatments", () => {
    const mockFields = [
      {
        name: "conditionTreated",
        key: "ConditionKey",
        isRequired: true,
      },
    ];

    // Spy on getCurrentType and mock return value
    jest
      .spyOn(addRecordAndProtocolConfig, "getCurrentType")
      .mockReturnValue("AlternativeTreatments");

    render(<Wrapper fields={mockFields} isReady={true} />);

    expect(
      screen.getByTestId("FormFieldAutocomplete-conditionTreated")
    ).toBeInTheDocument();

    expect(screen.getByText("AddRecord.conditionTreated*")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Start typing...")).toBeInTheDocument();
  });
});
