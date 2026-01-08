import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MyCurrentLocationBlock } from "../MyCurrentLocationBlock";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/ui-kit/components/LocationIconButton", () => ({
  LocationIconButton: ({ className, onClick }: any) => (
    <button data-testid="loc-icon-btn" className={className} onClick={onClick}>
      Icon
    </button>
  ),
}));

describe("MyCurrentLocationBlock", () => {
  let onSubmitMock: jest.Mock;

  beforeEach(() => {
    onSubmitMock = jest.fn();
  });

  it("renders translation texts and applies custom className", () => {
    render(
      <MyCurrentLocationBlock
        className="custom-class"
        onSubmit={onSubmitMock}
      />
    );

    const wrapper = screen.getByText("toFindALocation")
      .parentElement as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");

    expect(screen.getByText("toFindALocation")).toBeInTheDocument();
    expect(screen.getByText("or")).toBeInTheDocument();
    expect(screen.getByText("useMyCurrentLocation")).toBeInTheDocument();
  });

  it("calls onSubmit when clicking the text area", () => {
    render(<MyCurrentLocationBlock onSubmit={onSubmitMock} />);
    fireEvent.click(screen.getByText("useMyCurrentLocation"));
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("calls onSubmit when clicking the LocationIconButton", () => {
    render(<MyCurrentLocationBlock onSubmit={onSubmitMock} />);
    fireEvent.click(screen.getByTestId("loc-icon-btn"));
    expect(onSubmitMock).toHaveBeenCalledTimes(2);
  });
});
