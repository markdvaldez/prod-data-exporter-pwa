import { getDayISO, getShortMonthISO } from "@/runnersQcApp/shared/DateUtils";
import { getRecType } from "@/runnersQcApp/shared/TextUtils";
import { getFormattedId } from "@/utils/formatters";
import { useVirtualizer } from "@tanstack/react-virtual";
import { fireEvent, render, screen } from "@testing-library/react";
import { getThirdField } from "../../../RecentRecordsWidget/helpers";
import { RecordList } from "../../Components/RecordList";

jest.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
jest.mock("@tanstack/react-virtual", () => ({ useVirtualizer: jest.fn() }));
jest.mock("@/runnersQcApp/shared/DateUtils", () => ({
  getDayISO: jest.fn(),
  getShortMonthISO: jest.fn(),
}));
jest.mock("@/runnersQcApp/shared/TextUtils", () => ({ getRecType: jest.fn() }));
jest.mock("../../../RecentRecordsWidget/helpers", () => ({
  getThirdField: jest.fn(),
}));
jest.mock("@/utils/formatters", () => ({ getFormattedId: jest.fn() }));

jest.mock("@/ui-kit/components/HistoryListItem/HistoryListItemMobile", () => ({
  HistoryListItemMobile: ({
    horseName,
    horseId,
    day,
    month,
    thirdField,
    description,
    conditionTreated,
    isSynced,
    onClick,
  }: {
    horseName: string;
    horseId: string;
    day: string;
    month: string;
    thirdField: string;
    description: string;
    conditionTreated: string;
    isSynced: boolean;
    onClick: () => void;
  }) => (
    <div data-testid="history-item" onClick={onClick}>
      {horseName} {horseId} {day} {month} {thirdField} {description}{" "}
      {conditionTreated} {isSynced ? "synced" : ""}
    </div>
  ),
}));

describe("RecordList", () => {
  const onItemPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useVirtualizer as jest.Mock).mockReturnValue({
      getScrollElement: () => null,
      getVirtualItems: () => [{ index: 0, start: 0, key: "0" }],
      getTotalSize: () => 80,
    });
    (getDayISO as jest.Mock).mockReturnValue("01");
    (getShortMonthISO as jest.Mock).mockReturnValue("Jul");
    (getRecType as jest.Mock).mockReturnValue("Description");
    (getThirdField as jest.Mock).mockReturnValue("ThirdField");
    (getFormattedId as jest.Mock).mockReturnValue("H000000001");
  });

  it("renders a single record and handles click", () => {
    const records = [
      {
        internalId: "internalId",
        date: "2025-07-04",
        hisaHorseName: "Holy Horse",
        conditionTreated: "Condition",
        isSynced: true,
        hisaHorseId: "H000000000",
        hisaHorseMedicalId: "M000000000",
        recType: "Vaccine",
      },
    ];

    render(<RecordList records={records} onItemPress={onItemPress} />);

    const item = screen.getByTestId("history-item");
    expect(item).toHaveTextContent("Holy Horse");
    expect(item).toHaveTextContent("H000000001");
    expect(item).toHaveTextContent("01");
    expect(item).toHaveTextContent("Jul");
    expect(item).toHaveTextContent("ThirdField");
    expect(item).toHaveTextContent("Description");
    expect(item).toHaveTextContent("Condition");
    expect(item).toHaveTextContent("synced");

    fireEvent.click(item);
    expect(onItemPress).toHaveBeenCalledWith("M000000000");
  });

  it("renders empty state when no records", () => {
    (useVirtualizer as jest.Mock).mockReturnValue({
      getScrollElement: () => null,
      getVirtualItems: () => [],
      getTotalSize: () => 0,
    });

    render(<RecordList records={[]} onItemPress={onItemPress} />);
    expect(screen.getByText("noRecords")).toBeInTheDocument();
  });
});
