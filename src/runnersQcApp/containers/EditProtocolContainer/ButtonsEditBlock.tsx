import routes from "@/routes";
import { Button } from "@/ui-kit/components/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { memo } from "react";

export type ButtonsEditBlockProps = {
  onAddClick: () => void;
  onSaveClick: () => void;
};

export const ButtonsEditBlock: React.FC<ButtonsEditBlockProps> = memo(
  ({ onAddClick, onSaveClick }) => {
    const t = useTranslations();

    return (
      <footer className="sm:mt-6 z-10">
        <div className="border-t border-b8 pb-2 sm:pb-4" />
        <div className="flex justify-between">
          <div className="hidden sm:block">
            <Link href={`${routes.DASHBOARD}/protocols`}>
              <Button
                className="bg-transparent border-1 border-a0"
                variant="outline"
                title={t("AddRecord.cancel")}
              />
            </Link>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end">
            <Button
              className="bg-transparent border-1 border-a0"
              variant="outline"
              title={t("Protocols.addMore")}
              onClick={onAddClick}
            />
            <Button
              className="flex rounded-xl ml-4 px-8 w-48"
              title={t("Protocols.saveAndExit")}
              onClick={onSaveClick}
            />
          </div>
        </div>
      </footer>
    );
  }
);

ButtonsEditBlock.displayName = "ButtonsSecondStep";
