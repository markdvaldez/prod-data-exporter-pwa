import { fireEvent, render } from "@testing-library/react";
import { columnDefs } from "../../Components/columnDefs";

describe("columnDefs", () => {
  const t = ((key: string) => key) as any;
  const onItemPress = jest.fn();
  const handleSort = jest.fn();
  const cols = columnDefs({ t, onItemPress, handleSort }) as any[];

  it("returns correct columns and headers respond to click", () => {
    const horseNameCol = cols.find(
      (c: any) => c.accessorKey === "hisaHorseName"
    )!;
    const { getByText } = render(
      <>{horseNameCol.header({ column: {} } as any)}</>
    );
    fireEvent.click(getByText("horseName"));
    expect(handleSort).toHaveBeenCalledWith("hisaHorseName");
  });

  it("cell calls onItemPress with correct id", () => {
    const record = {
      hisaHorseMedicalId: "M000000000",
      internalId: "internalId",
      hisaHorseName: "Miss Princess",
      isSynced: true,
    };
    const horseNameCol = cols.find(
      (c: any) => c.accessorKey === "hisaHorseName"
    )!;
    const { getByText } = render(
      <>
        {horseNameCol.cell({
          row: { original: record },
          getValue: () => record.hisaHorseName,
        })}
      </>
    );
    fireEvent.click(getByText("Miss Princess"));
    expect(onItemPress).toHaveBeenCalledWith("M000000000");
  });
});
