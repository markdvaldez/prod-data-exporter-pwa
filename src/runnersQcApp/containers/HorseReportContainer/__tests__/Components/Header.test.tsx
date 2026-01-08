import { Header } from "@/runnersQcApp/containers/HorseReportContainer/Components/Header";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/runnersQcApp/pages/MainPage/helpers", () => ({
  getFormattedId: (id: string) => `#${id}`,
}));
jest.mock(
  "@/runnersQcApp/containers/HorseReportContainer/Components/ShieldPopover",
  () => ({ ShieldPopover: () => <div data-testid="ShieldPopover" /> })
);

describe("Header component", () => {
  const props = {
    hisaHorseId: "H000000000",
    horseName: "Test Name",
    canRace: true,
    canWork: false,
    canRaceReason: "OK",
    canWorkReason: "No",
    location: "Test Location",
    ownerHisaId: "P000000000",
    ownerName: "Owner Name",
    responsiblePersonHisaId: "P000000001",
    responsiblePersonName: "Resp Name",
    attendingVet: ["P000000002"],
    attendingVetName: ["Vet Name"],
    onAddRecord: jest.fn(),
    onApplyProtocol: jest.fn(),
  };

  it("renders all labels and buttons", () => {
    render(<Header {...props} />);
    expect(screen.getByText("Test Name")).toBeInTheDocument();
    expect(screen.getByText("#H000000000")).toBeInTheDocument();
    expect(screen.getByTestId("ShieldPopover")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "applyProtocol" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "addRecord" })
    ).toBeInTheDocument();
  });

  it("calls handlers when buttons are clicked", () => {
    render(<Header {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "applyProtocol" }));
    expect(props.onApplyProtocol).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "addRecord" }));
    expect(props.onAddRecord).toHaveBeenCalled();
  });

  it("displays attending vets list", () => {
    render(<Header {...props} />);
    expect(screen.getByText(/Vet Name/)).toBeInTheDocument();
  });
});
