"use client";

import { cn } from "@/ui-kit/lib/utils";
import React, { useCallback, useMemo } from "react";
import { CanWorkCantRaceIcon } from "../Icons/CanWorkCantRaceIcon";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";
import { ShieldIcon } from "../Icons/ShieldIcon";
import { ShieldRedIcon } from "../Icons/ShieldRedIcon";
import { Separator } from "../Separator";

export type HorseDetailsItemProps = {
  hisaHorseId?: string;
  name?: string;
  canRace?: boolean | null;
  canWork?: boolean;
  responsiblePerson?: string;
  locationName?: string;
  bordered?: boolean;
  className?: string;
  onClick?: (hisaHorseId: string) => void;
};

export const HorseDetailsListItem: React.FC<HorseDetailsItemProps> = ({
  hisaHorseId = "",
  name = "",
  canRace,
  canWork,
  responsiblePerson = "",
  locationName = "",
  bordered,
  className,
  onClick,
}) => {
  const description = useMemo(() => {
    let result = "";
    result += canRace ? "Can race" : "Can't race";
    if (responsiblePerson) {
      result += ` · ${responsiblePerson}`;
    }
    return result;
  }, [canRace, responsiblePerson]);

  const handleClick = useCallback(() => {
    onClick?.(hisaHorseId);
  }, [hisaHorseId, onClick]);

  const Shield = useMemo(() => {
    if (!canRace && !canWork) {
      return ShieldRedIcon;
    } else if (!canRace && canWork) {
      return CanWorkCantRaceIcon;
    }
    return ShieldIcon;
  }, [canRace, canWork]);

  return (
    <div
      className={cn(
        "group flex flex-row max-w-full sm:py-5 p-3 rounded-sm items-center bg-w0 hover:cursor-pointer hover:bg-a8 transition-colors duration-200 relative min-h-[92px]",
        className
      )}
      onClick={handleClick}
    >
      <Shield width={40} height={40} />
      <div className="flex max-w-full flex-col flex-1 pl-3">
        <div className="flex max-w-full text-tDefault font-normal text-sm">
          <span className="font-semibold mr-2">{name}</span>
          {hisaHorseId}
        </div>
        <div className="flex max-w-full text-tPlaceholder text-sm mt-1 ">
          {description}
        </div>
        {locationName ? (
          <div className="flex max-w-full text-tPlaceholder text-sm mt-1 ">
            {locationName}
          </div>
        ) : null}
      </div>
      <ChevronRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      {bordered ? (
        <Separator className="absolute left-3 right-3 bottom-0" />
      ) : null}
    </div>
  );
};
