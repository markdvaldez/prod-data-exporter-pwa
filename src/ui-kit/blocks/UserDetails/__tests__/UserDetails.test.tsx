import { useUserPermissions } from "@/hooks/useAuthUser";
import { useToast } from "@/ui-kit/hooks/useToast";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { UserDetails } from "../UserDetails";

// Mock hooks
jest.mock("@/hooks/useAuthUser");
jest.mock("@/ui-kit/hooks/useToast");
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

// Mock clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

const mockToastFn = jest.fn();
jest.mock("@/ui-kit/components/Toaster", () => ({
  Toaster: () => <div data-testid="mock-toaster" />,
}));

jest.mock("@/hooks/useAuthUser", () => ({
  useUserPermissions: () => ({
    userData: {
      hisaPersonId: "P000000123",
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      email: "john.doe@example.com",
      mobileNumber: "+123456789",
    },
  }),
}));

jest.mock("@/hooks/useAuthUser", () => ({
  useUserPermissions: jest.fn(),
}));

describe("UserDetails", () => {
  const mockUserData = {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    email: "john.doe@example.com",
    mobileNumber: "+123456789",
    hisaPersonId: "P000000123",
  };

  const mockToast = jest.fn();
  const t = (key: string) => key;

  beforeEach(() => {
    (useUserPermissions as jest.Mock).mockReturnValue({
      userData: mockUserData,
    });

    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
    (useTranslations as jest.Mock).mockReturnValue(t);
    jest.clearAllMocks();
  });

  it("renders user initials", () => {
    render(<UserDetails />);
    expect(screen.getByText("JD")).toBeInTheDocument(); // Initials for John Doe
  });

  it("renders user details correctly", () => {
    render(<UserDetails />);

    expect(screen.getByLabelText("firstName")).toHaveValue("John");
    expect(screen.getByLabelText("lastName")).toHaveValue("Doe");
    expect(screen.getByLabelText("email")).toHaveValue("john.doe@example.com");
    expect(screen.getByLabelText("phoneNumber")).toHaveValue("+123456789");
    expect(screen.getByText("P-000-000-123")).toBeInTheDocument();
  });

  it("copies person ID to clipboard and shows toast", async () => {
    render(<UserDetails />);

    const copyArea = screen.getByText("P-000-000-123");
    fireEvent.click(copyArea);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("P000000123");
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Person ID copied to clipboard",
          variant: "default",
        })
      );
    });
  });

  it("copies person ID to clipboard and shows toast", async () => {
    render(<UserDetails />);

    const copyArea = screen.getByText((content) =>
      content.includes("P-000-000-123")
    );

    fireEvent.click(copyArea);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith("P000000123");
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Person ID copied to clipboard",
        })
      );
    });
  });

  it("calls clipboard.writeText with person ID and shows toast", async () => {
    render(<UserDetails />);

    const copyButton = screen.getByTestId("person-id-copy");
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Person ID copied to clipboard",
        variant: "default",
      });
    });
  });
});
