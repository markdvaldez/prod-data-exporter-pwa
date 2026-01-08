import { cn } from "@/ui-kit/lib/utils";
import React, { memo, MouseEvent, useCallback } from "react";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";

export type SearchPersonListItemProps<T> = {
  title: string;
  description?: string;
  value: T;
  itemStyles?: string;
  onClick?: (value: T) => void;
};

export const SearchPersonListItem: React.FC<SearchPersonListItemProps<any>> =
  memo(({ title, description = "", value, itemStyles, onClick }) => {
    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(value);
      },
      [value, onClick]
    );

    return (
      <div
        className={cn(
          "px-4 h-18 group  flex flex-row items-center rounded-xl bg-w0 border border-b10 hover:cursor-pointer hover:bg-a8 transition-colors duration-200 relative",
          itemStyles
        )}
        onClick={handleClick}
      >
        <div className="flex flex-1 flex-col my-2">
          <div className="text-sm text-t-default font-semibold">{title}</div>
          <div className="mt-1 text-sm text-t-default/50">{description}</div>
        </div>
        <ChevronRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    );
  });

SearchPersonListItem.displayName = "SearchPersonListItem";
