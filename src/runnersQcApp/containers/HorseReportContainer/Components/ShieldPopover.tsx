"use client";

import { CanWorkCantRaceIcon } from "@/ui-kit/components/Icons/CanWorkCantRaceIcon";
import { ShieldIcon } from "@/ui-kit/components/Icons/ShieldIcon";
import { ShieldRedIcon } from "@/ui-kit/components/Icons/ShieldRedIcon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui-kit/components/Popover/PopoverCustom";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";

type ShieldPopoverProps = {
  canRace?: boolean;
  canWork?: boolean;
  canRaceReason?: string;
  canWorkReason?: string;
};

export const ShieldPopover: React.FC<ShieldPopoverProps> = ({
  canRace,
  canWork,
  canRaceReason,
  canWorkReason,
}) => {
  const t = useTranslations("HorseReport");

  const Shield = useMemo(() => {
    if (!canRace && !canWork) {
      return ShieldRedIcon;
    } else if (!canRace && canWork) {
      return CanWorkCantRaceIcon;
    }
    return ShieldIcon;
  }, [canRace, canWork]);

  const content = useMemo(() => {
    if (canRaceReason) {
      return canRaceReason;
    } else if (canWorkReason) {
      return canWorkReason;
    } else {
      return "";
    }
  }, [canRaceReason, canWorkReason]);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer">
            <Shield />
          </div>
        </PopoverTrigger>

        {content ? (
          <PopoverContent className="bg-a8">
            {
              <div className="rounded-md flex flex-col">
                <span className="font-semibold text-lg lg:text-base">
                  {canRace ? t("canRace") : t("cantRace")}
                </span>
                <span>{content}</span>
              </div>
            }
          </PopoverContent>
        ) : null}
      </Popover>
    </div>
  );
};
