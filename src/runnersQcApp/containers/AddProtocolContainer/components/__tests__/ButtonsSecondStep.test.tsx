import routes from "@/routes";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonsSecondStep } from "../ButtonsSecondStep";
import { ProtocolName } from "../ProtocolName";

// Mock `useTranslations`
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("<ButtonsSecondStep />", () => {
  const onAddClick = jest.fn();
  const onSaveClick = jest.fn();

  beforeEach(() => {
    onAddClick.mockClear();
    onSaveClick.mockClear();
  });

  it("renders all buttons with correct titles", () => {
    render(
      <ButtonsSecondStep onAddClick={onAddClick} onSaveClick={onSaveClick} />
    );

    // Cancel button inside Link
    expect(
      screen.getByRole("button", { name: "AddRecord.cancel" })
    ).toBeInTheDocument();

    // Add More button
    expect(
      screen.getByRole("button", { name: "Protocols.addMore" })
    ).toBeInTheDocument();

    // Save and Exit button
    expect(
      screen.getByRole("button", { name: "Protocols.saveAndExit" })
    ).toBeInTheDocument();
  });

  it("links cancel button to dashboard", () => {
    render(
      <ButtonsSecondStep onAddClick={onAddClick} onSaveClick={onSaveClick} />
    );

    const cancelLink = screen.getByRole("link");
    expect(cancelLink).toHaveAttribute("href", routes.DASHBOARD);
  });

  it("calls onAddClick when Add button is clicked", async () => {
    render(
      <ButtonsSecondStep onAddClick={onAddClick} onSaveClick={onSaveClick} />
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Protocols.addMore" })
    );
    expect(onAddClick).toHaveBeenCalledTimes(1);
  });

  it("calls onSaveClick when Save button is clicked", async () => {
    render(
      <ButtonsSecondStep onAddClick={onAddClick} onSaveClick={onSaveClick} />
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Protocols.saveAndExit" })
    );
    expect(onSaveClick).toHaveBeenCalledTimes(1);
  });
});

describe("<ProtocolName />", () => {
  const handleChangeName = jest.fn();
  const handleClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders label and input", () => {
    render(
      <ProtocolName
        protocolName=""
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    expect(screen.getByText("Protocols.protocolName")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Protocols.protocolName")
    ).toBeInTheDocument();
  });

  it("sets the input value when protocolName is provided", () => {
    render(
      <ProtocolName
        protocolName="Test Protocol"
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    const input = screen.getByPlaceholderText("Protocols.protocolName");
    expect(input).toHaveValue("Test Protocol");
  });

  it("calls handleChangeName on input change", async () => {
    render(
      <ProtocolName
        protocolName=""
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    const input = screen.getByPlaceholderText("Protocols.protocolName");
    await userEvent.type(input, "New");

    // Should be called once per keystroke
    expect(handleChangeName).toHaveBeenCalled();
  });

  it("shows clear icon only when protocolName is set", () => {
    const { rerender } = render(
      <ProtocolName
        protocolName=""
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    // Should not find the clear icon
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    // Rerender with a name
    rerender(
      <ProtocolName
        protocolName="Something"
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    expect(screen.getByTestId("clear-icon")).toBeInTheDocument();
  });

  it("calls handleClear when clear icon is clicked", async () => {
    render(
      <ProtocolName
        protocolName="Something"
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    const clearIconWrapper = screen.getByTestId("clear-icon");
    await userEvent.click(clearIconWrapper);

    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
