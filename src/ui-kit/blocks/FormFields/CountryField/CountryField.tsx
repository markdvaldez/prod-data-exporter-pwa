import { countryOptions } from "@/runnersQcApp/containers/CreateLocationContainer/helpers";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { AccordionField } from "../AccordionField";

export const CountryField: React.FC<{ label: string }> = memo(({ label }) => {
  const t = useTranslations("Location");

  return (
    <>
      <FieldLabel labelStyles="mt-0 mb-1" label={label} />
      <AccordionField
        key="country"
        name="country"
        items={countryOptions}
        itemClassName="hover:cursor-pointer"
        defaultValue={countryOptions[0].value}
      />
    </>
  );
});

CountryField.displayName = "CountryField";
