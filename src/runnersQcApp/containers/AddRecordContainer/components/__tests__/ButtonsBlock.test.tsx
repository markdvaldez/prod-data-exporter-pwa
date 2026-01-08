import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonsBlock, ButtonsBlockProps } from "../ButtonsBlock";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key === "cancel") return "Cancel";
    if (key === "previousStep") return "Previous Step";
    return key;
  },
}));

jest.mock("next/link", () => {
  const MockLink = ({ children }: any) => <>{children}</>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("<ButtonsBlock />", () => {
  const defaultProps: ButtonsBlockProps = {
    buttonTitle: "Next",
    onPress: jest.fn(),
    onSubmit: jest.fn(),
  };

  const renderComponent = (props: Partial<ButtonsBlockProps> = {}) =>
    render(<ButtonsBlock {...defaultProps} {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders cancel button and calls onPress", () => {
    renderComponent();

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);
    expect(defaultProps.onPress).toHaveBeenCalled();
  });

  it("renders previous step button if activeIndex > 1", () => {
    renderComponent({ activeIndex: 2 });

    expect(screen.getByText("Previous Step")).toBeInTheDocument();
  });

  it("does not render previous step if activeIndex is 1 or undefined", () => {
    renderComponent({ activeIndex: 1 });
    expect(screen.queryByText("Previous Step")).not.toBeInTheDocument();

    renderComponent({ activeIndex: undefined });
    expect(screen.queryByText("Previous Step")).not.toBeInTheDocument();
  });

  it("calls onPress when previous step is clicked", () => {
    renderComponent({ activeIndex: 3 });

    fireEvent.click(screen.getByText("Previous Step"));
    expect(defaultProps.onPress).toHaveBeenCalled();
  });

  it("renders final button with buttonTitle", () => {
    renderComponent({ buttonTitle: "Next Step" });
    expect(screen.getByText("Next Step")).toBeInTheDocument();
  });

  it("calls onSubmit when final button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Next"));
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  it("disables final button if disabled is true", () => {
    renderComponent({ disabled: true });

    expect(screen.getByText("Next")).toBeDisabled();
  });
});
