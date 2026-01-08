"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { checkString } from "@/runnersQcApp/shared/CompareUtils";
import { clearSearchText } from "@/runnersQcApp/shared/TextUtils";
import { THorse } from "@/runnersQcApp/shared/types";
import routes from "@/routes";
import {
  selectHorsesByPerson,
  selectIsFetching,
} from "@/services/store/modules/horses/selectors";
import { BackButton } from "@/ui-kit/components/BackButton";
import { HorseDetailsListItem } from "@/ui-kit/components/HorseDetailsListItem";
import { Loader } from "@/ui-kit/components/Loader";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FiltersSheet } from "./FiltersSheet";

const defaultFilter = { label: "All", value: "All" };

export const MyHorsesContainer: React.FC = () => {
  const t = useTranslations("MyHorses");
  const router = useRouter();

  const isConnected = useInternetConnection();

  const allHorses = useSelector(selectHorsesByPerson);
  const isFetching = useSelector(selectIsFetching);

  const [searchQuery, setSearchQuery] = useState("");
  const [trainerFilter, setTrainerFilter] = useState("");
  const [trackFilter, setTrackFilter] = useState("");
  const [openSheet, setOpenSheet] = useState(false);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const filteredHorses = useMemo(() => {
    let result = [...allHorses];
    if (searchQuery) {
      result = result.filter((horse: THorse) => {
        const name = horse.name || "";
        const id = horse.hisaHorseId || "";
        const responsibleName = horse.responsiblePersonName || "";
        const location = horse.locationName || "";
        return (
          checkString(name, clearSearchText(searchQuery)) ||
          checkString(id, searchQuery) ||
          checkString(responsibleName, clearSearchText(searchQuery)) ||
          checkString(location, clearSearchText(searchQuery))
        );
      });
    }
    if (trainerFilter) {
      result = result.filter((horse: THorse) => {
        const responsibleName = horse.responsiblePersonName || "";

        return checkString(responsibleName, trainerFilter);
      });
    }
    if (trackFilter) {
      result = result.filter((horse: THorse) => {
        const location = horse.locationName || "";
        return checkString(location, trackFilter);
      });
    }
    return result;
  }, [allHorses, searchQuery, trainerFilter, trackFilter]);

  const trainerOptions = useMemo(() => {
    return _.chain(allHorses)
      .map((horse: THorse) => ({
        label: horse.responsiblePersonName || "",
        value: horse.responsiblePersonName || "",
      }))
      .uniqBy("label")
      .sortBy("label")
      .value();
  }, [allHorses]);

  const trackOptions = useMemo(() => {
    return _.chain(allHorses)
      .map((horse: THorse) => ({
        label: horse.locationName || "",
        value: horse.locationName || "",
      }))
      .uniqBy("label")
      .sortBy("label")
      .value();
  }, [allHorses]);

  const filterCount = useMemo(() => {
    let count = 0;
    if (trainerFilter) count++;
    if (trackFilter) count++;
    return count;
  }, [trainerFilter, trackFilter]);

  const screenSize = useScreenSize();

  const styles = useMemo(
    () => ({ height: `${screenSize.height - 48}px` }),
    [screenSize.height]
  );

  const toggleSheet = useCallback(() => {
    setOpenSheet(!openSheet);
  }, [openSheet]);

  const handleApplyFilters = useCallback((trainer: string, track: string) => {
    setTrainerFilter(trainer === "All" ? "" : trainer);
    setTrackFilter(track === "All" ? "" : track);
    setOpenSheet(false);
  }, []);

  const renderHorseItem = useCallback(
    (horse: THorse, index: number) => (
      <HorseDetailsListItem
        key={`horse-${horse.hisaHorseId}-${index}`}
        className={"sm:py-3"}
        hisaHorseId={getFormattedId(horse.hisaHorseId || "")}
        name={horse.name}
        canRace={horse.canRace}
        canWork={horse.canWork}
        responsiblePerson={horse.responsiblePersonName || ""}
        locationName={horse.locationName || ""}
        bordered={index < filteredHorses.length - 1}
        onClick={() => {
          router.push(routes.HORSE(horse.hisaHorseId));
        }}
      />
    ),
    [filteredHorses, router]
  );

  if (isFetching) {
    return (
      <div className="bg-mainBackground h-screen w-full flex flex-1 flex-col items-center justify-center overflow-hidden">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div
      style={styles}
      className="px-4 pb-safe-bottom sm:pb-safe-bottom-28 bg-mainBackground flex flex-1 flex-col max-w-full items-center overflow-hidden"
    >
      <div className="flex mb-4 w-full xl:w-2/3 items-end">
        <div className="flex flex-col flex-1">
          <BackButton styles={cn(isConnected ? "pt-2" : "pt-7 sm:pt-2")} />
          <h1 className="text-2xl font-semibold pb-2 sm:pb-8">
            {t("myHorses")}
          </h1>
          <div className="text-tDefault text-base lg:text-sm mb-2">
            {t("searchBy")}
          </div>
          <SearchInput
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t("search")}
          />
        </div>
        <div
          className="flex px-3 py-2 items-center justify-center bg-white border border-[#191C1F]/10 rounded-sm cursor-pointer h-12 sm:h-10 ml-2"
          onClick={toggleSheet}
        >
          <span className="text-tDefault text-base lg:text-sm font-normal">
            {t("filters")}
            {filterCount > 0 ? " • " + filterCount : ""}
          </span>
        </div>
        <FiltersSheet
          open={openSheet}
          onClose={toggleSheet}
          initialTrainer={trainerFilter}
          initialTrack={trackFilter}
          onApply={handleApplyFilters}
          trainerOptions={[defaultFilter, ...trainerOptions]}
          trackOptions={[defaultFilter, ...trackOptions]}
        />
      </div>
      <ScrollArea
        className="flex-1 w-full xl:w-2/3 bg-white rounded-[16px] shadow-custom overflow-y-auto overflow-x-hidden"
        scrollWidth="0"
      >
        {filteredHorses.length === 0 ? (
          <div className="p-4 text-center">{t("noHorsesFound")}</div>
        ) : (
          _.map(filteredHorses, (horse: THorse, index: number) =>
            renderHorseItem(horse, index)
          )
        )}
      </ScrollArea>
    </div>
  );
};
