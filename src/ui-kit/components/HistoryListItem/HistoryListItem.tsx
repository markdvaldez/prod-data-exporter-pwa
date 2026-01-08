"use client";

import { useTranslations } from "next-intl";
import React from "react";

export type HistoryListItemProps = {
  id: string;
  date?: string;
  hisaHorseName?: string;
  horseId?: string;
  descriptionText?: string | null;
  onClick?: () => void;
  locationName?: string;
  isLastItem?: boolean;
  isSynced?: boolean;
};

export const HistoryListItem: React.FC<HistoryListItemProps> = ({
  id,
  date,
  hisaHorseName,
  horseId,
  descriptionText,
  locationName,
  onClick,
  isLastItem,
}) => {
  const t = useTranslations();

  return (
    <div
      className={`flex items-center px-4 py-4 hover:bg-a0/10 transition-colors cursor-pointer hover:border-transparent ${
        !isLastItem && "border-b"
      }`}
      onClick={onClick}
    >
      <div className="w-1/5 truncate text-sm font-normal">{hisaHorseName}</div>
      <div className="w-1/5 truncate text-sm font-normal">{horseId}</div>
      <div className="w-1/5 truncate text-sm font-normal">
        {descriptionText}
      </div>
      <div className="w-1/5 truncate text-sm font-normal">{date}</div>
      <div className="w-1/5 truncate text-sm font-normal">{locationName}</div>
    </div>
  );
};
