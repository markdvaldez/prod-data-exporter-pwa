import { fireEvent, render, screen } from "@testing-library/react";
import { mockProtocolListItem } from "../../../../../__mocks__/protocols";
import { ProtocolsListItem } from "../ProtocolListItem";

describe("<ProtocolsListItem />", () => {
  const defaultProps = {
    name: "Mock Protocol",
    id: "123",
    description: "This is a protocol",
    item: mockProtocolListItem,
    handleDelete: jest.fn(),
    handleEdit: jest.fn(),
    handleEditProtocol: jest.fn(),
    handleProtocolClick: jest.fn(),
    bordered: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders name and description", () => {
    render(<ProtocolsListItem {...defaultProps} />);
    expect(screen.getByText("Mock Protocol")).toBeInTheDocument();
    expect(screen.getByText("This is a protocol")).toBeInTheDocument();
  });

  it("calls handleProtocolClick when item is clicked", () => {
    render(<ProtocolsListItem {...defaultProps} />);
    fireEvent.click(screen.getByText("Mock Protocol"));
    expect(defaultProps.handleProtocolClick).toHaveBeenCalledWith("123");
  });

  it("calls handleEdit and handleEditProtocol when edit icon is clicked", () => {
    render(<ProtocolsListItem {...defaultProps} />);
    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    expect(defaultProps.handleEditProtocol).toHaveBeenCalledWith("123");
    expect(defaultProps.handleEdit).toHaveBeenCalledWith(defaultProps.item);
  });

  it("calls handleDelete when delete icon is clicked", () => {
    render(<ProtocolsListItem {...defaultProps} />);
    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);
    expect(defaultProps.handleDelete).toHaveBeenCalledWith("123");
  });

  it("renders ChevronRightIcon when not applying", () => {
    render(<ProtocolsListItem {...defaultProps} isApplying={false} />);
    expect(screen.getByTestId("chevron-icon")).toBeInTheDocument();
  });

  it("does not render ChevronRightIcon when applying", () => {
    render(<ProtocolsListItem {...defaultProps} isApplying={true} />);
    expect(screen.queryByTestId("chevron-icon")).not.toBeInTheDocument();
  });

  it("renders Separator when bordered is true", () => {
    render(<ProtocolsListItem {...defaultProps} bordered={true} />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("renders error message when error and missing treatment fields", () => {
    render(
      <ProtocolsListItem
        {...defaultProps}
        errorMessage="Error occurred"
        hasTreatmentAllFields={false}
      />
    );
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  it("does not render icons if withIcons is false", () => {
    render(<ProtocolsListItem {...defaultProps} withIcons={false} />);
    expect(
      screen.queryByRole("img", { name: /pencil/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /trash/i })
    ).not.toBeInTheDocument();
  });

  it("renders <Separator /> when bordered is true", () => {
    const baseProps = {
      name: "Test Protocol",
      id: "123",
      description: "Some description",
      item: undefined,
    };

    render(<ProtocolsListItem {...baseProps} bordered={true} />);

    // Because Separator renders a <hr> or styled div,
    // you can select by role if it is <hr>,
    // or use getByTestId if you add data-testid to your Separator.
    // If it renders as <div>, use container.
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
  });

  it("does NOT render <Separator /> when bordered is false", () => {
    const baseProps = {
      name: "Test Protocol",
      id: "123",
      description: "Some description",
      item: undefined,
    };

    const { queryByRole } = render(
      <ProtocolsListItem {...baseProps} bordered={false} />
    );

    expect(queryByRole("separator")).not.toBeInTheDocument();
  });
});
