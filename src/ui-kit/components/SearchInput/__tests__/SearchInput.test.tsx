import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { SearchInput } from "../SearchInput";

jest.mock("../../Icons/SearchIcon", () => ({
  SearchIcon: () => <span data-testid="search-icon" />,
}));
jest.mock("../../Icons/ClearIcon", () => ({
  ClearIcon: () => <span data-testid="clear-icon" />,
}));
jest.mock("../ui/input", () => {
  const InputMock = React.forwardRef<HTMLInputElement, any>((props, ref) => (
    <input data-testid="input" {...props} ref={ref as any} />
  ));
  InputMock.displayName = "Input";
  return { Input: InputMock };
});

describe("SearchInput", () => {
  const placeholder = "Search here";
  let onChange: jest.Mock;
  let onClear: jest.Mock;
  const textInputRef = React.createRef<any>();

  beforeEach(() => {
    onChange = jest.fn();
    onClear = jest.fn();
  });

  it("renders placeholder and left icon by default", () => {
    render(
      <SearchInput placeholder={placeholder} value="" onChange={onChange} />
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("placeholder", placeholder);
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("hides SearchIcon when isLeftIcon=false", () => {
    render(
      <SearchInput
        placeholder={placeholder}
        value=""
        onChange={onChange}
        isLeftIcon={false}
      />
    );
    expect(screen.queryByTestId("search-icon")).toBeNull();
  });

  it("does not show ClearIcon when value is empty", () => {
    render(
      <SearchInput placeholder={placeholder} value="" onChange={onChange} />
    );
    expect(screen.queryByTestId("clear-icon")).toBeNull();
  });

  it("shows ClearIcon when value is non-empty", () => {
    render(
      <SearchInput placeholder={placeholder} value="foo" onChange={onChange} />
    );
    expect(screen.getByTestId("clear-icon")).toBeInTheDocument();
  });

  it("calls onChange when typing into the input", () => {
    render(
      <SearchInput placeholder={placeholder} value="" onChange={onChange} />
    );
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "a" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("calls onClear and clears+focuses the input when clicking ClearIcon", () => {
    render(
      <SearchInput
        placeholder={placeholder}
        value="abc"
        onChange={onChange}
        onClear={onClear}
        textInputRef={textInputRef}
      />
    );
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input.value).toBe("abc");

    fireEvent.click(screen.getByTestId("clear-icon"));

    expect(onClear).toHaveBeenCalledTimes(1);
    const evt = onChange.mock.calls[0][0];
    expect(evt.target.value).toBe("");
    expect(input.value).toBe("");
    expect(document.activeElement).toBe(input);
  });

  it("applies provided className and default paddings", () => {
    render(
      <SearchInput
        placeholder={placeholder}
        value=""
        onChange={onChange}
        className="custom-class"
      />
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("custom-class", "pl-10", "pr-7");
  });

  it("does not add left padding when isLeftIcon=false", () => {
    render(
      <SearchInput
        placeholder={placeholder}
        value=""
        onChange={onChange}
        className="foo"
        isLeftIcon={false}
      />
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveClass("foo", "pr-7");
    expect(input).not.toHaveClass("pl-10");
  });
});
