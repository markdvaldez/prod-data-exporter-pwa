import { THorse } from "@/runnersQcApp/shared/types";
import { fireEvent, render, screen } from "@testing-library/react";
import { HorseItemMain, HorseItemMainProps } from "../HorseItemMain";

jest.mock("@/runnersQcApp/pages/MainPage/helpers", () => ({
  getFormattedId: jest.fn(() => "formatted-id"),
}));

import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";

const baseHorse = {
  hisaHorseId: "123",
  name: "Horse Name",
} as any;

describe("<HorseItemMain />", () => {
  const baseHorse: THorse = {
    hisaHorseId: "12345",
    name: "Test Horse",
  } as THorse;

  const renderComponent = (props: Partial<HorseItemMainProps> = {}) =>
    render(<HorseItemMain horse={baseHorse} isLastItem={false} {...props} />);

  it("renders horse name and formatted ID", () => {
    renderComponent();

    expect(screen.getByText("Test Horse")).toBeInTheDocument();
  });

  it("calls onItemPress when MinusIcon is clicked", () => {
    const onItemPress = jest.fn();
    renderComponent({ onItemPress });

    const minusIconButton = screen.getByTestId("minus-icon");
    fireEvent.click(minusIconButton);

    expect(onItemPress).toHaveBeenCalledWith(baseHorse);
  });

  it("does not render Separator if isLastItem is true", () => {
    const { queryByTestId } = render(
      <HorseItemMain horse={baseHorse} isLastItem={true} />
    );

    expect(screen.queryByTestId("separator")).not.toBeInTheDocument();
  });

  it("renders Separator if isLastItem is false", () => {
    renderComponent();

    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("calls getFormattedId with horse.hisaHorseId", () => {
    render(<HorseItemMain horse={baseHorse} isLastItem={false} />);

    expect(getFormattedId).toHaveBeenCalledWith("12345");
  });

  it("calls getFormattedId with empty string if no hisaHorseId", () => {
    const horseWithoutId = { name: "Horse Name" } as any;

    render(<HorseItemMain horse={horseWithoutId} isLastItem={false} />);

    expect(getFormattedId).toHaveBeenCalledWith("");
  });
});
