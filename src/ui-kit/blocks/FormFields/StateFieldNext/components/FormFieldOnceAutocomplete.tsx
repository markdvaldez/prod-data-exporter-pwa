import { removeSpaces } from "@/runnersQcApp/shared/TextUtils";
import { ErrorMessage } from "@/ui-kit/components/ErrorMessage";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useMemo } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { InputAutocomplete } from "./InputAutocomplete";

export type FormFieldAutocompleteProps = {
  name: string;
  label?: string;
  placeholder?: string;
  autocompleteKey?: string;
  hasOnBlurValidation?: boolean;
  initialData?: TOption[];
  autoComplete?: string;
};

type TRenderFn = ControllerProps<
  FieldValues,
  FieldPath<FieldValues>
>["render"]["arguments"][0];

type TQueryVariables = {
  field: string;
  text: string;
};

type TOption = {
  label: string;
  value: string | null | undefined;
};

export const FormFieldOnceAutocomplete: React.FC<FormFieldAutocompleteProps> =
  memo(
    ({
      name,
      label = "",
      placeholder = "",
      autocompleteKey,
      initialData,
      autoComplete,
      ...rest
    }) => {
      const methods = useFormContext();
      const { control, formState } = methods;
      const formValue = useWatch({ name });
      const t = useTranslations("AddRecord");

      const mappedData = useMemo(() => {
        return _.chain(initialData)
          .filter(({ label, value }) => {
            if (!formValue) {
              return true;
            }
            const lowerFormValue = _.toLower(formValue);
            return (
              _.toLower(label || "").includes(lowerFormValue) ||
              _.toLower(value || "").includes(lowerFormValue)
            );
          })
          .value();
      }, [formValue, initialData]);

      const error = useMemo(
        () => _.get(formState, ["errors", name, "message"]),
        [formState, name]
      );

      const renderComponent = useCallback(
        ({ field: { onChange, value, onBlur } }: TRenderFn) => {
          const handleBlur = () => {
            const isValid = _.some(
              initialData,
              (item) =>
                removeSpaces(item?.value)?.toLowerCase() ===
                  removeSpaces(value)?.toLowerCase() ||
                removeSpaces(item?.label)?.toLowerCase() ===
                  removeSpaces(value)?.toLowerCase()
            );

            if (!isValid) {
              methods.setError(name, {
                type: "manual",
                message: t("selectValueFromTheList"),
              });
            } else {
              methods.clearErrors(name);
            }
          };

          return (
            <div>
              <InputAutocomplete
                {...{
                  ...rest,
                  data: mappedData,
                  onChange,
                  value,
                  placeholder,
                  autoComplete,
                  onBlur: (e) => {
                    handleBlur();
                    onBlur(e);
                  },
                }}
              />
            </div>
          );
        },
        [
          autoComplete,
          initialData,
          mappedData,
          methods,
          name,
          placeholder,
          rest,
          t,
        ]
      );

      return (
        <>
          {label && <FieldLabel label={label} />}
          <Controller name={name} control={control} render={renderComponent} />
          <ErrorMessage message={error as string} />
        </>
      );
    }
  );

FormFieldOnceAutocomplete.displayName = "FormFieldOnceAutocomplete";
