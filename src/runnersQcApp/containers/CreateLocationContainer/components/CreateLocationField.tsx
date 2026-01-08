import { InputField } from "@/ui-kit/blocks/FormFields/InputField";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import React, { memo, useCallback, useRef, useState } from "react";
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

export type TSelectValue = { label?: string; value?: any };

export type CreateLocationFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  fieldKey: string;
};

type TRenderFn = ControllerProps<
  FieldValues,
  FieldPath<FieldValues>
>["render"]["arguments"][0];

export const CreateLocationField: React.FC<CreateLocationFieldProps> = memo(
  ({ name, label, placeholder, fieldKey, ...rest }) => {
    const methods = useFormContext();

    const inputRef = useRef<HTMLInputElement>(null);

    const [text, setText] = useState("");

    const { setValue } = methods;

    const handleClear = useCallback(() => {
      setValue(name, "");
      setText("");
    }, [name, setValue]);

    return (
      <>
        <FieldLabel labelStyles="mt-0 mb-1" label={label} />
        <div className="relative">
          <InputField
            key={fieldKey}
            ref={inputRef}
            name={name}
            type="text"
            placeholder={placeholder}
            value={text}
            className="focus-visible:border-b8"
          />
          <div className="absolute top-4 sm:top-3 bottom-0 -right-2 w-10 cursor-pointer">
            <div
              className="w-4 h-4 items-center justify-center"
              onClick={handleClear}
            >
              <CloseIcon width={16} height={16} />
            </div>
          </div>
        </div>
      </>
    );
  }
);

CreateLocationField.displayName = "CreateLocationField";
