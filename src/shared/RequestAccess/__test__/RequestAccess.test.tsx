import { useAppAccessMutation } from "@/services/api/modules/auth/fetchAppAccess";
import { getConfig } from "@/services/appConfig";
import * as amplify from "@/services/aws/amplifyActions";
import { handleSignOut } from "@/services/aws/amplifyActions";
import { useToast } from "@/ui-kit/hooks/useToast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { RequestAccess } from "../RequestAccess";

const toastMock = jest.fn();

jest.mock("@/ui-kit/hooks/useToast", () => ({
  useToast: jest.fn(),
}));

jest.mock("@/services/api/modules/auth/fetchAppAccess", () => ({
  useAppAccessMutation: jest.fn(),
}));

jest.mock("@/ui-kit/hooks/useSmallPhone", () => ({
  useIsSmallPhone: () => false,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations = {
      errorMessage: "Username is required",
      incorrectUsername: "Incorrect username",
      accessRequestSent: "Access request sent",
      accessRequestError: "Error sending request",
    };
    return translations[key as keyof typeof translations] as string;
  },
}));

jest.mock("react-redux", () => {
  const ActualReactRedux = jest.requireActual("react-redux");
  return {
    ...ActualReactRedux,
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock("@/services/appConfig", () => ({
  getConfig: jest.fn().mockReturnValue({
    logo: "/logo.png",
    logoWhite: "/logo-white.png",
    permissionName: "TestApp",
    pwaInstallationRejected: "pwaInstallationRejected",
    BUILD_DATE: Date.now(),
  }),
}));

jest.mock("@/services/aws/amplifyActions", () => ({
  handleSignOut: jest.fn(),
}));

jest.mock("@/ui-kit/components/Accordion", () => ({
  Accordion: ({ items }: any) => (
    <div data-testid="accordion">
      {items.map((item: string, i: number) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  ),
}));

jest.mock("@/runnersQcApp/containers/BottomContainer", () => ({
  BottomContainer: () => <div data-testid="bottom-container" />,
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("RequestAccess", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === "selectUserData") {
        return { userName: "testuser" };
      }
      if (selectorFn.name === "selectHisaPersonId") {
        return "123";
      }
      return undefined;
    });
    (handleSignOut as jest.Mock).mockImplementation(() => {});
    (getConfig as jest.Mock).mockReturnValue({
      logo: "/logo.png",
      logoWhite: "/logo-white.png",
      permissionName: "TestApp",
      pwaInstallationRejected: "pwaInstallationRejected",
      BUILD_DATE: Date.now(),
    });
    (useAppAccessMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue(true),
      isPending: false,
    });
    (useToast as jest.Mock).mockReturnValue({
      toast: toastMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("shows error if username is empty", async () => {
    renderWithQueryClient(<RequestAccess />);
    fireEvent.submit(screen.getByTestId("request-access-form"));
    await waitFor(() =>
      expect(screen.getByText("Username is required")).toBeInTheDocument()
    );
  });

  it("shows error if username is incorrect", async () => {
    renderWithQueryClient(<RequestAccess />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "wronguser" },
    });
    fireEvent.submit(screen.getByTestId("request-access-form"));
    await waitFor(() =>
      expect(screen.getByText("Incorrect username")).toBeInTheDocument()
    );
  });

  it("submits and shows success toast", async () => {
    renderWithQueryClient(<RequestAccess />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "testuser" },
    });
    fireEvent.submit(screen.getByTestId("request-access-form"));

    await waitFor(() =>
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Access request sent" })
      )
    );

    expect(dispatch).toHaveBeenCalledWith({
      payload: undefined,
      type: "auth/RESTART_AUTH",
    });
    expect(amplify.handleSignOut).toHaveBeenCalled();
  });
});
