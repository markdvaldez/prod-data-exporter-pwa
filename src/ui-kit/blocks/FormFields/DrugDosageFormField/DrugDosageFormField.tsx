import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useDeviceOrientation } from "@/ui-kit/hooks/useDeviceOrientation";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { DosageField } from "../DosageField";
import { MeasureField } from "../MeasureField";

export const DrugDosageFormField: React.FC<{ label: string }> = memo(
  ({ label }) => {
    const t = useTranslations("AddRecord");
    const orientation = useDeviceOrientation();

    return (
      <div className="flex flex-1 flex-row justify-center">
        <div className="flex flex-col flex-1">
          <FieldLabel labelStyles="justify-center" label={label} />
          <div className="flex flex-row">
            <div className="mr-2 flex flex-col flex-1">
              <DosageField name="drugDosage" placeholder={t("drugDosage")} />
            </div>
            <div
              className={cn(
                "flex flex-col",
                orientation === "landscape" ? "flex-none" : "flex-1"
              )}
            >
              <MeasureField name="measure" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

DrugDosageFormField.displayName = "DrugDosageFormField";
