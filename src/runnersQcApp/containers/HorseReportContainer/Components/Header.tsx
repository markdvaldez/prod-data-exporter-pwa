"use client";

import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { Button } from "@/ui-kit/components/Button";
import { Separator } from "@/ui-kit/components/Separator";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { ShieldPopover } from "./ShieldPopover";

type HeaderProps = {
  hisaHorseId?: string;
  horseName?: string;
  canRace?: boolean;
  canWork?: boolean;
  canRaceReason?: string;
  canWorkReason?: string;
  location?: string;
  ownerHisaId?: string;
  ownerName?: string;
  responsiblePersonHisaId?: string;
  responsiblePersonName?: string;
  attendingVet?: string[];
  attendingVetName?: string[];
  onApplyProtocol: () => void;
  onAddRecord: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  hisaHorseId,
  horseName,
  canRace,
  canWork,
  canRaceReason,
  canWorkReason,
  location,
  ownerHisaId,
  ownerName,
  responsiblePersonHisaId,
  responsiblePersonName,
  attendingVet,
  attendingVetName,
  onAddRecord,
  onApplyProtocol,
}) => {
  const t = useTranslations("HorseReport");

  const vets = useMemo(() => {
    return _.zipWith(
      attendingVetName,
      attendingVet,
      (name, id) => `${name} (${getFormattedId(id)})`
    );
  }, [attendingVet, attendingVetName]);

  return (
    <div className="bg-white rounded-[16px] shadow px-3 pt-3 sm:p-6 mb-6 w-full xl:w-2/3">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col flex-1">
          <h1 className="font-semibold text-xl sm:text-2xl pb-1 sm:pb-2">
            {horseName || "-"}
          </h1>
          <div className="flex flex-row items-center">
            <ShieldPopover
              canRace={canRace}
              canWork={canWork}
              canRaceReason={canRaceReason}
              canWorkReason={canWorkReason}
            />
            <span className="font-medium text-base lg:text-sm pl-2">
              {getFormattedId(hisaHorseId)}
            </span>
          </div>
          {/* <div className="flex flex-row py-6 xl:pr-8">
            <Button
              variant="outline"
              className="border-a1 text-a1 text-sm hover:text-a0 flex-1"
              title={t("applyProtocol")}
              onClick={onApplyProtocol}
            />
            <Button
              variant="outline"
              className="border-a1 ml-3 text-a1 text-sm hover:text-a0 flex-1"
              title={t("addRecord")}
              onClick={onAddRecord}
            />
          </div> */}
        </div>

        <div className="flex-1 mt-4 lg:mt-0 lg:ml-4">
          <div className="flex flex-row justify-between pb-3">
            <span className="font-medium text-sm sm:text-base lg:text-sm pr-2 opacity-60">
              {t("location")}
            </span>
            <span className="font-medium text-sm sm:text-base lg:text-sm text-right">
              {location || "-"}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row justify-between pb-3 pt-3">
            <span className="font-medium text-sm sm:text-base lg:text-sm pr-2 opacity-60">
              {t("trainer")}
            </span>
            <span className="font-medium text-sm sm:text-base lg:text-sm text-right">
              {`${responsiblePersonName} (${getFormattedId(
                responsiblePersonHisaId
              )})`}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row justify-between pb-3 pt-3">
            <span className="font-medium text-sm sm:text-base lg:text-sm pr-2 opacity-60">
              {t("owner")}
            </span>
            <span className="font-medium text-sm sm:text-base lg:text-sm text-right">
              {`${ownerName} (${getFormattedId(ownerHisaId)})`}
            </span>
          </div>
          <Separator />
          <div className="flex flex-row justify-between pb-3 pt-3">
            <span className="font-medium text-sm sm:text-base lg:text-sm pr-2 opacity-60">
              {t("vets")}
            </span>
            {vets && vets.length ? (
              <div className="flex flex-col">
                {_.map(vets, (vet, idx) => (
                  <span
                    key={`vet-${idx}`}
                    className="font-medium text-sm sm:text-base lg:text-sm text-right"
                  >
                    {vet}
                  </span>
                ))}
              </div>
            ) : (
              <span className="font-medium text-sm sm:text-base lg:text-sm text-right">
                -
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
