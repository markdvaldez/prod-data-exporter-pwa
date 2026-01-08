import { TreatmentTemplateModel, TreatmentTemplateRequest } from "@/Types";
import { Button } from "@/ui-kit/components/Button";
import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useMemo } from "react";

export type ButtonsFirstStepProps = {
  isLoading?: boolean;
  treatments?: TreatmentTemplateRequest[] | null;
  currentTreatment?: TreatmentTemplateModel | null;
  onPress: () => void;
  handleComplete?: () => void;
  handleCancel: () => void;
};

export const ButtonsFirstStep: React.FC<ButtonsFirstStepProps> = memo(
  ({
    isLoading,
    treatments,
    currentTreatment,
    onPress,
    handleComplete,
    handleCancel,
  }) => {
    const t = useTranslations();

    const hasTreatments = useMemo(() => {
      return !_.isEmpty(treatments);
    }, [treatments]);

    const title = useMemo(() => {
      return currentTreatment
        ? t("AddRecord.save")
        : t("Protocols.addToProtocol");
    }, [currentTreatment, t]);

    return (
      <footer className="sm:mt-6 z-10">
        <div className="border-t border-b8 pb-2 sm:pb-4" />
        <div className="flex flex-1justify-between">
          <div className="hidden sm:block">
            <Button
              className="bg-transparent border-1 border-a0"
              variant="outline"
              title={t("AddRecord.cancel")}
              onClick={handleCancel}
            />
          </div>
          <div
            className={cn(
              `flex flex-1 w-[calc(100vw-32px)] sm:w-full sm:justify-end bg-mainBackground`,
              hasTreatments && !currentTreatment
                ? "justify-between gap-3 sm:gap-0"
                : "justify-end"
            )}
          >
            {hasTreatments && !currentTreatment ? (
              <Button
                className="flex flex-1 sm:flex-none rounded-xl bg-d2 px-8 w-5/12 sm:w-48 text-tDefault hover:bg-d2/90"
                title={`${t("Protocols.complete")} (${treatments?.length}) >`}
                onClick={handleComplete}
              />
            ) : null}
            <Button
              className="flex flex-1 sm:flex-none rounded-xl px-8 w-5/12 sm:w-48 sm:ml-4"
              fetching={isLoading}
              title={title}
              onClick={onPress}
            />
          </div>
        </div>
      </footer>
    );
  }
);

ButtonsFirstStep.displayName = "ButtonsFirstStep";
