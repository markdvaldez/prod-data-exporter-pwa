import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "../Skeleton";

describe("Skeleton", () => {
  it("renders a div with default skeleton classes", () => {
    render(<Skeleton data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
  });

  it("merges additional className with default classes", () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveClass(
      "animate-pulse",
      "rounded-md",
      "bg-muted",
      "custom-class"
    );
  });

  it("forwards arbitrary HTML attributes to the div", () => {
    render(<Skeleton id="my-id" title="loading" data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");
    expect(el).toHaveAttribute("id", "my-id");
    expect(el).toHaveAttribute("title", "loading");
  });
});
