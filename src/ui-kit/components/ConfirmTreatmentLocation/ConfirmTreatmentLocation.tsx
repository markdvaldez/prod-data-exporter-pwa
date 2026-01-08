import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { Button } from "../Button";

type ConfirmTreatmentLocationProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmTreatmentLocation: React.FC<ConfirmTreatmentLocationProps> =
  memo(({ title, description, onConfirm, onCancel }) => {
    const t = useTranslations("Location");

    return (
      <div className="flex flex-col p-4 bg-b9 rounded-lg">
        <div className="text-base text-tDefault">
          {title || t("locationQuestion")}
        </div>
        <div className="pt-2 text-base text-tDefault">{description}</div>
        <div className="flex flex-row items-stretch mt-4 justify-between">
          <Button
            variant="outline"
            className="flex flex-1 h-10 bg-transparent border border-b5 xl:w-20"
            title={t("cancel")}
            onClick={onCancel}
          />
          <Button
            className="flex flex-1 h-10 ml-4 xl:w-20"
            title={t("confirmLocation")}
            onClick={onConfirm}
          />
        </div>
      </div>
    );
  });

ConfirmTreatmentLocation.displayName = "ConfirmTreatmentLocation";
