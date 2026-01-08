import { useSearchHorsesQuery } from "@/services/api/modules/horses/fetchHorses";
import * as authSel from "@/services/store/modules/auth/selectors";
import * as horseActs from "@/services/store/modules/horses";
import * as horseSel from "@/services/store/modules/horses/selectors";
import { toast } from "@/ui-kit/hooks/useToast";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearchHorseContainer } from "../SearchHorseContainer";

const dispatchMock = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => dispatchMock,
  useSelector: (fn: any) => fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("@/ui-kit/hooks/useInternetConnection", () => ({
  useInternetConnection: () => true,
}));

jest.mock("@/hooks/useDebounce", () => ({
  useDebounce: (v: string) => v,
}));

jest.mock("@/ui-kit/hooks/useToast", () => ({
  toast: jest.fn(),
}));

jest.mock("@/services/api/modules/horses/fetchHorses", () => ({
  useSearchHorsesQuery: jest.fn(),
}));
const mockUseSearchHorsesQuery = useSearchHorsesQuery as jest.MockedFunction<
  typeof useSearchHorsesQuery
>;

jest.mock("@/services/store/modules/auth/selectors");
jest.mock("@/services/store/modules/horses/selectors");
jest.mock("@/services/store/modules/horses");

const mockSelectHisaPersonId =
  authSel.selectHisaPersonId as jest.MockedFunction<
    typeof authSel.selectHisaPersonId
  >;
const mockSelectHorsesByPerson =
  horseSel.selectHorsesByPerson as jest.MockedFunction<
    typeof horseSel.selectHorsesByPerson
  >;
const mockSelectSearchHorsesResult =
  horseSel.selectSearchHorsesResult as jest.MockedFunction<
    typeof horseSel.selectSearchHorsesResult
  >;
const mockSelectIsSearching = horseSel.selectIsSearching as jest.MockedFunction<
  typeof horseSel.selectIsSearching
>;
const mockSelectError = horseSel.selectError as jest.MockedFunction<
  typeof horseSel.selectError
>;

jest.mock("@/ui-kit/blocks/InformationBlock", () => ({
  InformationBlock: ({ text }: any) => <div data-testid="Info">{text}</div>,
}));
jest.mock("@/ui-kit/components/Loader", () => ({
  Loader: () => <div data-testid="Loader" />,
}));
jest.mock("@/ui-kit/components/SearchInput", () => ({
  SearchInput: (p: any) => <input data-testid="SearchInput" {...p} />,
}));
jest.mock("@/ui-kit/components/HorseListItem", () => ({
  HorseListItem: (props: any) => (
    <div
      data-testid={`HorseItem-${props.hisaHorseId}`}
      onClick={() => props.onItemPress(props.hisaHorseId)}
    >
      {props.title || props.hisaHorseId}
    </div>
  ),
}));

describe("SearchHorseContainer", () => {
  const myHorse = { hisaHorseId: "H000000010", name: "Bucephalus" };
  const apiHorse = { hisaHorseId: "H000000011", name: "Apollo" };

  beforeEach(() => {
    jest.clearAllMocks();

    mockSelectHisaPersonId.mockReturnValue("P000000001");
    mockSelectHorsesByPerson.mockReturnValue([myHorse] as any);
    mockSelectSearchHorsesResult.mockReturnValue([] as any);
    mockSelectIsSearching.mockReturnValue(false);
    mockSelectError.mockReturnValue(undefined);

    mockUseSearchHorsesQuery.mockReturnValue({
      data: [],
      isFetching: false,
    } as any);
  });

  it("dispatches getPersonHorses on mount", () => {
    render(<SearchHorseContainer />);
    expect(horseActs.getPersonHorses).toHaveBeenCalledWith({
      personId: "P000000001",
    });
  });

  it("renders startSearch when no horses at all", () => {
    mockSelectHorsesByPerson.mockReturnValue([] as any);
    render(<SearchHorseContainer />);
    expect(screen.getByTestId("Info")).toHaveTextContent("startSearch");
  });

  it("renders my horses list on desktop initially", () => {
    render(<SearchHorseContainer />);
    expect(
      screen.getByTestId(`HorseItem-${myHorse.hisaHorseId}`)
    ).toBeInTheDocument();
  });

  it("shows horsesNotFound when typing and no API results", () => {
    render(<SearchHorseContainer />);
    fireEvent.change(screen.getByTestId("SearchInput"), {
      target: { value: "Buce" },
    });
    expect(screen.getByTestId("Info")).toHaveTextContent("horsesNotFound");
  });

  it("dispatches updateSearchHorseResults when API returns data", async () => {
    mockUseSearchHorsesQuery.mockReturnValue({
      data: [apiHorse],
      isFetching: false,
    } as any);

    render(<SearchHorseContainer />);
    fireEvent.change(screen.getByTestId("SearchInput"), {
      target: { value: "Ap" },
    });

    await waitFor(() => {
      expect(horseActs.updateSearchHorseResults).toHaveBeenCalledWith({
        horses: expect.arrayContaining([
          expect.objectContaining({
            hisaHorseId: apiHorse.hisaHorseId,
            name: apiHorse.name,
          }),
        ]),
      });
    });
  });

  it("navigates on item click", () => {
    render(<SearchHorseContainer />);
    fireEvent.click(screen.getByTestId(`HorseItem-${myHorse.hisaHorseId}`));
    expect(pushMock).toHaveBeenCalledWith(
      expect.stringContaining(myHorse.hisaHorseId)
    );
  });

  it("toasts on error", () => {
    mockSelectError.mockReturnValue({ name: "Err" } as any);
    render(<SearchHorseContainer />);
    expect(toast).toHaveBeenCalledWith({
      title: "Err",
      variant: "destructive",
    });
  });
});
