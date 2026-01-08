import { getConfig } from "@/services/appConfig";
import { NextStep } from "@/Types";
import { useIsSmallPhone } from "@/ui-kit/hooks/useSmallPhone";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../page";

// Mocks
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/services/appConfig", () => ({
  getConfig: jest.fn(),
}));

jest.mock("@/ui-kit/hooks/useSmallPhone", () => ({
  useIsSmallPhone: jest.fn(),
}));

jest.mock("@/ui-kit/blocks/LoginForm", () => ({
  LoginForm: () => <div data-testid="login-form" />,
}));

jest.mock("@/ui-kit/blocks/CreateAccountInfo", () => ({
  CreateAccountInfo: () => <div data-testid="create-account-info" />,
}));

jest.mock("@/prodDataExporter/containers/BottomContainer", () => ({
  BottomContainer: () => <div data-testid="bottom-container" />,
}));

jest.mock("@/shared/RequestAccess", () => ({
  RequestAccess: () => <div data-testid="request-access" />,
}));

jest.mock("@/shared/NetworkStatus", () => ({
  NoConnectionView: ({ classStyles }: any) => (
    <div data-testid="network-status" className={classStyles}>
      NetworkStatus
    </div>
  ),
}));

jest.mock("next/image", () => {
  // eslint-disable-next-line @next/next/no-img-element
  const MockNextImage = (props: any) => <img {...props} alt={props.alt} />;
  MockNextImage.displayName = "MockNextImage";
  return MockNextImage;
});

describe("LoginPage", () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (getConfig as jest.Mock).mockReturnValue({
      logo: "/logo.svg",
      logoWhite: "/logo-white.svg",
    });
    (useIsSmallPhone as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders login form, account info, and bottom container by default", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector.name === "selectNextStep") return null;
      return null;
    });

    render(<LoginPage />);

    expect(screen.getByTestId("network-status")).toBeInTheDocument();
    expect(screen.getByTestId("create-account-info")).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByTestId("bottom-container")).toBeInTheDocument();
    // expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalled(); // for resetAuthStore
  });

  it("navigates to dashboard if nextStep is DASHBOARD", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector.name === "selectNextStep") return NextStep.DASHBOARD;
      return null;
    });

    render(<LoginPage />);

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });

  it("renders RequestAccess if nextStep is REQUEST_ACCESS", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector.name === "selectNextStep") return NextStep.REQUEST_ACCESS;
      return null;
    });

    render(<LoginPage />);
    expect(screen.getByTestId("request-access")).toBeInTheDocument();
  });

  it("renders smaller logo when isSmallPhone is true", () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector.name === "selectNextStep") return null;
      return null;
    });
    (useIsSmallPhone as jest.Mock).mockReturnValue(true);

    render(<LoginPage />);
    expect(screen.getAllByAltText("Logo").length).toBeGreaterThan(0);
  });
});
