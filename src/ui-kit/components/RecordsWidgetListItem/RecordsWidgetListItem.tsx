"use client";
import { useTranslations } from "next-intl";
import React from "react";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";
import { Separator } from "../Separator";

type RecordsWidgetListItemProps = {
  id: string;
  day?: string;
  month?: string;
  horseName?: string;
  horseId?: string;
  description?: string;
  conditionTreated?: string;
  thirdField?: string;
  bordered?: boolean;
  drug: string;
  isSynced?: boolean;
  recType?: string;
  onClick?: () => void;
};

export const RecordsWidgetListItem: React.FC<RecordsWidgetListItemProps> = ({
  day,
  month,
  horseName,
  horseId,
  description,
  conditionTreated,
  drug,
  thirdField,
  isSynced,
  recType,
  bordered,
  onClick,
}) => {
  const t = useTranslations();
  return (
    <>
      <div
        className="group flex flex-row sm:py-5 p-3 rounded-sm items-center bg-w0 hover:cursor-pointer hover:bg-a8 transition-colors duration-200 relative min-h-[92px]"
        onClick={onClick}
      >
        <div className="flex flex-col w-10 h-10 border-r items-center justify-center">
          <div className="text-lg font-semibold text-tDefault">{day}</div>
          <div className="text-xs font-medium text-tDefault">{month}</div>
        </div>
        <div className="flex flex-col flex-1 pl-3 truncate">
          <div className="text-tDefault font-normal text-sm ">
            <span className="font-semibold mr-2">{horseName}</span>
            {horseId}
          </div>
          {recType ? (
            <div className="text-tPlaceholder text-sm mt-1">{recType}</div>
          ) : null}

          {description ? (
            <div className="text-tPlaceholder text-sm mt-1">{description}</div>
          ) : null}
          {drug ? (
            <div className="text-tPlaceholder text-sm mt-1">{`${t(
              "Widget.drugName"
            )}: ${drug}`}</div>
          ) : (
            <>
              {conditionTreated ? (
                <div className="text-tPlaceholder text-sm mt-1">{`${t(
                  "Widget.conditionTreated"
                )}: ${conditionTreated}`}</div>
              ) : (
                <div className="text-tPlaceholder text-sm mt-1">
                  {thirdField}
                </div>
              )}
            </>
          )}
        </div>
        <ChevronRightIcon className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        {bordered ? (
          <Separator className="absolute left-3 right-3 bottom-0" />
        ) : null}
        {isSynced ? null : (
          <div className="bg-d2 px-2 py-1 text-tDefault text-xs rounded-lg absolute top-0 right-0">
            {t("AddRecord.dataNotSynced")}
          </div>
        )}
      </div>
    </>
  );
};
