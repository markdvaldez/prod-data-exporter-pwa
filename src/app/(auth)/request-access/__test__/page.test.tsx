import { render, screen } from "@testing-library/react";
import Page from "../page";

jest.mock("@/shared/RequestAccess", () => ({
  RequestAccess: () => <div data-testid="request-access" />,
}));

describe("Page Component Tests", () => {
  test("renders page component", () => {
    render(<Page />);
    expect(screen.getByTestId("request-access")).toBeInTheDocument();
  });
});
