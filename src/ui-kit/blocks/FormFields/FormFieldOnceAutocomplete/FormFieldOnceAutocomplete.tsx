import { getLabel } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { removeSpaces } from "@/runnersQcApp/shared/TextUtils";
import { useGetFieldAutocomplete } from "@/services/api/modules/horsemedical/getFieldAutocomplete";
import { AssortedAutocompleteDto } from "@/Types";
import { ErrorMessage } from "@/ui-kit/components/ErrorMessage";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { InputAutocomplete } from "@/ui-kit/components/InputAutocomplete";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

export type FormFieldAutocompleteProps = {
  name: string;
  label?: string;
  placeholder?: string;
  autocompleteKey?: string;
  hasOnBlurValidation?: boolean;
  initialData?: TOption[];
};

type TRenderFn = ControllerProps<
  FieldValues,
  FieldPath<FieldValues>
>["render"]["arguments"][0];

type TQueryVariables = {
  field: string;
  text: string;
  enabled: boolean;
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
      ...rest
    }) => {
      const methods = useFormContext();
      const { control, formState } = methods;
      const t = useTranslations("AddRecord");

      const [options, setOptions] = useState<TOption[] | undefined>(
        initialData
      );

      const variables: TQueryVariables | undefined = useMemo(() => {
        return {
          field: autocompleteKey || "",
          text: "",
          enabled: !!autocompleteKey,
        };
      }, [autocompleteKey]);

      const { data, isFetching } = useGetFieldAutocomplete(
        (variables as TQueryVariables) || {
          field: "",
          text: "",
        }
      );

      const getOptions = useCallback(
        (data: AssortedAutocompleteDto[] | undefined, value: any) => {
          return _.chain(data)
            .map((item) => ({
              label: getLabel(item.value) || "",
              value: item.value,
            }))
            .sort((a, b) => a.label.localeCompare(b.label))
            .filter(({ label, value }) => {
              if (!value) {
                return true;
              }
              const lowerFormValue = _.toLower(value);
              return (
                _.toLower(label || "").includes(lowerFormValue) ||
                _.toLower(value || "").includes(lowerFormValue)
              );
            })
            .value();
        },
        []
      );

      useEffect(() => {
        if (!isFetching) {
          setOptions(name ? getOptions(data, name) : undefined);
        }
      }, [isFetching, data, name, getOptions]);

      const error = useMemo(
        () => _.get(formState, ["errors", name, "message"]),
        [formState, name]
      );

      const renderComponent = useCallback(
        ({ field: { onChange, value, onBlur } }: TRenderFn) => {
          const handleBlur = () => {
            const isValid = _.some(
              options,
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
                  data: options,
                  onChange,
                  value,
                  placeholder,
                  isFetching,
                  onBlur: (e) => {
                    handleBlur();
                    onBlur(e);
                  },
                }}
              />
            </div>
          );
        },
        [isFetching, methods, name, options, placeholder, rest, t]
      );

      return (
        <>
          <FieldLabel label={label} />
          <Controller name={name} control={control} render={renderComponent} />
          <ErrorMessage message={error as string} />
        </>
      );
    }
  );

FormFieldOnceAutocomplete.displayName = "FormFieldOnceAutocomplete";
