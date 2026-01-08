"use client";

import { Calendar } from "@/ui-kit/components/Calendar";
import {
  convertJSDateToISODate,
  convertJSDateToString,
  convertToJSDate,
} from "@/ui-kit/components/DateInput/helpers";
import { Input, InputProps } from "@/ui-kit/components/Input";
import { cn } from "@/ui-kit/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Matcher } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./NoPortalPopover";

export type DateFieldType = {
  value: string;
  onChange: (value: string) => void;
  minimumDate?: string;
  maximumDate?: string;
  placeholder?: string;
  disabled?: Matcher | Matcher[] | undefined;
} & Omit<InputProps, "onChange">;

export const InputDate: React.FC<DateFieldType> = ({
  className,
  value,
  minimumDate,
  maximumDate,
  onChange,
  disabled,
  ...props
}) => {
  const [date, setDate] = useState<Date | undefined>(convertToJSDate(value));

  const handleChange = useCallback(
    (nextDate: Date | undefined) => {
      setDate(nextDate);
      onChange(convertJSDateToISODate(nextDate));
    },
    [onChange]
  );

  const formattedValue = useMemo(() => convertJSDateToString(date), [date]);

  const { fromDate, toDate } = useMemo(() => {
    return {
      fromDate: convertToJSDate(minimumDate),
      toDate: convertToJSDate(maximumDate),
    };
  }, [minimumDate, maximumDate]);

  useEffect(() => {
    setDate(convertToJSDate(value));
  }, [value]);

  return (
    <div className={cn("relative min-w-3xs", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              className="cursor-pointer focus-visible:border-b8"
              value={formattedValue}
              readOnly={true}
              {...props}
            />
            <div className="absolute inset-y-0 end-3 flex items-center ps-3">
              <CalendarIcon width={24} height={24} strokeWidth={1} />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <div className="rounded-md">
            <Calendar
              mode="single"
              selected={date}
              fromDate={fromDate}
              toDate={toDate}
              onSelect={handleChange}
              disabled={disabled}
              defaultMonth={date}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
