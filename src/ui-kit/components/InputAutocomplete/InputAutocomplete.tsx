import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import React, {
  ChangeEvent,
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../Collapsible";
import { CloseIcon } from "../Icons/CloseIcon";
import { Input, InputProps } from "../Input";
import { Loader } from "../Loader";

export type TSelectValue = { label?: string; value?: any };

export type SearchInputProps = {
  value?: TSelectValue;
  style?: CSSProperties;
  mainContainerStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  data?: TSelectValue[];
  placeholder?: string;
  useRN?: boolean;
  testID?: string;
  withIcon?: boolean;
  isFetching?: boolean;
  onChange?: (value?: string) => void;
} & InputProps;

export const InputAutocomplete: React.FC<SearchInputProps> = memo(
  ({
    value,
    style,
    mainContainerStyle,
    inputStyle,
    data,
    placeholder,
    useRN = false,
    onChange,
    onBlur,
    testID,
    withIcon = true,
    isFetching,
    ...rest
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState(value?.label || value || "");
    const [expanded, setExpanded] = useState(false);
    const [filteredData, setFilteredData] = useState<TSelectValue[]>(
      data ?? []
    );

    const {
      containerStyle,
      globalContainerStyle,
      inputStyles,
      iconStyles,
      accordionItemStyle,
    } = useMemo(
      () => ({
        globalContainerStyle: cn("self-stretch relative", mainContainerStyle),
        containerStyle:
          "h-12 sm:h-10 bg-w0 text-gray-800 text-center overflow-hidden self-stretch justify-center w-full relative",
        inputStyles: cn(
          "text-base text-gray-900 bg-white pl-5 pr-10 focus-visible:border-b8 relative",
          inputStyle
        ),
        iconStyles: "w-2 h-2",
        accordionItemStyle: cn(
          "relative flex gap-2 select-none items-center rounded-sm px-2 h-12 text-sm text-t-default outline-none hover:bg-accent hover:cursor-pointer"
        ),
      }),
      [mainContainerStyle, inputStyle]
    );

    const handleSetText = useCallback(
      (value: string | ChangeEvent<HTMLInputElement>) => {
        const newValue = typeof value === "string" ? value : value.target.value;
        setText(newValue);
      },
      []
    );

    const handleClear = useCallback(() => {
      setText?.("");
      if (inputRef?.current) {
        inputRef.current.value = "";
      }
    }, []);

    const handleFocus = useCallback(() => {
      setExpanded(true);
    }, []);

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
        setTimeout(() => setExpanded(false), 150);
      },
      [onBlur]
    );

    const handleItemClick = useCallback(
      (item: TSelectValue) => {
        handleSetText(item?.label || "");
        onChange?.(item?.value);
        setTimeout(() => {
          inputRef.current?.blur();
          setExpanded(false);
        }, 64);
      },
      [handleSetText, onChange]
    );

    useEffect(() => {
      if (!text || typeof text !== "string") {
        onChange?.(undefined);
        handleClear();
      } else {
        onChange?.(text);
      }
    }, [handleClear, onChange, text]);

    useEffect(() => {
      if (!value) {
        handleClear();
      }
    }, [handleClear, value]);

    useEffect(() => {
      if (data) {
        const nextValue = String(text || "").toLowerCase();
        if (nextValue.trim().length !== 0) {
          const filtered = _.filter(
            data,
            (item) =>
              typeof item.label === "string" &&
              item.label.toLowerCase().includes(nextValue)
          );

          setFilteredData(filtered);
        } else {
          setFilteredData(data);
        }
      }
    }, [data, text]);

    return (
      <div className={globalContainerStyle}>
        <Collapsible className={cn("overflow-hidden bg-w0")} open={expanded}>
          <CollapsibleTrigger asChild>
            <div className={containerStyle}>
              <Input
                ref={inputRef}
                type="text"
                className={inputStyles}
                placeholder={placeholder}
                autoCapitalize="none"
                value={text}
                onChange={handleSetText}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {withIcon ? (
                <div className="absolute top-4 sm:top-3 bottom-0 -right-2 w-10 cursor-pointer">
                  <div
                    className="w-4 h-4 items-center justify-center"
                    onClick={handleClear}
                  >
                    <CloseIcon width={16} height={16} />
                  </div>
                  {isFetching ? (
                    <Loader
                      size="sm"
                      className="absolute bottom-4 sm:bottom-3 right-11 transition-all"
                    />
                  ) : null}
                </div>
              ) : null}
            </div>
          </CollapsibleTrigger>
          {filteredData.length > 0 && text && (
            <CollapsibleContent className="absolute z-50 top-13 p-0.5 sm:top-11 w-full bg-w0 rounded-md border border-b8 shadow-md max-h-[200px] overflow-y-auto overflow-x-hidden no-scrollbar">
              {filteredData.map((item) => (
                <div
                  key={item.label}
                  className={cn(
                    "relative flex gap-2 select-none items-center rounded-sm px-2 h-12 outline-none hover:bg-accent hover:cursor-pointer"
                  )}
                  onMouseDown={() => {
                    handleItemClick(item);
                  }}
                >
                  <div className="text-sm text-t-default">{item.label}</div>
                </div>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    );
  }
);

InputAutocomplete.displayName = "InputAutocomplete";
