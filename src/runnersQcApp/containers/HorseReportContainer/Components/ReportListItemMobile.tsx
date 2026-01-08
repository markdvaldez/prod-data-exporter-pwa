"use client";
import { ChevronRightIcon } from "@/ui-kit/components/Icons/ChevronRightIcon";
import { Separator } from "@/ui-kit/components/Separator";
import { useTranslations } from "next-intl";
import React from "react";

type HistoryListItemMobileProps = {
  id: string;
  day?: string;
  month?: string;
  horseId?: string;
  description?: string;
  conditionTreated?: string;
  thirdField?: string;
  bordered?: boolean;
  drug?: string;
  isSynced?: boolean;
  onClick?: () => void;
  onHorseClick?: (horseId: string) => void;
  actualHorseId?: string;
};

export const ReportListItemMobile: React.FC<HistoryListItemMobileProps> = ({
  id,
  day,
  month,
  horseId,
  description,
  conditionTreated,
  drug,
  thirdField,
  isSynced,
  bordered,
  onClick,
  onHorseClick,
  actualHorseId,
}) => {
  const t = useTranslations("HorseReport");
  
  // Check if this is a horse entity ID (starts with H-)
  const isHorseEntity = horseId?.startsWith('H-');
  
  return (
    <>
      <div
        className="group flex flex-row h-16 px-3 py-10 rounded-sm items-center bg-w0 hover:cursor-pointer hover:bg-a8 transition-colors duration-200 relative"
        onClick={onClick}
      >
        <div className="flex flex-col w-10 h-10 border-r items-center justify-center">
          <div className="text-lg font-semibold text-tDefault">{day}</div>
          <div className="text-xs font-medium text-tDefault">{month}</div>
        </div>
        <div className="flex flex-col flex-1 pl-3 truncate">
          <div className="text-tDefault font-normal text-base lg:text-sm ">
            {isHorseEntity && actualHorseId && onHorseClick ? (
              <span
                className="font-semibold mr-2 text-blue-600 hover:text-blue-800 underline cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onHorseClick(actualHorseId);
                }}
              >
                {horseId}
              </span>
            ) : (
              <span className="font-semibold mr-2">{horseId}</span>
            )}
          </div>

          {description ? (
            <div className="text-tPlaceholder text-base lg:text-sm ">
              {description}
            </div>
          ) : null}
          {drug ? (
            <div className="text-tPlaceholder text-base lg:text-sm ">{`${t(
              "drugName"
            )}: ${drug}`}</div>
          ) : (
            <>
              {conditionTreated ? (
                <div className="text-tPlaceholder text-base lg:text-sm ">{`${t(
                  "conditionTreated"
                )}: ${conditionTreated}`}</div>
              ) : (
                <div className="text-tPlaceholder text-base lg:text-sm ">
                  {thirdField}
                </div>
              )}
            </>
          )}
        </div>
        <ChevronRightIcon />
        {bordered ? (
          <Separator className="absolute left-3 right-3 bottom-0" />
        ) : null}
      </div>
    </>
  );
};
