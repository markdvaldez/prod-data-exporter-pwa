import { ErrorMessage } from "@/ui-kit/components/ErrorMessage";
import { ClearIcon } from "@/ui-kit/components/Icons/ClearIcon";
import { cn } from "@/ui-kit/lib/utils";
import { getFormattedLocation } from "@/utils/locationId";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useMemo } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

export type TSelectValue = { label?: string; value?: any };

export type LocationFieldProps = {
  name: string;
  onLocationChange: () => void;
};

type TRenderFn = ControllerProps<
  FieldValues,
  FieldPath<FieldValues>
>["render"]["arguments"][0];

export const LocationField: React.FC<LocationFieldProps> = memo(
  ({ name, onLocationChange }) => {
    const methods = useFormContext();
    const t = useTranslations("AddRecord");
    const { control, formState } = methods;

    const error = useMemo(
      () => _.get(formState, ["errors", name, "message"]),
      [formState, name]
    );

    const renderComponent = useCallback(
      ({ field: { onChange, value } }: TRenderFn) => {
        const title = !_.isEmpty(value)
          ? getFormattedLocation({
              name:
                value?.locationName || value?.name || value?.horseLocationName,
              hisaId: value?.locationId,
            })
          : t("search");

        const handleChangeLocation = () => {
          onChange?.(value);
          onLocationChange();
        };

        return (
          <div
            className="flex flex-row justify-between items-center px-4 py-2 border rounded-lg bg-w0 border-b8 hover:cursor-pointer"
            onClick={handleChangeLocation}
          >
            <div
              className={cn(
                "flex flex-1 text-md sm:text-sm",
                value ? "text-tDefault" : "text-a0"
              )}
            >
              {title}
            </div>
            {value ? <ClearIcon width={22} height={22} /> : null}
          </div>
        );
      },
      [onLocationChange, t]
    );

    return (
      <>
        <Controller name={name} control={control} render={renderComponent} />
        <ErrorMessage message={error as string} />
      </>
    );
  }
);

LocationField.displayName = "LocationField";
