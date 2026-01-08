import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { columnDefs } from "../../Components/columnDefs";

jest.mock("@/runnersQcApp/pages/MainPage/helpers", () => ({
  getFormattedId: (id: string) => id,
}));
jest.mock("@/runnersQcApp/shared/TextUtils", () => ({
  getRecType: (_t: any, v: string) => v,
}));
jest.mock("@/ui-kit/components/Icons/ArrowUpDownIcon", () => ({
  ArrowUpDownIcon: () => <span data-testid="icon" />,
}));
jest.mock("../../helpers", () => ({
  columnHeaderCN: "col-header",
  columnHeaderTitleCN: "col-header-title",
  rowClassName: "row-class",
}));

describe("columnDefs", () => {
  const t = ((key: string) => key) as any;
  const onItemPress = jest.fn();
  const handleSort = jest.fn();

  const cols = columnDefs({ t, onItemPress, handleSort } as any) as any[];

  it("id header click invokes handleSort", () => {
    const idCol = cols.find(
      (c) => (c as any).accessorKey === "hisaHorseMedicalId"
    )!;
    const Header = (idCol as any).header as () => React.JSX.Element;
    const { getByText } = render(<>{Header()}</>);
    fireEvent.click(getByText("id"));
    expect(handleSort).toHaveBeenCalledWith("hisaHorseMedicalId");
  });

  it("id cell click invokes onItemPress", () => {
    const record = { hisaHorseMedicalId: "M000000000" };
    const idCol = cols.find(
      (c) => (c as any).accessorKey === "hisaHorseMedicalId"
    )!;
    const Cell = (idCol as any).cell as (args: any) => React.JSX.Element;
    const { getByText } = render(
      <>
        {Cell({
          row: { original: record },
          getValue: () => record.hisaHorseMedicalId,
        })}
      </>
    );
    fireEvent.click(getByText("M000000000"));
    expect(onItemPress).toHaveBeenCalledWith("M000000000");
  });
});
