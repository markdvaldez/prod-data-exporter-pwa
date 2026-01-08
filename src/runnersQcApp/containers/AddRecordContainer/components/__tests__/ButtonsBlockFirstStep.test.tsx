import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonsBlockFirstStep } from "../ButtonsBlockFirstStep";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key === "AddRecord.cancel") return "Cancel";
    return key;
  },
}));

jest.mock("@/routes", () => ({
  __esModule: true,
  default: {
    DASHBOARD: "/dashboard",
  },
}));

describe("<ButtonsBlockFirstStep />", () => {
  const onPress = jest.fn();
  const handleCancel = jest.fn();

  const renderComponent = (props = {}) =>
    render(
      <ButtonsBlockFirstStep
        buttonTitle="Next"
        disabled={false}
        onPress={onPress}
        handleCancel={handleCancel}
        {...props}
      />
    );

  it("renders cancel button with translated text", () => {
    renderComponent();
    expect(screen.getByText("cancel")).toBeInTheDocument();
  });

  it("calls handleCancel when cancel button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("cancel"));
    expect(handleCancel).toHaveBeenCalled();
  });

  it("has correct link for cancel button", () => {
    renderComponent();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders main button with correct title", () => {
    renderComponent();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls onPress when main button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Next"));
    expect(onPress).toHaveBeenCalled();
  });

  it("disables main button when disabled is true", () => {
    renderComponent({ disabled: true });
    expect(screen.getByText("Next")).toBeDisabled();
  });
});
