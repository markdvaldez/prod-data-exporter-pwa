import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { AccordionField } from "../AccordionField";

export type FormFieldProps = {
  label: string;
  name: string;
  fieldKey: string;
  value?: string;
};

export const TreatmentTypeField: React.FC<FormFieldProps> = ({
  label,
  name,
  fieldKey,
  value,
}) => {
  const t = useTranslations("AddRecord");

  const options = useMemo(() => {
    return [
      { label: "Chiropractic", value: "Chiropractic" },
      { label: "Physiotherapy", value: "Physio Therapy" },
    ];
  }, []);
  return (
    <>
      <FieldLabel label={label} />
      <AccordionField
        key={fieldKey}
        name={name}
        defaultValue={value}
        items={options}
        itemClassName="hover:cursor-pointer"
        placeholder={t("selectFromTheList")}
      />
    </>
  );
};
