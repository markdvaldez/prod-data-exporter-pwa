import { LocationType } from "@/Types";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  LocationTypesFilter,
  LocationTypesFilterItem,
} from "../LocationTypesFilter";

jest.mock("@/ui-kit/components/CheckBoxItem", () => ({
  CheckBoxItem: (props: any) => (
    <button
      data-testid={`checkbox-${props.value}`}
      onClick={() => props.onChange(props.value)}
      data-checked={props.checked}
    >
      {props.label}
    </button>
  ),
}));

describe("LocationTypesFilter", () => {
  const items: LocationTypesFilterItem[] = [
    {
      label: "Racetrack",
      value: LocationType.Racetrack,
      isSelected: false,
    },
    {
      label: "Farm",
      value: LocationType.Farm,
      isSelected: true,
    },
  ];

  let onChangeMock: jest.Mock;

  beforeEach(() => {
    onChangeMock = jest.fn();
  });

  it("renders header, 'All' and individual checkboxes with correct checked state", () => {
    render(
      <LocationTypesFilter
        className="custom-class"
        value={items}
        onChange={onChangeMock}
      />
    );

    expect(screen.getByText("Location Types")).toBeInTheDocument();
    expect(screen.getByText("Location Types").closest("div")).toHaveClass(
      "flex flex-col custom-class"
    );

    const allCb = screen.getByTestId("checkbox-all");
    expect(allCb).toHaveAttribute("data-checked", "false");

    expect(
      screen.getByTestId(`checkbox-${LocationType.Racetrack}`)
    ).toHaveAttribute("data-checked", "false");
    expect(screen.getByTestId(`checkbox-${LocationType.Farm}`)).toHaveAttribute(
      "data-checked",
      "true"
    );
  });

  it("calls onChange with all deselected when clicking 'All'", () => {
    render(<LocationTypesFilter value={items} onChange={onChangeMock} />);

    fireEvent.click(screen.getByTestId("checkbox-all"));

    expect(onChangeMock).toHaveBeenCalledWith([
      { ...items[0], isSelected: false },
      { ...items[1], isSelected: false },
    ]);
  });

  it("toggles individual item when clicking its checkbox", () => {
    render(<LocationTypesFilter value={items} onChange={onChangeMock} />);

    fireEvent.click(screen.getByTestId(`checkbox-${LocationType.Racetrack}`));
    expect(onChangeMock).toHaveBeenCalledWith([
      { ...items[0], isSelected: true },
      items[1],
    ]);

    onChangeMock.mockClear();

    fireEvent.click(screen.getByTestId(`checkbox-${LocationType.Farm}`));
    expect(onChangeMock).toHaveBeenCalledWith([
      items[0],
      { ...items[1], isSelected: false },
    ]);
  });

  it("when no items selected, 'All' checkbox becomes checked", () => {
    const noneSelected = items.map((i) => ({ ...i, isSelected: false }));
    render(
      <LocationTypesFilter value={noneSelected} onChange={onChangeMock} />
    );
    expect(screen.getByTestId("checkbox-all")).toHaveAttribute(
      "data-checked",
      "true"
    );
  });
});
