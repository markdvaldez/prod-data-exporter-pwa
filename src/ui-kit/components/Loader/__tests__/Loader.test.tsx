import { render, screen } from "@testing-library/react";
import { Loader } from "../Loader";

describe("Loader", () => {
  it("renders the loader with default props", () => {
    render(<Loader size="default" variant="default" />);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    const svg = loader.querySelector("svg");
    expect(svg).toHaveClass("h-6 w-6");
    expect(svg).toHaveClass("text-gray-400 dark:text-gray-400 fill-background");
  });

  it("renders the loader with small size", () => {
    render(<Loader size="sm" variant="default" />);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    const svg = loader.querySelector("svg");
    expect(svg).toHaveClass("h-4 w-4");
  });

  it("renders the loader with large size", () => {
    render(<Loader size="lg" variant="default" />);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    const svg = loader.querySelector("svg");
    expect(svg).toHaveClass("h-12 w-12");
  });

  it("renders the loader with icon size", () => {
    render(<Loader size="icon" variant="default" />);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    const svg = loader.querySelector("svg");
    expect(svg).toHaveClass("h-8 w-8");
  });

  it("renders the loader with destructive variant", () => {
    render(<Loader size="default" variant="destructive" />);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    const svg = loader.querySelector("svg");
    expect(svg).toHaveClass("text-gray-400 dark:text-gray-400 fill-background");
  });

  it("renders the loader with outline variant", () => {
    render(<Loader size="default" variant="outline" />);
    const loader = screen.getByRole("status");
    expect(loader).toBeInTheDocument();
    const svg = loader.querySelector("svg");
    expect(svg).toHaveClass("text-gray-300 dark:text-gray-300 fill-gray-500");
  });
});
