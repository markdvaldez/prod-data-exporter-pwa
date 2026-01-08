import { TLocation } from "@/services/store/modules/locations/types";
import { cn } from "@/ui-kit/lib/utils";
import React, { memo, MouseEvent, useCallback } from "react";
import { FavoriteButton } from "../FavoriteButton";
import { HighlightText } from "../HighlightText";

export type SearchListItemProps<T> = {
  label: string;
  value: T;
  itemStyles?: string;
  searchText?: string;
  bordered?: boolean;
  isFavorite?: boolean;
  isState?: boolean;
  isAddress?: boolean;
  showDistance?: boolean;
  address?: string;
  distance?: string;
  onClick?: (value: T) => void;
  onFavoriteClick?: (location: TLocation) => void;
};

export const SearchLocationListItem: React.FC<SearchListItemProps<any>> = memo(
  ({
    label,
    value,
    itemStyles,
    searchText,
    isFavorite,
    isState,
    isAddress,
    showDistance,
    address,
    distance,
    onClick,
    onFavoriteClick,
  }) => {
    const handleClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(value);
      },
      [value, onClick]
    );

    const handleFavoriteClick = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onFavoriteClick?.(value);
      },
      [onFavoriteClick, value]
    );

    return (
      <div
        className={cn(
          "pl-4 pr-0 py-3 min-h-18 group flex flex-row items-center rounded-xl bg-w0 border border-b10 hover:cursor-pointer hover:bg-a8 transition-colors duration-200 relative",
          itemStyles
        )}
        onClick={handleClick}
      >
        <div className="flex flex-1 flex-col">
          <HighlightText
            className="flex-1 text-sm text-t-default font-semibold"
            text={label || ""}
            searchText={searchText}
          />
          <HighlightText
            className="flex-1 mt-1 text-sm text-b0/50"
            text={address || ""}
            searchText={searchText}
          />
          {showDistance && distance && (
            <div className="flex mt-1 text-t-default text-sm md:hidden">
              {distance} mi
            </div>
          )}
        </div>
        {showDistance && distance && (
          <div className="hidden md:flex items-end self-end text-t-default text-sm mx-1">
            {distance} mi
          </div>
        )}
        {!isState && !isAddress ? (
          <FavoriteButton isActive={isFavorite} onClick={handleFavoriteClick} />
        ) : null}
      </div>
    );
  }
);

SearchLocationListItem.displayName = "SearchLocationListItem";
