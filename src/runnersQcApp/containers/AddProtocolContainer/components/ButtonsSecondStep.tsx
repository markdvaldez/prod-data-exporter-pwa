import routes from "@/routes";
import { Button } from "@/ui-kit/components/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { memo } from "react";

export type ButtonsSecondStepProps = {
  onAddClick: () => void;
  onSaveClick: () => void;
};

export const ButtonsSecondStep: React.FC<ButtonsSecondStepProps> = memo(
  ({ onAddClick, onSaveClick }) => {
    const t = useTranslations();

    return (
      <footer className="sm:mt-6 z-10">
        <div className="border-t border-b8 pb-2 sm:pb-4" />
        <div className="flex flex-1 justify-between">
          <Link href={routes.DASHBOARD}>
            <Button
              className="bg-transparent border-1 border-a0"
              variant="outline"
              title={t("AddRecord.cancel")}
            />
          </Link>
          <div className="flex flex-1 w-full justify-end">
            <Button
              className="bg-transparent border-1 border-a0"
              variant="outline"
              title={t("Protocols.addMore")}
              onClick={onAddClick}
            />
            <Button
              className="flex rounded-xl ml-4 px-8 w-36 sm:w-48"
              title={t("Protocols.saveAndExit")}
              onClick={onSaveClick}
            />
          </div>
        </div>
      </footer>
    );
  }
);

ButtonsSecondStep.displayName = "ButtonsSecondStep";
