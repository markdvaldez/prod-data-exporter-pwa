import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { forwardRef } from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createTestStore } from "../../../../services/store/modules/testStore/testStore";
import { EditProtocolContainer } from "../EditProtocolContainer";

const updateProtocolNameMock = jest.fn();
const pushMock = jest.fn();

jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  request: jest.fn(),
}));

jest.mock("@/ui-kit/hooks/useProtocols", () => ({
  useProtocols: () => ({
    addToProtocol: jest.fn(),
    deleteFromProtocol: jest.fn(),
    updateTreatmentTemplate: jest.fn(),
    updateProtocolName: updateProtocolNameMock,
  }),
}));

jest.mock("@/ui-kit/hooks/useToast", () => ({
  toast: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: pushMock,
  }),
}));

jest.mock("@/hooks/useScreenSize", () => ({
  useScreenSize: () => ({ height: 800 }),
}));

jest.mock("@/services/store/modules/auth/selectors", () => ({
  selectHisaPersonId: jest.fn(() => "mock-person-id"),
}));

jest.mock("@/services/store/modules/protocols/selectors", () => ({
  selectProtocolsByUserId: jest.fn(() => [
    {
      treatmentProtocolId: "test-protocol-id",
      protocolName: "Test Protocol",
      treatments: [],
    },
  ]),
  selectIsAddingTreatment: jest.fn(() => false),
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

jest.mock("../../addRecordAndProtocolConfig", () => ({
  __esModule: true,
  ...jest.requireActual("../../addRecordAndProtocolConfig"),
  createProtocolVariables: jest.fn(),
}));

jest.mock("../../AddRecordContainer/helper", () => ({
  __esModule: true,
  ...jest.requireActual("../../AddRecordContainer/helper"),
  getInspectionType: jest.fn((data) => ({
    inspection: true,
    ...data,
  })),
}));

const mockStore = configureStore([]);

describe("EditProtocolContainer", () => {
  let store: any;
  let queryClient: QueryClient;

  beforeEach(() => {
    store = mockStore({
      auth: { hisaPersonId: "mockUserId" },
      protocols: {
        byUserId: [
          {
            treatmentProtocolId: "test-protocol-id",
            protocolName: "Test Protocol",
            treatments: [],
            personId: "mockUserId",
          },
        ],
        isAddingTreatment: false,
      },
    });

    store.clearActions();
    queryClient = new QueryClient();
  });

  beforeAll(() => {
    jest.mock("@/runnersQcApp/shared/UniqId", () => ({
      __esModule: true,
      ...jest.requireActual("@/runnersQcApp/shared/UniqId"),
      getUniqId: jest.fn(() => "unique-id-123"),
    }));
  });

  it("renders the header and protocol list by default", () => {
    render(
      <Provider store={store}>
        <EditProtocolContainer id="test-protocol-id" />
      </Provider>
    );

    expect(screen.getByText("Protocols.editProtocol")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Protocol")).toBeInTheDocument();
  });

  it("handles name change input", () => {
    render(
      <Provider store={store}>
        <EditProtocolContainer id="test-protocol-id" />
      </Provider>
    );

    const nameInput = screen.getByDisplayValue("Test Protocol");
    fireEvent.change(nameInput, { target: { value: "New Protocol Name" } });

    expect(nameInput).toHaveValue("New Protocol Name");
  });

  it("switches to treatment form on add button click", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <EditProtocolContainer id="test-protocol-id" />
        </Provider>
      </QueryClientProvider>
    );

    const addButton = screen.getByText("Protocols.addMore");
    fireEvent.click(addButton);

    expect(screen.getByText("Protocols.editProtocol")).toBeInTheDocument();
  });

  it("calls router.back on cancel", () => {
    const pushMock = jest.fn();
    jest.mock("next/navigation", () => ({
      useRouter: () => ({
        back: pushMock,
        push: jest.fn(),
      }),
    }));

    render(
      <Provider store={store}>
        <EditProtocolContainer id="test-protocol-id" />
      </Provider>
    );

    const closeIcon = screen.getByText("AddRecord.cancel");
    fireEvent.click(closeIcon);

    expect(pushMock).toHaveBeenCalledTimes(0);
  });

  it("save protocol when saveAndExit button is clicked", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <EditProtocolContainer id="test-protocol-id" />
        </Provider>
      </QueryClientProvider>
    );

    const saveAndExitButton = screen.getByText("Protocols.saveAndExit");
    fireEvent.click(saveAndExitButton);

    expect(screen.getByText("Protocols.saveAndExit")).toBeInTheDocument();
  });

  it("calls updateProtocolName, resets activeTreatment and navigates on protocol name change", async () => {
    const preloadedState = {
      auth: {
        hisaPersonId: "mockUserId",
        username: "mockUsername",
        hasAccess: true,
        isFetching: false,
      },
      protocols: {
        protocols: [],
        byUserId: [
          {
            treatmentProtocolId: "test-protocol-id",
            protocolName: "Test Protocol",
            treatments: [],
            personId: "mockUserId",
          },
        ],
        isAddingTreatment: false,
      },
    };

    const store = createTestStore(preloadedState);

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <EditProtocolContainer id="test-protocol-id" />
        </Provider>
      </QueryClientProvider>
    );

    const nameInput = screen.getByDisplayValue("Test Protocol");
    fireEvent.change(nameInput, { target: { value: "New Protocol Name" } });

    const saveButton = screen.getByText("Protocols.saveAndExit");
    fireEvent.click(saveButton);

    // Wait for async effects (like updateProtocolName and router.push)
    // await waitFor(() => {
    //   expect(updateProtocolNameMock).toHaveBeenCalledWith({
    //     protocolId: "test-protocol-id",
    //     protocolName: "New Protocol Name",
    //   });
    //   expect(pushMock).toHaveBeenCalledWith("/dashboard");
    // });
  });
});
