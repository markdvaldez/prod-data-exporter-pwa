import { getModalityTypesOptions } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { memo, useMemo } from "react";
import { AccordionField } from "../AccordionField";

export const ModalityField: React.FC<{
  label: string;
  value: string | undefined;
}> = memo(({ label, value }) => {
  const t = useTranslations("AddRecord");

  const options = useMemo(
    () => ({
      routeType: getModalityTypesOptions(),
    }),
    []
  );
  return (
    <>
      <FieldLabel label={label} />
      <AccordionField
        key="modality"
        name="modality"
        items={options.routeType}
        itemClassName="hover:cursor-pointer"
        placeholder={t("modality")}
        defaultValue={value}
      />
    </>
  );
});

ModalityField.displayName = "ModalityField";
