import { escapeRegExp } from "@/runnersQcApp/shared/TextUtils";
import { cn } from "@/ui-kit/lib/utils";
import { map, split, toLower } from "lodash";
import React, { memo, useMemo } from "react";

export type HighlightTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  text?: string;
  searchText?: string;
  className?: string;
};

export const HighlightText: React.FC<HighlightTextProps> = memo(
  ({ text = "", searchText = "", className, ...spanProps }) => {
    const parts = useMemo(() => {
      const regex = new RegExp(`(${escapeRegExp(searchText)})`, "gi");
      return split(text, regex);
    }, [searchText, text]);

    return (
      <span
        className={cn(
          "text-base md:text-sm font-normal text-tDefault",
          className
        )}
        {...spanProps}
      >
        {map(parts, (part, i) => {
          const isHighlighted = toLower(part) === toLower(searchText);
          return (
            <span
              key={`highlight-text-${part}-${i}`}
              className={cn(
                "text-base md:text-sm font-normal text-tDefault",
                className,
                isHighlighted ? "bg-gray-200" : ""
              )}
            >
              {part}
            </span>
          );
        })}
      </span>
    );
  }
);

HighlightText.displayName = "HighlightText";
