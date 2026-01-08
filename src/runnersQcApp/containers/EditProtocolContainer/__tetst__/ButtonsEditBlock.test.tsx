import routes from "@/routes";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { ButtonsEditBlock } from "../ButtonsEditBlock";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("next/link", () => {
  const Link = ({ href, children }: any) => <a href={href}>{children}</a>;
  Link.displayName = "Link";
  return Link;
});

describe("<ButtonsEditBlock />", () => {
  it("renders Cancel link with correct href", () => {
    render(<ButtonsEditBlock onAddClick={jest.fn()} onSaveClick={jest.fn()} />);

    const cancelLink = screen.getByRole("link", { name: "AddRecord.cancel" });
    expect(cancelLink).toBeInTheDocument();
    expect(cancelLink).toHaveAttribute("href", `${routes.DASHBOARD}/protocols`);
  });

  it("calls onAddClick when Add More button is clicked", () => {
    const handleAdd = jest.fn();

    render(<ButtonsEditBlock onAddClick={handleAdd} onSaveClick={jest.fn()} />);

    const addButton = screen.getByRole("button", { name: "Protocols.addMore" });
    fireEvent.click(addButton);

    expect(handleAdd).toHaveBeenCalledTimes(1);
  });

  it("calls onSaveClick when Save and Exit button is clicked", () => {
    const handleSave = jest.fn();

    render(
      <ButtonsEditBlock onAddClick={jest.fn()} onSaveClick={handleSave} />
    );

    const saveButton = screen.getByRole("button", {
      name: "Protocols.saveAndExit",
    });
    fireEvent.click(saveButton);

    expect(handleSave).toHaveBeenCalledTimes(1);
  });
});
