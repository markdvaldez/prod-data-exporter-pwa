import routes from "@/routes";
import { Button } from "@/ui-kit/components/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { memo } from "react";
import { ButtonsBlockProps } from "./ButtonsBlock";

export const ButtonsBlockFirstStep: React.FC<ButtonsBlockProps> = memo(
  ({ buttonTitle, disabled, onPress, handleCancel }) => {
    const t = useTranslations("AddRecord");

    return (
      <footer className="sm:mt-6 z-10">
        <div className="border-t border-b8 pb-2 sm:pb-4" />
        <div className="flex justify-between">
          <Link href={routes.DASHBOARD}>
            <Button
              className="bg-transparent border-1 border-a0"
              variant="outline"
              title={t("cancel")}
              onClick={handleCancel}
            />
          </Link>
          <Button
            className="flex rounded-xl ml-4 px-8 w-48"
            title={buttonTitle}
            disabled={disabled}
            onClick={onPress}
          />
        </div>
      </footer>
    );
  }
);

ButtonsBlockFirstStep.displayName = "ButtonsBlockFirstStep";
