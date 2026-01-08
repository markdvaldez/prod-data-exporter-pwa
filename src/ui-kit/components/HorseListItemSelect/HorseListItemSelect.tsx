"use client";

import { THorse } from "@/runnersQcApp/shared/types";
import React, { useCallback, useState } from "react";
import { Checkbox } from "../Checkbox";
import { HorseIcon } from "../Icons/HorseIcon";
import { Separator } from "../Separator";
export type HorseListItemSelectProps = {
  title: string | null | undefined;
  subTitle?: string | null | undefined;
  isChecked?: boolean;
  onCheckedChange?: (horse: THorse) => void;
  isLastItem?: boolean;
  horse: THorse;
  withCheckbox?: boolean;
};

export const HorseListItemSelect: React.FC<HorseListItemSelectProps> = ({
  title,
  subTitle,
  horse,
  withCheckbox = true,
  isChecked = false,
  onCheckedChange,
  isLastItem = false,
}) => {
  const [isSelected, setIsSelected] = useState(isChecked);

  const handleItemClick = useCallback(() => {
    onCheckedChange?.(horse);
    setIsSelected(!isSelected);
  }, [horse, isSelected, onCheckedChange]);

  return (
    <>
      <div
        onClick={handleItemClick}
        className="justify-between self-stretch py-4 flex-row flex items-center cursor-pointer hover:bg-a8 transition-colors duration-200"
      >
        <div className="flex-row flex items-center pl-4">
          <div
            className={`w-11 h-11 items-center justify-center flex rounded-2xl mr-3 bg-a8`}
          >
            <HorseIcon />
          </div>
          <div>
            <div className="text-tDefault font-medium text-sm mt-1 sm:mt-0 mb-1 font-[family-name:var(--font-geist-sans)]">
              {title}
            </div>
            <div className="text-tPlaceholder text-sm mt-1 sm:mt-0 font-[family-name:var(--font-geist-sans)]">
              {subTitle}
            </div>
          </div>
        </div>
        {withCheckbox ? (
          <Checkbox checked={isChecked} className="ml-2 mr-4" />
        ) : null}
      </div>
      {!isLastItem ? <Separator className="ml-14" /> : null}
    </>
  );
};
