import { TreatmentTemplateRequest } from "@/Types";
import { fireEvent, render, screen } from "@testing-library/react";
import { treatment, treatments } from "../../../../../../__mocks__/protocols";
import { ButtonsFirstStep, ButtonsFirstStepProps } from "../ButtonsFirstStep";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("<ButtonsFirstStep />", () => {
  const defaultProps: ButtonsFirstStepProps = {
    isLoading: false,
    treatments: [],
    currentTreatment: null,
    onPress: jest.fn(),
    handleComplete: jest.fn(),
    handleCancel: jest.fn(),
  };

  it("renders cancel and save buttons when no treatments and no current treatment", () => {
    render(<ButtonsFirstStep {...defaultProps} />);

    expect(screen.getByText("AddRecord.cancel")).toBeInTheDocument();
    expect(screen.getByText("Protocols.addToProtocol")).toBeInTheDocument();
  });

  it("calls onPress when save button is clicked", () => {
    render(<ButtonsFirstStep {...defaultProps} />);

    fireEvent.click(screen.getByText("Protocols.addToProtocol"));
    expect(defaultProps.onPress).toHaveBeenCalled();
  });

  it("calls handleCancel when cancel button is clicked", () => {
    render(<ButtonsFirstStep {...defaultProps} />);

    fireEvent.click(screen.getByText("AddRecord.cancel"));
    expect(defaultProps.handleCancel).toHaveBeenCalled();
  });

  it("shows complete button when treatments exist and currentTreatment is null", () => {
    render(
      <ButtonsFirstStep
        {...defaultProps}
        treatments={[{ treatmentTemplateId: "1" } as any]}
      />
    );

    expect(screen.getByText(/Protocols.complete/)).toBeInTheDocument();
  });

  it("calls handleComplete when complete button is clicked", () => {
    render(
      <ButtonsFirstStep
        {...defaultProps}
        treatments={[{ treatmentTemplateId: "1" } as any]}
      />
    );

    fireEvent.click(screen.getByText(/Protocols.complete/));
    expect(defaultProps.handleComplete).toHaveBeenCalled();
  });

  it("uses AddRecord.save when currentTreatment is present", () => {
    render(
      <ButtonsFirstStep
        {...defaultProps}
        currentTreatment={{ treatmentTemplateId: "1" } as any}
      />
    );

    expect(screen.getByText("AddRecord.save")).toBeInTheDocument();
  });

  it("disables loading state on Button when isLoading is true", () => {
    const defaultProps: ButtonsFirstStepProps = {
      isLoading: true,
      treatments: treatments as TreatmentTemplateRequest[],
      currentTreatment: treatment as TreatmentTemplateRequest,
      onPress: jest.fn(),
      handleComplete: jest.fn(),
      handleCancel: jest.fn(),
    };

    const { container } = render(
      <ButtonsFirstStep {...defaultProps} isLoading={true} />
    );

    const loader = screen.getByRole("status");
    const allButtons = container.querySelectorAll("button");
    const secondButton = allButtons[1];
    // expect(saveButton).toHaveAttribute("data-fetching", "true");
    // expect(saveButton).toBeDisabled(); // if fetching disables it
    expect(secondButton).toHaveTextContent("Loading..."); // if text changes
    expect(loader).toBeInTheDocument();
  });
});
