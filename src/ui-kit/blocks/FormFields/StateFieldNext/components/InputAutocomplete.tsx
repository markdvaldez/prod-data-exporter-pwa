import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui-kit/components/Collapsible";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { InputProps } from "@/ui-kit/components/Input";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { cn } from "@/ui-kit/lib/utils";
import { motion } from "framer-motion";
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

export type TSelectValue = { label?: string; value?: any };

export type SearchInputProps = {
  value?: TSelectValue;
  style?: CSSProperties;
  label?: string;
  mainContainerStyle?: CSSProperties;
  inputStyle?: CSSProperties | string;
  data?: TSelectValue[];
  placeholder?: string;
  useRN?: boolean;
  testID?: string;
  withIcon?: boolean;
  isFetching?: boolean;
  onChange?: (value?: string) => void;
} & InputProps;

const animation = {
  initial: { width: "100%", opacity: 1 },
  animate: { width: "w-3/5", opacity: 1 },
  exit: { width: 0, opacity: 1 },
};

export const InputAutocomplete: React.FC<SearchInputProps> = memo(
  ({
    value,
    style,
    label,
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
    autoComplete,
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const prevData = useRef(data);

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
        globalContainerStyle: cn(
          "z-10 self-stretch relative",
          mainContainerStyle
        ),
        containerStyle:
          "h-12 sm:h-10 bg-w0 text-gray-800 text-center overflow-hidden self-stretch justify-center w-full relative",
        inputStyles: cn(
          "flex h-12 sm:h-10 w-full mt-0! rounded-md border border-b8 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          inputStyle
        ),
        iconStyles: "w-2 h-2",
        accordionItemStyle: cn(
          "justify-center border-b border-b8 bg-w0 pl-5 pr-5 pt-3 pb-1 h-11"
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
      onChange?.("");
    }, [onChange]);

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
      const shouldUpdate = data && !_.isEqual(prevData.current, data);
      if (shouldUpdate) {
        const nextValue = String(text || "").toLowerCase();
        const filtered = _.filter(
          data,
          (item) =>
            typeof item.label === "string" &&
            item.label.toLowerCase().startsWith(nextValue)
        );

        setFilteredData(filtered);
        prevData.current = data;
      }
    }, [data, text]);

    return (
      <>
        {label ? (
          <motion.div layout="position">
            <FieldLabel labelStyles="mt-0 mb-1" label={label} />
          </motion.div>
        ) : null}
        <div className={globalContainerStyle}>
          <Collapsible className={cn("z-50 overflow-hidden")} open={expanded}>
            <CollapsibleTrigger asChild>
              <div className={containerStyle}>
                <motion.input
                  ref={inputRef}
                  type="text"
                  className={inputStyles}
                  placeholder={placeholder}
                  autoCapitalize="none"
                  value={text}
                  onChange={handleSetText}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  layout
                  initial={animation.initial}
                  animate={animation.animate}
                  exit={animation.exit}
                  autoComplete={autoComplete}
                />
                {withIcon ? (
                  <div className="absolute top-4 sm:top-3 bottom-0 -right-2 w-10 cursor-pointer">
                    <div
                      className="w-4 h-4 items-center justify-center"
                      onClick={handleClear}
                    >
                      <CloseIcon width={16} height={16} />
                    </div>
                  </div>
                ) : null}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent
              className={cn(
                "absolute top-12 sm:top-10 w-full border-l border-r border-b rounded-bl-md rounded-br-md shadow-custom overflow-hidden",
                filteredData?.length ? "border-b" : "border-b-0"
              )}
            >
              <ScrollArea className="max-h-44 overflow-auto no-scrollbar">
                {_.map(filteredData, (item, index) => (
                  <div
                    key={item.label}
                    className={cn(
                      accordionItemStyle,
                      index !== (filteredData?.length || 0) - 1
                        ? "border-b border-b-b8"
                        : "border-b-0"
                    )}
                    onMouseDown={() => {
                      handleItemClick(item);
                    }}
                  >
                    <div className="text-sm text-b0">{item.label}</div>
                  </div>
                ))}
              </ScrollArea>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </>
    );
  }
);

InputAutocomplete.displayName = "InputAutocomplete";
