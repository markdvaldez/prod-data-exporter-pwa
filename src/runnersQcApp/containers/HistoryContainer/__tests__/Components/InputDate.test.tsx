import { render, screen } from "@testing-library/react";
import { InputDate } from "../../Components/InputDate";

jest.mock("@/ui-kit/components/Calendar", () => ({
  Calendar: () => <div data-testid="calendar" />,
}));
jest.mock("@/ui-kit/components/DateInput/helpers", () => ({
  convertToJSDate: (v: string) => (v ? new Date(v) : undefined),
  convertJSDateToISODate: (d: Date) => d.toISOString().split("T")[0],
  convertJSDateToString: (d: Date) => (d ? "formatted-date" : ""),
}));
jest.mock("@/ui-kit/components/Input", () => ({
  Input: (props: any) => <input {...props} />,
}));
jest.mock("../../Components/NoPortalPopover", () => ({
  Popover: ({ children }: any) => <>{children}</>,
  PopoverTrigger: ({ children }: any) => <>{children}</>,
  PopoverContent: ({ children }: any) => <>{children}</>,
}));
jest.mock("lucide-react", () => ({ Calendar: () => <span /> }));

describe("InputDate", () => {
  it("renders readOnly-input with placeholder", () => {
    const onChange = jest.fn();
    render(
      <InputDate value="" onChange={onChange} placeholder="Pick a date" />
    );
    const input = screen.getByPlaceholderText(
      "Pick a date"
    ) as HTMLInputElement;
    expect(input).toHaveAttribute("readOnly");
  });

  it("updates the displayed value when the value is changed", () => {
    const { rerender } = render(
      <InputDate value="" onChange={() => {}} placeholder="Date" />
    );
    const input = screen.getByPlaceholderText("Date") as HTMLInputElement;
    expect(input.value).toBe("");

    rerender(
      <InputDate value="2025-07-04" onChange={() => {}} placeholder="Date" />
    );
    expect(input.value).toBe("formatted-date");
  });
});
