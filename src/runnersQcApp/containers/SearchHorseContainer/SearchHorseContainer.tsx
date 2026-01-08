"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { checkString } from "@/runnersQcApp/shared/CompareUtils";
import routes from "@/routes";
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
  selectSearchHorsesResult,
} from "@/services/store/modules/horses/selectors";
import { InformationBlock } from "@/ui-kit/blocks/InformationBlock";
import { BackButton } from "@/ui-kit/components/BackButton";
import { HorseListItem } from "@/ui-kit/components/HorseListItem";
import { Loader } from "@/ui-kit/components/Loader";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { toast } from "@/ui-kit/hooks/useToast";
import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const SearchHorseContainer: React.FC = () => {
  const t = useTranslations("SearchHorses");
  const dispatch = useDispatch();
  const router = useRouter();

  const isConnected = useInternetConnection();

  const [searchText, setSearchText] = useState("");
  const hisaPersonId = useSelector(selectHisaPersonId);
  const myHorses = useSelector(selectHorsesByPerson);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsSearching);
  const searchResult = useSelector(selectSearchHorsesResult);

  const debouncedSearchText = useDebounce(searchText, 400);

  const { data: horses = [], isFetching } =
    useSearchHorsesQuery(debouncedSearchText);

  const filteredMyHorses = useMemo(() => {
    if (!debouncedSearchText) {
      return myHorses;
    }
    return _.filter(myHorses, (horse) => {
      return (
        checkString(horse.name, debouncedSearchText) ||
        checkString(horse.hisaHorseId, debouncedSearchText)
      );
    });
  }, [myHorses, debouncedSearchText]);

  const filteredResult = useMemo(() => {
    if (!debouncedSearchText) {
      return [];
    }
    return _.filter(searchResult, (horse) => {
      return (
        checkString(horse?.name, debouncedSearchText) ||
        checkString(horse?.hisaHorseId, debouncedSearchText)
      );
    });
  }, [debouncedSearchText, searchResult]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  const onItemPress = useCallback(
    (hisaHorseId: string) => {
      router.push(routes.HORSE(hisaHorseId));
    },
    [router]
  );

  const renderContent = useMemo(() => {
    if (
      !searchText &&
      _.isEmpty(filteredMyHorses) &&
      _.isEmpty(filteredResult)
    ) {
      return (
        <InformationBlock
          icon="search"
          iconSize="h-24 w-24"
          text={t("startSearch")}
          iconRoundBg="bg-c3"
        />
      );
    }
    if (isLoading && !filteredMyHorses.length) {
      return (
        <div className="flex justify-center w-full p-8">
          <Loader size="lg" />
        </div>
      );
    }

    if (debouncedSearchText && !isFetching && filteredResult.length === 0) {
      return (
        <InformationBlock
          icon="search"
          iconSize="h-24 w-24"
          text={t("horsesNotFound")}
          iconRoundBg="bg-c3"
        />
      );
    }
    return (
      <>
        {filteredMyHorses.length > 0 && (
          <div>
            <h2 className="text-base sm:text-lg mb-2 mt-2 px-2">
              {t("myHorses")}
            </h2>
            {_.map(filteredMyHorses, (horse, index) => (
              <HorseListItem
                key={horse.hisaHorseId}
                hisaHorseId={horse.hisaHorseId}
                title={horse.name}
                subTitle={`(${getFormattedId(horse.hisaHorseId)})`}
                onItemPress={onItemPress}
                isLastItem={index === filteredMyHorses.length - 1}
                searchText={searchText}
              />
            ))}
          </div>
        )}
        {filteredResult.length > 0 && (
          <>
            {filteredMyHorses.length && filteredResult.length ? (
              <h2 className="text-base sm:text-lg mb-2 px-2">
                {t("otherHorses")}
              </h2>
            ) : null}
            {_.map(filteredResult, (horse, index) => (
              <HorseListItem
                key={horse?.hisaHorseId}
                hisaHorseId={horse.hisaHorseId}
                title={horse?.name}
                subTitle={`(${getFormattedId(horse?.hisaHorseId)})`}
                onItemPress={onItemPress}
                isLastItem={index === filteredResult.length - 1}
                searchText={searchText}
              />
            ))}
          </>
        )}
      </>
    );
  }, [
    debouncedSearchText,
    filteredMyHorses,
    filteredResult,
    isFetching,
    isLoading,
    onItemPress,
    t,
    searchText,
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
    <div
      id={"route-SearchHorseContainer"}
      className="flex flex-1 flex-col bg-mainBackground items-center"
    >
      <div className="px-4 pb-28 sm:pb-6 max-h-[90vh] w-full md:w-5/6 xl:w-2/3 flex flex-col max-w-[100vw] overflow-auto no-scrollbar">
        <BackButton styles={cn(isConnected ? "pt-2" : "pt-7 sm:pt-2")} />
        <h1 className="text-2xl font-semibold text-start self-start">
          {t("searchHorses")}
        </h1>
        <div className="sticky top-0 z-10 pt-4 pb-2 flex-col w-full bg-mainBackground">
          <div className="text-tDefault text-sm font-semibold mb-2">
            {t("search")}
          </div>
          <SearchInput
            value={searchText}
            onChange={handleSearchChange}
            placeholder={t("searchHorse")}
          />
        </div>
        <div className="p-2 flex-col w-full bg-white shadow-custom rounded-md">
          {renderContent}
        </div>
      </div>
    </div>
  );
};

SearchHorseContainer.displayName = "SearchHorseContainer";
