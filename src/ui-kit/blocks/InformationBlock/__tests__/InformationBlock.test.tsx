import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { InformationBlock } from "../InformationBlock";

jest.mock("@/ui-kit/components/Icons/SearchIcon", () => ({
  SearchIcon: (props: any) => <svg data-testid="search-icon" {...props} />,
}));

describe("InformationBlock", () => {
  const sampleText = "No results found";
  const sampleBg = "bg-custom";
  const sampleSize = "w-16 h-16";

  it("renders the provided text", () => {
    render(
      <InformationBlock
        icon="search"
        iconSize={sampleSize}
        iconRoundBg={sampleBg}
        text={sampleText}
      />
    );
    expect(screen.getByText(sampleText)).toBeInTheDocument();
  });

  it("renders the SearchIcon and applies the background and size classes", () => {
    render(
      <InformationBlock
        icon="search"
        iconSize={sampleSize}
        iconRoundBg={sampleBg}
        text={sampleText}
      />
    );
    const icon = screen.getByTestId("search-icon");
    const wrapper = icon.parentElement!;
    expect(wrapper).toHaveClass("flex", "justify-center", "items-center");
    expect(wrapper).toHaveClass("rounded-full", sampleBg, sampleSize);
  });

  it("always uses the outer layout classes", () => {
    render(
      <InformationBlock
        icon="search"
        iconSize={sampleSize}
        iconRoundBg={sampleBg}
        text={sampleText}
      />
    );
    const iconWrapper = screen.getByTestId("search-icon").parentElement!;
    const outer = iconWrapper.parentElement!;
    expect(outer).toHaveClass(
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "pt-12"
    );
  });
});
