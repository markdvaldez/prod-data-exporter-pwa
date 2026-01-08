import { DateTime } from "luxon";

import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { getRecType } from "@/runnersQcApp/shared/TextUtils";
import { TFunc, THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { ArrowUpDownIcon } from "@/ui-kit/components/Icons/ArrowUpDownIcon";
import { cn } from "@/ui-kit/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { columnHeaderCN, columnHeaderTitleCN, rowClassName } from "../helpers";

type TColumnDefs = {
  t: TFunc;
  onItemPress: (id: string) => void;
  handleSort: (column: string) => void;
};

type TCellArgs = {
  row: {
    original: THorseMedicalRecord;
  };
  getValue: () => string;
};

export const columnDefs = ({
  t,
  onItemPress,
  handleSort,
}: TColumnDefs): ColumnDef<THorseMedicalRecord, string>[] => [
  {
    header: ({ column }) => (
      <div
        className={columnHeaderCN}
        onClick={() => handleSort("hisaHorseName")}
      >
        <div className={columnHeaderTitleCN}>{t("horseName")}</div>
        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "hisaHorseName",
    cell: ({ row, getValue }) => (
      <div
        onClick={() =>
          onItemPress(
            row.original.hisaHorseMedicalId || row.original.internalId || ""
          )
        }
        className={cn(
          rowClassName,
          row.original.isSynced === false ? "border-l-2 border-d2" : null
        )}
      >
        {getValue() as string}
      </div>
    ),
  },
  {
    header: () => (
      <div className={columnHeaderCN} onClick={() => handleSort("hisaHorseId")}>
        <div className={columnHeaderTitleCN}>{t("horseId")}</div>
        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "hisaHorseId",
    cell: ({ row, getValue }) => (
      <div
        onClick={() =>
          onItemPress(
            row.original.hisaHorseMedicalId || row.original.internalId || ""
          )
        }
        className={rowClassName}
      >
        {getFormattedId((getValue() as string) || "-")}
      </div>
    ),
  },
  {
    header: () => (
      <div className={columnHeaderCN} onClick={() => handleSort("recType")}>
        <div className={columnHeaderTitleCN}>{t("recType")}</div>
        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "recType",
    cell: ({ row, getValue }) => (
      <div
        onClick={() =>
          onItemPress(
            row.original.hisaHorseMedicalId || row.original.internalId || ""
          )
        }
        className={rowClassName}
      >
        {getRecType(t, getValue() as string)}
      </div>
    ),
  },
  {
    header: () => (
      <div className={columnHeaderCN} onClick={() => handleSort("date")}>
        <div className={columnHeaderTitleCN}>{t("dateTime")}</div>
        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "date",
    cell: ({ row, getValue }) => {
      const date = getValue() as string;
      return (
        <div
          onClick={() =>
            onItemPress(
              row.original.hisaHorseMedicalId || row.original.internalId || ""
            )
          }
          className={rowClassName}
        >
          {date ? DateTime.fromISO(date).toFormat("LLL dd, yyyy") : "-"}
        </div>
      );
    },
  },
  {
    header: () => (
      <div
        className={columnHeaderCN}
        onClick={() => handleSort("locationName")}
      >
        <div className={columnHeaderTitleCN}>{t("track")}</div>
        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "locationName",
    cell: ({ row, getValue }) => (
      <div
        onClick={() =>
          onItemPress(
            row.original.hisaHorseMedicalId || row.original.internalId || ""
          )
        }
        className={rowClassName}
        style={{ position: "relative" }}
      >
        {(getValue() as string) || "-"}
        {row.original.isSynced === false ? (
          <div className="bg-d2 px-2 text-tDefault text-xs rounded-md absolute top-0 right-0.5">
            {t("dataNotSynced")}
          </div>
        ) : null}
      </div>
    ),
  },
];
