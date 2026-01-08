import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { THorse } from "@/runnersQcApp/shared/types";
import { HorseIcon } from "@/ui-kit/components/Icons/HorseIcon";
import { MinusIcon } from "@/ui-kit/components/Icons/MinusIcon";
import { Separator } from "@/ui-kit/components/Separator";

import React, { memo, useCallback, useMemo } from "react";

export type HorseItemMainProps = {
  horse: THorse;
  isLastItem: boolean;
  onItemPress?: (item: THorse) => void;
};

export const HorseItemMain: React.FC<HorseItemMainProps> = memo(
  ({ horse, isLastItem, onItemPress }) => {
    const horseId = useMemo(() => {
      return getFormattedId(horse?.hisaHorseId || "");
    }, [horse?.hisaHorseId]);

    const onHorsePress = useCallback(() => {
      onItemPress?.(horse);
    }, [horse, onItemPress]);

    return (
      <>
        <div className="justify-between self-stretch py-4 flex-row flex items-center">
          <div className="flex-row flex items-center">
            <div className="w-12 h-12 sm:w-11 sm:h-11 items-center justify-center flex rounded-2xl mr-3 bg-a8">
              <HorseIcon />
            </div>
            <div>
              <div className="text-tDefault font-medium text-md sm:text-sm mt-1 sm:mt-0 mb-1 font-[family-name:var(--font-dm-sans)]">
                {horse.name}
              </div>
              <div className="text-tPlaceholder text-md sm:text-sm mt-1 sm:mt-0 font-[family-name:var(--font-dm-sans)]">
                {horseId}
              </div>
            </div>
          </div>
          <div
            data-testid="minus-icon"
            className="flex justify-end h-8 w-8 md:h-6 md:w-6"
            onClick={onHorsePress}
          >
            <MinusIcon />
          </div>
        </div>
        {!isLastItem ? <Separator className="ml-14" /> : null}
      </>
    );
  }
);

HorseItemMain.displayName = "HorseItemMain";
