import { cn } from "@/ui-kit/lib/utils";
import React from "react";

export type FieldLabelProps = {
  label: string;
  labelStyles?: string;
};

export const FieldLabel: React.FC<FieldLabelProps> = ({
  label,
  labelStyles,
}) => {
  return (
    <div
      className={cn(
        "text-md sm:text-sm font-semibold text-tDefault mb-2 mt-4",
        labelStyles
      )}
    >
      {label}
    </div>
  );
};
