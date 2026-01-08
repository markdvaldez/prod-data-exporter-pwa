import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { SearchInputSecondary } from "../SearchInputSecondary";

jest.mock("../ui/input", () => {
  const InputMock = React.forwardRef<HTMLInputElement, any>((props, ref) => (
    <input data-testid="input" {...props} ref={ref as any} />
  ));
  InputMock.displayName = "Input";
  return { Input: InputMock };
});
jest.mock("lucide-react", () => ({
  Search: (props: any) => <span data-testid="search-icon" {...props} />,
}));
jest.mock("../../Icons/CloseIcon16", () => ({
  CloseIcon16: () => <span data-testid="close-icon" />,
}));

describe("SearchInputSecondary", () => {
  const placeholder = "Search here";
  let onChange: jest.Mock;

  beforeEach(() => {
    onChange = jest.fn();
  });

  it("renders placeholder and left icon by default", () => {
    render(
      <SearchInputSecondary
        placeholder={placeholder}
        value=""
        onChange={onChange}
      />
    );
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("placeholder", placeholder);
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    expect(input).toHaveClass("pl-10");
    expect(input).toHaveClass("pr-7");
  });

  it("hides search icon when isLeftIcon=false", () => {
    render(
      <SearchInputSecondary
        placeholder={placeholder}
        value=""
        onChange={onChange}
        isLeftIcon={false}
      />
    );
    expect(screen.queryByTestId("search-icon")).toBeNull();
    const input = screen.getByTestId("input");
    expect(input).not.toHaveClass("pl-10");
    expect(input).toHaveClass("pr-7");
  });

  it("calls onChange when typing into the input", () => {
    render(
      <SearchInputSecondary
        placeholder={placeholder}
        value=""
        onChange={onChange}
      />
    );
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("clears and focuses the input when clicking clear icon", () => {
    render(
      <SearchInputSecondary
        placeholder={placeholder}
        value="foo"
        onChange={onChange}
      />
    );
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input.value).toBe("foo");

    fireEvent.click(screen.getByTestId("close-icon"));

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: "" } })
    );
    expect(input.value).toBe("");
    expect(document.activeElement).toBe(input);
  });
});
