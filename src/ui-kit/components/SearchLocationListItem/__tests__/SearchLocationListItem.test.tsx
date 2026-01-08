import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { SearchLocationListItem } from "../SearchLocationListItem";

jest.mock("../../HighlightText", () => ({
  HighlightText: ({ text }: any) => (
    <span data-testid="highlight-text">{text}</span>
  ),
}));

jest.mock("../../FavoriteButton", () => ({
  FavoriteButton: ({ isActive, onClick }: any) => (
    <button data-testid="fav-btn" data-active={isActive} onClick={onClick}>
      Fav
    </button>
  ),
}));

describe("SearchLocationListItem", () => {
  const sampleValue = { id: "loc1" };
  const sampleLabel = "Location One";
  const sampleAddress = "123 Main St";
  const sampleDistance = "5";

  it("renders label and address via HighlightText", () => {
    render(
      <SearchLocationListItem
        label={sampleLabel}
        value={sampleValue}
        address={sampleAddress}
        searchText=""
      />
    );
    const highlights = screen.getAllByTestId("highlight-text");
    expect(highlights[0]).toHaveTextContent(sampleLabel);
    expect(highlights[1]).toHaveTextContent(sampleAddress);
  });

  it("renders both mobile and desktop distance when showDistance is true", () => {
    render(
      <SearchLocationListItem
        label={sampleLabel}
        value={sampleValue}
        showDistance
        distance={sampleDistance}
      />
    );
    const distances = screen.getAllByText(`${sampleDistance} mi`);
    expect(distances).toHaveLength(2);
  });

  it("applies itemStyles to the outer container", () => {
    const customStyle = "my-custom-style";
    render(
      <SearchLocationListItem
        label={sampleLabel}
        value={sampleValue}
        itemStyles={customStyle}
      />
    );
    const inner = screen.getByText(sampleLabel).closest("div")!;
    const outer = inner.parentElement!;
    expect(outer).toHaveClass(customStyle);
  });

  it("calls onClick with value when container is clicked", () => {
    const onClick = jest.fn();
    render(
      <SearchLocationListItem
        label={sampleLabel}
        value={sampleValue}
        onClick={onClick}
      />
    );
    const inner = screen.getByText(sampleLabel).closest("div")!;
    const outer = inner.parentElement!;
    fireEvent.click(outer);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(sampleValue);
  });

  it("calls onFavoriteClick when favorite button clicked", () => {
    const onFav = jest.fn();
    render(
      <SearchLocationListItem
        label={sampleLabel}
        value={sampleValue}
        isFavorite
        onFavoriteClick={onFav}
      />
    );
    const btn = screen.getByTestId("fav-btn");
    fireEvent.click(btn);
    expect(onFav).toHaveBeenCalledTimes(1);
    expect(onFav).toHaveBeenCalledWith(sampleValue);
  });

  it("does not render FavoriteButton when isState or isAddress is true", () => {
    const { rerender } = render(
      <SearchLocationListItem label={sampleLabel} value={sampleValue} isState />
    );
    expect(screen.queryByTestId("fav-btn")).toBeNull();

    rerender(
      <SearchLocationListItem
        label={sampleLabel}
        value={sampleValue}
        isAddress
      />
    );
    expect(screen.queryByTestId("fav-btn")).toBeNull();
  });
});
