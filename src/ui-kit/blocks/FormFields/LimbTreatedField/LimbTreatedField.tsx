import { getLimbTreatedTypesOptions } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { memo, useMemo } from "react";
import { AccordionField } from "../AccordionField";

export const LimbTreatedField: React.FC<{
  value?: string;
  label: string;
  placeholder?: string;
}> = memo(({ value, label, placeholder }) => {
  const t = useTranslations("AddRecord");

  const options = useMemo(
    () => ({
      limbTreated: getLimbTreatedTypesOptions(),
    }),
    []
  );

  return (
    <>
      <FieldLabel label={label} />
      <AccordionField
        key="limbTreated"
        name="limbTreated"
        items={options.limbTreated}
        itemClassName="hover:cursor-pointer"
        defaultValue={value}
        placeholder={placeholder}
      />
    </>
  );
});

LimbTreatedField.displayName = "LimbTreatedField";
