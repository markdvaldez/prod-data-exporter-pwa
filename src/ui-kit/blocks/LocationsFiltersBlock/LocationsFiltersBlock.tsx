import { LocationType } from "@/Types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/ui-kit/components/Accordion/AccordionParts";
import { FilterButton } from "@/ui-kit/components/FilterButton/FilterButton";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import { memo, useCallback, useMemo, useState } from "react";
import { DistanceFilter } from "../DistanceFilter";
import {
  LocationTypesFilter,
  LocationTypesFilterItem,
} from "../LocationTypesFilter";

type LocationsFiltersBlockProps = {
  className?: string;
  value?: any[];
  onChange?: (
    distance: number,
    locationTypes: LocationTypesFilterItem[]
  ) => void;
};

const DEFAULT_LOCATION_TYPES = [
  {
    label: LocationType.Racetrack,
    value: LocationType.Racetrack,
    isSelected: false,
  },
  {
    label: "Training Track",
    value: LocationType.TrainingTrack,
    isSelected: false,
  },
  {
    label: "Vet Practice",
    value: LocationType.VetPractice,
    isSelected: false,
  },
  {
    label: LocationType.Other,
    value: [
      LocationType.Other,
      LocationType.OwnershipLLC,
      LocationType.Lab,
      LocationType.HIWU,
      LocationType.HISA,
      LocationType.StateRacingCommission,
      LocationType.Farm,
      LocationType.AfterCare,
    ],
    isSelected: false,
  },
];

const DEFAULT_DISTANCE = 100;

export const LocationsFiltersBlock: React.FC<LocationsFiltersBlockProps> = memo(
  ({ className, value, onChange }) => {
    const t = useTranslations("Main");
    const [isOpen, setIsOpen] = useState(false);
    const [distance, setDistance] = useState<number>(DEFAULT_DISTANCE);
    const [locationTypes, setLocationTypes] = useState<
      LocationTypesFilterItem[]
    >(DEFAULT_LOCATION_TYPES);

    const toggleAccordion = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    const handleReset = useCallback(() => {
      setDistance(DEFAULT_DISTANCE);
      setLocationTypes(DEFAULT_LOCATION_TYPES);
      onChange?.(DEFAULT_DISTANCE, DEFAULT_LOCATION_TYPES);
      setIsOpen(false);
    }, [onChange]);

    const handleDistanceChange = useCallback(
      (nextDistance: any) => {
        setDistance(nextDistance);
        onChange?.(nextDistance, locationTypes);
      },
      [locationTypes, onChange]
    );

    const handleLocationTypesChange = useCallback(
      (nextValue: LocationTypesFilterItem[]) => {
        setLocationTypes(nextValue);
        onChange?.(distance, nextValue);
      },
      [distance, onChange]
    );

    const hasFilters = useMemo(() => {
      return (
        distance !== DEFAULT_DISTANCE ||
        locationTypes.some((item) => item.isSelected)
      );
    }, [distance, locationTypes]);

    return (
      <div className={cn("flex flex-col", className)}>
        <FilterButton
          isOpen={isOpen}
          isSelected={hasFilters}
          onClick={toggleAccordion}
        />
        <Accordion
          type="single"
          className={"bg-transparent"}
          value={isOpen ? "item-1" : undefined}
          collapsible
        >
          <AccordionItem value="item-1" className="px-4">
            <AccordionContent>
              <DistanceFilter
                value={distance}
                onChange={handleDistanceChange}
                className="mt-4"
              />
              <LocationTypesFilter
                className="mt-4"
                value={locationTypes}
                onChange={handleLocationTypesChange}
              />
              <div className="flex justify-center items-center pt-6">
                <button
                  className="text-tDefault text-base"
                  onClick={handleReset}
                >
                  {t("clearAll")}
                </button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    );
  }
);

LocationsFiltersBlock.displayName = "LocationsFiltersBlock";
