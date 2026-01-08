import React, { memo } from "react";

type ConfirmationListItemProps = {
  label?: string;
  value?: string | null;
  description?: string | null;
  withDivider?: boolean;
};

export const ConfirmationListItem: React.FC<ConfirmationListItemProps> = memo(
  ({ label = "", value = "", withDivider }) => {
    return (
      <>
        <div className="flex flex-1 flex-row justify-between py-3">
          <div className="text-md sm:text-sm font-semibold pr-4 text-dDefault">
            {label}
          </div>
          <div className="flex items-end pr-2 sm:pr-0">
            <div className="text-md sm:text-sm text-tDefault max-w-52 sm:max-w-none">
              {value || ""}
            </div>
          </div>
        </div>
        {withDivider ? <div className="self-stretch bg-b9 h-px" /> : null}
      </>
    );
  }
);

ConfirmationListItem.displayName = "ConfirmationListItem";
