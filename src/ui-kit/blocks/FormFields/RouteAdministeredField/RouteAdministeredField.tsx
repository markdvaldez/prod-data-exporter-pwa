import { getRouteTypesOptions } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { useTranslations } from "next-intl";
import React, { memo, useMemo } from "react";
import { AccordionField } from "../AccordionField";

export const RouteAdministeredField: React.FC<{
  label: string;
  value: string | undefined;
}> = memo(({ label, value }) => {
  const t = useTranslations("AddRecord");

  const options = useMemo(
    () => ({
      routeType: getRouteTypesOptions(),
    }),
    []
  );

  return (
    <>
      <FieldLabel label={label} />
      <AccordionField
        key="drugRoute"
        name="drugRoute"
        items={options.routeType}
        itemClassName="hover:cursor-pointer"
        defaultValue={value || options.routeType[0].value}
      />
    </>
  );
});

RouteAdministeredField.displayName = "RouteAdministeredField";
