import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { useCallback, useMemo, useRef, useState } from "react";
import { ClearIcon } from "../Icons/ClearIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { Card } from "../ui/card";
import { Input } from "./ui/input";

export type OptionType = { label: string; value: string | number | boolean };
export type OptionsType = Array<OptionType>;

export type SearchInputAutoCompleteProps = {
  value?: OptionType;
  data?: OptionsType;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLeftIcon?: boolean;
};

export const SearchInputAutoComplete: React.FC<
  SearchInputAutoCompleteProps
> = ({ value, data, placeholder, onChange, isLeftIcon = true }) => {
  const [text, setText] = useState(value?.label || "");
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    return _.filter(data, (item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
  }, [text, data]);

  const handleOptionSelect = useCallback(
    (item: OptionType) => {
      setText(item.label);
      const event = {
        target: { value: item.value },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
      setExpanded(false);
    },
    [onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      onChange?.(e);
    },
    [onChange]
  );

  const handleFocus = useCallback(() => setExpanded(true), []);
  const handleBlur = useCallback(
    () => setTimeout(() => setExpanded(false), 200),
    []
  );

  const handleClear = useCallback(() => {
    setText("");
    const clearEvent = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(clearEvent);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [onChange]);

  return (
    <div className="relative w-full">
      {isLeftIcon ? (
        <div className="absolute inset-y-0 start-2 flex items-center">
          <SearchIcon width={22} height={22} />
        </div>
      ) : null}
      <Input
        ref={inputRef}
        value={text}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${isLeftIcon ? "pl-8" : ""} pr-7 w-full`}
        type="text"
      />
      {text ? (
        <div
          className="absolute inset-y-0 end-2 flex items-center cursor-pointer"
          onClick={handleClear}
        >
          <ClearIcon width={22} height={22} />
        </div>
      ) : null}
      {expanded && filteredOptions.length ? (
        <Card className="absolute z-10 w-full mt-1 border rounded-lg shadow-lg">
          {_.map(filteredOptions, (item, index) => (
            <div
              key={index}
              className={cn(
                "p-2 cursor-pointer hover:bg-gray-100",
                index !== filteredOptions.length - 1 && "border-b"
              )}
              onClick={() => handleOptionSelect(item)}
            >
              {item.label}
            </div>
          ))}
        </Card>
      ) : null}
    </div>
  );
};
