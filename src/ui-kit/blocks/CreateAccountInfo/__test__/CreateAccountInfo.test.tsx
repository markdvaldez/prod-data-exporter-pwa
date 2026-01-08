import { render, screen } from "@testing-library/react";

import { getConfig } from "@/services/appConfig";
import { useTranslations } from "next-intl";
import { CreateAccountInfo } from "../CreateAccountInfo";

// Mocks
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/services/appConfig", () => ({
  getConfig: jest.fn(),
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

describe("CreateAccountInfo", () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        createAccount: "Create Account",
        explore: "Explore features",
        accessToHISA: "Access to HISA",
        accessToMedEnt: "Access to MedEnt",
        signUp: "Sign Up",
      };
      return translations[key] || key;
    });

    (getConfig as jest.Mock).mockReturnValue({
      REGISTER_URL: "https://portal.hisausapps.org/registration",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and explore text", () => {
    render(<CreateAccountInfo />);
    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByText("Explore features")).toBeInTheDocument();
  });

  it("renders Accordion with translated items", () => {
    render(<CreateAccountInfo />);
    expect(screen.getByTestId("accordion")).toBeInTheDocument();
    expect(screen.getByText("Access to HISA")).toBeInTheDocument();
    expect(screen.getByText("Access to MedEnt")).toBeInTheDocument();
  });

  it("renders register link with correct href", () => {
    render(<CreateAccountInfo />);
    const link = screen.getByRole("link", { name: /sign up/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "https://portal.hisausapps.org/registration"
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
