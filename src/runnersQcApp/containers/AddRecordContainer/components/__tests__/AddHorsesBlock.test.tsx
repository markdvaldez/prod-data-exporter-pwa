import { fireEvent, render, screen } from "@testing-library/react";
import { AddHorsesBlock, AddHorsesBlockProps } from "../AddHorsesBlock";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/ui-kit/blocks/SelectHorsesPanel", () => ({
  SelectHorsesPanel: ({ isOpen, title, handleItemPress, handleOpen }: any) => (
    <div data-testid="SelectHorsesPanel">
      {isOpen && <div>Panel Open</div>}
      <button onClick={() => handleItemPress({ hisaHorseId: "horse-123" })}>
        Mock Select Item
      </button>
      <button onClick={() => handleOpen()}>Mock Toggle</button>
    </div>
  ),
}));

jest.mock("@/runnersQcApp/containers/AddRecordContainer/components", () => ({
  HorseItemMain: ({ horse, onItemPress }: any) => (
    <div data-testid={`HorseItemMain-${horse.hisaHorseId}`}>
      {horse.name}
      <button onClick={() => onItemPress(horse)}>Delete</button>
    </div>
  ),
}));

jest.mock("@/ui-kit/components/Button", () => ({
  Button: ({ title, onClick }: any) => (
    <button onClick={onClick}>{title}</button>
  ),
}));

const horsesMock = [
  { hisaHorseId: "H-001", name: "Horse 1" },
  { hisaHorseId: "H-002", name: "Horse 2" },
];

describe("AddHorsesBlock", () => {
  const defaultProps: AddHorsesBlockProps = {
    horses: [],
    handleItemPress: jest.fn(),
    handleDeleteHorse: jest.fn(),
  };

  it("renders title and button", () => {
    render(<AddHorsesBlock {...defaultProps} />);
    expect(screen.getByText("addHorses")).toBeInTheDocument();
    expect(screen.getByText("findAndSelectHorses")).toBeInTheDocument();
    expect(screen.getByText("selectHorses")).toBeInTheDocument();
    expect(screen.getByText("startAddingHorses")).toBeInTheDocument();
  });

  it("shows correct title when horses exist", () => {
    render(<AddHorsesBlock {...defaultProps} horses={horsesMock as any} />);
    expect(screen.getByText(`2 horsesAdded`)).toBeInTheDocument();
    expect(screen.getByTestId("HorseItemMain-H-001")).toBeInTheDocument();
    expect(screen.getByTestId("HorseItemMain-H-002")).toBeInTheDocument();
  });

  it("calls handleItemPress when SelectHorsesPanel triggers it", () => {
    const mockItemPress = jest.fn();
    render(
      <AddHorsesBlock {...defaultProps} handleItemPress={mockItemPress} />
    );

    fireEvent.click(screen.getByText("selectHorses"));
    fireEvent.click(screen.getByText("Mock Select Item"));

    expect(mockItemPress).toHaveBeenCalledWith({
      hisaHorseId: "horse-123",
    });
  });

  it("calls handleDeleteHorse when HorseItemMain triggers it", () => {
    const mockDelete = jest.fn();
    render(
      <AddHorsesBlock
        {...defaultProps}
        horses={horsesMock as any}
        handleDeleteHorse={mockDelete}
      />
    );

    fireEvent.click(screen.getAllByText("Delete")[0]);
    expect(mockDelete).toHaveBeenCalledWith(horsesMock[0]);
  });

  it("toggles SelectHorsesPanel open/close when button clicked", () => {
    render(<AddHorsesBlock {...defaultProps} />);
    expect(screen.queryByText("Panel Open")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("selectHorses"));
    expect(screen.getByText("Panel Open")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Mock Toggle"));
    expect(screen.queryByText("Panel Open")).not.toBeInTheDocument();
  });
});
