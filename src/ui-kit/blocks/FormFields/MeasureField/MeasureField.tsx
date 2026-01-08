import { ErrorMessage } from "@/ui-kit/components/ErrorMessage";
import _ from "lodash";
import React, { memo, useCallback, useMemo } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { DosageMeasureItem } from "./DosageMeasureItem";

export type TSelectValue = { label?: string; value?: any };

type TRenderFn = ControllerProps<
  FieldValues,
  FieldPath<FieldValues>
>["render"]["arguments"][0];

export const MeasureField: React.FC<{ name: string }> = memo(
  ({ name, ...rest }) => {
    const methods = useFormContext();
    const { control, formState } = methods;

    const error = useMemo(
      () => _.get(formState, ["errors", name, "message"]),
      [formState, name]
    );

    const renderComponent = useCallback(
      ({ field: { onChange, value } }: TRenderFn) => (
        <DosageMeasureItem
          {...{
            ...rest,
            onChange,
            value,
          }}
        />
      ),
      [rest]
    );

    return (
      <>
        <Controller name={name} control={control} render={renderComponent} />
        <ErrorMessage message={error as string} />
      </>
    );
  }
);

MeasureField.displayName = "MeasureField";
