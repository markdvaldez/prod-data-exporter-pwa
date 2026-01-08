import { useDebounce } from "@/hooks/useDebounce";
import { getLabel } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
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
  useWatch,
} from "react-hook-form";

export type FormFieldAutocompleteProps = {
  name: string;
  label?: string;
  placeholder?: string;
  autocompleteKey?: string;
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

export const FormFieldAutocomplete: React.FC<FormFieldAutocompleteProps> = memo(
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
    const formValue = useWatch({ name });
    const t = useTranslations("AddRecord");

    const debouncedSearchText = useDebounce(formValue, 600);

    const [options, setOptions] = useState<TOption[] | undefined>(initialData);

    const variables: TQueryVariables | undefined = useMemo(() => {
      if (!formValue) {
        return;
      }

      return {
        field: autocompleteKey || "",
        text: !formValue ? "" : debouncedSearchText,
        enabled: !!autocompleteKey && !!debouncedSearchText,
      };
    }, [autocompleteKey, debouncedSearchText, formValue]);

    const { data, isFetching } = useGetFieldAutocomplete(
      (variables as TQueryVariables) || { field: "", text: "", enabled: false }
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
        setOptions(formValue ? getOptions(data, formValue) : undefined);
      }
    }, [isFetching, data, formValue, getOptions]);

    const error = useMemo(
      () => _.get(formState, ["errors", name, "message"]),
      [formState, name]
    );

    const renderComponent = useCallback(
      ({ field: { onChange, value } }: TRenderFn) => {
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
              }}
            />
          </div>
        );
      },
      [isFetching, options, placeholder, rest]
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

FormFieldAutocomplete.displayName = "FormFieldAutocomplete";
