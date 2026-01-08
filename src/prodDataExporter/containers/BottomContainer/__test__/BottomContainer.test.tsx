import { render, screen } from "@testing-library/react";
import { BottomContainer } from "../BottomContainer";

import { getPageId, getVersion } from "@/routes/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

// Mocks
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/routes/utils", () => ({
  getPageId: jest.fn(),
  getVersion: jest.fn(),
  routeTitles: {
    login: { path: "/login", pageId: 1 },
    register: { path: "/register", pageId: 2 },
    dashboard: { path: "/dashboard", pageId: 10 },
  },
}));

jest.mock("@/runnersQcApp/containers/FrontEndNotificationContainer", () => ({
  FrontEndNotificationContainer: ({ page }: any) => (
    <div data-testid="notification">{`Notification for page ${page}`}</div>
  ),
}));

describe("BottomContainer", () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const map: Record<string, string> = {
        call: "Call",
        forAssistance: "for assistance",
      };
      return map[key] || key;
    });

    (getVersion as jest.Mock).mockReturnValue("v1.0");
    (getPageId as jest.Mock).mockImplementation((id: number) => `Page ${id}`);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders assistance section when withAssistance is true", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");

    render(<BottomContainer withAssistance />);

    expect(screen.getByTestId("call")).toBeInTheDocument();
    expect(screen.getByText("1-877-513-2919")).toHaveAttribute(
      "href",
      "tel:18775132919"
    );
    expect(screen.getByText("Page 1, v1.0")).toBeInTheDocument();
    expect(screen.getByTestId("notification")).toHaveTextContent(
      "Notification for page 1"
    );
  });

  it("renders fixed bottom container without assistance", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(<BottomContainer />);

    expect(screen.getByText("Page 10, v1.0")).toBeInTheDocument();
    expect(screen.getByTestId("notification")).toHaveTextContent(
      "Notification for page 10"
    );
  });

  it("does not render anything when route is not matched", () => {
    (usePathname as jest.Mock).mockReturnValue("/not-found");

    const { container } = render(<BottomContainer />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render notification if matched pageId is 2, 3, or 37", () => {
    (usePathname as jest.Mock).mockReturnValue("/register");

    render(<BottomContainer />);

    expect(screen.getByText("Page 2, v1.0")).toBeInTheDocument();
    expect(screen.queryByTestId("notification")).not.toBeInTheDocument();
  });
});
