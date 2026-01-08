import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { Overview } from "../Overview";

import * as MobileHook from "@/ui-kit/hooks/useMobile";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/ui-kit/hooks/useMobile", () => ({
  ...jest.requireActual("@/ui-kit/hooks/useMobile"),
  useIsMobile: jest.fn(),
}));

jest.mock("@/runnersQcApp/containers/AddRecordContainer/helper", () => ({
  getMainOptions: jest.fn(() => [
    { key: "conditionTreated", label: "Condition Treated" },
  ]),
  mapOptionsToProps: jest.fn(() => [
    { key: "conditionTreated", label: "Condition Treated", value: "Lameness" },
  ]),
}));

jest.mock("@/runnersQcApp/pages/MainPage/helpers", () => ({
  getFormattedId: jest.fn((id) => `#${id}`),
}));

jest.mock("../../../addRecordAndProtocolConfig", () => ({
  splitWords: (val: string) => val,
}));

jest.mock("@/ui-kit/blocks/AudioPlayer/AudioPlayerList", () => ({
  AudioPlayerList: ({ files }: any) => <div />,
}));

jest.mock("@/ui-kit/blocks/AudioVoiceRecorder", () => {
  return {
    AudioVoiceRecorder: ({ onAudioRecorded }: any) => {
      return (
        <div data-testid="mock-audio-voice-recorder">
          <button onClick={() => onAudioRecorded(new File([], "test.mp3"))}>
            Trigger onAudioRecorded
          </button>
        </div>
      );
    },
  };
});

jest.mock("heic2any", () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve(new Blob(["mocked image data"], { type: "image/jpeg" }))
  ),
}));

jest.mock("@/ui-kit/components/FilePreviewSquare", () => ({
  FilePreviewSquare: ({ file, onRemove, onClick }: any) => (
    <div data-testid={`file-preview-${file.name}`}>
      <button onClick={onRemove}>Remove</button>
      <button onClick={onClick}>Click</button>
    </div>
  ),
}));

jest.mock("@/ui-kit/components/FilePreviewSquare", () => ({
  FilePreviewSquare: ({ file, onRemove, onClick }: any) => (
    <div data-testid={`file-preview-${file.name}`}>
      <button onClick={onRemove}>Remove</button>
      <button onClick={onClick}>Click</button>
    </div>
  ),
}));

describe("<Overview />", () => {
  beforeEach(() => {
    (MobileHook.useIsMobile as jest.Mock).mockReturnValue(false);
  });

  const mockFilesProps: {
    files: File[];
    selectedFile: File | null;
    isDragActive: boolean;
    open: jest.Mock;
    onDrop: jest.Mock;
    removeFile: jest.Mock;
    getRootProps: () => any;
    getInputProps: () => any;
    setSelectedFile: jest.Mock;
  } = {
    files: [],
    selectedFile: null,
    isDragActive: false,
    open: jest.fn(),
    onDrop: jest.fn(),
    removeFile: jest.fn(),
    getRootProps: () => ({}),
    getInputProps: () => ({}),
    setSelectedFile: jest.fn(),
  };

  const Wrapper: React.FC<{ props?: any }> = ({ props }) => {
    const methods = useForm({
      defaultValues: {
        hisaHorseId: "123",
        hisaHorseName: "My Horse",
        treatmentLocation: { locationName: "Clinic" },
      },
    });

    return (
      <FormProvider {...methods}>
        <Overview
          formData={{
            recType: "SomeType",
            treatedByPerson: "Vet Name",
          }}
          filesProps={mockFilesProps}
          currentFiles={[]}
          {...props}
        />
      </FormProvider>
    );
  };

  const renderComponent = (props?: any) => render(<Wrapper props={props} />);

  it("renders horse info", () => {
    renderComponent();
    expect(screen.getByText("AddRecord.horseName")).toBeInTheDocument();
    expect(screen.getByText("My Horse")).toBeInTheDocument();
    expect(screen.getByText("AddRecord.horseHisaId")).toBeInTheDocument();
    expect(screen.getByText("#123")).toBeInTheDocument();
  });

  it("renders options", () => {
    renderComponent();
    expect(screen.getByText("Condition Treated")).toBeInTheDocument();
    expect(screen.getByText("Lameness")).toBeInTheDocument();
  });

  it("renders notes input", () => {
    renderComponent();
    expect(screen.getByText("AddRecord.notes")).toBeInTheDocument();
  });

  it("calls file open when click attach files", () => {
    (MobileHook.useIsMobile as jest.Mock).mockReturnValue(true);
    renderComponent();
    const attachButton = screen.getByText("AddRecord.attachFiles");
    fireEvent.click(attachButton);
    expect(mockFilesProps.open).toHaveBeenCalled();
  });

  it("handles drop for audio file", () => {
    renderComponent();
    const { onDrop } = mockFilesProps;
    fireEvent.click(screen.getByText("AddRecord.overview"));
    expect(onDrop).not.toHaveBeenCalled(); // adjust if needed
  });

  it("calls onDrop when handleAudioFile is triggered", () => {
    renderComponent();

    const recorderButton = screen.getByText("Trigger onAudioRecorded");
    fireEvent.click(recorderButton);

    expect(mockFilesProps.onDrop).toHaveBeenCalledTimes(1);
    expect(mockFilesProps.onDrop).toHaveBeenCalledWith([expect.any(File)]);
  });

  it("renders curFiles and handles remove and click", () => {
    const testFile = new File(["test"], "document.pdf", {
      type: "application/pdf",
    });

    const mockRemove = jest.fn();
    const mockSetSelectedFile = jest.fn();

    mockFilesProps.removeFile = mockRemove;
    mockFilesProps.setSelectedFile = mockSetSelectedFile;

    render(
      <Wrapper
        props={{
          currentFiles: [testFile],
        }}
      />
    );

    const preview = screen.getByTestId(`file-preview-document.pdf`);

    fireEvent.click(screen.getByText("Remove"));
    expect(mockRemove).toHaveBeenCalledWith(testFile);

    fireEvent.click(screen.getByText("Click"));
    expect(mockSetSelectedFile).toHaveBeenCalledWith(testFile);

    expect(preview).toBeInTheDocument();
  });

  it("renders files and handles remove and click", () => {
    const testFile: File = new File(["content"], "image.png", {
      type: "image/png",
    });

    const mockRemove = jest.fn();
    const mockSetSelectedFile = jest.fn();

    mockFilesProps.removeFile = mockRemove;
    mockFilesProps.setSelectedFile = mockSetSelectedFile;
    mockFilesProps.files = [testFile];

    renderComponent();

    const preview = screen.getByTestId("file-preview-image.png");
    expect(preview).toBeInTheDocument();

    fireEvent.click(screen.getByText("Remove"));
    expect(mockRemove).toHaveBeenCalledWith(testFile);

    fireEvent.click(screen.getByText("Click"));
    expect(mockSetSelectedFile).toHaveBeenCalledWith(testFile);
  });
});
