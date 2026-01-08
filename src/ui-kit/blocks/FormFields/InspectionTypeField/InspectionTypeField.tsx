import { getInspectionResTypesOptions } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { InspectionType } from "@/runnersQcApp/shared/types";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AccordionField } from "../AccordionField";

export type FormFieldProps = {
  label: string;
  name: string;
  fieldKey: string;
  value: string | undefined;
};

export const InspectionTypeField: React.FC<FormFieldProps> = ({
  label,
  name,
  fieldKey,
  value,
}) => {
  const t = useTranslations("AddRecord");

  const { control, setValue } = useFormContext();

  const options = useMemo(
    () => ({
      routeType: getInspectionResTypesOptions(),
    }),
    []
  );

  const inspectionType = useWatch({ control, name: "inspectionType" });

  useEffect(() => {
    let clearedToWork = null;
    let clearedToRace = null;

    if (inspectionType === InspectionType.ClearedToWork) {
      clearedToWork = true;
      clearedToRace = false;
    } else if (inspectionType === InspectionType.ClearedToRace) {
      clearedToWork = true;
      clearedToRace = true;
    } else if (inspectionType === InspectionType.NotCleared) {
      clearedToWork = false;
      clearedToRace = false;
    }

    setValue("clearedToWork", clearedToWork);
    setValue("clearedToRace", clearedToRace);
  }, [inspectionType, setValue]);
  return (
    <>
      <FieldLabel label={label} />
      <AccordionField
        key={fieldKey}
        name={name}
        defaultValue={value}
        items={options.routeType}
        itemClassName="hover:cursor-pointer"
        placeholder={t("inspectionResult")}
      />
    </>
  );
};
