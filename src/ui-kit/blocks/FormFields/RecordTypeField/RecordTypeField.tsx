import { getRecTypesOptions } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { splitCamelCase } from "@/runnersQcApp/shared/TextUtils";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { memo, useMemo } from "react";
import { AccordionField } from "../AccordionField";

export const RecordTypeField: React.FC<{
  value: string;
  label: string;
  placeholder?: string;
}> = memo(({ value, label, placeholder }) => {
  const t = useTranslations("AddRecord");

  const options = useMemo(
    () => ({
      recType: getRecTypesOptions(),
    }),
    []
  );

  return (
    <>
      <FieldLabel label={label} />
      <AccordionField
        key="recType"
        name="recType"
        items={options.recType}
        itemClassName="hover:cursor-pointer"
        defaultValue={
          splitCamelCase(value) ||
          splitCamelCase(options.recType[0].value || "")
        }
        placeholder={placeholder}
      />
    </>
  );
});

RecordTypeField.displayName = "RecordTypeField";
