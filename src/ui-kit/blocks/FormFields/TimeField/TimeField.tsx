import { TimeInput } from "@/ui-kit/components/TimeInput/TimeInput";
import _ from "lodash";
import React, { memo, useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { TRenderFn } from "../AccordionField/AccordionField";

export type TimeFieldProps = {
  name: string;
  label: string;
};

export const TimeField: React.FC<TimeFieldProps> = memo(
  ({ name, label, ...rest }) => {
    const methods = useFormContext();
    const { control, formState } = methods;

    const error = useMemo(
      () => _.get(formState, ["errors", name, "message"]),
      [formState, name]
    );

    const renderComponent = useCallback(
      ({ field: { onChange, value } }: TRenderFn) => {
        return <TimeInput {...{ ...rest, onChange, value }} />;
      },
      [rest]
    );

    return (
      <div className="flex flex-1 flex-col">
        <div className="mt-6 text-sm font-semibold text-tDefault mb-2">
          {label}
        </div>
        <Controller name={name} control={control} render={renderComponent} />
        {error ? <ErrorMessage message={error as string} /> : null}
      </div>
    );
  }
);

TimeField.displayName = "TimeField";
