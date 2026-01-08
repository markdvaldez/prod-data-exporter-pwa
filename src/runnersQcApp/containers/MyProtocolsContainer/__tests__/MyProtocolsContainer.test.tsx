import routes from "@/routes";
import { useProtocols } from "@/ui-kit/hooks/useProtocols";
import { fireEvent, render, screen } from "@testing-library/react";
import * as Redux from "react-redux";
import { MyProtocolsContainer } from "../MyProtocolsContainer";

const mockPush = jest.fn();
const mockUseRouter = jest.fn();
const mockDeleteProtocol = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
}));

jest.mock("@/ui-kit/hooks/useProtocols", () => ({
  useProtocols: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/ui-kit/hooks/useInternetConnection", () => ({
  useInternetConnection: () => true,
}));

jest.mock("@/ui-kit/hooks/useMobile", () => ({
  useIsMobile: () => false,
}));

jest.mock("@/hooks/useScreenSize", () => ({
  useScreenSize: () => ({ height: 800 }),
}));

describe("<MyProtocolsContainer />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({ push: mockPush });
    (useProtocols as jest.Mock).mockReturnValue({
      deleteProtocol: mockDeleteProtocol,
    });
  });

  function renderWithProtocols(protocols: any[]) {
    jest.spyOn(Redux, "useSelector").mockReturnValue(protocols);
    render(<MyProtocolsContainer />);
  }

  const baseTreatment = {
    procedure: "Procedure",
    drugName: "DrugName",
    drugRoute: "IV",
    drugDosage: "5ml",
    limbTreated: "Leg",
    clearedToWork: true,
    clearedToRace: false,
  };

  const defaultProtocol = {
    treatmentProtocolId: "p1",
    protocolName: "Test Protocol",
    treatments: [
      {
        ...baseTreatment,
        recType: "DrugAdministered",
      },
    ],
  };

  it("renders list items for protocols", () => {
    renderWithProtocols([defaultProtocol]);
    expect(screen.getByText("Test Protocol")).toBeInTheDocument();
    expect(screen.getByText(/Procedure/)).toBeInTheDocument();
  });

  it("filters protocols by search", () => {
    renderWithProtocols([defaultProtocol]);
    const searchInput = screen.getByPlaceholderText("AddRecord.search");
    fireEvent.change(searchInput, { target: { value: "Nonexistent" } });
    expect(screen.queryByText("Test Protocol")).not.toBeInTheDocument();
  });

  it("navigates to apply page when list item clicked", () => {
    renderWithProtocols([defaultProtocol]);
    fireEvent.click(screen.getByText("Test Protocol"));
    expect(mockPush).toHaveBeenCalledWith(routes.APPLY_PROTOCOL("p1"));
  });

  it("calls router.push when edit icon is clicked", () => {
    renderWithProtocols([defaultProtocol]);
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);
    expect(mockPush).toHaveBeenCalledWith(routes.EDIT_PROTOCOL("p1"));
  });

  it("opens delete modal and calls deleteProtocol", () => {
    renderWithProtocols([defaultProtocol]);
    const trash = screen.getByTestId("delete-button");
    fireEvent.click(trash);
    fireEvent.click(screen.getByText("Protocols.delete"));
    expect(mockDeleteProtocol).toHaveBeenCalled();
  });

  it("renders add protocol link with correct href", () => {
    renderWithProtocols([]);
    const addButton = screen.getByText("Protocols.addProtocol");
    expect(addButton.closest("a")).toHaveAttribute(
      "href",
      "/dashboard/add-protocol"
    );
  });

  describe("drugRoute condition", () => {
    it("includes drugRoute when recType is DrugAdministered", () => {
      const protocol = {
        treatmentProtocolId: "abc",
        protocolName: "Test Protocol",
        treatments: [
          {
            ...baseTreatment,
            recType: "DrugAdministered",
          },
        ],
      };
      renderWithProtocols([protocol]);
      expect(screen.getByText(/IV/)).toBeInTheDocument();
    });

    it("includes drugRoute when recType is IntralesionalInjection", () => {
      const protocol = {
        treatmentProtocolId: "abc",
        protocolName: "Test Protocol",
        treatments: [
          {
            ...baseTreatment,
            recType: "IntralesionalInjection",
          },
        ],
      };
      renderWithProtocols([protocol]);
      expect(screen.getByText(/IV/)).toBeInTheDocument();
    });

    it("does not include drugRoute for other recTypes", () => {
      const protocol = {
        treatmentProtocolId: "abc",
        protocolName: "Test Protocol",
        treatments: [
          {
            ...baseTreatment,
            recType: "OtherType",
          },
        ],
      };
      renderWithProtocols([protocol]);
      expect(screen.queryByText(/IV/)).not.toBeInTheDocument();
    });
  });

  describe("inspectionType condition", () => {
    it("renders inspectionType when recType is MandatoryPreRaceAndPreWorkVetInspection", () => {
      const protocol = {
        treatmentProtocolId: "abc",
        protocolName: "Test Protocol",
        treatments: [
          {
            ...baseTreatment,
            recType: "MandatoryPreRaceAndPreWorkVetInspection",
          },
        ],
      };
      renderWithProtocols([protocol]);
      expect(screen.getByText(/Cleared to work/i)).toBeInTheDocument();
    });

    it("does not render inspectionType for other recTypes", () => {
      const protocol = {
        treatmentProtocolId: "def",
        protocolName: "Test Protocol",
        treatments: [
          {
            ...baseTreatment,
            recType: "OtherType",
          },
        ],
      };
      renderWithProtocols([protocol]);
      expect(screen.queryByText(/Cleared to work/i)).not.toBeInTheDocument();
    });
  });
});
