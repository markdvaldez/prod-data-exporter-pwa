import { stateOptions } from "@/runnersQcApp/containers/CreateLocationContainer/helpers";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { AccordionField } from "../AccordionField";

export const StateField: React.FC<{ label: string; defaultValue: string }> =
  memo(({ label, defaultValue }) => {
    const t = useTranslations("Location");

    return (
      <>
        <FieldLabel labelStyles="mt-0 mb-1" label={label} />
        <AccordionField
          key="state"
          name="state"
          items={stateOptions}
          itemClassName="hover:cursor-pointer"
          defaultValue={defaultValue || stateOptions[0].value}
        />
      </>
    );
  });

StateField.displayName = "StateField";
