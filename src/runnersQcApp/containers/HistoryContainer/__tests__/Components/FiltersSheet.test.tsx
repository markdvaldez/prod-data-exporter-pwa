import { resetFilters, setFilters } from "@/services/store/modules/history";
import {
  selectHistoryDateFrom,
  selectHistoryDateTo,
  selectHistoryRecTypes,
} from "@/services/store/modules/history/selectors";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiltersSheet } from "../../Components/FiltersSheet";
import { getRecTypeFilters } from "../../helpers";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
jest.mock("../../helpers", () => ({ getRecTypeFilters: jest.fn() }));
jest.mock("lucide-react", () => ({
  ChevronDown: () => <div data-testid="chevron-down" />,
}));

jest.mock("@/ui-kit/blocks/Panel/Panel", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="panel">{children}</div>
  ),
}));
jest.mock("@/ui-kit/components/Button", () => ({
  Button: ({
    title,
    onClick,
    children,
    ...rest
  }: {
    title?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    [key: string]: any;
  }) => (
    <button {...rest} onClick={onClick}>
      {title || children}
    </button>
  ),
}));
jest.mock("@/ui-kit/components/Checkbox", () => ({
  Checkbox: ({
    checked,
    onCheckedChange,
  }: {
    checked?: boolean;
    onCheckedChange: (checked: boolean) => void;
  }) => (
    <input
      data-testid="checkbox"
      type="checkbox"
      checked={checked}
      onChange={() => onCheckedChange(!checked)}
    />
  ),
}));
jest.mock("@/ui-kit/components/Collapsible", () => ({
  Collapsible: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CollapsibleContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CollapsibleTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock("@/ui-kit/components/FilterTag", () => ({
  FilterTag: ({
    title,
    isSelected,
    onPress,
  }: {
    title: string;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <button onClick={onPress}>
      {title}
      {isSelected ? "*" : ""}
    </button>
  ),
}));
jest.mock("../../Components/InputDate", () => ({
  InputDate: ({
    value,
    onChange,
    placeholder,
  }: {
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
  }) => (
    <input
      data-testid="input-date"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
jest.mock("../../helpers", () => ({ getRecTypeFilters: jest.fn() }));
jest.mock("lucide-react", () => ({
  ChevronDown: () => <div data-testid="chevron-down" />,
}));

jest.useFakeTimers().setSystemTime(new Date("2025-07-04T12:00:00Z"));

describe("FiltersSheet", () => {
  const defaultDateFrom = "2025-07-01";
  const defaultDateTo = "2025-07-03";
  const defaultRecTypes = ["mandatoryAttendingVetInsp", "Vaccine"];
  let dispatchMock: jest.Mock;
  const onCloseMock = jest.fn();

  beforeEach(() => {
    dispatchMock = jest.fn();
    (useDispatch as unknown as jest.Mock<any, any>).mockReturnValue(
      dispatchMock
    );
    (useSelector as unknown as jest.Mock<any, any>).mockImplementation(
      (selector) => {
        if (selector === selectHistoryDateFrom) return defaultDateFrom;
        if (selector === selectHistoryDateTo) return defaultDateTo;
        if (selector === selectHistoryRecTypes) return defaultRecTypes;
        return undefined;
      }
    );
    (getRecTypeFilters as jest.Mock).mockReturnValue([
      {
        id: "mandatoryAttendingVetInsp",
        title: "Mandatory attending vet inspection",
      },
      { id: "Vaccine", title: "Vaccine" },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders quick filters and date inputs when open", () => {
    render(<FiltersSheet open={true} onClose={onCloseMock} />);

    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Yesterday")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Select start date")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Select end date")).toBeInTheDocument();
  });

  it("applies a quick filter and updates Apply button", () => {
    render(<FiltersSheet open={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByText("Today"));

    const applyButton = screen.getByRole("button", { name: /applyFilters/ });
    expect(applyButton).toBeInTheDocument();
  });

  it("calls setFilters and onClose on Apply", () => {
    render(<FiltersSheet open={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByRole("button", { name: /applyFilters/ }));

    expect(dispatchMock).toHaveBeenCalledWith(
      setFilters({
        dateFrom: defaultDateFrom,
        dateTo: defaultDateTo,
        recTypes: defaultRecTypes,
      })
    );
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("calls resetFilters and onClose on Clear All", () => {
    render(<FiltersSheet open={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByText("clearAll"));

    expect(dispatchMock).toHaveBeenCalledWith(resetFilters());
    expect(onCloseMock).toHaveBeenCalled();
  });
});
