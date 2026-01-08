import { THorse } from "@/runnersQcApp/shared/types";
import { TreatmentHorsesListPanel } from "@/ui-kit/blocks/TreatmentHorsesListPanel";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useState } from "react";
import { ChevronRightIcon } from "../Icons/ChevronRightIcon";
type TreatmentListItemProps = {
  label?: string;
  value?: string | number | null;
  description?: string | null;
  horses?: THorse[];
  withDivider?: boolean;
};

export const TreatmentHorseListItem: React.FC<TreatmentListItemProps> = memo(
  ({ label, value, withDivider, horses }) => {
    const t = useTranslations("AddRecord");

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const toggle = useCallback(() => {
      setIsPanelOpen(!isPanelOpen);
    }, [isPanelOpen]);

    return (
      <>
        <div
          className="flex flex-row justify-between items-center py-3"
          onClick={toggle}
        >
          <div className="text-md sm:text-sm font-medium pr-4 text-dDefault">
            {label}
          </div>
          <div className="flex flex-1 items-end">
            <div className="text-sm text-tDefault">{value || ""}</div>
          </div>

          <ChevronRightIcon />
        </div>
        {withDivider ? <div className="self-stretch bg-b9 h-px" /> : null}
        <TreatmentHorsesListPanel
          isOpen={isPanelOpen}
          title={t("selectedHorses")}
          selectedHorses={horses}
          handleOpen={toggle}
        />
      </>
    );
  }
);

TreatmentHorseListItem.displayName = "TreatmentHorseListItem";
