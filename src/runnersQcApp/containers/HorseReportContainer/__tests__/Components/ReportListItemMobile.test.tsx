import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ReportListItemMobile } from "../../Components/ReportListItemMobile";

jest.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

describe("ReportListItemMobile", () => {
  const baseProps = {
    id: "1",
    day: "01",
    month: "Jul",
    horseId: "H000000000",
    description: "Desc",
    conditionTreated: "Cond",
    thirdField: "Third",
    isSynced: true,
    bordered: true,
    onClick: jest.fn(),
  };

  it("renders day, month and horseId", () => {
    render(<ReportListItemMobile {...baseProps} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Jul")).toBeInTheDocument();
    expect(screen.getByText("H000000000")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<ReportListItemMobile {...baseProps} description="DescVal" />);
    expect(screen.getByText("DescVal")).toBeInTheDocument();
  });

  it("renders drug when provided", () => {
    render(<ReportListItemMobile {...baseProps} drug="DrugX" description="" />);
    expect(screen.getByText(/drugName: DrugX/)).toBeInTheDocument();
  });

  it("renders condition when no drug and no description", () => {
    render(<ReportListItemMobile {...baseProps} description="" drug="" />);
    expect(screen.getByText(/conditionTreated: Cond/)).toBeInTheDocument();
  });

  it("renders thirdField when no drug and no condition", () => {
    render(
      <ReportListItemMobile
        {...baseProps}
        description=""
        drug=""
        conditionTreated=""
      />
    );
    expect(screen.getByText("Third")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    render(<ReportListItemMobile {...baseProps} />);
    fireEvent.click(screen.getByText("01"));
    expect(baseProps.onClick).toHaveBeenCalled();
  });
});
