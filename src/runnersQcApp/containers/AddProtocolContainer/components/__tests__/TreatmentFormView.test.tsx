import {
  FormFieldType,
  getKeyByTreatmentType,
} from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { HorseMedicalRecType } from "@/Types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, renderHook, screen } from "@testing-library/react";
import { forwardRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TreatmentFormView } from "..";

jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  request: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("lucide-react", () => ({
  __esModule: true,
  ChevronDown: () => <svg data-testid="mock-chevron-down" />,
}));

jest.mock("@/ui-kit/components/Accordion");

jest.mock("@radix-ui/react-accordion", () => {
  const Trigger = forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >((props, ref) => (
    <button ref={ref} {...props}>
      Trigger
    </button>
  ));
  Trigger.displayName = "MockTrigger";

  const Header = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );

  const Content = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  Content.displayName = "MockContent";

  return {
    __esModule: true,
    Trigger,
    Header,
    Content,
  };
});

jest.mock("@/ui-kit/components/Accordion/RecordAccordion", () => ({
  __esModule: true,
  RecordAccordion: () => <div>Mocked Accordion</div>,
}));

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated but sometimes needed
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("<TreatmentFormView />", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });
  it("renders autocomplete and fetches options", async () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { conditionTreated: "Injury" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "conditionTreated",
                    key: "HorseMedical.Condition",
                    isRequired: true,
                  },
                ],
                protocolSchema: {} as any,
                label: "Mock Label",
                fields: [],
                schema: {} as any,
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );
  });

  it("renders conditionTreated label without * when not required", async () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { conditionTreated: "Injury" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "conditionTreated",
                    key: "HorseMedical.Condition",
                    isRequired: false,
                  },
                ],
                protocolSchema: {} as any,
                fields: [],
                schema: {} as any,
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );
    expect(screen.getByText(/conditionTreated/i)).toBeInTheDocument();

    expect(screen.getByText(/conditionTreated/i)).not.toHaveTextContent(/\*/);
  });

  it("renders drugName field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { drugName: "Drug" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "drugName",
                    key: "HorseMedical.DrugName",
                    isRequired: true,
                  },
                ],
              } as FormFieldType
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(
      screen.getByPlaceholderText("AddRecord.drugName")
    ).toBeInTheDocument();
  });

  it("renders drugName label without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { drugName: "Drug" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "drugName",
                    key: "HorseMedical.DrugName",
                    isRequired: false,
                  },
                ],
              } as FormFieldType
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/drugName/i)).toBeInTheDocument();

    expect(screen.getByText(/drugName/i)).not.toHaveTextContent(/\*/);
  });

  it("renders fallback default field", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { drugName: "Drug" },
      })
    );
    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "nonExistentField",
                    key: "Foo",
                    isRequired: false,
                  },
                ],
              } as FormFieldType
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/field:/i)).toBeInTheDocument();
  });

  it("calls handleSetRecType if recType in form changes", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { recType: "NewRecType" },
      })
    );

    const mockHandleSetRecType = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="OldRecType"
            formOptions={{ protocolFields: [] } as any}
            handleSetRecType={mockHandleSetRecType}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(mockHandleSetRecType).toHaveBeenCalled();
  });

  it("does not call handleSetRecType if recType matches", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { recType: "Same" },
      })
    );

    const mockHandleSetRecType = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="Same"
            formOptions={{ protocolFields: [] } as any}
            handleSetRecType={mockHandleSetRecType}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(mockHandleSetRecType).not.toHaveBeenCalled();
  });

  it("renders surgery field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { surgery: "Appendectomy" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  { name: "surgery", key: "SomeSurgeryKey", isRequired: true },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/surgery/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/surgery/i)).toBeInTheDocument();
  });

  it("renders surgeryDescription label without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { surgery: "Appendectomy" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "surgeryDescription",
                    key: "HorseMedical.RecTypeIsSurgery.Description",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="Surgery"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/surgeryDescription/i)).toBeInTheDocument();
  });

  it("renders procedure field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { procedure: "Laser Therapy" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "procedure",
                    key: "ProcedureKey",
                    isRequired: true,
                  },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("AddRecord.treatmentType*")).toBeInTheDocument();
  });

  it("renders procedure field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { procedure: "Laser Therapy" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "procedure",
                    key: "ProcedureKey",
                    isRequired: false,
                  },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("AddRecord.treatmentType")).toBeInTheDocument();
  });

  it("renders vaccine field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { vaccine: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "vaccine",
                    key: "HorseMedical.Vaccine",
                    isRequired: true,
                  },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("AddRecord.vaccineName*")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/AddRecord\.vaccineName/i)
    ).toBeInTheDocument();
  });

  it("renders vaccineName label with * when required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { vaccine: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "vaccine",
                    key: "HorseMedical.RecTypeIsVaccination.VaccineName",
                    isRequired: true,
                  },
                ],
              } as any
            }
            recType="Vaccination"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    // Should find the label WITH * when required
    expect(screen.getByText(/^AddRecord\.vaccineName\*/i)).toBeInTheDocument();
  });

  it("renders vaccineName label without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { vaccine: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "vaccine",
                    key: "HorseMedical.RecTypeIsVaccination.VaccineName",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="Vaccination"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/^AddRecord\.vaccineName$/i)).toBeInTheDocument();
  });

  it("renders inspectionType field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { inspectionType: "Initial Inspection" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "inspectionType",
                    key: "SomeKey",
                    isRequired: true,
                  },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/^AddRecord\.inspectionType/i)).toBeInTheDocument();
    expect(result.current.getValues().inspectionType).toBe(
      "Initial Inspection"
    );
  });

  it("renders inspectionType field with * when required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { testName: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "inspectionType",
                    key: "SomeKey",
                    isRequired: true,
                  },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );
    expect(screen.getByText("AddRecord.inspectionType*")).toBeInTheDocument();
  });

  it("renders testName field without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { testName: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                protocolFields: [
                  {
                    name: "inspectionType",
                    key: "SomeKey",
                    isRequired: false,
                  },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("AddRecord.inspectionType")).toBeInTheDocument();
  });

  it("renders testResults field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { testResults: "Normal" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                label: "Mock Label",
                fields: [],
                schema: {} as any,
                protocolSchema: {} as any,
                protocolFields: [
                  {
                    name: "testResults",
                    key: "HorseMedical.TestResults",
                    isRequired: true,
                  },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.results/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(result.current.getValues().testResults).toBe("Normal");
  });

  it("renders testResults field with * when required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { testResults: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "testResults", key: "some.key", isRequired: true },
                ],
              } as any
            }
            recType="Tests"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.results\*/i)).toBeInTheDocument();
  });

  it("renders testResults field without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { testResults: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "testResults", key: "some.key", isRequired: false },
                ],
              } as any
            }
            recType="Tests"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/^AddRecord\.results$/i)).toBeInTheDocument();
  });

  it("renders drugRoute field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { drugRoute: "Oral" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            recType="SomeRecType"
            formOptions={
              {
                label: "Mock Label",
                fields: [],
                schema: {} as any,
                protocolSchema: {} as any,
                protocolFields: [
                  {
                    name: "drugRoute",
                    key: "HorseMedical.DrugRoute",
                    isRequired: true,
                  },
                ],
              } as any
            }
            handleSetRecType={jest.fn()}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(
      screen.getByText(/AddRecord\.routeAdministered/i)
    ).toBeInTheDocument();
    expect(result.current.getValues().drugRoute).toBe("Oral");
  });

  it("renders modality field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { modality: "Ultrasound" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "modality", key: "some.key", isRequired: true },
                ],
              } as any
            }
            recType="AlternativeTreatments"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.modality/i)).toBeInTheDocument();
    expect(screen.getByText(/modality/i)).toBeInTheDocument();
  });

  it("renders modality field without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { modality: "Ultrasound" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "modality", key: "some.key", isRequired: false },
                ],
              } as any
            }
            recType="AlternativeTreatments"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/modality/i)).toBeInTheDocument();

    expect(screen.getByText(/modality/i)).not.toHaveTextContent(/\*/);
  });

  it("renders testName field with * when required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { testName: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "testName", key: "some.key", isRequired: true },
                ],
              } as any
            }
            recType="Tests"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(
      screen.getByText(/AddRecord\.testAndDiagnostics\*/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/AddRecord\.testAndDiagnostics/i)
    ).toBeInTheDocument();
  });

  it("renders testName field without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { testName: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "testName", key: "some.key", isRequired: false },
                ],
              } as any
            }
            recType="Tests"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(
      screen.getByText(/^AddRecord\.testAndDiagnostics$/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/AddRecord\.testAndDiagnostics/i)
    ).toBeInTheDocument();
  });

  it("renders dental field with * when required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { dental: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "dental", key: "some.key", isRequired: true },
                ],
              } as any
            }
            recType="Dental"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.medicalName\*/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/AddRecord\.medicalName/i)
    ).toBeInTheDocument();
  });

  it("renders dental field without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { dental: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "dental", key: "some.key", isRequired: false },
                ],
              } as any
            }
            recType="Dental"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/^AddRecord\.medicalName$/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/AddRecord\.medicalName/i)
    ).toBeInTheDocument();
  });

  it("renders description field with * when required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { description: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "description",
                    key: "irrelevant.key",
                    isRequired: true,
                  },
                ],
              } as any
            }
            recType="AlternativeTreatments"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.description\*/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/AddRecord\.leaveMoreInformation/i)
    ).toBeInTheDocument();
  });

  it("renders description field without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { description: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "description",
                    key: "irrelevant.key",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="AlternativeTreatments"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/^AddRecord\.description$/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/AddRecord\.leaveMoreInformation/i)
    ).toBeInTheDocument();
  });
  it("renders structure field with FormFieldOnceAutocomplete when key matches Intraarticularinjection", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { structure: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "structure",
                    key: "HorseMedical.RecTypeIsIntraarticularinjection.Structure",
                    isRequired: true,
                  },
                ],
              } as any
            }
            recType="IntraarticularInjection"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.structure\*/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/start typing/i)).toBeInTheDocument();
  });

  it("renders structure field with FormFieldAutocomplete when key does not match Intraarticularinjection", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { structure: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "structure",
                    key: "HorseMedical.RecTypeIsAlternativeTreatments.Structure",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="AlternativeTreatments"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/^AddRecord\.structure$/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/start typing/i)).toBeInTheDocument();
  });

  it("renders structure label without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { structure: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "structure",
                    key: "HorseMedical.RecTypeIsAlternativeTreatments.Structure",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="AlternativeTreatments"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/structure/i)).toBeInTheDocument();

    expect(screen.getByText(/^AddRecord\.structure$/i)).toBeInTheDocument();
  });

  it("renders structure label with * when required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { structure: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "structure",
                    key: "HorseMedical.RecTypeIsAlternativeTreatments.Structure",
                    isRequired: true,
                  },
                ],
              } as any
            }
            recType="AlternativeTreatments"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.structure\*/i)).toBeInTheDocument();
  });

  it("renders structure label without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { structure: "" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "structure",
                    key: "HorseMedical.RecTypeIsAlternativeTreatments.Structure",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="AlternativeTreatments"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/structure/i)).toBeInTheDocument();

    expect(screen.getByText(/^AddRecord\.structure$/i)).toBeInTheDocument();
  });

  it("renders notes field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { notes: "Patient shows improvement" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "notes",
                    key: "some.key",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="AnyRecType"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.notes/i)).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/AddRecord\.addYourNotes/i)
    ).toBeInTheDocument();

    const notesInput = screen.getByPlaceholderText(/AddRecord\.addYourNotes/i);
    expect(notesInput).toHaveValue("Patient shows improvement");
  });

  it("renders limbTreated field correctly", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { limbTreated: "Left Hind" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "limbTreated",
                    key: "HorseMedical.Limb",
                    isRequired: true,
                  },
                ],
              } as any
            }
            recType="Something"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.limbTreated\*/i)).toBeInTheDocument();

    expect(result.current.getValues().limbTreated).toBe("Left Hind");
  });

  it("renders limbTreated label with * if required", () => {
    const { result } = renderHook(() =>
      useForm({ defaultValues: { limbTreated: "" } })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "limbTreated",
                    key: "HorseMedical.Limb",
                    isRequired: true,
                  },
                ],
              } as any
            }
            recType="Something"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.limbTreated\*/i)).toBeInTheDocument();
  });

  it("renders limbTreated label WITHOUT * if not required", () => {
    const { result } = renderHook(() =>
      useForm({ defaultValues: { limbTreated: "" } })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "limbTreated",
                    key: "HorseMedical.Limb",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="Something"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/^AddRecord\.limbTreated$/i)).toBeInTheDocument();
  });

  it("renders drugDosage label with * when required", () => {
    const { result } = renderHook(() =>
      useForm({ defaultValues: { drugDosage: "" } })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "drugDosage",
                    key: "some.key",
                    isRequired: true,
                  },
                ],
              } as any
            }
            recType="someRecType"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/AddRecord\.drugDosage\*/i)).toBeInTheDocument();
  });

  it("renders drugDosage label without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({ defaultValues: { drugDosage: "" } })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  {
                    name: "drugDosage",
                    key: "some.key",
                    isRequired: false,
                  },
                ],
              } as any
            }
            recType="someRecType"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/^AddRecord\.drugDosage$/i)).toBeInTheDocument();
  });

  it("renders routeAdministered label with * when required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { drugRoute: "Oral" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "drugRoute", key: "some.key", isRequired: true },
                ],
              } as any
            }
            recType="Medication"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/routeAdministered/i)).toHaveTextContent(
      /routeAdministered\*/i
    );
  });

  it("renders routeAdministered label without * when not required", () => {
    const { result } = renderHook(() =>
      useForm({
        defaultValues: { drugRoute: "Oral" },
      })
    );

    render(
      <QueryClientProvider client={queryClient}>
        <FormProvider {...result.current}>
          <TreatmentFormView
            isReady
            formOptions={
              {
                protocolFields: [
                  { name: "drugRoute", key: "some.key", isRequired: false },
                ],
              } as any
            }
            recType="Medication"
            handleSetRecType={() => {}}
          />
        </FormProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText(/routeAdministered/i)).toBeInTheDocument();

    expect(screen.getByText(/routeAdministered/i)).not.toHaveTextContent(/\*/);
  });
});

jest.mock("@/runnersQcApp/containers/addRecordAndProtocolConfig", () => {
  const actual = jest.requireActual(
    "@/runnersQcApp/containers/addRecordAndProtocolConfig"
  );
  return {
    ...actual,
    getKeyByTreatmentType: jest.fn(() => "mockedKey"),
  };
});

describe("autocompleteKey logic", () => {
  const field = { key: "SomeFieldKey" };
  const formData = { treatmentType: "Laser" };

  it("uses getKeyByTreatmentType when recType is AlternativeTreatments", () => {
    const recType = HorseMedicalRecType.AlternativeTreatments;

    const result =
      recType === HorseMedicalRecType.AlternativeTreatments
        ? getKeyByTreatmentType(formData.treatmentType, field.key)
        : field.key;

    expect(getKeyByTreatmentType).toHaveBeenCalledWith("Laser", "SomeFieldKey");
    expect(result).toBe("mockedKey");
  });

  it("uses field.key when recType is NOT AlternativeTreatments", () => {
    const recType = HorseMedicalRecType.Dental as HorseMedicalRecType;

    const result =
      recType === HorseMedicalRecType.AlternativeTreatments
        ? getKeyByTreatmentType(formData.treatmentType, field.key)
        : field.key;

    expect(getKeyByTreatmentType).not.toHaveBeenCalled();
    expect(result).toBe("SomeFieldKey");
  });
});
