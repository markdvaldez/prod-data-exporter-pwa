import { Button } from "@/ui-kit/components/Button";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { Textarea } from "@/ui-kit/components/Textarea";
import { useTranslations } from "next-intl";
import React, { memo, useCallback } from "react";

export type ConfirmationViewProps = {
  description?: string;
  onChange?: (value?: string) => void;
  onConfirm: () => void;
};

export const ConfirmationView: React.FC<ConfirmationViewProps> = memo(
  ({ description, onChange, onConfirm }) => {
    const t = useTranslations("Location");

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
      },
      [onChange]
    );

    const handleClear = useCallback(() => {
      onChange?.("");
    }, [onChange]);

    return (
      <div className="flex flex-col flex-1 justify-between bg-w0 z-50">
        <div className="mb-2 text-sm text-tDefault">
          {t("descriptionOptional")}
        </div>
        <div className="relative">
          <Textarea
            className="w-full pr-6"
            // placeholder={placeholder}
            value={description}
            onChange={handleChange}
          />
          <div className="absolute top-2 bottom-0 right-0 w-10 cursor-pointer">
            <div
              className="ml-3 w-5 h-5 items-center justify-center"
              onClick={handleClear}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        {/* <NotesField key="description" value={description} onChange={onChange} /> */}
        <div className="absolute w-full bottom-0 right-0">
          <Button className="w-full" title={t("confirm")} onClick={onConfirm} />
        </div>
      </div>
    );
  }
);

ConfirmationView.displayName = "ConfirmationView";
