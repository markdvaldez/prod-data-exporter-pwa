import { useTranslations } from "next-intl";
import React from "react";
import { InputField } from "../InputField";
import { FormFieldProps } from "../TreatmentTypeField/TreatmentTypeField";

export const TextField: React.FC<FormFieldProps> = ({
  label,
  name,
  fieldKey,
}) => {
  const t = useTranslations("AddRecord");

  return (
    <>
      <div className="text-xs text-tDefault mb-1 mt-3 uppercase tracking-widest">
        {label}
      </div>
      <InputField
        key={fieldKey}
        name={name}
        type="text"
        placeholder={t(name)}
      />
    </>
  );
};
