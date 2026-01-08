import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BackButton } from "../BackButton";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const backMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: backMock }),
}));

jest.mock("@/ui-kit/components/Icons/ArrowLeftIcon", () => ({
  ArrowLeftIcon: () => <svg data-testid="ArrowLeftIcon" />,
}));

jest.mock("next/link", () => {
  const Link = ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
  Link.displayName = "Link";
  return Link;
});

describe("BackButton", () => {
  beforeEach(() => {
    backMock.mockClear();
  });

  it("renders icon, translated text and applies passed styles", () => {
    render(<BackButton styles="my-custom-style" />);
    expect(screen.getByTestId("ArrowLeftIcon")).toBeInTheDocument();
    expect(screen.getByText("HorseReport.back")).toBeInTheDocument();
    const containerDiv = screen.getByText("HorseReport.back").closest("div");
    expect(containerDiv).toHaveClass(
      "flex",
      "flex-row",
      "items-center",
      "gap-2",
      "pb-2",
      "my-custom-style"
    );
  });

  it("calls router.back when clicked", () => {
    render(<BackButton styles="foo" />);
    const link = screen.getByRole("link");
    fireEvent.click(link);
    expect(backMock).toHaveBeenCalledTimes(1);
  });
});
