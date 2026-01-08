import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecordsWidgetListItem } from "../RecordsWidgetListItem";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../Icons/ChevronRightIcon", () => ({
  ChevronRightIcon: (props: any) => <div data-testid="chevron" {...props} />,
}));

jest.mock("../../Separator", () => ({
  Separator: (props: any) => <div data-testid="separator" {...props} />,
}));

describe("RecordsWidgetListItem", () => {
  const baseProps = {
    id: "rec-1",
    day: "10",
    month: "MAR",
    horseName: "Thunder",
    horseId: "H000000000",
    drug: "",
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders day, month, horseName and horseId", () => {
    render(<RecordsWidgetListItem {...baseProps} />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("MAR")).toBeInTheDocument();
    const nameLine = screen.getByText("Thunder");
    expect(nameLine).toBeInTheDocument();
    expect(screen.getByText("H000000000")).toBeInTheDocument();
  });

  it("renders recType when provided", () => {
    render(<RecordsWidgetListItem {...baseProps} recType="Vaccine" drug="" />);
    expect(screen.getByText("Vaccine")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(
      <RecordsWidgetListItem
        {...baseProps}
        description="Some description"
        drug=""
      />
    );
    expect(screen.getByText("Some description")).toBeInTheDocument();
  });

  it("renders drugName when drug is provided", () => {
    render(<RecordsWidgetListItem {...baseProps} drug="Penicillin" />);
    expect(screen.getByText("Widget.drugName: Penicillin")).toBeInTheDocument();
  });

  it("renders conditionTreated when no drug and conditionTreated provided", () => {
    render(
      <RecordsWidgetListItem
        {...baseProps}
        drug=""
        conditionTreated="Infection"
      />
    );
    expect(
      screen.getByText("Widget.conditionTreated: Infection")
    ).toBeInTheDocument();
  });

  it("renders thirdField when no drug or conditionTreated", () => {
    render(
      <RecordsWidgetListItem {...baseProps} drug="" thirdField="Extra info" />
    );
    expect(screen.getByText("Extra info")).toBeInTheDocument();
  });

  it("renders Separator when bordered is true", () => {
    render(<RecordsWidgetListItem {...baseProps} bordered={true} />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("does not render Separator when bordered is false", () => {
    render(<RecordsWidgetListItem {...baseProps} bordered={false} />);
    expect(screen.queryByTestId("separator")).toBeNull();
  });

  it("shows unsynced badge when isSynced is false", () => {
    render(<RecordsWidgetListItem {...baseProps} isSynced={false} />);
    expect(screen.getByText("AddRecord.dataNotSynced")).toBeInTheDocument();
  });

  it("hides unsynced badge when isSynced is true", () => {
    render(<RecordsWidgetListItem {...baseProps} isSynced={true} />);
    expect(screen.queryByText("AddRecord.dataNotSynced")).toBeNull();
  });

  it("calls onClick when container is clicked", () => {
    render(<RecordsWidgetListItem {...baseProps} />);
    fireEvent.click(screen.getByText("Thunder"));
    expect(baseProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("always renders chevron icon with correct className", () => {
    render(<RecordsWidgetListItem {...baseProps} />);
    const chevron = screen.getByTestId("chevron");
    expect(chevron).toHaveClass(
      "opacity-0",
      "group-hover:opacity-100",
      "transition-opacity",
      "duration-200"
    );
  });
});
