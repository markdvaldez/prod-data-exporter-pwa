import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import { selectHorseMedical } from "@/services/store/modules/horseMedical/selectors";
import { selectIsSearching } from "@/services/store/modules/horses/selectors";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import * as redux from "react-redux";
import { RecentRecordsWidget } from "../RecentRecordsWidget";

const records = [
  {
    internalId: "I1",
    hisaHorseMedicalId: "M000000000",
    hisaHorseId: "H000000000",
    hisaHorseName: "HorseA",
    date: "2025-07-01",
    conditionTreated: "Cond",
    isSynced: true,
    drugName: "Drug",
    recType: "test",
    treatingHisaPersonId: "P000000000",
    createdBy: "",
    updatedBy: "",
  },
  {
    internalId: "I2",
    hisaHorseMedicalId: "M000000001",
    hisaHorseId: "H000000001",
    hisaHorseName: "HorseB",
    date: "2025-07-02",
    conditionTreated: "",
    isSynced: false,
    drugName: "",
    recType: "",
    treatingHisaPersonId: "",
    createdBy: "P000000000",
    updatedBy: "",
  },
  {
    internalId: "I3",
    hisaHorseMedicalId: "M000000002",
    hisaHorseId: "H000000002",
    hisaHorseName: "HorseC",
    date: "2025-07-03",
    conditionTreated: "",
    isSynced: false,
    drugName: "",
    recType: "",
    treatingHisaPersonId: "",
    createdBy: "",
    updatedBy: "P000000000",
  },
  {
    internalId: "I4",
    hisaHorseMedicalId: "M000000003",
    hisaHorseId: "H000000003",
    hisaHorseName: "HorseD",
    date: "2025-07-04",
    conditionTreated: "",
    isSynced: false,
    drugName: "",
    recType: "",
    treatingHisaPersonId: "",
    createdBy: "",
    updatedBy: "",
  },
];

jest.mock("next-intl", () => ({
  useTranslations: () => ((key: string) => key) as any,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/routes", () => ({
  __esModule: true,
  default: {
    RECENT_RECORDS: "/records",
    RECORD_DETAIL: (id: string) => `/record/${id}`,
  },
}));

jest.mock("@/runnersQcApp/pages/MainPage/helpers", () => ({
  getFormattedId: (id: string) => `fmt-${id}`,
}));

jest.mock("@/runnersQcApp/shared/DateUtils", () => ({
  getDayISO: () => "01",
  getShortMonthISO: () => "Jun",
}));

jest.mock("../helpers", () => ({
  FORM_FIELDS: { test: { label: "Test Field" } },
  getThirdField: () => "third",
}));

jest.mock("@/ui-kit/components/RecordsWidgetListItem", () => ({
  RecordsWidgetListItem: ({ horseName, id, onClick }: any) => (
    <div data-testid="record-item" data-id={id} onClick={() => onClick()}>
      {horseName}
    </div>
  ),
}));

jest.mock("@/ui-kit/components/Card", () => ({
  Card: ({ children }: any) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }: any) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
}));

jest.mock("@/ui-kit/components/Skeleton", () => ({
  Skeleton: () => <div data-testid="skeleton" />,
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));
const useSelectorMock = redux.useSelector as unknown as jest.Mock;

const pushMock = jest.fn();
beforeAll(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
});

beforeEach(() => {
  jest.clearAllMocks();
  useSelectorMock.mockImplementation((selector: any) => {
    if (selector === selectHorseMedical) return [];
    if (selector === selectIsSearching) return false;
    if (selector === selectHisaPersonId) return "P000000000";
    return undefined;
  });
});

describe("RecentRecordsWidget", () => {
  it("renders skeletons when loading and no records", () => {
    useSelectorMock.mockImplementation((selector: any) => {
      if (selector === selectHorseMedical) return [];
      if (selector === selectIsSearching) return true;
      if (selector === selectHisaPersonId) return "P000000000";
    });
    render(<RecentRecordsWidget />);
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });

  it("renders no records message when not loading and no records", () => {
    render(<RecentRecordsWidget />);
    expect(screen.getByText("No Records")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toHaveTextContent(
      "recentRecords"
    );
  });

  it("renders record items when records exist", () => {
    useSelectorMock.mockImplementation((selector: any) => {
      if (selector === selectHorseMedical) return records;
      if (selector === selectIsSearching) return false;
      if (selector === selectHisaPersonId) return "P000000000";
    });
    render(<RecentRecordsWidget />);

    const items = screen.getAllByTestId("record-item");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("HorseA");

    fireEvent.click(items[0]);
    expect(pushMock).toHaveBeenCalledWith("/record/M000000000");

    expect(screen.getByTestId("card-header")).toHaveTextContent(
      "recentRecords"
    );
    const seeAllLink = screen.getByText("seeAll") as HTMLAnchorElement;
    expect(seeAllLink).toHaveAttribute("href", "/records");
  });
});
