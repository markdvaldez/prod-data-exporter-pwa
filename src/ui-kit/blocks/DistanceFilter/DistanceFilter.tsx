import { RadioButtonItem } from "@/ui-kit/components/RadioButtonItem";
import { cn } from "@/ui-kit/lib/utils";
import { map } from "lodash";
import { memo, useCallback } from "react";

type DistanceFilterProps = {
  className?: string;
  value?: number;
  onChange?: (value: number | string) => void;
};

const DISTANCE_OPTIONS = [10, 20, 50, 100];

export const DistanceFilter: React.FC<DistanceFilterProps> = memo(
  ({ className, value, onChange }) => {
    const handleChange = useCallback(
      (value: string | number) => {
        onChange?.(value);
      },
      [onChange]
    );

    return (
      <div className={cn("flex", className)}>
        <span className="text-base text-tDefault">Miles</span>
        {map(DISTANCE_OPTIONS, (item) => (
          <RadioButtonItem
            key={`distance-item-${item}`}
            className="mx-2"
            label={item}
            value={item}
            checked={value === item}
            onChange={handleChange}
          />
        ))}
      </div>
    );
  }
);

DistanceFilter.displayName = "DistanceFilter";
