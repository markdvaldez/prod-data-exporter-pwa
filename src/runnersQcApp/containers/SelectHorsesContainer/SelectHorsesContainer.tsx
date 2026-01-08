"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { checkSubstring } from "@/runnersQcApp/shared/CompareUtils";
import { THorse } from "@/runnersQcApp/shared/types";
import { useSearchHorsesQuery } from "@/services/api/modules/horses/fetchHorses";
import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import {
  getPersonHorses,
  updateSearchHorseResults,
} from "@/services/store/modules/horses";
import { mapAutocompleteHorsesToProps } from "@/services/store/modules/horses/helpers";
import {
  selectError,
  selectHorsesByPerson,
  selectIsSearching,
  selectPersonHorses,
  selectSearchHorsesResult,
} from "@/services/store/modules/horses/selectors";
import { HorseListItemSelect } from "@/ui-kit/components/HorseListItemSelect";
import { Loader } from "@/ui-kit/components/Loader";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { Toaster } from "@/ui-kit/components/Toaster";
import { toast } from "@/ui-kit/hooks/useToast";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SelectHorsesContainer: React.FC = () => {
  const t = useTranslations("SearchHorses");
  const dispatch = useDispatch();
  const hisaPersonId = useSelector(selectHisaPersonId);
  const myHorses = useSelector(selectHorsesByPerson);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsSearching);
  const selectedHorses = useSelector(selectPersonHorses);
  const searchResult = useSelector(selectSearchHorsesResult);

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 400);

  const { data: horses = [], isFetching } =
    useSearchHorsesQuery(debouncedSearchText);

  const filteredMyHorses = useMemo(() => {
    if (!debouncedSearchText) {
      return myHorses;
    }
    return _.filter(myHorses, (horse) => {
      return (
        checkSubstring(horse.name, debouncedSearchText) ||
        checkSubstring(horse.hisaHorseId, debouncedSearchText)
      );
    });
  }, [myHorses, debouncedSearchText]);

  const filteredResult = useMemo(() => {
    if (!debouncedSearchText) {
      return [];
    }
    return _.filter(searchResult, (horse) => {
      const locationName = horse?.locationName;
      const hisaPersonName = horse?.responsiblePersonName;
      return (
        checkSubstring(horse.name, debouncedSearchText) ||
        checkSubstring(horse.hisaHorseId, debouncedSearchText) ||
        checkSubstring(hisaPersonName, debouncedSearchText) ||
        checkSubstring(locationName, debouncedSearchText)
      );
    });
  }, [debouncedSearchText, searchResult]);

  const handleCheckedChange = useCallback((horse: THorse) => {}, []);

  const renderHorseItem = useCallback(
    (horse: THorse, isLastItem: boolean) => {
      return (
        <HorseListItemSelect
          key={horse.hisaHorseId}
          title={horse.name}
          horse={horse}
          subTitle={`(${getFormattedId(horse.hisaHorseId)})`}
          isChecked={selectedHorses.some(
            (h) => h.hisaHorseId === horse.hisaHorseId
          )}
          onCheckedChange={handleCheckedChange}
          isLastItem={isLastItem}
        />
      );
    },
    [handleCheckedChange, selectedHorses]
  );

  const renderContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex-1 flex items-center justify-center text-center">
          <Loader size="lg" />
        </div>
      );
    } else if (
      debouncedSearchText &&
      !isFetching &&
      filteredResult.length === 0
    ) {
      return (
        <div className="flex-1 flex items-center justify-center text-center">
          {t("horsesNotFound")}
        </div>
      );
    }
    return (
      <>
        {filteredMyHorses.length > 0 ? (
          <div className="mb-4">
            <h2 className="text-base mb-2">{t("myHorses")}</h2>
            {filteredMyHorses.map((horse, index) =>
              renderHorseItem(horse, index === filteredMyHorses.length - 1)
            )}
          </div>
        ) : null}
        {filteredResult.length > 0 ? (
          <div>
            {filteredMyHorses.length ? (
              <h2 className="text-base mb-2">{t("otherHorses")}</h2>
            ) : null}
            {filteredResult.map((horse, index) =>
              renderHorseItem(horse, index === filteredResult.length - 1)
            )}
          </div>
        ) : null}
      </>
    );
  }, [
    debouncedSearchText,
    filteredMyHorses,
    filteredResult,
    isFetching,
    isLoading,
    renderHorseItem,
    t,
  ]);

  useEffect(() => {
    dispatch(getPersonHorses({ personId: hisaPersonId }));
  }, [dispatch, hisaPersonId]);

  useEffect(() => {
    if (horses.length > 0) {
      const mappedHorses = mapAutocompleteHorsesToProps(horses);
      dispatch(updateSearchHorseResults({ horses: mappedHorses }));
    }
  }, [horses, dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: error.name,
        variant: "destructive",
      });
    }
  }, [error]);

  return (
    <div className="p-4 pt-16 min-h-screen bg-mainBackground flex flex-col items-center">
      <div className="w-full lg:w-2/3 flex flex-col h-full">
        <div className="mb-4">
          <div className="text-tDefault text-xs mb-2 font-[family-name:var(--font-dm-sans)]">
            {t("search")}
          </div>
          <SearchInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={t("searchHorse")}
          />
        </div>
        <div className="flex-1 flex flex-col">{renderContent}</div>
      </div>
      <Toaster />
    </div>
  );
};
