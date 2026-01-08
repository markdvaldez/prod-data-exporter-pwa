import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import CheckBoxItem from "../CheckBoxItem";

jest.mock("../../Checkbox", () => {
  return {
    Checkbox: ({ checked, onCheckedChange }: any) => (
      <input
        type="checkbox"
        data-testid="checkbox"
        checked={checked}
        onChange={() => onCheckedChange(!checked)}
      />
    ),
  };
});

describe("CheckBoxItem", () => {
  const label = "Test Label";
  const value = "VALUE_1";
  let onChangeMock: jest.Mock;

  beforeEach(() => {
    onChangeMock = jest.fn();
  });

  it("renders provided label and checkbox", () => {
    render(
      <CheckBoxItem
        label={label}
        value={value}
        checked={false}
        onChange={onChangeMock}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByTestId("checkbox")).toBeInTheDocument();
  });

  it("passes checked prop to Checkbox", () => {
    const { rerender } = render(
      <CheckBoxItem
        label={label}
        value={value}
        checked={false}
        onChange={onChangeMock}
      />
    );
    expect(screen.getByTestId("checkbox")).not.toBeChecked();

    rerender(
      <CheckBoxItem
        label={label}
        value={value}
        checked={true}
        onChange={onChangeMock}
      />
    );
    expect(screen.getByTestId("checkbox")).toBeChecked();
  });

  it("calls onChange with the given value when toggled", () => {
    render(
      <CheckBoxItem
        label={label}
        value={value}
        checked={false}
        onChange={onChangeMock}
      />
    );
    fireEvent.click(screen.getByTestId("checkbox"));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(value);
  });

  it("applies the provided className to the <label> element", () => {
    render(
      <CheckBoxItem
        label={label}
        value={value}
        checked={false}
        onChange={onChangeMock}
        className="my-custom-class"
      />
    );
    const labelEl = screen.getByText(label).closest("label");
    expect(labelEl).toHaveClass("my-custom-class");
  });

  it("always includes base classes for cursor and flex layout", () => {
    render(
      <CheckBoxItem
        label={label}
        value={value}
        checked={false}
        onChange={onChangeMock}
      />
    );
    const labelEl = screen.getByText(label).closest("label");
    expect(labelEl).toHaveClass("cursor-pointer", "flex", "items-center");
  });
});
