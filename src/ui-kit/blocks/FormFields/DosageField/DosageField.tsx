import { formatInput, getNumbers } from "@/runnersQcApp/shared/TextUtils";
import _ from "lodash";
import React, { memo, useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { Input, InputProps } from "../../../components/Input/Input";
import { TRenderFn } from "../AccordionField/AccordionField";

export const DosageField: React.FC<InputProps & { name: string }> = memo(
  ({ name, ...rest }) => {
    const methods = useFormContext();
    const { control, formState } = methods;

    const error = useMemo(
      () => _.get(formState, ["errors", name, "message"]),
      [formState, name]
    );

    const renderComponent = useCallback(
      ({ field: { onChange, value } }: TRenderFn) => {
        const innerText = formatInput(value);
        const text = getNumbers(innerText);

        return (
          <Input
            {...{
              ...rest,
              onChange,
              value: getNumbers(text),
              maxLength: 10,
              type: "number",
            }}
          />
        );
      },
      [rest]
    );

    return (
      <>
        <Controller name={name} control={control} render={renderComponent} />
        {error ? <ErrorMessage message={error as string} /> : null}
      </>
    );
  }
);

DosageField.displayName = "DosageField";
