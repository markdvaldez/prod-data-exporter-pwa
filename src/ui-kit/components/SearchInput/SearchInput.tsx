"use client";

import { cn } from "@/ui-kit/lib/utils";
import { useCallback, useRef } from "react";
import { ClearIcon } from "../Icons/ClearIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { InputProps } from "../Input/Input";
import { Input } from "./ui/input";

export type SearchInputProps = InputProps & {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  textInputRef?: React.RefObject<HTMLInputElement> | null;
  isLeftIcon?: boolean;
  className?: string;
  onClear?: () => void;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder,
  textInputRef,
  isLeftIcon = true,
  className,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = useCallback(() => {
    onClear?.();
    const clearEvent = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(clearEvent);

    const targetRef = textInputRef ? textInputRef.current : inputRef.current;
    if (targetRef) {
      targetRef.value = "";
      targetRef.focus();
    }
  }, [onChange, onClear, textInputRef]);

  return (
    <div className="relative w-full">
      {isLeftIcon ? (
        <div className="absolute inset-y-0 start-2 flex items-center">
          <SearchIcon width={22} height={22} />
        </div>
      ) : null}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={textInputRef ? textInputRef : inputRef}
        className={cn(className, "pr-7", isLeftIcon && "pl-10")}
        {...props}
      />
      {value ? (
        <div
          className="absolute inset-y-0 end-2 flex items-center ps-3 cursor-pointer"
          onClick={handleClear}
        >
          <ClearIcon width={22} height={22} />
        </div>
      ) : null}
    </div>
  );
};
