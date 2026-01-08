import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { useTranslations } from "next-intl";
import React, { useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { InputField } from "../InputField";
import { FormFieldProps } from "../TreatmentTypeField/TreatmentTypeField";

export const TestResultsField: React.FC<FormFieldProps> = ({
  fieldKey,
  label,
  name,
}) => {
  const t = useTranslations("AddRecord");

  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");

  const methods = useFormContext();
  const { setValue } = methods;

  const handleClear = useCallback(() => {
    setValue(name, "");
    setText("");
  }, [name, setValue]);

  return (
    <>
      <FieldLabel label={label} />
      <div className="relative">
        <InputField
          key={fieldKey}
          ref={inputRef}
          name={name}
          type="text"
          placeholder={t("leaveMoreInformation")}
          value={text}
          className="focus-visible:border-b8"
        />
        <div className="absolute top-4 sm:top-3 bottom-0 -right-2 w-10 cursor-pointer">
          <div
            className="w-4 h-4 items-center justify-center"
            onClick={handleClear}
          >
            <CloseIcon width={16} height={16} />
          </div>
        </div>
      </div>
    </>
  );
};
