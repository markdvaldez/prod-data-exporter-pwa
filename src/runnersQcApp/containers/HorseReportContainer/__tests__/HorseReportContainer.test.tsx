import * as authSel from "@/services/store/modules/auth/selectors";
import * as historySel from "@/services/store/modules/history/selectors";
import * as medicalSel from "@/services/store/modules/horseMedical/selectors";
import * as horseSel from "@/services/store/modules/horses/selectors";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { HorseReportContainer } from "@/runnersQcApp/containers/HorseReportContainer/HorseReportContainer";
import { mockRecordsData } from "../../../../../__mocks__/records";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: (selector: () => any) => selector(),
  useDispatch: () => mockDispatch,
}));

jest.mock("@/hooks/useAuthUser", () => ({
  useUserPermissions: () => ({ permissions: { generalAuthGroups: [] } }),
}));
jest.mock("@/services/api/modules/horses/searchHorses", () => ({
  useSearchHorses: () => ({ data: [], isFetching: false }),
}));
jest.mock("@/ui-kit/hooks/useInternetConnection", () => ({
  useInternetConnection: () => true,
}));
jest.mock("@/ui-kit/hooks/useMobile", () => ({
  useIsMobile: jest.fn(),
}));

jest.mock("@/services/store/modules/auth/selectors", () => ({
  selectHisaPersonId: jest.fn(),
}));
jest.mock("@/services/store/modules/horses/selectors", () => ({
  selectHorsesByPerson: jest.fn(),
  selectSearchHorsesResult: jest.fn(),
  selectIsFetching: jest.fn(),
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

jest.mock(
  "@/runnersQcApp/containers/HorseReportContainer/Components/HeaderSection",
  () => ({ HeaderSection: () => <div data-testid="HeaderSection" /> })
);
jest.mock(
  "@/runnersQcApp/containers/HorseReportContainer/Components/RecordFilters",
  () => ({ RecordFilters: () => <div data-testid="RecordFilters" /> })
);
jest.mock(
  "@/runnersQcApp/containers/HorseReportContainer/Components/RecordList",
  () => ({
    RecordList: (props: {
      records: any[];
      onItemPress: (id: string) => void;
    }) => (
      <button
        data-testid="RecordList"
        onClick={() => props.onItemPress(props.records[0].hisaHorseMedicalId)}
      >
        List {props.records.length}
      </button>
    ),
  })
);
jest.mock(
  "@/runnersQcApp/containers/HorseReportContainer/Components/RecordTable",
  () => ({
    RecordTable: (props: {
      records: any[];
      onItemPress: (id: string) => void;
      handleSort: (column: string) => void;
    }) => (
      <>
        <button
          data-testid="RecordTable-Row"
          onClick={() => props.onItemPress(props.records[0].hisaHorseMedicalId)}
        >
          Row {props.records.length}
        </button>
        <button
          data-testid="RecordTable-Sort"
          onClick={() => props.handleSort("date")}
        >
          Sort
        </button>
      </>
    ),
  })
);
jest.mock("@/ui-kit/blocks/NotFoundPage", () => ({
  NotFoundPage: () => <div data-testid="NotFoundPage" />,
}));
jest.mock("@/ui-kit/components/Loader", () => ({
  Loader: () => <div data-testid="Loader" />,
}));
jest.mock("@/ui-kit/components/RouteWithTransition", () => ({
  RouteWithTransition: (props: { children: React.ReactNode }) => (
    <div>{props.children}</div>
  ),
}));
jest.mock("@/ui-kit/components/BackButton", () => ({
  BackButton: () => <div data-testid="BackButton" />,
}));

const firstHorseId = mockRecordsData[0].hisaHorseId;
const expectedCount = mockRecordsData.filter(
  (r) => r.hisaHorseId === firstHorseId
).length;

beforeEach(() => {
  (
    authSel.selectHisaPersonId as jest.MockedFunction<
      typeof authSel.selectHisaPersonId
    >
  ).mockReturnValue("P000000001");
  (
    horseSel.selectHorsesByPerson as jest.MockedFunction<
      typeof horseSel.selectHorsesByPerson
    >
  ).mockReturnValue([
    {
      ...mockRecordsData[0],
      name: "",
      damName: "",
      ownerHisaId: "",
      ownerName: "",
      responsiblePersonHisaId: "P000000001",
      responsiblePersonName: "",
      locationId: "",
      locationName: "",
      attendingVet: [],
      attendingVetName: [],
      canRace: false,
      canRaceReason: "",
      canWork: false,
      canWorkReason: "",
      yearOfBirth: undefined,
      lastUpdate: "",
    },
  ]);
  (
    horseSel.selectSearchHorsesResult as jest.MockedFunction<
      typeof horseSel.selectSearchHorsesResult
    >
  ).mockReturnValue([]);
  (
    horseSel.selectIsFetching as jest.MockedFunction<
      typeof horseSel.selectIsFetching
    >
  ).mockReturnValue(false);

  (
    historySel.selectHistoryDateFrom as jest.MockedFunction<
      typeof historySel.selectHistoryDateFrom
    >
  ).mockReturnValue("2024-01-01");
  (
    historySel.selectHistoryDateTo as jest.MockedFunction<
      typeof historySel.selectHistoryDateTo
    >
  ).mockReturnValue("2025-12-31");
  (
    historySel.selectHistoryRecTypes as jest.MockedFunction<
      typeof historySel.selectHistoryRecTypes
    >
  ).mockReturnValue([]);
  (
    historySel.selectHistoryKeepFilters as jest.MockedFunction<
      typeof historySel.selectHistoryKeepFilters
    >
  ).mockReturnValue(false);

  (
    medicalSel.selectHorseMedical as jest.MockedFunction<
      typeof medicalSel.selectHorseMedical
    >
  ).mockReturnValue(mockRecordsData);
  (
    medicalSel.selectIsSyncing as jest.MockedFunction<
      typeof medicalSel.selectIsSyncing
    >
  ).mockReturnValue(false);

  (useIsMobile as jest.MockedFunction<typeof useIsMobile>).mockReturnValue(
    true
  );
});

describe("HorseReportContainer", () => {
  it("renders NotFoundPage when no horse is found", () => {
    (
      horseSel.selectHorsesByPerson as jest.MockedFunction<
        typeof horseSel.selectHorsesByPerson
      >
    ).mockReturnValueOnce([]);
    render(<HorseReportContainer id="UNKNOWN" />);
    expect(screen.getByTestId("NotFoundPage")).toBeInTheDocument();
  });

  it("renders Loader when syncing", () => {
    (
      medicalSel.selectIsSyncing as jest.MockedFunction<
        typeof medicalSel.selectIsSyncing
      >
    ).mockReturnValueOnce(true);
    render(<HorseReportContainer id={firstHorseId} />);
    expect(screen.getByTestId("Loader")).toBeInTheDocument();
  });

  it("renders RecordList in mobile mode and responds to click", () => {
    render(<HorseReportContainer id={firstHorseId} />);
    expect(screen.getByTestId("RecordList")).toHaveTextContent(
      `List ${expectedCount}`
    );
    fireEvent.click(screen.getByTestId("RecordList"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalled();
  });

  it("renders RecordTable in desktop mode and handles sort & row click", () => {
    (useIsMobile as jest.MockedFunction<typeof useIsMobile>).mockReturnValue(
      false
    );
    render(<HorseReportContainer id={firstHorseId} />);
    expect(screen.getByTestId("RecordTable-Row")).toHaveTextContent(
      `Row ${expectedCount}`
    );
    fireEvent.click(screen.getByTestId("RecordTable-Row"));
    expect(mockDispatch).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId("RecordTable-Sort"));
  });
});
