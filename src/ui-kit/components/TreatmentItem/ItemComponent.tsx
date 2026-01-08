import { TOption } from "@/runnersQcApp/containers/AddRecordContainer/helper";
import React from "react";
export type ItemComponentProps = {
  option: TOption;
};

export const ItemComponent: React.FC<ItemComponentProps> = ({ option }) => {
  return (
    <div
      key={option.key}
      className="flex flex-row w-full justify-between items-center sm:items-baseline sm:flex-col"
    >
      <span className="text-tPlaceholder text-xs uppercase font-medium">
        {option.label}
      </span>
      <span className="text-tDefault text-sm">{option.value || "—"}</span>
    </div>
  );
};
