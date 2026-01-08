import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TSelectValue } from "../InputAutocomplete/InputAutocomplete";
import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionMain,
  AccordionTrigger,
} from "./AccordionParts";
import { ContentItem } from "./ContentItem";

export type RecordAccordionProps = {
  items: TSelectValue[];
  itemClassName?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

export const RecordAccordion: React.FC<RecordAccordionProps> = ({
  items,
  itemClassName,
  defaultValue,
  placeholder,
  onChange,
}) => {
  const t = useTranslations("Auth");

  const [accordionValue, setAccordionValue] = useState<string | null>(
    defaultValue as string
  );
  const [selected, setSelected] = useState(placeholder);

  const triggerClassName = useMemo(() => {
    return defaultValue || selected !== placeholder
      ? "font-medium text-tDefault"
      : "text-tPlaceholder";
  }, [defaultValue, placeholder, selected]);

  const filteredItems = useMemo(() => {
    return _.filter(items, (item) => item.value !== selected);
  }, [items, selected]);

  const handleItemClick = useCallback(
    (item: string) => {
      onChange?.(item);
      setSelected(item);
      setAccordionValue(null);
    },
    [onChange]
  );

  useEffect(() => {
    if (defaultValue) {
      setAccordionValue(defaultValue);
      onChange?.(defaultValue);
      setSelected(defaultValue);
    } else {
      setAccordionValue(placeholder as string);
      setSelected(placeholder);
    }
  }, [defaultValue, onChange, placeholder]);

  return (
    <AccordionMain
      type="single"
      className="!mt-0 bg-w0"
      collapsible
      value={accordionValue as string}
      onValueChange={setAccordionValue}
    >
      <AccordionItem
        value="item-1"
        className="border rounded-md px-4 py-2 border-b8"
      >
        <AccordionTrigger className="text-tDefault">
          <div
            className={cn("font-medium text-base md:text-sm", triggerClassName)}
          >
            {selected}
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sm text-tDefault list-none mt-3 pb-0">
          <div className="w-fill h-px bg-b8 mt-3" />
          {_.map(filteredItems, (item, index) => (
            <div key={item.label}>
              <ContentItem
                item={item}
                index={index}
                itemClassName="pb-3 pt-3 hover:cursor-pointer text-base sm:text-sm"
                handleItemClick={handleItemClick}
              />
              {index !== filteredItems.length - 1 ? (
                <div className="w-fill h-px bg-b8" />
              ) : null}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </AccordionMain>
  );
};
