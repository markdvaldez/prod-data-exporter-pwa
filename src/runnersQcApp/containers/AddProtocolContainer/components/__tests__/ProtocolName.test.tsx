import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProtocolName } from "../ProtocolName";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

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

  it("shows the input value when protocolName is provided", () => {
    render(
      <ProtocolName
        protocolName="My Protocol"
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    const input = screen.getByPlaceholderText("Protocols.protocolName");
    expect(input).toHaveValue("My Protocol");
  });

  it("has empty value when protocolName is null", () => {
    render(
      <ProtocolName
        protocolName={null}
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    const input = screen.getByPlaceholderText("Protocols.protocolName");
    expect(input).toHaveValue("");
  });

  it("has empty value when protocolName is undefined", () => {
    render(
      <ProtocolName
        protocolName={undefined}
        handleChangeName={handleChangeName}
        handleClear={handleClear}
      />
    );

    const input = screen.getByPlaceholderText("Protocols.protocolName");
    expect(input).toHaveValue("");
  });
});
