import { getConfig } from "@/services/appConfig";
import { loginRequest, resetError } from "@/services/store/modules/auth";
import { fireEvent, render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { LoginForm } from "../LoginForm";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("@/services/appConfig", () => ({
  getConfig: jest.fn(),
}));

jest.mock("@/services/store/modules/auth", () => ({
  loginRequest: jest.fn(),
  resetError: jest.fn(),
}));

// Mocks for custom components
jest.mock("@/ui-kit/components/Input", () => ({
  Input: ({ ...props }: any) => (
    <input data-testid="username-input" {...props} />
  ),
}));

jest.mock("@/ui-kit/components/PasswordInput", () => ({
  PasswordInput: ({ ...props }: any) => (
    <input data-testid="password-input" type="password" {...props} />
  ),
}));

jest.mock("@/ui-kit/components/Button", () => ({
  Button: ({ title, ...props }: any) => <button {...props}>{title}</button>,
}));

describe("LoginForm", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        "Auth.login": "Login",
        "Auth.loginDescription": "Log in to your account",
        "Auth.enterYourUsername": "Enter username",
        "Auth.forgotPassword": "Forgot password?",
        "Auth.continue": "Continue",
        "Auth.register": "Register",
      };
      return translations[key] || key;
    });

    (useSelector as unknown as jest.Mock).mockImplementation(
      (selectorFn: any) => {
        if (selectorFn.name === "selectAuthError") return null;
        if (selectorFn.name === "selectIsAuthFetching") return false;
        if (selectorFn.name === "selectNextStep") return null;
        return null;
      }
    );

    (getConfig as jest.Mock).mockReturnValue({
      FORGOT_PASSWORD_URL: "https://portal.hisausapps.org/forgot-password",
      REGISTER_URL: "https://portal.hisausapps.org/registration",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields and labels", () => {
    render(<LoginForm />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Log in to your account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByText("Forgot password?")).toHaveAttribute(
      "href",
      "https://portal.hisausapps.org/forgot-password"
    );
    expect(screen.getByText("Continue")).toBeInTheDocument();
    expect(screen.getByText("Register")).toHaveAttribute(
      "href",
      "https://portal.hisausapps.org/registration"
    );
  });

  it("submits form with correct values", () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "john" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "secret" },
    });

    const form =
      screen.getByTestId("login-form") ||
      screen.getByRole("button", { name: "Continue" }).closest("form");

    fireEvent.submit(form!);

    expect(mockDispatch).toHaveBeenCalledWith(
      loginRequest({ username: "john", password: "secret" })
    );
  });

  it("resets error on input change", () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "a" },
    });

    expect(mockDispatch).toHaveBeenCalledWith(resetError());
  });

  it("displays error message when error exists", () => {
    (useSelector as unknown as jest.Mock).mockImplementation(
      (selectorFn: any) => {
        if (selectorFn.name === "selectAuthError")
          return { message: "Invalid credentials" };
        return null;
      }
    );

    render(<LoginForm />);
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });
});
