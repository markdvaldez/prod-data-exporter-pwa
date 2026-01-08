import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { NotesField } from "@/ui-kit/components/NotesField";
import _ from "lodash";
import React, { memo, useCallback, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "../../../components/ErrorMessage";
import { InputProps } from "../../../components/Input/Input";
import { TRenderFn } from "../AccordionField/AccordionField";

export const NotesFormField: React.FC<
  InputProps & { name: string; label: string }
> = memo(({ name, placeholder, label, ...rest }) => {
  const methods = useFormContext();
  const { control, formState } = methods;

  const error = useMemo(
    () => _.get(formState, ["errors", name, "message"]),
    [formState, name]
  );

  const renderComponent = useCallback(
    ({ field: { onChange, value } }: TRenderFn) => {
      return <NotesField {...{ ...rest, onChange, value, placeholder }} />;
    },
    [rest, placeholder]
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center mr-2 sm:mr-0">
        <FieldLabel label={label} />
      </div>
      <Controller name={name} control={control} render={renderComponent} />
      {error ? <ErrorMessage message={error as string} /> : null}
    </>
  );
});

NotesFormField.displayName = "NotesFormField";
