import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { THorse } from "@/runnersQcApp/shared/types";
import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import { getPersonHorses } from "@/services/store/modules/horses";
import { HorseListItemSelect } from "@/ui-kit/components/HorseListItemSelect";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../Panel/Panel";
import { isMyHorse } from "./helpers";
export type TreatmentHorsesListPanelProps = {
  isOpen: boolean;
  title: string;
  selectedHorses?: THorse[];
  handleOpen: () => void;
};

export const TreatmentHorsesListPanel: React.FC<
  TreatmentHorsesListPanelProps
> = ({ isOpen, selectedHorses, title, handleOpen }) => {
  const t = useTranslations();

  const dispatch = useDispatch();

  const hisaPersonId = useSelector(selectHisaPersonId);
  const { myHorses, otherHorses } = useMemo(() => {
    const _myHorses: THorse[] = [];
    const _otherHorses: THorse[] = [];

    _.forEach(selectedHorses, (horse) => {
      if (isMyHorse(horse, hisaPersonId)) {
        _myHorses.push(horse);
      } else {
        _otherHorses.push(horse);
      }
    });

    return {
      myHorses: _myHorses.length ? _myHorses : null,
      otherHorses: _otherHorses.length ? _otherHorses : null,
    };
  }, [hisaPersonId, selectedHorses]);

  const renderContent = useMemo(() => {
    return (
      <div className="mb-6 sm:mb-0">
        {myHorses ? (
          <div className="mb-6">
            <h2 className="text-base mb-2 mt-2 pl-4">
              {t("SearchHorses.myHorses")}
            </h2>
            {_.map(myHorses, (horse, index) => {
              return (
                <HorseListItemSelect
                  key={horse.hisaHorseId}
                  withCheckbox={false}
                  title={horse.name}
                  subTitle={`(${getFormattedId(horse.hisaHorseId)})`}
                  horse={horse}
                  isLastItem={index === myHorses.length - 1}
                />
              );
            })}
          </div>
        ) : null}
        {otherHorses ? (
          <div className="mb-6">
            <h2 className="text-base mb-2 mt-2 pl-4">
              {t("SearchHorses.otherHorses")}
            </h2>
            {_.map(otherHorses, (horse, index) => {
              return (
                <HorseListItemSelect
                  key={horse.hisaHorseId}
                  withCheckbox={false}
                  title={horse.name}
                  subTitle={`(${getFormattedId(horse.hisaHorseId)})`}
                  horse={horse}
                  isLastItem={index === otherHorses.length - 1}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }, [myHorses, otherHorses, t]);

  useEffect(() => {
    dispatch(getPersonHorses({ personId: hisaPersonId }));
  }, [dispatch, hisaPersonId]);

  return (
    <Panel
      className="flex flex-col h-full w-full md:w-1/2 lg:w-1/3"
      open={isOpen}
      title={title}
      onClose={handleOpen}
    >
      <div className="flex flex-1 flex-col py-4 bg-mainBackground ">
        <ScrollArea className="h-[calc(100vh-90px)] overflow-auto scroll-thin">
          <div className="flex-1 flex flex-col">{renderContent}</div>
        </ScrollArea>
      </div>
    </Panel>
  );
};
