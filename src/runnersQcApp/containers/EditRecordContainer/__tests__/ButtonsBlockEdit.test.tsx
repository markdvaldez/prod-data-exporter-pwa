import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonsBlockEdit } from "../ButtonsBlockEdit";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    if (key === "AddRecord.back") return "Back";
    return key;
  },
}));

describe("<ButtonsBlockEdit />", () => {
  const mockOnPress = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps = {
    buttonTitle: "Save Changes",
    onPress: mockOnPress,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders both buttons with correct text", () => {
    render(<ButtonsBlockEdit {...defaultProps} />);
    expect(screen.getByText("back")).toBeInTheDocument();
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("calls onPress when back button is clicked", () => {
    render(<ButtonsBlockEdit {...defaultProps} />);
    const backButton = screen.getByText("back");
    fireEvent.click(backButton);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when submit button is clicked", () => {
    render(<ButtonsBlockEdit {...defaultProps} />);
    const submitButton = screen.getByText("Save Changes");
    fireEvent.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables the submit button when disabled is true", () => {
    render(<ButtonsBlockEdit {...defaultProps} disabled />);
    const submitButton = screen.getByText("Save Changes");
    expect(submitButton).toBeDisabled();
  });
});
