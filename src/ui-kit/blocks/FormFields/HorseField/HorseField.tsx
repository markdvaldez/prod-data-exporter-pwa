import { ErrorMessage } from "@/ui-kit/components/ErrorMessage";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { Input, InputProps } from "@/ui-kit/components/Input";
import _ from "lodash";
import { useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TRenderFn } from "../AccordionField/AccordionField";

export type HorseFieldProps = {
  fieldKey: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
  label: string;
};

export const HorseField: React.FC<InputProps & HorseFieldProps> = ({
  fieldKey,
  name,
  placeholder,
  disabled,
  label,
  ...rest
}) => {
  const methods = useFormContext();
  const { control, formState } = methods;

  const error = useMemo(
    () => _.get(formState, ["errors", name, "message"]),
    [formState, name]
  );

  const renderComponent = useCallback(
    ({ field: { onChange, value = "" } }: TRenderFn) => {
      return (
        <Input
          className="disabled:opacity-50"
          {...{ ...rest, onChange, disabled, value }}
        />
      );
    },
    [disabled, rest]
  );

  return (
    <>
      <FieldLabel label={label} />
      <Controller name={name} control={control} render={renderComponent} />
      {error ? <ErrorMessage message={error as string} /> : null}
    </>
  );
};
