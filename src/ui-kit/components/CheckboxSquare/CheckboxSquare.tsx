import { cn } from "@/ui-kit/lib/utils";
import React, { memo } from "react";
import { CheckboxOffIcon } from "../Icons/CheckboxOffIcon";
import { CheckboxOnIcon } from "../Icons/CheckboxOnIcon";

export type CheckBoxSquareProps = {
  isActive: boolean;
};

export const CheckBoxSquare: React.FC<CheckBoxSquareProps> = memo(
  ({ isActive }) => {
    return (
      <div className="w-6 h-6">
        <div className="absolute top-5 bottom-0 justify-center items-center w-full">
          <CheckboxOffIcon />
        </div>
        <div
          className={cn(
            "absolute top-5 bottom-0 justify-center items-center w-full",
            isActive ? "opacity-100" : "opacity-0"
          )}
        >
          <CheckboxOnIcon />
        </div>
      </div>
    );
  }
);

CheckBoxSquare.displayName = "CheckBoxSquare";
