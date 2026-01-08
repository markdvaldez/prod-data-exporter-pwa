"use client";

import React from "react";

type RecordDetailsListItemProps = {
  label: string;
  value?: string;
  isLastItem?: boolean;
};

export const RecordDetailsListItem: React.FC<RecordDetailsListItemProps> = ({
  label,
  value,
  isLastItem,
}) => {
  return (
    <div
      className={`flex items-center px-2 py-3 justify-between ${
        !isLastItem && "border-b"
      }`}
    >
      <div className="pr-4 text-sm font-medium text-left">{label}</div>
      <div className="text-sm font-normal text-right">{value}</div>
    </div>
  );
};
