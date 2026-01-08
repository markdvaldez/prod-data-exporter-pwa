import _ from "lodash";
import React, { memo, useCallback, useMemo } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  RecordAccordion,
  RecordAccordionProps,
} from "../../../components/Accordion/RecordAccordion";
import { ErrorMessage } from "../../../components/ErrorMessage";

export type TSelectValue = { label?: string; value?: string };

export type TRenderFn = ControllerProps<
  FieldValues,
  FieldPath<FieldValues>
>["render"]["arguments"][0];

export const AccordionField: React.FC<RecordAccordionProps & { name: string }> =
  memo(({ name, defaultValue, ...rest }) => {
    const methods = useFormContext();
    const { control, formState } = methods;

    const error = useMemo(
      () => _.get(formState, ["errors", name, "message"]),
      [formState, name]
    );

    const renderComponent = useCallback(
      ({ field: { onChange, value } }: TRenderFn) => {
        return (
          <RecordAccordion {...{ ...rest, onChange, value, defaultValue }} />
        );
      },
      [defaultValue, rest]
    );

    return (
      <>
        <Controller name={name} control={control} render={renderComponent} />
        {error ? <ErrorMessage message={error as string} /> : null}
      </>
    );
  });

AccordionField.displayName = "AccordionField";
