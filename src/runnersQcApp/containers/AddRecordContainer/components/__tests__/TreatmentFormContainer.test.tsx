import { HorseMedicalRecType } from "@/Types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TreatmentFormContainer } from "../TreatmentFormContainer";
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
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
jest.mock("@/ui-kit/blocks/FormFields/TreatmentTypeField", () => ({
  TreatmentTypeField: ({ name, label }: any) => (
    <div data-testid={`TreatmentTypeField-${name}`}>{label}</div>
  ),
}));
jest.mock("@/ui-kit/blocks/FormFields/InspectionTypeField", () => ({
  InspectionTypeField: ({ name }: any) => (
    <div data-testid={`InspectionTypeField-${name}`}>{name}</div>
  ),
}));
jest.mock("@/ui-kit/blocks/FormFields/NotesFormField", () => ({
  NotesFormField: ({ name }: any) => (
    <div data-testid={`NotesFormField-${name}`}>{name}</div>
  ),
}));
jest.mock("@/ui-kit/components/FieldLabel", () => ({
  FieldLabel: ({ label }: any) => <div data-testid="FieldLabel">{label}</div>,
}));
jest.mock("@/ui-kit/blocks/FormFields/TextField", () => ({
  TextField: ({ name }: any) => (
    <div data-testid={`TextField-${name}`}>{name}</div>
  ),
}));
jest.mock("@/ui-kit/blocks/FormFields/FormFieldOnceAutocomplete", () => ({
  FormFieldOnceAutocomplete: ({ name, label }: any) => (
    <div data-testid={`FormFieldOnceAutocomplete-${name}`}>{label}</div>
  ),
}));
jest.mock("@/ui-kit/blocks/FormFields/ResultsField", () => ({
  TestResultsField: ({ name }: any) => (
    <div data-testid={`TestResultsField-${name}`}>{name}</div>
  ),
}));
jest.mock("@/ui-kit/blocks/FormFields/LimbTreatedField", () => ({
  LimbTreatedField: ({ value, label }: any) => (
    <div data-testid="LimbTreatedField">
      {label}-{value}
    </div>
  ),
}));
jest.mock("@/ui-kit/blocks/FormFields/ModalityField", () => ({
  ModalityField: ({ value, label }: any) => (
    <div data-testid="ModalityField">{`${label}-${value || ""}`}</div>
  ),
}));
jest.mock("@/ui-kit/blocks/FormFields/DrugDosageFormField", () => ({
  DrugDosageFormField: ({ value, label }: any) => (
    <div data-testid="DrugDosageFormField">
      {label}-{value}
    </div>
  ),
}));
jest.mock("@/ui-kit/blocks/FormFields/RouteAdministeredField", () => ({
  RouteAdministeredField: ({ value, label }: any) => (
    <div data-testid="RouteAdministeredField">{`${label}-${value || ""}`}</div>
  ),
}));

jest.mock("../../../addRecordAndProtocolConfig", () => ({
  getKeyByTreatmentType: jest.fn(() => "MockedKey"),
  Field: jest.requireActual("../../../addRecordAndProtocolConfig").Field,
}));

jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  request: jest.fn(),
}));

export const renderWithForm = (
  ui: React.ReactElement,
  defaultValues: any = {}
) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm({ defaultValues });
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <FormProvider {...methods}>{children}</FormProvider>
      </QueryClientProvider>
    );
  };
  return render(ui, { wrapper: Wrapper });
};

describe("TreatmentFormContainer", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });
  it("renders RecordTypeField if isRecTypeVisible is true", () => {
    renderWithForm(
      <TreatmentFormContainer fields={[]} isRecTypeVisible={true} />
    );
    expect(screen.getByText("fillForm")).toBeInTheDocument();
    expect(screen.getByTestId("RecordTypeField")).toBeInTheDocument();
  });

  it("does not render RecordTypeField if isRecTypeVisible is false", () => {
    renderWithForm(
      <TreatmentFormContainer fields={[]} isRecTypeVisible={false} />
    );
    expect(screen.queryByTestId("RecordTypeField")).not.toBeInTheDocument();
  });

  it("renders a FormFieldAutocomplete for supported fields", () => {
    const fields = [
      { name: "conditionTreated", isRequired: true },
      { name: "drugName", isRequired: false },
      { name: "description", isRequired: false },
      { name: "notes", isRequired: false },
    ];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={true} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-conditionTreated")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("FormFieldAutocomplete-drugName")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("FormFieldAutocomplete-description")
    ).toBeInTheDocument();
    expect(screen.getByTestId("NotesFormField-notes")).toBeInTheDocument();
  });

  it("renders conditionTreated label without * when not required", () => {
    const fields = [{ name: "conditionTreated", isRequired: false }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-conditionTreated")
    ).toHaveTextContent("conditionTreated");
  });

  it("renders FormFieldAutocomplete for dental field", () => {
    const fields = [{ name: "dental", isRequired: true, key: "dentalKey" }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-dental")
    ).toBeInTheDocument();
  });

  it("renders FormFieldAutocomplete for testName field", () => {
    const fields = [{ name: "testName", isRequired: true, key: "TestNameKey" }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-testName")
    ).toBeInTheDocument();
  });

  it("renders FormFieldAutocomplete for vaccine field", () => {
    const fields = [{ name: "vaccine", isRequired: true, key: "vaccineKey" }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-vaccine")
    ).toBeInTheDocument();
  });

  it("renders FormFieldAutocomplete for surgery field", () => {
    const fields = [{ name: "surgery", isRequired: true, key: "surgeryKey" }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-surgery")
    ).toBeInTheDocument();
  });

  it("renders FieldLabel and TextField for unknown fields", () => {
    const fields = [{ name: "customField", isRequired: false }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );
    expect(screen.getByTestId("FieldLabel")).toBeInTheDocument();
    expect(screen.getByTestId("TextField-customField")).toBeInTheDocument();
  });

  it("scrolls into view on mount", () => {
    const scrollIntoView = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

    renderWithForm(
      <TreatmentFormContainer fields={[]} isRecTypeVisible={false} />
    );

    expect(scrollIntoView).toHaveBeenCalled();
  });

  it("renders InspectionTypeField for inspectionType field", () => {
    const fields = [{ name: "inspectionType", isRequired: true }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );
    expect(
      screen.getByTestId("InspectionTypeField-inspectionType")
    ).toBeInTheDocument();
  });

  it("renders NotesFormField with correct name", () => {
    const fields = [{ name: "notes", isRequired: false }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );
    expect(screen.getByTestId("NotesFormField-notes")).toBeInTheDocument();
  });

  it("renders nothing extra when fields is empty", () => {
    renderWithForm(
      <TreatmentFormContainer fields={[]} isRecTypeVisible={false} />
    );
    expect(screen.queryByTestId("FieldLabel")).not.toBeInTheDocument();
  });

  it("handles null fields safely", () => {
    renderWithForm(
      <TreatmentFormContainer fields={null} isRecTypeVisible={false} />
    );
    expect(screen.queryByTestId("FieldLabel")).not.toBeInTheDocument();
  });

  it("renders FormFieldOnceAutocomplete for intraarticular injection structure", () => {
    const fields = [
      {
        name: "structure",
        isRequired: true,
        key: "HorseMedical.RecTypeIsIntraarticularinjection.Structure",
      },
    ];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={true} />
    );

    expect(
      screen.getByTestId("FormFieldOnceAutocomplete-structure")
    ).toBeInTheDocument();
  });

  it("renders TestResultsField for testResults field", () => {
    const fields = [{ name: "testResults", isRequired: true }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("TestResultsField-testResults")
    ).toBeInTheDocument();
  });

  it("renders LimbTreatedField for limbTreated field with value", () => {
    const fields = [{ name: "limbTreated", isRequired: true }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />,
      {
        limbTreated: "Front Left Leg",
      }
    );

    expect(screen.getByTestId("LimbTreatedField")).toHaveTextContent(
      "limbTreated*-Front Left Leg"
    );
  });

  it("renders LimbTreatedField for limbTreated field with value without * if not required", () => {
    const fields = [{ name: "limbTreated", isRequired: false }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />,
      {
        limbTreated: "Front Left Leg",
      }
    );

    expect(screen.getByTestId("LimbTreatedField")).toHaveTextContent(
      "limbTreated-Front Left Leg"
    );
  });

  it("renders DrugDosageFormField for drugDosage field", () => {
    const fields = [{ name: "drugDosage", isRequired: true }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(screen.getByTestId("DrugDosageFormField")).toHaveTextContent(
      "drugDosage*"
    );
  });

  it("renders ModalityField for modality field with value", () => {
    const fields = [{ name: "modality", isRequired: true }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />,
      { modality: "Ultrasound" }
    );

    expect(screen.getByTestId("ModalityField")).toHaveTextContent(
      "modality*-Ultrasound"
    );
  });

  it("renders RouteAdministeredField for drugRoute with value when required", () => {
    const fields = [{ name: "drugRoute", isRequired: true }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />,
      {
        drugRoute: "Intravenous",
      }
    );

    expect(screen.getByTestId("RouteAdministeredField")).toHaveTextContent(
      "routeAdministered*-Intravenous"
    );
  });

  it("renders RouteAdministeredField for drugRoute with value when not required", () => {
    const fields = [{ name: "drugRoute", isRequired: false }];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />,
      {
        drugRoute: "Oral",
      }
    );

    expect(screen.getByTestId("RouteAdministeredField")).toHaveTextContent(
      "routeAdministered-Oral"
    );
  });

  it("renders structure label without * when not required (FormFieldAutocomplete)", () => {
    const fields = [
      { name: "structure", isRequired: false, key: "SomeOtherKey" },
    ];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-structure")
    ).toHaveTextContent("structure");
  });

  it("renders structure label with * when required (FormFieldAutocomplete)", () => {
    const fields = [
      { name: "structure", isRequired: true, key: "SomeOtherKey" },
    ];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-structure")
    ).toHaveTextContent("structure*");
  });

  it("renders structure label without * when not required (FormFieldOnceAutocomplete)", () => {
    const fields = [
      {
        name: "structure",
        key: "HorseMedical.RecTypeIsIntraarticularinjection.Structure",
        isRequired: false,
      },
    ];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldOnceAutocomplete-structure")
    ).toHaveTextContent("structure");
  });

  it("renders structure label with * when required (FormFieldOnceAutocomplete)", () => {
    const fields = [
      {
        name: "structure",
        key: "HorseMedical.RecTypeIsIntraarticularinjection.Structure",
        isRequired: true,
      },
    ];

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldOnceAutocomplete-structure")
    ).toHaveTextContent("structure*");
  });

  it("renders description label with * when required", () => {
    const fields = [{ name: "description", isRequired: true }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-description")
    ).toHaveTextContent("description*");
  });

  it("renders description label without * when not required", () => {
    const fields = [{ name: "description", isRequired: false }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-description")
    ).toHaveTextContent("description");
  });

  it("renders dental label with * when required", () => {
    const fields = [{ name: "dental", isRequired: true }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-dental")
    ).toHaveTextContent("medicalName*");
  });

  it("renders dental label without * when not required", () => {
    const fields = [{ name: "dental", isRequired: false }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-dental")
    ).toHaveTextContent("medicalName");
  });

  it("renders testName label with * when required", () => {
    const fields = [{ name: "testName", isRequired: true }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-testName")
    ).toHaveTextContent("testAndDiagnostics*");
  });

  it("renders testName label without * when not required", () => {
    const fields = [{ name: "testName", isRequired: false }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-testName")
    ).toHaveTextContent("testAndDiagnostics");
  });

  it("renders vaccineName label with * when required", () => {
    const fields = [{ name: "vaccine", isRequired: true }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-vaccine")
    ).toHaveTextContent("vaccineName*");
  });

  it("renders vaccineName label without * when not required", () => {
    const fields = [{ name: "vaccine", isRequired: false }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-vaccine")
    ).toHaveTextContent("vaccineName");
  });

  it("renders surgeryDescription label with * when required", () => {
    const fields = [{ name: "surgery", isRequired: true }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-surgery")
    ).toHaveTextContent("surgeryDescription*");
  });

  it("renders surgeryDescription label without * when not required", () => {
    const fields = [{ name: "surgery", isRequired: false }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-surgery")
    ).toHaveTextContent("surgeryDescription");
  });

  it("renders treatmentType label with * when required", () => {
    const fields = [{ name: "procedure", isRequired: true }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("TreatmentTypeField-procedure")
    ).toHaveTextContent("treatmentType*");
  });

  it("renders treatmentType label without * when not required", () => {
    const fields = [{ name: "procedure", isRequired: false }];
    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />
    );

    expect(
      screen.getByTestId("TreatmentTypeField-procedure")
    ).toHaveTextContent("treatmentType");
  });

  it("uses getKeyByTreatmentType when recType is AlternativeTreatments", () => {
    const fields = [
      { name: "conditionTreated", key: "someKey", isRequired: true },
    ];

    const defaultValues = {
      recType: HorseMedicalRecType.AlternativeTreatments,
      procedure: "treatmentTypeValue",
    };

    renderWithForm(
      <TreatmentFormContainer fields={fields} isRecTypeVisible={false} />,
      defaultValues
    );

    expect(
      screen.getByTestId("FormFieldAutocomplete-conditionTreated")
    ).toBeInTheDocument();
  });
});
