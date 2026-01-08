import { useFavorites } from "@/ui-kit/hooks/useFavorites";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { noop } from "lodash";
import { FavoriteLocations } from "../FavoriteLocations";
import { FavoriteLocationsWrapper } from "../FavoriteLocationsWrapper";

jest.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
jest.mock("@/ui-kit/hooks/useInternetConnection", () => ({
  useInternetConnection: jest.fn(),
}));
jest.mock("@/ui-kit/hooks/useFavorites", () => ({
  useFavorites: jest.fn(),
}));
jest.mock("@/ui-kit/components/BackButton", () => ({
  BackButton: ({ styles }: any) => (
    <div data-testid="back-button" data-styles={styles} />
  ),
}));
jest.mock("../FavoriteLocations", () => ({
  FavoriteLocations: jest.fn(() => <div data-testid="favorite-locations" />),
}));

describe("FavoriteLocationsWrapper", () => {
  const isConnectedMock = useInternetConnection as jest.MockedFunction<
    typeof useInternetConnection
  >;
  const useFavoritesMock = useFavorites as jest.MockedFunction<
    typeof useFavorites
  >;
  const favLocMock = FavoriteLocations as jest.MockedFunction<
    typeof FavoriteLocations
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and BackButton with pt-2 when online", () => {
    isConnectedMock.mockReturnValue(true);
    const toggleMock = jest.fn();
    const mockFavs = [
      { locationId: "L000000001", locationName: "Loc1" },
    ] as any;
    useFavoritesMock.mockReturnValue({
      favorites: mockFavs,
      toggleFavorite: toggleMock,
    });

    render(<FavoriteLocationsWrapper onChange={jest.fn()} />);

    expect(screen.getByText("Location.favoriteLocations")).toBeInTheDocument();
    expect(screen.getByTestId("back-button")).toHaveAttribute(
      "data-styles",
      "pt-2"
    );
    expect(screen.getByTestId("favorite-locations")).toBeInTheDocument();
  });

  it("passes favorites and toggleFavorite to FavoriteLocations", () => {
    isConnectedMock.mockReturnValue(true);
    const toggleMock = jest.fn();
    const favs = [
      { locationId: "L000000001", locationName: "Loc1" },
      { locationId: "L000000002", locationName: "Loc2" },
    ] as any;
    useFavoritesMock.mockReturnValue({
      favorites: favs,
      toggleFavorite: toggleMock,
    });

    render(<FavoriteLocationsWrapper />);

    expect(favLocMock).toHaveBeenCalledWith(
      expect.objectContaining({
        itemStyles: "hover:bg-w0 hover:cursor-default",
        favorites: favs,
        onChange: noop,
        onFavoritesClick: toggleMock,
      }),
      undefined
    );
  });

  it("renders BackButton with pt-7 sm:pt-2 when offline", () => {
    isConnectedMock.mockReturnValue(false);
    useFavoritesMock.mockReturnValue({
      favorites: [],
      toggleFavorite: jest.fn(),
    });

    render(<FavoriteLocationsWrapper />);

    expect(screen.getByTestId("back-button")).toHaveAttribute(
      "data-styles",
      "pt-7 sm:pt-2"
    );
  });
});
