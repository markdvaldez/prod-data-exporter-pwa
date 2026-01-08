import { useTranslations } from "next-intl";
import React, { memo, useCallback } from "react";
import { Button } from "../Button";

type AddTreatmentLocationWidgetProps = {
  title?: string;
  description?: string;
  onConfirm: (type: string) => void;
  onCancel: () => void;
};

export const AddTreatmentLocationWidget: React.FC<AddTreatmentLocationWidgetProps> =
  memo(({ title, description, onConfirm, onCancel }) => {
    const t = useTranslations("Location");
    const handleClick = useCallback(() => {
      onConfirm("choose");
    }, [onConfirm]);

    return (
      <div className="flex flex-col p-4 bg-b9 rounded-lg">
        <div className="text-base text-tDefault">
          {title || t("locationQuestion")}
        </div>
        <div className="flex flex-row items-stretch mt-4 justify-between">
          <Button
            variant="outline"
            className="flex flex-1 h-10 bg-transparent border border-b5 xl:w-20"
            title={t("cancel")}
            onClick={onCancel}
          />
          <Button
            className="flex flex-1 h-10 ml-4 xl:w-20"
            title={t("addLocation")}
            onClick={handleClick}
          />
        </div>
      </div>
    );
  });

AddTreatmentLocationWidget.displayName = "AddTreatmentLocationWidget";
