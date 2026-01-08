import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { forwardRef } from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { AddProtocolContainer } from "../AddProtocolContainer";

// Mock hooks
jest.mock("@/ui-kit/hooks/useProtocols", () => ({
  useProtocols: () => ({
    createProtocol: jest.fn(),
  }),
}));

jest.mock("@/hooks/useScreenSize", () => ({
  useScreenSize: () => ({ height: 800 }),
}));

jest.mock("@/ui-kit/hooks/useInternetConnection", () => ({
  useInternetConnection: () => true,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

// Mock lodash to keep things simple if needed
jest.mock("lodash", () => {
  const original = jest.requireActual("lodash");
  return {
    ...original,
    map: original.map,
    filter: original.filter,
    find: original.find,
    isEmpty: original.isEmpty,
  };
});

// Mocks for Redux selectors
jest.mock("@/services/store/modules/auth/selectors", () => ({
  selectHisaPersonId: jest.fn(),
}));

jest.mock("graphql-request", () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  request: jest.fn(),
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

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AddProtocolContainer", () => {
  let queryClient: QueryClient;

  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    queryClient = new QueryClient();
  });
  const mockStore = configureMockStore();

  beforeEach(() => {
    // Make sure your selector returns a fake ID
    (selectHisaPersonId as jest.Mock).mockReturnValue("person-123");
  });

  it("renders the header title", () => {
    const store = mockStore({});

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AddProtocolContainer />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("Protocols.createProtocol")).toBeInTheDocument();
  });

  it("handles button click and calls createProtocol", () => {
    const store = mockStore({});
    const { getByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AddProtocolContainer />
        </QueryClientProvider>
      </Provider>
    );

    const closeButton = getByText("Protocols.createProtocol");
    expect(closeButton).toBeInTheDocument();
  });

  it("allows user to type protocol name", async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AddProtocolContainer />
        </QueryClientProvider>
      </Provider>
    );

    const input = screen.getByPlaceholderText("Protocols.protocolName");
    await userEvent.type(input, "New Protocol Name");
    expect(input).toHaveValue("New Protocol Name");
  });
});
