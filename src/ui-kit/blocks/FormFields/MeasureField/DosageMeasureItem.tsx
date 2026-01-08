import { DosageMeasureType } from "@/runnersQcApp/shared/types";
import { RadioButton } from "@/ui-kit/components/RadioButton";
import { cn } from "@/ui-kit/lib/utils";
import React, { memo, useCallback } from "react";

export type DosageMeasureItemProps = {
  value?: string;
  withBorder?: boolean;
  onChange?: (value: string) => void;
};

export const DosageMeasureItem: React.FC<DosageMeasureItemProps> = memo(
  ({ onChange, value, withBorder = true }) => {
    const handlePressLeft = useCallback(() => {
      onChange?.(DosageMeasureType.mg);
    }, [onChange]);

    const handlePressRight = useCallback(() => {
      onChange?.(DosageMeasureType.ml);
    }, [onChange]);

    return (
      <div
        className={cn(
          "flex flex-row bg-w0 h-12 sm:h-10 rounded-md border-b8 items-center justify-center",
          withBorder ? "border pl-3 pr-3" : "border-0 pl-0 pr-0"
        )}
      >
        <div className="flex flex-row pl-2 pr-2" onClick={handlePressLeft}>
          <div className="pr-2 text-sm text-b0">mg</div>
          <RadioButton active={value?.toLowerCase() === DosageMeasureType.mg} />
        </div>
        <div
          className="flex flex-row items-center justify-center pl-2 pr-2"
          onClick={handlePressRight}
        >
          <div className="pr-2 text-sm text-b0">ml</div>
          <RadioButton active={value?.toLowerCase() === DosageMeasureType.ml} />
        </div>
      </div>
    );
  }
);

DosageMeasureItem.displayName = "DosageMeasureItem";
