import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { mockRecordsData } from "../../../../../../__mocks__/records";
import { RecordTable } from "../../Components/RecordTable";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/ui-kit/components/DataTable", () => ({
  DataTable: (props: { data: any[] }) => (
    <div data-testid="DataTable">{props.data.length}</div>
  ),
}));
jest.mock("../../Components/columnDefs", () => ({
  columnDefs: () => [],
}));

describe("RecordTable component", () => {
  it("renders DataTable with correct row count", () => {
    render(
      <RecordTable
        records={mockRecordsData}
        onItemPress={jest.fn()}
        handleSort={jest.fn()}
      />
    );
    expect(screen.getByTestId("DataTable")).toHaveTextContent(
      `${mockRecordsData.length}`
    );
  });
});
