import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import {
  selectHorsesByPerson,
  selectIsSearching,
} from "@/services/store/modules/horses/selectors";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import * as redux from "react-redux";
import { RecentHorsesWidget } from "../RecentHorsesWidget";

jest.mock("next-intl", () => ({
  useTranslations: () => ((key: string) => key) as any,
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/routes", () => ({
  __esModule: true,
  default: {
    HORSES: "/horses",
    HORSE: (id: string) => `/horse/${id}`,
    SEARCH: "/search",
  },
}));

jest.mock("@/runnersQcApp/pages/MainPage/helpers", () => ({
  getFormattedId: (id: string) => `${id}`,
}));

jest.mock("@/ui-kit/components/HorseDetailsListItem", () => ({
  HorseDetailsListItem: ({ name, onClick, value }: any) => (
    <div data-testid="horse-item" onClick={() => onClick(value)}>
      {name}
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

jest.mock("@/ui-kit/components/Button", () => ({
  Button: ({ title, onClick }: any) => (
    <button data-testid="btn" onClick={onClick}>
      {title}
    </button>
  ),
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
    if (selector === selectHorsesByPerson) return [];
    if (selector === selectIsSearching) return false;
    if (selector === selectHisaPersonId) return "P000000000";
    return undefined;
  });
});

describe("RecentHorsesWidget", () => {
  it("renders skeletons when loading and no horses", () => {
    useSelectorMock.mockImplementation((selector: any) => {
      if (selector === selectHorsesByPerson) return [];
      if (selector === selectIsSearching) return true;
      if (selector === selectHisaPersonId) return "P000000000";
    });

    render(<RecentHorsesWidget />);
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThan(0);
  });

  it("renders no horses message when not loading and no horses", () => {
    render(<RecentHorsesWidget />);
    expect(screen.getByText("No horses yet")).toBeInTheDocument();

    const btn = screen.getByTestId("btn");
    expect(btn).toHaveTextContent("Start your search!");
    fireEvent.click(btn);
    expect(pushMock).toHaveBeenCalledWith("/search");
  });

  it("renders horse items when horses exist", () => {
    const horses = [
      {
        hisaHorseId: "H000000000",
        name: "Horse1",
        canRace: true,
        canWork: false,
        responsiblePersonName: "",
        locationName: "",
      },
      {
        hisaHorseId: "H000000001",
        name: "Horse2",
        canRace: false,
        canWork: true,
        responsiblePersonName: "",
        locationName: "",
      },
      {
        hisaHorseId: "H000000002",
        name: "Horse3",
        canRace: true,
        canWork: true,
        responsiblePersonName: "",
        locationName: "",
      },
      {
        hisaHorseId: "H000000003",
        name: "Horse4",
        canRace: false,
        canWork: false,
        responsiblePersonName: "",
        locationName: "",
      },
    ];
    useSelectorMock.mockImplementation((selector: any) => {
      if (selector === selectHorsesByPerson) return horses;
      if (selector === selectIsSearching) return false;
      if (selector === selectHisaPersonId) return "P000000000";
    });

    render(<RecentHorsesWidget />);
    const items = screen.getAllByTestId("horse-item");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Horse1");

    fireEvent.click(items[0]);
    expect(pushMock).toHaveBeenCalledWith("/horse/H000000000");

    expect(screen.getByTestId("card-header")).toHaveTextContent("recentHorses");
    const link = screen.getByText("myHorses");
    expect(link).toHaveAttribute("href", "/horses");
  });
});
