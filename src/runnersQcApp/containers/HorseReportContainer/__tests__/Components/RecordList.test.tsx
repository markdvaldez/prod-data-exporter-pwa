import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecordList } from "../../Components/RecordList";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: () => ({
    getTotalSize: () => 1,
    getVirtualItems: () => [{ index: 0, start: 0, size: 1, key: 0 }],
  }),
}));

describe("RecordList component", () => {
  const records = [
    {
      hisaHorseMedicalId: "M000000001",
      internalId: "I000000001",
      date: "2025-07-01",
      conditionTreated: "Condition",
      isSynced: false,
      recType: "Vaccine",
    },
  ];
  const onItemPress = jest.fn();

  it("renders list items", () => {
    render(<RecordList records={records as any} onItemPress={onItemPress} />);
    expect(screen.getByText("M-000-000-001")).toBeInTheDocument();
  });

  it("calls onItemPress when item clicked", () => {
    render(<RecordList records={records as any} onItemPress={onItemPress} />);
    fireEvent.click(screen.getByText("M-000-000-001"));
    expect(onItemPress).toHaveBeenCalledWith("M000000001");
  });

  it("displays noRecords when the list is empty", () => {
    render(<RecordList records={[]} onItemPress={onItemPress} />);
    expect(screen.getByText("noRecords")).toBeInTheDocument();
  });
});
