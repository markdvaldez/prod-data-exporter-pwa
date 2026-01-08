/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { Clock } from "lucide-react";
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../Button";
import { Input, InputProps } from "../Input";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { ScrollArea } from "../ScrollArea";
import {
  convertTo24HourFormat,
  hours,
  minutes,
  parse24HourFormat,
} from "./helpers";

export type TimeInputProps = {
  value: string;
  onChange: (value: string) => void;
} & Omit<InputProps, "onChange">;

// 22:44:31 | 12:00:AM

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  const defaultValue = DateTime.now().toFormat("HH:mm:ss");

  const [hour, setHour] = useState(
    parse24HourFormat(value || defaultValue).hour
  );
  const [minute, setMinute] = useState(
    parse24HourFormat(value || defaultValue).minute
  );
  const [period, setPeriod] = useState(
    parse24HourFormat(value || defaultValue).period
  );
  const [open, setOpen] = useState(false);

  const hourRef = useRef<(HTMLDivElement | null)[]>([] as HTMLDivElement[]);
  const minuteRef = useRef<(HTMLDivElement | null)[]>([] as HTMLDivElement[]);

  const formattedValue = useMemo(
    () => `${hour}:${minute} ${period}`,
    [hour, minute, period]
  );

  const renderHour = useCallback(
    (h: string, index: number) => (
      <div
        key={`time-picker-hour-${h}`}
        //@ts-expect-error
        ref={(el) => (hourRef.current[index] = el!)}
        className={cn(
          "h-9 w-9 p-0 rounded-md text-center text-sm font-medium inline-flex items-center justify-center cursor-pointer hover:bg-gray-200",
          hour === h && "bg-basic text-primary-foreground hover:bg-basic"
        )}
        onClick={() => setHour(h)}
      >
        {h}
      </div>
    ),
    [hour]
  );

  const renderMinute = useCallback(
    (m: string, index: number) => (
      <div
        key={`time-picker-minute-${m}`}
        //@ts-expect-error
        ref={(el) => (minuteRef.current[index] = el!)}
        className={cn(
          "h-9 w-9 p-0 rounded-md text-center text-sm font-medium inline-flex items-center justify-center cursor-pointer hover:bg-gray-200",
          minute === m && "bg-basic text-primary-foreground hover:bg-basic"
        )}
        onClick={() => setMinute(m)}
      >
        {m}
      </div>
    ),
    [minute]
  );

  const setAM = useCallback(() => {
    setPeriod("AM");
    setOpen(false);
  }, []);

  const setPM = useCallback(() => {
    setPeriod("PM");
    setOpen(false);
  }, []);

  const scrollToItem = useCallback(
    (hour: string, minute: string, behavior: ScrollBehavior = "smooth") => {
      const currentHour = hourRef.current.find(
        (el) => el?.textContent === hour
      );
      const currentMinute = minuteRef.current.find(
        (el) => el?.textContent === minute
      );

      if (currentHour) {
        currentHour.scrollIntoView({ behavior, block: "start" });
      }
      if (currentMinute) {
        currentMinute.scrollIntoView({ behavior, block: "start" });
      }
    },
    []
  );

  useEffect(() => {
    if (open) {
      setTimeout(() => scrollToItem(hour, minute, "instant"), 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    scrollToItem(hour, minute, "smooth");
  }, [hour, minute, scrollToItem]);

  useEffect(() => {
    onChange(convertTo24HourFormat(hour, minute, period));
  }, [hour, minute, onChange, period]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            className="cursor-pointer focus-visible:border-b8"
            value={formattedValue}
            readOnly={true}
            {...props}
          />
          <div className="absolute inset-y-0 end-3 flex items-center ps-3">
            <Clock width={24} height={24} strokeWidth={1} />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-40 p-2">
        <div className="flex justify-between gap-2">
          <ScrollArea
            className="h-[150px] w-12 border rounded-md scroll-thin no-scrollbar"
            scrollWidth="w-0"
          >
            {_.map(hours, renderHour)}
            <div className="h-0.5" />
          </ScrollArea>
          <ScrollArea
            className="h-[150px] w-12 border rounded-md scroll-thin no-scrollbar"
            scrollWidth="w-0"
          >
            {_.map(minutes, renderMinute)}
            <div className="h-0.5" />
          </ScrollArea>
          <div className="flex flex-col justify-center items-center">
            <Button
              key="time-picker-am"
              variant={period === "AM" ? "default" : "outline"}
              size="default"
              onClick={setAM}
              className="w-12 mb-1"
              title="AM"
            />
            <Button
              key="time-picker-pm"
              variant={period === "PM" ? "default" : "outline"}
              size="default"
              onClick={setPM}
              className="w-12"
              title="PM"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
