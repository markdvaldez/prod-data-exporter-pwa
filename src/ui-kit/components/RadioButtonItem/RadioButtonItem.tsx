import { cn } from "@/ui-kit/lib/utils";
import { memo, useCallback } from "react";
import { RadioButtonNew } from "../RadioButtonNew";

type CheckBoxItemProps = {
  className?: string;
  label: string | number;
  value: string | number;
  checked?: boolean;
  onChange: (value: string | number) => void;
};

export const RadioButtonItem: React.FC<CheckBoxItemProps> = memo(
  ({ className, label = "", value, checked, onChange }) => {
    const toggleCheckBox = useCallback(() => {
      onChange(value);
    }, [onChange, value]);

    return (
      <label
        className={cn("flex items-center space-x-2 cursor-pointer", className)}
        onClick={toggleCheckBox}
      >
        <RadioButtonNew isActive={!!checked} />
        <span className="text-sm text-tDefault">{label}</span>
      </label>
    );
  }
);

RadioButtonItem.displayName = "RadioButtonItem";
