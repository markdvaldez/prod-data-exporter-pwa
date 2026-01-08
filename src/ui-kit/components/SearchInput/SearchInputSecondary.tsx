import { cn } from "@/ui-kit/lib/utils";
import { Search } from "lucide-react";
import { useCallback, useRef } from "react";
import { CloseIcon16 } from "../Icons/CloseIcon16";
import { InputProps } from "../Input/Input";
import { Input } from "./ui/input";

export type SearchInputProps = InputProps & {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  textInputRef?: React.RefObject<HTMLInputElement> | null;
  isLeftIcon?: boolean;
};

export const SearchInputSecondary: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  textInputRef,
  isLeftIcon = true,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = useCallback(() => {
    const clearEvent = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(clearEvent);

    const targetRef = textInputRef ? textInputRef.current : inputRef.current;
    if (targetRef) {
      targetRef.value = "";
      targetRef.focus();
    }
  }, [onChange, textInputRef]);

  return (
    <div className="relative w-full">
      {isLeftIcon ? (
        <div className="absolute inset-y-0 start-2 flex items-center">
          <Search color="#191C1F80" className="w-5 h-5" />
        </div>
      ) : null}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={textInputRef ? textInputRef : inputRef}
        className={cn(
          "pr-7 bg-b1/5 border border-b1/5 focus-visible:border-b1/20",
          isLeftIcon && "pl-10"
        )}
        {...props}
      />
      {value ? (
        <div
          className="absolute inset-y-0 end-2 flex items-center ps-3 hover:cursor-pointer"
          onClick={handleClear}
        >
          <CloseIcon16 width={20} height={20} />
        </div>
      ) : null}
    </div>
  );
};
