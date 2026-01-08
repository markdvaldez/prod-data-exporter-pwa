import { getFormattedLocation } from "@/utils/locationId";
import { useTranslations } from "next-intl";
import React, { memo, useMemo } from "react";
import { Button } from "../Button";

type TreatmentLocationProps = {
  location?: {
    locationId: string;
    locationName: string;
  };
  label?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const TreatmentLocation: React.FC<TreatmentLocationProps> = memo(
  ({ location, label, onConfirm, onCancel }) => {
    const t = useTranslations("AddRecord");

    const title = useMemo(() => {
      return getFormattedLocation({
        name: location?.locationName,
        hisaId: location?.locationId,
      });
    }, [location?.locationName, location?.locationId]);

    return (
      <div className="flex flex-col xl:flex-row xl:justify-between p-4 bg-b9 rounded-lg">
        <div>
          <div className="text-sm text-tDefault">
            {label || t("locationQuestion")}
          </div>
          <div className="pt-3 text-base text-tDefault">{`${title}?`}</div>
        </div>
        <div className="flex flex-row items-stretch mt-4 justify-between">
          <Button
            variant="outline"
            className="flex flex-1 h-10 bg-transparent border border-b5 xl:w-20"
            title={t("no")}
            onClick={onCancel}
          />
          <Button
            className="flex flex-1 h-10 ml-4 xl:w-20"
            title={t("yes")}
            onClick={onConfirm}
          />
        </div>
      </div>
    );
  }
);

TreatmentLocation.displayName = "TreatmentLocation";
