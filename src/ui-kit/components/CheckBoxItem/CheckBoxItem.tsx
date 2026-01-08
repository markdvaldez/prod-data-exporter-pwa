import { cn } from "@/ui-kit/lib/utils";
import { memo, useCallback } from "react";
import { Checkbox } from "../Checkbox";

type CheckBoxItemProps = {
  className?: string;
  label: string | number;
  value: string | number | any;
  checked?: boolean;
  onChange: (value: string | number) => void;
};

export const CheckBoxItem: React.FC<CheckBoxItemProps> = memo(
  ({ className, label = "", value, checked, onChange }) => {
    const toggleCheckBox = useCallback(() => {
      onChange(value);
    }, [onChange, value]);

    return (
      <label
        className={cn("flex items-center space-x-2 cursor-pointer", className)}
      >
        <Checkbox checked={checked} onCheckedChange={toggleCheckBox} />
        <span className="text-sm text-tDefault">{label}</span>
      </label>
    );
  }
);

CheckBoxItem.displayName = "CheckBoxItem";

export default CheckBoxItem;
