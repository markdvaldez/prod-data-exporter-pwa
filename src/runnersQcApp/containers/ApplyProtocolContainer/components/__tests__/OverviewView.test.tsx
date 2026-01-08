import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { OverviewView, ProtocolProps } from "../OverviewView";

jest.mock("@/ui-kit/components/Accordion", () => ({
  HorsesAccordion: ({ items }: any) => (
    <div data-testid="HorsesAccordion">{JSON.stringify(items)}</div>
  ),
  TreatmentAccordion: ({ treatment }: any) => (
    <div data-testid="TreatmentAccordion">{JSON.stringify(treatment)}</div>
  ),
}));

jest.mock("@/ui-kit/components/LocationItem", () => ({
  LocationItem: ({ location }: any) => (
    <div data-testid="LocationItem">{JSON.stringify(location)}</div>
  ),
}));

jest.mock("@/ui-kit/components/TretedByItem", () => ({
  TreatedByItem: ({ treatedByPerson }: any) => (
    <div data-testid="TreatedByItem">{JSON.stringify(treatedByPerson)}</div>
  ),
}));

jest.mock("@/ui-kit/blocks/AudioVoiceRecorder", () => ({
  AudioVoiceRecorder: ({ onChange }: any) => (
    <input
      data-testid="AudioVoiceRecorder"
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

jest.mock("@/ui-kit/blocks/FormFields/NotesFormField", () => ({
  NotesFormField: () => <div data-testid="NotesFormField" />,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/ui-kit/blocks/AudioVoiceRecorder", () => ({
  AudioVoiceRecorder: ({ onChange }: { onChange: (text: string) => void }) => (
    <button
      data-testid="AudioVoiceRecorder"
      onClick={() => onChange("transcribed text")}
    >
      Mock Recorder
    </button>
  ),
}));

type OverviewFormValues = {
  horses: any[];
  treatmentLocation: any;
  treatedByPerson: any;
  notes: string;
};

export function TestOverview({
  horses = [],
  location = {},
  treatedByPerson = {},
  treatments = [],
  customFormContext,
}: {
  horses?: any[];
  location?: any;
  treatedByPerson?: any;
  treatments?: ProtocolProps["treatments"];
  customFormContext?: Partial<UseFormReturn<OverviewFormValues>>;
}) {
  const methods = useForm<OverviewFormValues>({
    defaultValues: {
      horses,
      treatmentLocation: location,
      treatedByPerson,
      notes: "",
    },
  });

  if (customFormContext?.setValue) {
    methods.setValue = customFormContext.setValue;
  }
  if (customFormContext?.getValues) {
    methods.getValues = customFormContext.getValues;
  }

  return (
    <FormProvider {...methods}>
      <OverviewView treatments={treatments} />
    </FormProvider>
  );
}

export const renderOverviewView = (
  props: React.ComponentProps<typeof TestOverview> = {}
) => render(<TestOverview {...props} />);

describe("OverviewView", () => {
  it("renders overview title and description", () => {
    renderOverviewView();
    expect(screen.getByText("AddRecord.overview")).toBeInTheDocument();
    expect(screen.getByText("AddRecord.checkIfAll")).toBeInTheDocument();
  });

  it("renders HorsesAccordion, LocationItem, TreatedByItem with correct props", () => {
    renderOverviewView({
      horses: [{ horseId: "h1" }],
      location: { id: "loc1" },
      treatedByPerson: { id: "person1" },
    });

    expect(screen.getByTestId("HorsesAccordion")).toBeInTheDocument();
    expect(screen.getByTestId("LocationItem")).toBeInTheDocument();
    expect(screen.getByTestId("TreatedByItem")).toBeInTheDocument();
  });

  it("renders TreatmentAccordion for each treatment", () => {
    const treatments = [
      { treatmentTemplateId: "t1" },
      { treatmentTemplateId: "t2" },
    ] as any;

    renderOverviewView({ treatments });

    expect(screen.getAllByTestId("TreatmentAccordion")).toHaveLength(2);
  });

  it("updates notes when transcription is received", async () => {
    const setValue = jest.fn();
    const getValues = jest.fn().mockReturnValue("Existing notes.");

    renderOverviewView({
      customFormContext: { setValue, getValues },
    });

    const recorder = screen.getByText("Mock Recorder");
    await userEvent.click(recorder);

    expect(setValue).toHaveBeenCalledWith(
      "notes",
      "Existing notes. transcribed text"
    );
  });

  it("renders NotesFormField", () => {
    renderOverviewView();
    expect(screen.getByTestId("NotesFormField")).toBeInTheDocument();
  });
});

const Wrapper = ({
  children,
  notesValue,
  formRef,
}: {
  children: React.ReactNode;
  notesValue?: string;
  formRef: React.MutableRefObject<UseFormReturn<any>>;
}) => {
  const methods = useForm({
    defaultValues: {
      notes: notesValue,
    },
  });

  formRef.current = methods;

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("OverviewView handleTranscription", () => {
  it("appends transcribed text to existing notes", async () => {
    const formRef = { current: {} as UseFormReturn<any> };

    render(
      <Wrapper notesValue="existing notes." formRef={formRef}>
        <OverviewView treatments={[]} />
      </Wrapper>
    );

    const recorderBtn = screen.getByText("Mock Recorder");
    await userEvent.click(recorderBtn);

    expect(formRef.current.getValues("notes")).toContain("existing notes.");
    expect(formRef.current.getValues("notes")).toContain("transcribed text");
  });

  it("uses empty string fallback if no existing notes", async () => {
    const formRef = { current: {} as UseFormReturn<any> };

    render(
      <Wrapper formRef={formRef}>
        <OverviewView treatments={[]} />
      </Wrapper>
    );

    const recorderBtn = screen.getByText("Mock Recorder");
    await userEvent.click(recorderBtn);

    expect(formRef.current.getValues("notes")).toBe("transcribed text");
  });
});
