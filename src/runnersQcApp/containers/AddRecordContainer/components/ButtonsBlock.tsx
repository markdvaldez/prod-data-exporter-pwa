import routes from "@/routes";
import { Button } from "@/ui-kit/components/Button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { memo } from "react";

export type ButtonsBlockProps = {
  buttonTitle: string;
  activeIndex?: number;
  disabled?: boolean;
  onPress: () => void;
  onSubmit?: () => void;
  handleCancel?: () => void;
};

export const ButtonsBlock: React.FC<ButtonsBlockProps> = memo(
  ({ buttonTitle, activeIndex, disabled, onPress, onSubmit }) => {
    const t = useTranslations("AddRecord");

    return (
      <footer className="sm:mt-6 z-10">
        <div className="border-t border-b8 pb-2 sm:pb-4" />
        <div className="flex justify-between">
          <div className="hidden sm:block">
            <Link href={routes.DASHBOARD}>
              <Button
                className="bg-transparent border-1 border-a0"
                variant="outline"
                title={t("cancel")}
                onClick={onPress}
              />
            </Link>
          </div>
          <div className="flex flex-1 justify-between sm:justify-end bg-mainBackground">
            {activeIndex && activeIndex > 1 ? (
              <Button
                className="bg-transparent border-1 border-a0"
                variant="outline"
                title={t("previousStep")}
                onClick={onPress}
              />
            ) : null}
            <Button
              className="flex rounded-xl ml-4 px-8 w-48"
              title={buttonTitle}
              disabled={disabled}
              onClick={onSubmit}
            />
          </div>
        </div>
      </footer>
    );
  }
);

ButtonsBlock.displayName = "ButtonsBlock";
