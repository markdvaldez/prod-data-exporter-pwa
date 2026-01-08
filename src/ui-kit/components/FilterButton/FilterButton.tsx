import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";
import { FilterIcon } from "../Icons/FilterIcon";

export type FilterButtonProps = {
  isSelected?: boolean;
  isOpen?: boolean;
  onClick: () => void;
};

export const FilterButton: React.FC<FilterButtonProps> = memo(
  ({ isSelected = false, isOpen, onClick }) => {
    const t = useTranslations("Main");

    return (
      <div
        className="flex px-2 py-2 items-center cursor-pointer h-12 max-w-28 sm:h-10 "
        onClick={onClick}
      >
        <div className="relative">
          <FilterIcon />
          {isSelected && (
            <div className="absolute top-0.5 right-0 w-2 h-2 bg-a0 rounded-full z-10 border border-1 border-w0" />
          )}
        </div>
        <span className="ml-2 text-tDefault text-base lg:text-sm font-normal">
          {t("filters")}
        </span>
        <div
          className={cn(
            "transform transition-transform duration-200",
            isOpen ? "-rotate-90" : "rotate-90"
          )}
        >
          <ChevronRightIcon />
        </div>
      </div>
    );
  }
);

FilterButton.displayName = "FilterButton";
