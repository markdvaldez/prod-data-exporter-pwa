import React, { memo } from "react";

export type ConfirmViewItemProps = {
  name: string;
  value?: string;
};

export const ConfirmViewItem: React.FC<ConfirmViewItemProps> = memo(
  ({ name, value }) => {
    return (
      <>
        <div className="text-sm text-tDefault font-bold">{name}</div>
        <div className="text-base font-medium text-tDefault pt-2 pb-6">
          {value}
        </div>
      </>
    );
  }
);

ConfirmViewItem.displayName = "ConfirmViewItem";
