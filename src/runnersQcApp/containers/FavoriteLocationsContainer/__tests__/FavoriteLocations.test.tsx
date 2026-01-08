import { locationTypes } from "@/runnersQcApp/shared/types";
import { searchNearestLocations } from "@/services/store/modules/locations";
import { TLocation } from "@/services/store/modules/locations/types";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FavoriteLocations } from "../FavoriteLocations";

const dispatchMock = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: (fn: any) => fn(),
  useDispatch: () => dispatchMock,
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/hooks/useUserLocation", () => ({
  useUserLocation: () => ({
    getCurrentLocation: jest
      .fn()
      .mockResolvedValue({ position: "lat,long", error: null }),
  }),
}));

jest.mock("@/ui-kit/components/SearchInput", () => ({
  SearchInput: (props: any) => (
    <input
      data-testid="search-input"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  ),
}));
jest.mock("@/ui-kit/components/LocationIconButton/LocationIconButton", () => ({
  LocationIconButton: ({ onClick, isActive }: any) => (
    <button data-testid="loc-btn" onClick={onClick}>
      {isActive ? "active" : "inactive"}
    </button>
  ),
}));
jest.mock("@/ui-kit/components/Loader", () => ({
  Loader: () => <div data-testid="loader" />,
}));
jest.mock("@/ui-kit/blocks/MyCurrentLocationBlock", () => ({
  MyCurrentLocationBlock: ({ onSubmit }: any) => (
    <button data-testid="my-current-location" onClick={onSubmit} />
  ),
}));
jest.mock("@/ui-kit/blocks/InformationBlock", () => ({
  InformationBlock: ({ text }: any) => (
    <div data-testid="info-block">{text}</div>
  ),
}));
jest.mock("@/ui-kit/components/SearchLocationListItem", () => ({
  SearchLocationListItem: ({ value, onClick, onFavoriteClick }: any) => (
    <div
      data-testid="item"
      onClick={() => onClick(value)}
      onDoubleClick={() => onFavoriteClick(value)}
    >
      {`${value.locationName} (${value.locationId})`}
    </div>
  ),
}));

const mockSelectIsFetching = jest.fn();
const mockSelectLocationsList = jest.fn();
const mockSelectNearestLocations = jest.fn();
jest.mock("@/services/store/modules/locations/selectors", () => ({
  selectIsFetching: () => mockSelectIsFetching(),
  selectLocationsList: () => mockSelectLocationsList(),
  selectNearestLocations: () => mockSelectNearestLocations(),
}));

describe("FavoriteLocations", () => {
  const sampleLoc: TLocation = {
    locationId: "L00000001",
    locationName: "Loc",
    address: null,
    distance: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockSelectIsFetching.mockReturnValue(false);
    mockSelectLocationsList.mockReturnValue([]);
    mockSelectNearestLocations.mockReturnValue([]);
  });

  it("renders MyCurrentLocationBlock when nothing searched and no favorites", () => {
    render(
      <FavoriteLocations
        favorites={[]}
        itemStyles=""
        onFavoritesClick={jest.fn()}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByTestId("my-current-location")).toBeInTheDocument();
  });

  it("renders loader when fetching and no results", () => {
    mockSelectIsFetching.mockReturnValue(true);
    render(
      <FavoriteLocations
        favorites={[]}
        itemStyles=""
        onFavoritesClick={jest.fn()}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders 'not found' info when searched by name and no matches", async () => {
    render(
      <FavoriteLocations
        favorites={[]}
        itemStyles=""
        onFavoritesClick={jest.fn()}
        onChange={jest.fn()}
      />
    );
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "xyz" },
    });
    await waitFor(() =>
      expect(screen.getByTestId("info-block")).toHaveTextContent(
        "Location.notFound"
      )
    );
  });

  it("renders favorite items on initial render", () => {
    render(
      <FavoriteLocations
        favorites={[sampleLoc]}
        itemStyles=""
        onFavoritesClick={jest.fn()}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByTestId("item")).toHaveTextContent("Loc (L00000001)");
  });

  it("dispatches geolocation search on typing lat,long", async () => {
    render(
      <FavoriteLocations
        favorites={[]}
        itemStyles=""
        onFavoritesClick={jest.fn()}
        onChange={jest.fn()}
      />
    );
    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "1,2" },
    });
    await waitFor(() =>
      expect(dispatchMock).toHaveBeenCalledWith(
        searchNearestLocations({
          text: "",
          locationTypes,
          latLong: "1,2",
          distanceMeters: expect.any(Number),
        })
      )
    );
  });

  it("calls searchNearestLocations on LocationIconButton click", async () => {
    render(
      <FavoriteLocations
        favorites={[]}
        itemStyles=""
        onFavoritesClick={jest.fn()}
        onChange={jest.fn()}
      />
    );
    fireEvent.click(screen.getByTestId("loc-btn"));
    await waitFor(() =>
      expect(dispatchMock).toHaveBeenCalledWith(
        searchNearestLocations({
          text: "",
          locationTypes,
          latLong: expect.any(String),
          distanceMeters: expect.any(Number),
        })
      )
    );
  });

  it("calls onChange for item click", () => {
    const onChangeMock = jest.fn();
    render(
      <FavoriteLocations
        favorites={[sampleLoc]}
        itemStyles=""
        onFavoritesClick={jest.fn()}
        onChange={onChangeMock}
      />
    );
    fireEvent.click(screen.getByTestId("item"));
    expect(onChangeMock).toHaveBeenCalledWith(sampleLoc);
  });
});
