import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecordFilters } from "../../Components/RecordFilters";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/ui-kit/components/SearchInput", () => ({
  SearchInput: (props: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
  }) => (
    <input
      data-testid="SearchInput"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  ),
}));
jest.mock("../../Components/FiltersSheet", () => ({
  FiltersSheet: (props: { open: boolean; onClose: () => void }) =>
    props.open ? <div data-testid="FiltersSheet" /> : null,
}));

describe("RecordFilters component", () => {
  const setSearchQuery = jest.fn();
  const setOpenSheet = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("renders input and filter button", () => {
    render(
      <RecordFilters
        searchQuery="foo"
        setSearchQuery={setSearchQuery}
        filterCount={3}
        openSheet={false}
        setOpenSheet={setOpenSheet}
      />
    );
    expect(screen.getByTestId("SearchInput")).toHaveValue("foo");
    expect(screen.getByText("filters • 3")).toBeInTheDocument();
  });

  it("calls setSearchQuery on input change", () => {
    render(
      <RecordFilters
        searchQuery=""
        setSearchQuery={setSearchQuery}
        filterCount={0}
        openSheet={false}
        setOpenSheet={setOpenSheet}
      />
    );
    fireEvent.change(screen.getByTestId("SearchInput"), {
      target: { value: "bar" },
    });
    expect(setSearchQuery).toHaveBeenCalledWith("bar");
  });

  it("toggles the FiltersSheet visibility", () => {
    render(
      <RecordFilters
        searchQuery=""
        setSearchQuery={setSearchQuery}
        filterCount={0}
        openSheet={false}
        setOpenSheet={setOpenSheet}
      />
    );
    fireEvent.click(screen.getByText("filters"));
    expect(setOpenSheet).toHaveBeenCalledWith(true);
  });

  it("renders FiltersSheet when open=true", () => {
    render(
      <RecordFilters
        searchQuery=""
        setSearchQuery={setSearchQuery}
        filterCount={0}
        openSheet={true}
        setOpenSheet={setOpenSheet}
      />
    );
    expect(screen.getByTestId("FiltersSheet")).toBeInTheDocument();
  });
});
