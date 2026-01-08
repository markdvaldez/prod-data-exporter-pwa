import * as histAct from "@/services/store/modules/history";
import * as histSel from "@/services/store/modules/history/selectors";
import * as medAct from "@/services/store/modules/horseMedical";
import * as medSel from "@/services/store/modules/horseMedical/selectors";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { HistoryContainer } from "../HistoryContainer";

jest.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
jest.mock("@/ui-kit/hooks/useInternetConnection", () => ({
  useInternetConnection: jest.fn(),
}));
jest.mock("@/ui-kit/hooks/useMobile", () => ({ useIsMobile: jest.fn() }));
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: pushMock }) }));
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: (selector: () => any) => selector(),
  useDispatch: () => mockDispatch,
}));

jest.mock("@/services/store/modules/auth/selectors", () => ({
  selectHisaPersonId: jest.fn(),
}));
jest.mock("@/services/store/modules/history/selectors", () => ({
  selectHistoryDateFrom: jest.fn(),
  selectHistoryDateTo: jest.fn(),
  selectHistoryRecTypes: jest.fn(),
  selectHistoryKeepFilters: jest.fn(),
}));
jest.mock("@/services/store/modules/horseMedical/selectors", () => ({
  selectHorseMedical: jest.fn(),
  selectIsSyncing: jest.fn(),
}));
jest.mock("@/services/store/modules/history", () => ({
  clearKeepFilters: jest.fn(() => ({ type: "CLEAR" })),
  resetFilters: jest.fn(() => ({ type: "RESET" })),
  setKeepFilters: jest.fn(() => ({ type: "SET" })),
}));
jest.mock("@/services/store/modules/horseMedical", () => ({
  syncHorseMedical: jest.fn(() => ({ type: "SYNC" })),
}));

jest.mock("@/ui-kit/components/RouteWithTransition", () => ({
  RouteWithTransition: ({ children }: any) => <>{children}</>,
}));
jest.mock("@/ui-kit/components/BackButton", () => ({
  BackButton: () => <div data-testid="BackButton" />,
}));
jest.mock("@/ui-kit/components/SearchInput", () => ({
  SearchInput: (props: any) => <input data-testid="SearchInput" {...props} />,
}));
jest.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));
jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: () => ({ getTotalSize: () => 0, getVirtualItems: () => [] }),
}));
jest.mock("../Components/FiltersSheet", () => ({
  FiltersSheet: ({ open, onClose }: any) => (
    <div
      data-testid={open ? "FiltersSheetOpen" : "FiltersSheetClosed"}
      onClick={onClose}
    />
  ),
}));
jest.mock("../Components/RecordList", () => ({
  RecordList: ({ records }: any) => (
    <div data-testid="RecordList">{records.length}</div>
  ),
}));
jest.mock("@/ui-kit/components/DataTable", () => ({
  DataTable: ({ data }: any) => (
    <div data-testid="DataTable">{data.length}</div>
  ),
}));
jest.mock("@/ui-kit/components/Loader", () => ({
  Loader: () => <div data-testid="Loader" />,
}));

describe("HistoryContainer", () => {
  const sampleRecord = {
    date: "2025-07-02",
    time: "12:00:00",
    hisaHorseId: "H000000001",
    hisaHorseMedicalId: "M000000001",
    treatingHisaPersonId: "P000000001",
    createdBy: "",
    updatedBy: "",
    locationName: "Farm",
    recType: "Vaccine",
  };

  beforeEach(() => {
    jest.resetAllMocks();
    (useIsMobile as jest.Mock).mockReturnValue(false);
    (histSel.selectHistoryKeepFilters as jest.Mock).mockReturnValue(false);
    (histSel.selectHistoryDateFrom as jest.Mock).mockReturnValue("2024-07-09");
    (histSel.selectHistoryDateTo as jest.Mock).mockReturnValue("2025-07-09");
    (histSel.selectHistoryRecTypes as jest.Mock).mockReturnValue([]);
    (medSel.selectHorseMedical as jest.Mock).mockReturnValue([]);
    (medSel.selectIsSyncing as jest.Mock).mockReturnValue(false);
  });

  it("dispatches sync and reset on mount when no keepFilters", () => {
    render(<HistoryContainer />);
    expect(medAct.syncHorseMedical).toHaveBeenCalled();
    expect(histAct.resetFilters).toHaveBeenCalled();
  });

  it("renders DataTable on desktop with one record", () => {
    (medSel.selectHorseMedical as jest.Mock).mockReturnValue([sampleRecord]);
    render(<HistoryContainer />);
    expect(screen.getByTestId("DataTable")).toHaveTextContent("0");
  });

  it("renders Loader when syncing and no records", () => {
    (medSel.selectHorseMedical as jest.Mock).mockReturnValue([]);
    (medSel.selectIsSyncing as jest.Mock).mockReturnValue(true);
    render(<HistoryContainer />);
    expect(screen.getByTestId("Loader")).toBeInTheDocument();
  });

  it("renders RecordList on mobile with one record", () => {
    (useIsMobile as jest.Mock).mockReturnValue(true);
    (medSel.selectHorseMedical as jest.Mock).mockReturnValue([sampleRecord]);
    render(<HistoryContainer />);
    expect(screen.getByTestId("RecordList")).toHaveTextContent("0");
  });

  it("toggles FiltersSheet open and closed", () => {
    render(<HistoryContainer />);
    expect(screen.getByTestId("FiltersSheetClosed")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("FiltersSheetClosed"));
    expect(screen.getByTestId("FiltersSheetOpen")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("FiltersSheetOpen"));
    expect(screen.getByTestId("FiltersSheetClosed")).toBeInTheDocument();
  });

  it("dispatches clear when keepFilters=true", () => {
    (histSel.selectHistoryKeepFilters as jest.Mock).mockReturnValue(true);
    render(<HistoryContainer />);
    expect(histAct.clearKeepFilters).toHaveBeenCalled();
  });
});
