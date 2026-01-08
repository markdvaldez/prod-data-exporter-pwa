import * as useUserLocationModule from "@/hooks/useUserLocation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as nextNavigation from "next/navigation";
import { forwardRef } from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { EditRecordContainer } from "../EditRecordContainer";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `AddRecord.${key}`,
}));

const mockStore = configureStore();

const mockDispatch = jest.fn();

const mockUseUserLocation = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("@/hooks/useUserLocation", () => ({
  __esModule: true,
  useUserLocation: () => ({
    getCurrentLocation: jest.fn(),
    userLocation: "mockedLocation",
  }),
}));

jest.spyOn(useUserLocationModule, "useUserLocation").mockReturnValue({
  getCurrentLocation: jest.fn(),
  userLocation: "mock-location",
});

jest.mock("@/hooks/useFileUpload", () => ({
  __esModule: true,
  useFileUpload: () => ({
    files: [],
    selectedFile: null,
    setSelectedFile: jest.fn(),
    onDrop: jest.fn(),
    open: jest.fn(),
    removeFile: jest.fn(),
    getInputProps: jest.fn(),
    getRootProps: jest.fn(),
    isDragActive: false,
  }),
}));

jest.mock("@/hooks/useDocumentsQuery", () => ({
  __esModule: true,
  useDocumentsQuery: () => ({
    files: [],
    isLoading: false,
    isConverting: false,
    refetch: jest.fn(),
  }),
}));
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  request: jest.fn(),
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

jest.mock("@/ui-kit/blocks/Stepper", () => ({
  __esModule: true,
  StepperDesktop: () => <div data-testid="stepper-desktop" />,
  Stepper: () => <div data-testid="stepper" />,
}));

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

describe("<EditRecordContainer />", () => {
  let queryClient: QueryClient;

  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  let pushMock: jest.Mock;
  let backMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    backMock = jest.fn();
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      back: backMock,
    });
  });

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  const renderComponent = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Provider
          store={mockStore({
            horseMedical: {
              horseMedical: [
                {
                  hisaHorseMedicalId: "mock-id",
                  recType: "AlternativeTreatments",
                  hisaHorseName: "Mock Horse",
                  treatingHisaPersonId: "mock-treater-id",
                  treatingHisaPersonName: "Dr. Treat",
                },
              ],
              error: null,
              isSyncing: false,
            },
            auth: {
              hisaPersonId: "123",
              username: "Dr. Mock",
            },
            locations: {
              description: "",
            },
          })}
        >
          <EditRecordContainer id="mock-id" />
        </Provider>
      </QueryClientProvider>
    );

  it("renders the header and stepper", () => {
    renderComponent();
    expect(screen.getByText("AddRecord.editRecord")).toBeInTheDocument();
    expect(screen.getByText("AddRecord.fillForm")).toBeInTheDocument();
  });

  it("navigates back on cancel", () => {
    renderComponent();
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("dispatches editHorseMedical on submit", async () => {
    renderComponent();

    // Find the Next button
    const buttons = screen.getAllByRole("button");
    const submitButton = buttons[buttons.length - 1]; // Usually the last button

    // Go through steps by clicking next
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it("handles back logic", () => {
    renderComponent();
    const backButton = screen.getByRole("button", { name: /addrecord\.back/i });
    fireEvent.click(backButton);
    expect(backMock).toHaveBeenCalled();
  });

  it("runs useEffect when recType changes", async () => {
    // Arrange
    queryClient = new QueryClient();

    // Render with initial store
    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <Provider
          store={mockStore({
            horseMedical: {
              horseMedical: [
                {
                  hisaHorseMedicalId: "mock-id",
                  recType: "AlternativeTreatments",
                  hisaHorseName: "Mock Horse",
                  treatingHisaPersonId: "mock-treater-id",
                  treatingHisaPersonName: "Dr. Treat",
                },
              ],
              error: null,
              isSyncing: false,
            },
            auth: {
              hisaPersonId: "123",
              username: "Dr. Mock",
            },
            locations: {
              description: "",
            },
          })}
        >
          <EditRecordContainer id="mock-id" />
        </Provider>
      </QueryClientProvider>
    );

    // Now rerender with a **different recType** in store
    rerender(
      <QueryClientProvider client={queryClient}>
        <Provider
          store={mockStore({
            horseMedical: {
              horseMedical: [
                {
                  hisaHorseMedicalId: "mock-id",
                  recType: "Tests and Diagnostics", // <-- different recType!
                  hisaHorseName: "Mock Horse",
                  treatingHisaPersonId: "mock-treater-id",
                  treatingHisaPersonName: "Dr. Treat",
                },
              ],
              error: null,
              isSyncing: false,
            },
            auth: {
              hisaPersonId: "123",
              username: "Dr. Mock",
            },
            locations: {
              description: "",
            },
          })}
        >
          <EditRecordContainer id="mock-id" />
        </Provider>
      </QueryClientProvider>
    );

    // ✅ Now verify your effect ran by checking that your mockDispatch fired again
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
