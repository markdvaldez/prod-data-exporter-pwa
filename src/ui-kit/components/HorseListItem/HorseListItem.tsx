"use client";

import React, { useCallback } from "react";
import { HighlightText } from "../HighlightText";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";
import { HorseIcon } from "../Icons/HorseIcon";
import { Separator } from "../Separator";

export type Status = "scratched" | "flagged" | "cleared";

const statusStyles: Record<Status, { bgColor: string; iconFilter: string }> = {
  scratched: { bgColor: "bg-e1", iconFilter: "filter-scratched" },
  flagged: { bgColor: "bg-c0", iconFilter: "filter-flagged" },
  cleared: { bgColor: "bg-a8", iconFilter: "filter-cleared" },
};

export type HorseListItemProps = {
  title: string | null | undefined;
  subTitle?: string | null | undefined;
  status?: Status;
  showIcon?: boolean;
  isLastItem?: boolean;
  onItemPress?: (hisaHorseId: string) => void;
  hisaHorseId: string;
  searchText?: string;
};

export const HorseListItem: React.FC<HorseListItemProps> = ({
  title,
  subTitle,
  status,
  showIcon = true,
  isLastItem = false,
  onItemPress,
  hisaHorseId,
  searchText,
}) => {
  const { bgColor, iconFilter } = status
    ? statusStyles[status]
    : { bgColor: "bg-a8", iconFilter: "filter-cleared" };

  const handleItemPress = useCallback(() => {
    onItemPress?.(hisaHorseId);
  }, [hisaHorseId, onItemPress]);
  return (
    <>
      <div
        onClick={handleItemPress}
        className="justify-between self-stretch py-4 px-2 flex-row flex items-center hover:cursor-pointer hover:bg-a9 rounded-sm"
      >
        <div className="flex-row flex items-center">
          <div
            className={`w-12 h-12 sm:w-11 sm:h-11 items-center justify-center flex rounded-2xl mr-3 ${bgColor}`}
          >
            <HorseIcon />
          </div>
          <div className="flex flex-col">
            <HighlightText
              className="flex-1"
              text={title || ""}
              searchText={searchText}
            />
            <HighlightText
              className="text-tPlaceholder text-md sm:text-sm mt-1 sm:mt-0"
              text={subTitle || ""}
              searchText={searchText}
            />
          </div>
        </div>
        {showIcon ? <ChevronRightIcon /> : null}
      </div>
      {!isLastItem ? <Separator className="ml-14" /> : null}
    </>
  );
};
