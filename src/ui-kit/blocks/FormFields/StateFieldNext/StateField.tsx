import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { FormFieldOnceAutocomplete } from "./components/FormFieldOnceAutocomplete";
import { stateOptions } from "./helpers";

export const StateField: React.FC<{ label: string; defaultValue: string }> =
  memo(({ label, defaultValue }) => {
    const t = useTranslations("Location");

    return (
      <>
        <FieldLabel labelStyles="mt-0 mb-2" label={label} />
        <FormFieldOnceAutocomplete
          key="state"
          name="state"
          placeholder={t("selectState")}
          autoComplete="address-level1"
          initialData={stateOptions}
        />
      </>
    );
  });

StateField.displayName = "StateField";
