import { HorseItemMain } from "@/runnersQcApp/containers/AddRecordContainer/components";
import { THorse } from "@/runnersQcApp/shared/types";
import { SelectHorsesPanel } from "@/ui-kit/blocks/SelectHorsesPanel";
import { Button } from "@/ui-kit/components/Button";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useMemo, useState } from "react";

export type AddHorsesBlockProps = {
  horses: THorse[];
  handleItemPress: (item: THorse) => void;
  handleDeleteHorse: (item: THorse) => void;
};

export const AddHorsesBlock: React.FC<AddHorsesBlockProps> = memo(
  ({ horses, handleItemPress, handleDeleteHorse }) => {
    const t = useTranslations("AddRecord");

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const horsesTitle = useMemo(() => {
      return _.isEmpty(horses)
        ? t("startAddingHorses")
        : `${horses.length} ${t("horsesAdded")}`;
    }, [horses, t]);

    const handleAddHorses = useCallback(() => {
      setIsPanelOpen(!isPanelOpen);
    }, [isPanelOpen]);

    const handleSelectPress = useCallback(() => {
      handleAddHorses();
    }, [handleAddHorses]);

    return (
      <>
        <div className="flex flex-1 sm:px-4 pb-10 bg-mainBackground">
          <div className="flex flex-1 flex-col">
            <div className="text-xl text-tDefault sm:pl-4 font-semibold">
              {t("addHorses")}
            </div>
            <div className="text-md sm:text-sm text-tPlaceholder pt-3 pb-4 sm:pl-4">
              {t("findAndSelectHorses")}
            </div>
            <Button
              className="bg-w0 border-b5 sm:mx-4 w-full xl:w-[490px] border rounded-xl sm:pl-4"
              variant="outline"
              title={t("selectHorses")}
              onClick={handleSelectPress}
            />
            <div className="pt-4 text-md sm:text-sm font-medium pb-4 sm:pl-4">
              {horsesTitle}
            </div>
            {_.map(horses, (horse: THorse, index: number) => (
              <HorseItemMain
                key={`${horse.hisaHorseId}-${index}`}
                horse={horse}
                isLastItem={index === horses.length - 1}
                onItemPress={handleDeleteHorse}
              />
            ))}
          </div>
        </div>
        <SelectHorsesPanel
          isOpen={isPanelOpen}
          title={t("selectHorses")}
          selectedHorses={horses}
          handleOpen={handleAddHorses}
          handleItemPress={handleItemPress}
        />
      </>
    );
  }
);

AddHorsesBlock.displayName = "AddHorsesBlock";
