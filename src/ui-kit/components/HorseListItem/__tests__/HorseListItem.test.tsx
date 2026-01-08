import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { HorseListItem, Status } from "../HorseListItem";

jest.mock("../../HighlightText", () => ({
  HighlightText: ({ text, searchText, className }: any) => (
    <span data-testid="HighlightText" className={className}>
      {searchText ? `${text}:${searchText}` : text}
    </span>
  ),
}));

jest.mock("../../Icons/HorseIcon", () => ({
  HorseIcon: () => <span data-testid="HorseIcon" />,
}));
jest.mock("../../Icons/ChevronRightIcon", () => ({
  ChevronRightIcon: () => <span data-testid="ChevronRightIcon" />,
}));
jest.mock("../../Separator", () => ({
  Separator: ({ className }: any) => (
    <hr data-testid="Separator" className={className} />
  ),
}));

describe("HorseListItem", () => {
  const baseProps = {
    title: "MyHorse",
    subTitle: "(H000000000)",
    hisaHorseId: "H000000000",
    onItemPress: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and subtitle via HighlightText", () => {
    render(<HorseListItem {...baseProps} />);
    const highlights = screen.getAllByTestId("HighlightText");
    expect(highlights).toHaveLength(2);
    expect(highlights[0]).toHaveTextContent("MyHorse");
    expect(highlights[1]).toHaveTextContent("(H000000000)");
  });

  it("uses cleared status (bg-a8) by default", () => {
    render(<HorseListItem {...baseProps} />);
    const iconWrapper = screen.getByTestId("HorseIcon").parentElement!;
    expect(iconWrapper).toHaveClass("bg-a8");
  });

  it.each<[Status, string]>([
    ["scratched", "bg-e1"],
    ["flagged", "bg-c0"],
    ["cleared", "bg-a8"],
  ])("applies class %s when status is %s", (status, expectedBg) => {
    render(<HorseListItem {...baseProps} status={status} />);
    const iconWrapper = screen.getByTestId("HorseIcon").parentElement!;
    expect(iconWrapper).toHaveClass(expectedBg);
  });

  it("shows ChevronRightIcon by default", () => {
    render(<HorseListItem {...baseProps} />);
    expect(screen.getByTestId("ChevronRightIcon")).toBeInTheDocument();
  });

  it("hides ChevronRightIcon when showIcon=false", () => {
    render(<HorseListItem {...baseProps} showIcon={false} />);
    expect(screen.queryByTestId("ChevronRightIcon")).toBeNull();
  });

  it("shows Separator by default", () => {
    render(<HorseListItem {...baseProps} />);
    expect(screen.getByTestId("Separator")).toBeInTheDocument();
  });

  it("hides Separator when isLastItem=true", () => {
    render(<HorseListItem {...baseProps} isLastItem />);
    expect(screen.queryByTestId("Separator")).toBeNull();
  });

  it("calls onItemPress with id when clicked", () => {
    render(<HorseListItem {...baseProps} />);
    fireEvent.click(screen.getByText("MyHorse"));
    expect(baseProps.onItemPress).toHaveBeenCalledWith("H000000000");
  });

  it("passes searchText to HighlightText components", () => {
    render(<HorseListItem {...baseProps} searchText="foo" />);
    const [titleHighlight, subHighlight] =
      screen.getAllByTestId("HighlightText");
    expect(titleHighlight).toHaveTextContent("MyHorse:foo");
    expect(subHighlight).toHaveTextContent("(H000000000):foo");
  });
});
