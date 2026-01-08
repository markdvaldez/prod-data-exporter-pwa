import { LocationType } from "@/Types";
import { CheckBoxItem } from "@/ui-kit/components/CheckBoxItem";
import { cn } from "@/ui-kit/lib/utils";
import { map, some } from "lodash";
import { memo, useCallback, useMemo } from "react";

export type LocationTypesFilterItem = {
  label: string;
  value: LocationType | LocationType[];
  isSelected: boolean;
};

type LocationTypesFilterProps = {
  className?: string;
  value?: LocationTypesFilterItem[];
  onChange?: (value: LocationTypesFilterItem[]) => void;
};

export const LocationTypesFilter: React.FC<LocationTypesFilterProps> = memo(
  ({ className, value, onChange }) => {
    const handleChange = useCallback(
      (nextValue: any) => {
        const updatedValue = map(value, (item) => {
          if (item.value === nextValue) {
            return { ...item, isSelected: !item.isSelected };
          }
          return item;
        });
        onChange?.(updatedValue);
      },
      [onChange, value]
    );

    const handleSelectAll = useCallback(() => {
      const updatedValue = map(value, (item) => {
        return { ...item, isSelected: false };
      });
      onChange?.(updatedValue);
    }, [onChange, value]);

    const allSelected = useMemo(() => {
      return !some(value, (item) => item.isSelected);
    }, [value]);

    return (
      <div className={cn("flex flex-col", className)}>
        <span className="text-base text-tDefault">Location Types</span>
        <div className={"my-2 flex flex-wrap gap-2"}>
          <CheckBoxItem
            key={`location-item-all`}
            className="mr-2 mt-1"
            label={"All"}
            value={"all"}
            checked={allSelected}
            onChange={handleSelectAll}
          />
          {map(value, (item) => {
            return (
              <CheckBoxItem
                key={`location-item-${item.value}`}
                className="mr-2 mt-1"
                label={item.label}
                value={item.value}
                checked={item.isSelected}
                onChange={handleChange}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

LocationTypesFilter.displayName = "LocationTypesFilter";
