"use client";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import React from "react";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";
import { Separator } from "../Separator";

type HistoryListItemMobileProps = {
  day?: string;
  month?: string;
  horseName?: string;
  horseId?: string;
  description?: string;
  conditionTreated?: string;
  thirdField?: string;
  bordered?: boolean;
  drug?: string;
  isSynced?: boolean;
  onClick?: () => void;
};

export const HistoryListItemMobile: React.FC<HistoryListItemMobileProps> = ({
  day,
  month,
  horseName,
  horseId,
  description,
  conditionTreated,
  drug,
  thirdField,
  isSynced,
  bordered,
  onClick,
}) => {
  const t = useTranslations();
  return (
    <>
      <div
        className={cn(
          "group flex flex-row h-16 px-3 py-10 rounded-sm items-center bg-w0 hover:cursor-pointer hover:bg-a8 transition-colors duration-200 relative",
          isSynced ? null : "border-l-2 border-d2"
        )}
        onClick={onClick}
      >
        {isSynced ? null : (
          <div className="bg-d2 px-2 py-1 text-tDefault text-xs rounded-lg absolute top-0.5 right-0">
            {t("AddRecord.dataNotSynced")}
          </div>
        )}
        <div className="flex flex-col w-10 h-10 border-r items-center justify-center">
          <div className="text-lg font-semibold text-tDefault">{day}</div>
          <div className="text-xs font-medium text-tDefault">{month}</div>
        </div>
        <div className="flex flex-col flex-1 pl-3 truncate">
          <div className="text-tDefault font-normal text-base lg:text-sm ">
            <span className="font-semibold mr-2">{horseName}</span>
            {horseId}
          </div>
          {description ? (
            <div className="text-tPlaceholder text-base lg:text-sm ">
              {description}
            </div>
          ) : null}
          {drug ? (
            <div className="text-tPlaceholder text-base lg:text-sm ">{`${t(
              "Widget.drugName"
            )}: ${drug}`}</div>
          ) : (
            <>
              {conditionTreated ? (
                <div className="text-tPlaceholder text-base lg:text-sm ">{`${t(
                  "Widget.conditionTreated"
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
