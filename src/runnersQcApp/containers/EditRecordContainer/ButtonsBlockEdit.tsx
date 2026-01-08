import { Button } from "@/ui-kit/components/Button";
import { useTranslations } from "next-intl";
import React, { memo } from "react";

export type ButtonsBlockEditProps = {
  buttonTitle: string;
  disabled?: boolean;
  onPress: () => void;
  onSubmit?: () => void;
};

export const ButtonsBlockEdit: React.FC<ButtonsBlockEditProps> = memo(
  ({ buttonTitle, disabled, onPress, onSubmit }) => {
    const t = useTranslations("AddRecord");

    return (
      <footer className="sm:mt-6 z-10">
        <div className="border-t border-b8 pb-2 sm:pb-4" />
        <div className="flex justify-between">
          <div className="flex flex-1 justify-between bg-mainBackground">
            <Button
              className="bg-transparent border-1 border-a0"
              variant="outline"
              title={t("back")}
              onClick={onPress}
            />
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

ButtonsBlockEdit.displayName = "ButtonsBlockEdit";
