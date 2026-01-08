import { cn } from "@/ui-kit/lib/utils";
import React, { memo } from "react";

export type RadioButtonProps = {
  active?: boolean;
  testID?: string;
};

export const RadioButton: React.FC<RadioButtonProps> = memo(
  ({ active = false, testID }) => {
    return (
      <div
        className={cn(
          "border-4 w-5 h-5 rounded-[10px] border-b9",
          active ? "bg-a0" : "bg-transparent"
        )}
        id={testID}
      />
    );
  }
);

RadioButton.displayName = "RadioButton";
