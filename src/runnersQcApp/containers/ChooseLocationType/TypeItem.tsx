import { RadioButtonNew } from "@/ui-kit/components/RadioButtonNew";
import React, { memo } from "react";

export type TypeItemProps = {
  item: { id: string; value: string };
  isActive?: boolean;
  onClick: () => void;
};

export const TypeItem: React.FC<TypeItemProps> = memo(
  ({ item, isActive = false, onClick }) => {
    return (
      <div
        className="flex flex-1 flex-row justify-between items-start pb-8 hover:cursor-pointer"
        onClick={onClick}
      >
        <RadioButtonNew isActive={isActive} />
        <div className="flex flex-1 text-base font-medium text-tDefault ml-5">
          {item.value}
        </div>
      </div>
    );
  }
);

TypeItem.displayName = "TypeItem";
