import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { LocationsFiltersBlock } from "../LocationsFiltersBlock";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/ui-kit/components/FilterButton/FilterButton", () => ({
  FilterButton: ({ isOpen, isSelected, onClick }: any) => (
    <button
      data-testid="filter-btn"
      data-open={isOpen}
      data-selected={isSelected}
      onClick={onClick}
    >
      Filter
    </button>
  ),
}));

jest.mock("@/ui-kit/components/Accordion/AccordionParts", () => ({
  Accordion: ({ children }: any) => <div>{children}</div>,
  AccordionItem: ({ children }: any) => <div>{children}</div>,
  AccordionContent: ({ children }: any) => <div>{children}</div>,
}));

jest.mock("../../DistanceFilter", () => ({
  DistanceFilter: ({ value, onChange }: any) => (
    <button
      data-testid="dist-btn"
      data-value={value}
      onClick={() => onChange(123)}
    >
      Distance: {value}
    </button>
  ),
}));

jest.mock("../../LocationTypesFilter", () => ({
  LocationTypesFilter: ({ value, onChange }: any) => (
    <button
      data-testid="types-btn"
      data-value={JSON.stringify(value)}
      onClick={() =>
        onChange([{ label: "Mock", value: "MockValue", isSelected: true }])
      }
    >
      Types: {value.length}
    </button>
  ),
}));

describe("LocationsFiltersBlock", () => {
  let onChangeMock: jest.Mock;

  beforeEach(() => {
    onChangeMock = jest.fn();
  });

  it("renders FilterButton and visible filters (мок) and toggles open state on click", () => {
    render(<LocationsFiltersBlock onChange={onChangeMock} />);

    const btn = screen.getByTestId("filter-btn");
    expect(btn).toHaveAttribute("data-open", "false");
    expect(screen.getByTestId("dist-btn")).toBeInTheDocument();
    expect(screen.getByTestId("types-btn")).toBeInTheDocument();

    fireEvent.click(btn);
    expect(btn).toHaveAttribute("data-open", "true");
  });

  it("calls onChange with new distance and existing types when distance changes", () => {
    render(<LocationsFiltersBlock onChange={onChangeMock} />);
    fireEvent.click(screen.getByTestId("filter-btn"));

    fireEvent.click(screen.getByTestId("dist-btn"));
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    const [distArg, typesArg] = onChangeMock.mock.calls[0];
    expect(distArg).toBe(123);
    expect(Array.isArray(typesArg)).toBe(true);
    expect(typesArg).toHaveLength(4);
  });

  it("calls onChange with new types and existing distance when types change", () => {
    render(<LocationsFiltersBlock onChange={onChangeMock} />);
    fireEvent.click(screen.getByTestId("filter-btn"));

    fireEvent.click(screen.getByTestId("types-btn"));
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    const [distArg, typesArg] = onChangeMock.mock.calls[0];
    expect(distArg).toBe(100);
    expect(typesArg).toEqual([
      { label: "Mock", value: "MockValue", isSelected: true },
    ]);
  });

  it("reset button restores defaults and calls onChange, закрывает аккордеон", () => {
    render(<LocationsFiltersBlock onChange={onChangeMock} />);
    fireEvent.click(screen.getByTestId("filter-btn"));

    fireEvent.click(screen.getByTestId("dist-btn"));
    fireEvent.click(screen.getByTestId("types-btn"));
    onChangeMock.mockClear();

    fireEvent.click(screen.getByText("clearAll"));

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    const [resetDist, resetTypes] = onChangeMock.mock.calls[0];
    expect(resetDist).toBe(100);
    expect(Array.isArray(resetTypes)).toBe(true);
    expect(resetTypes.every((i: any) => i.isSelected === false)).toBe(true);

    expect(screen.getByTestId("filter-btn")).toHaveAttribute(
      "data-open",
      "false"
    );
  });
});
