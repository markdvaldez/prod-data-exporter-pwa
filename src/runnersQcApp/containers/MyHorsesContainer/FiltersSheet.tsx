"use client";

import Panel from "@/ui-kit/blocks/Panel/Panel";
import { RecordAccordion } from "@/ui-kit/components/Accordion/RecordAccordion";
import { Button } from "@/ui-kit/components/Button";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export type FiltersSheetProps = {
  open: boolean;
  onClose: () => void;
  initialTrainer: string;
  initialTrack: string;
  onApply: (trainer: string, track: string) => void;
  trainerOptions: { label: string; value: string }[];
  trackOptions: { label: string; value: string }[];
};

export const FiltersSheet: React.FC<FiltersSheetProps> = ({
  open,
  onClose,
  initialTrainer,
  initialTrack,
  onApply,
  trainerOptions,
  trackOptions,
}) => {
  const t = useTranslations("MyHorses");
  const [trainer, setTrainer] = useState(initialTrainer);
  const [track, setTrack] = useState(initialTrack);

  useEffect(() => {
    setTrainer(initialTrainer);
    setTrack(initialTrack);
  }, [initialTrainer, initialTrack]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (trainer !== "All") count++;
    if (track !== "All") count++;
    return count;
  }, [trainer, track]);

  const handleClear = useCallback(() => {
    setTrainer("");
    setTrack("");
    onApply("", "");
  }, [onApply]);

  const handleApply = useCallback(() => {
    onApply(trainer, track);
  }, [onApply, trainer, track]);

  return (
    <Panel
      open={open}
      onClose={onClose}
      title={t("filters")}
      className="flex flex-col w-full lg:w-1/3"
    >
      <div className="flex flex-col w-full h-full p-4 overflow-y-auto">
        <div className="mb-4">
          <span className="text-base xl:text-sm font-semibold">
            {t("filterBy")}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-base xl:text-sm pb-2 text-tPlaceholder">
            {t("trainer")}
          </span>
          <RecordAccordion
            items={trainerOptions}
            defaultValue={trainer || t("all")}
            placeholder={t("all")}
            onChange={(newVal) => setTrainer(newVal)}
          />
          <span className="text-base xl:text-sm pt-4 pb-2 text-tPlaceholder">
            {t("track")}
          </span>
          <RecordAccordion
            items={trackOptions}
            defaultValue={track || t("all")}
            placeholder={t("all")}
            onChange={(newVal) => setTrack(newVal)}
          />
        </div>
        <div className="flex justify-end items-center px-4 mt-4 gap-4">
          <span
            onClick={handleClear}
            className="text-sm text-tDefault cursor-pointer"
          >
            {t("clearAll")}
          </span>
          <Button
            onClick={handleApply}
            className="rounded-sm"
            title={`${t("applyFilters")}${
              activeFilterCount > 0 ? " • " + activeFilterCount : ""
            }`}
          />
        </div>
      </div>
    </Panel>
  );
};

FiltersSheet.displayName = "FiltersSheet";
