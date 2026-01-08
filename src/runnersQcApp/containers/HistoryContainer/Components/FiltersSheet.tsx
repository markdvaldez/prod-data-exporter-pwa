"use client";

import { resetFilters, setFilters } from "@/services/store/modules/history";
import {
  selectHistoryDateFrom,
  selectHistoryDateTo,
  selectHistoryRecTypes,
} from "@/services/store/modules/history/selectors";
import Panel from "@/ui-kit/blocks/Panel/Panel";
import { Button } from "@/ui-kit/components/Button";
import { Checkbox } from "@/ui-kit/components/Checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui-kit/components/Collapsible";
import { convertToJSDate } from "@/ui-kit/components/DateInput/helpers";
import { FilterTag } from "@/ui-kit/components/FilterTag";
import { cn } from "@/ui-kit/lib/utils";
import { subYears } from "date-fns";
import { ChevronDown } from "lucide-react";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Matcher } from "react-day-picker";
import { useDispatch, useSelector } from "react-redux";
import { getRecTypeFilters } from "../helpers";
import { InputDate } from "./InputDate";

type QuickFilterType =
  | "today"
  | "yesterday"
  | "lastWeek"
  | "lastMonth"
  | "lastYear";

const quickFilters: { id: QuickFilterType; title: string }[] = [
  { id: "today", title: "Today" },
  { id: "yesterday", title: "Yesterday" },
  { id: "lastWeek", title: "Last Week" },
  { id: "lastMonth", title: "Last Month" },
  { id: "lastYear", title: "Last Year" },
];

export type FiltersSheetProps = {
  open: boolean;
  onClose: () => void;
};

export const FiltersSheet: React.FC<FiltersSheetProps> = ({
  open,
  onClose,
}) => {
  const t = useTranslations("History");
  const dispatch = useDispatch();

  const dateFrom = useSelector(selectHistoryDateFrom);
  const dateTo = useSelector(selectHistoryDateTo);
  const recTypes = useSelector(selectHistoryRecTypes);

  const [localFrom, setLocalFrom] = useState(dateFrom);
  const [localTo, setLocalTo] = useState(dateTo);
  const [localRecTypes, setLocalRecTypes] = useState(recTypes);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuick, setSelectedQuick] = useState<QuickFilterType | "">("");

  const oneYearAgo = subYears(new Date().setDate(new Date().getDate() - 1), 1);
  const maxDate = useMemo(() => {
    return new Date(new Date().setDate(new Date().getDate() + 2));
  }, []);
  const today = DateTime.now().toISODate();
  const getYesterday = () => DateTime.now().minus({ days: 1 }).toISODate();
  const getLastWeek = () => DateTime.now().minus({ days: 7 }).toISODate();
  const getLastMonth = () => DateTime.now().minus({ months: 1 }).toISODate();
  const getLastYear = () => DateTime.now().minus({ years: 1 }).toISODate();

  const defaultFilters: Record<QuickFilterType, { from: string; to: string }> =
    useMemo(
      () => ({
        today: { from: today, to: today },
        yesterday: { from: getYesterday(), to: getYesterday() },
        lastWeek: { from: getLastWeek(), to: today },
        lastMonth: { from: getLastMonth(), to: today },
        lastYear: { from: getLastYear(), to: today },
      }),
      [today]
    );

  useEffect(() => {
    if (open) {
      setLocalFrom(dateFrom);
      setLocalTo(dateTo);
      const matched = Object.entries(defaultFilters).find(
        ([, val]) => val.from === dateFrom && val.to === dateTo
      );
      setSelectedQuick(matched ? (matched[0] as QuickFilterType) : "");
      setLocalRecTypes(recTypes);
    }
  }, [open, dateFrom, dateTo, recTypes, defaultFilters]);

  const disabledForFrom = useMemo<Matcher & boolean>(() => {
    const computedTo: Date = convertToJSDate(localTo) || maxDate;
    return ((date: Date) => date > computedTo || date < oneYearAgo) as Matcher &
      boolean;
  }, [localTo, maxDate, oneYearAgo]);

  const disabledForTo = useMemo<Matcher & boolean>(() => {
    const computedFrom: Date = convertToJSDate(localFrom) || oneYearAgo;
    return ((date: Date) => date < computedFrom || date > maxDate) as Matcher &
      boolean;
  }, [localFrom, oneYearAgo, maxDate]);

  const toggleRecType = useCallback((id: string) => {
    setLocalRecTypes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const applyQuick = useCallback(
    (id: QuickFilterType) => {
      setSelectedQuick(id);
      const { from, to } = defaultFilters[id];
      setLocalFrom(from);
      setLocalTo(to);
    },
    [defaultFilters]
  );

  const handleApply = useCallback(() => {
    let from = localFrom || localTo;
    let to = localTo || localFrom;
    if (from > to) [from, to] = [to, from];
    dispatch(
      setFilters({ dateFrom: from, dateTo: to, recTypes: localRecTypes })
    );
    onClose();
  }, [localFrom, localTo, localRecTypes, dispatch, onClose]);

  const handleClear = useCallback(() => {
    dispatch(resetFilters());
    onClose();
  }, [dispatch, onClose]);

  const recFilters = getRecTypeFilters(t);
  const preview = recFilters.slice(0, 4);
  const rest = recFilters.slice(4);

  const renderRecTypeFilters = useMemo(() => {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent>
          <div className="grid grid-cols-2 gap-x-5 gap-y-2 mb-2">
            {rest.map((f) => (
              <label
                key={f.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <Checkbox
                  checked={localRecTypes.includes(f.id)}
                  onCheckedChange={() => toggleRecType(f.id)}
                />
                <span className="text-sm">{f.title}</span>
              </label>
            ))}
          </div>
        </CollapsibleContent>
        <CollapsibleTrigger asChild>
          <div className="flex items-center space-x-1 cursor-pointer text-tPlaceholder">
            <span onClick={() => setIsOpen((o) => !o)}>
              {isOpen ? "Show less" : "Show more"}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </CollapsibleTrigger>
      </Collapsible>
    );
  }, [isOpen, localRecTypes, rest, toggleRecType]);

  const localFilterCount = useMemo(() => {
    let c = 0;
    if (
      localFrom !== defaultFilters.lastYear.from ||
      localTo !== defaultFilters.lastYear.to
    )
      c++;
    if (localRecTypes.length) c++;
    return c;
  }, [localFrom, localTo, localRecTypes, defaultFilters]);

  return (
    <Panel
      className="flex flex-col w-full"
      open={open}
      title={t("filters")}
      onClose={onClose}
    >
      <div className="flex flex-col w-full h-full p-4 overflow-y-auto">
        <div className="mb-4">
          <label className="text-sm font-semibold">{t("selectDate")}</label>
          <div className="flex overflow-x-auto mt-4 no-scrollbar space-x-2">
            {quickFilters.map((q) => (
              <FilterTag
                key={q.id}
                id={q.id}
                title={q.title}
                isSelected={selectedQuick === q.id}
                onPress={() => applyQuick(q.id)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-4">
          <div>
            <label className="text-sm font-semibold">{t("from")}</label>
            <InputDate
              value={localFrom}
              onChange={setLocalFrom}
              placeholder="Select start date"
              disabled={disabledForFrom}
            />
          </div>
          <div>
            <label className="text-sm font-semibold">{t("to")}</label>
            <InputDate
              value={localTo}
              onChange={setLocalTo}
              placeholder="Select end date"
              disabled={disabledForTo}
            />
          </div>
        </div>

        <h3 className="text-sm font-semibold pb-2">{t("recordTypes")}</h3>
        <div className="grid grid-cols-2 gap-x-5 gap-y-2 mb-2">
          {preview.map((f) => (
            <label
              key={f.id}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                checked={localRecTypes.includes(f.id)}
                onCheckedChange={() => toggleRecType(f.id)}
              />
              <span className="text-sm">{f.title}</span>
            </label>
          ))}
        </div>
        {renderRecTypeFilters}

        <div className="flex justify-end items-center px-4 mt-4">
          <span
            onClick={handleClear}
            className="text-sm text-tDefault cursor-pointer"
          >
            {t("clearAll")}
          </span>
          <Button
            title={`${t("applyFilters")}${
              localFilterCount > 0 ? " • " + localFilterCount : ""
            }`}
            onClick={handleApply}
            className="rounded-sm ml-4"
          />
        </div>
      </div>
    </Panel>
  );
};
