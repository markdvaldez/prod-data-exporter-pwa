import { HeaderSection } from "@/runnersQcApp/containers/HorseReportContainer/Components/HeaderSection";
import { THorse } from "@/runnersQcApp/shared/types";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
jest.mock(
  "@/runnersQcApp/containers/HorseReportContainer/Components/Header",
  () => ({
    Header: (props: { onApplyProtocol: () => void }) => (
      <button data-testid="ApplyBtn" onClick={props.onApplyProtocol}>
        Toggle
      </button>
    ),
  })
);
jest.mock("@/ui-kit/blocks/ApplyProtocolPanel", () => ({
  ApplyProtocolPanel: (props: { isOpen: boolean }) =>
    props.isOpen ? <div data-testid="ApplyProtocolPanel" /> : null,
}));

describe("HeaderSection component", () => {
  const horse = {
    hisaHorseId: "H000000000",
    name: "Horse Name",
    yearOfBirth: 0,
    damName: "",
    ownerHisaId: "",
    ownerName: "",
    responsiblePersonHisaId: "",
    responsiblePersonName: "",
    attendingVet: [],
    attendingVetName: [],
    locationId: "",
    locationName: "",
    canRace: false,
    canRaceReason: "",
    canWork: false,
    canWorkReason: "",
    lastUpdate: "",
  } as THorse;

  it("toggles the ApplyProtocolPanel open and closed", () => {
    render(<HeaderSection horse={horse} />);
    const btn = screen.getByTestId("ApplyBtn");

    fireEvent.click(btn);
    expect(screen.getByTestId("ApplyProtocolPanel")).toBeInTheDocument();

    fireEvent.click(btn);
    expect(screen.queryByTestId("ApplyProtocolPanel")).not.toBeInTheDocument();
  });
});
