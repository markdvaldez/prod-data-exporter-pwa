import { DateTime } from "luxon";

import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { getRecType } from "@/runnersQcApp/shared/TextUtils";
import { TFunc, THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { ArrowUpDownIcon } from "@/ui-kit/components/Icons/ArrowUpDownIcon";
import { ColumnDef } from "@tanstack/react-table";
import { columnHeaderCN, columnHeaderTitleCN, rowClassName } from "../helpers";
import routes from "@/routes";
import { useRouter } from "next/navigation";

type TColumnDefs = {
  t: TFunc;
  onItemPress: (id: string) => void;
  handleSort: (column: string) => void;
  onHorseClick?: (horseId: string) => void;
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
  onHorseClick,
}: TColumnDefs): ColumnDef<THorseMedicalRecord, string>[] => [
  {
    header: () => (
      <div
        className={columnHeaderCN}
        onClick={() => handleSort("hisaHorseMedicalId")}
      >
        <div className={columnHeaderTitleCN}>{t("id")}</div>
        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "hisaHorseMedicalId",
    cell: ({ row, getValue }: TCellArgs) => {
      const entityId = getFormattedId((getValue() as string) || "-");
      const horseId = row.original.hisaHorseId;
      
      // Check if this is a horse entity ID (starts with H-)
      const isHorseEntity = entityId.startsWith('H-');
      
      return (
        <div className={rowClassName}>
          {isHorseEntity && horseId && onHorseClick ? (
            <span
              className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onHorseClick(horseId);
              }}
            >
              {entityId}
            </span>
          ) : (
            <span
              onClick={() => onItemPress(row.original.hisaHorseMedicalId || "")}
            >
              {entityId}
            </span>
          )}
        </div>
      );
    },
  },
  {
    header: () => (
      <div className={columnHeaderCN} onClick={() => handleSort("recType")}>
        <div className={columnHeaderTitleCN}>{t("recordType")}</div>
        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "recType",
    cell: ({ row, getValue }: TCellArgs) => (
      <div
        className={rowClassName}
        onClick={() => onItemPress(row.original.hisaHorseMedicalId || "")}
      >
        {getRecType(t, getValue() as string)}
      </div>
    ),
  },
  {
    header: () => (
      <div
        className={columnHeaderCN}
        onClick={() => handleSort("conditionTreated")}
      >
        <div className={columnHeaderTitleCN}>{t("conditionTreated")}</div>
        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "conditionTreated",
    cell: ({ row, getValue }: TCellArgs) => (
      <div
        className={rowClassName}
        onClick={() => onItemPress(row.original.hisaHorseMedicalId || "")}
      >
        {(getValue() as string) || "-"}
      </div>
    ),
  },
  {
    header: () => (
      <div className={columnHeaderCN} onClick={() => handleSort("date")}>
        <div className={columnHeaderTitleCN}>{t("date")}</div>

        <ArrowUpDownIcon
          width={16}
          height={16}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    ),
    accessorKey: "date",
    cell: ({ row, getValue }: TCellArgs) => {
      const date = getValue() as string;
      return (
        <div
          className={rowClassName}
          onClick={() => onItemPress(row.original.hisaHorseMedicalId || "")}
        >
          {date ? DateTime.fromISO(date).toFormat("LLL dd, yyyy") : "-"}
        </div>
      );
    },
  },
];
