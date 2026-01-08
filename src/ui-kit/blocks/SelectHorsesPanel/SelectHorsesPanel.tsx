import { useDebounce } from "@/hooks/useDebounce";
import { useScreenSize } from "@/hooks/useScreenSize";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { checkString } from "@/runnersQcApp/shared/CompareUtils";
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
  selectSearchHorsesResult,
} from "@/services/store/modules/horses/selectors";
import { Button } from "@/ui-kit/components/Button";
import { HorseListItemSelect } from "@/ui-kit/components/HorseListItemSelect";
import { Loader } from "@/ui-kit/components/Loader";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { Toaster } from "@/ui-kit/components/Toaster";
import { toast } from "@/ui-kit/hooks/useToast";
import _, { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../Panel/Panel";
export type SelectHorsesPanelProps = {
  isOpen: boolean;
  title: string;
  selectedHorses?: THorse[];
  handleOpen: () => void;
  handleItemPress: (item: THorse) => void;
};

export const SelectHorsesPanel: React.FC<SelectHorsesPanelProps> = ({
  isOpen,
  selectedHorses,
  title,
  handleOpen,
  handleItemPress,
}) => {
  const t = useTranslations();
  const screen = useScreenSize();
  const dispatch = useDispatch();

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

  const containerStyle = useMemo(
    () => ({ height: screen.height - 40 }),
    [screen.height]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  const renderContent = useMemo(() => {
    if (isLoading && isEmpty(filteredMyHorses) && isEmpty(filteredResult)) {
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
          {t("SearchHorses.horsesNotFound")}
        </div>
      );
    }
    return (
      <div className="mb-6 sm:mb-0">
        {filteredMyHorses.length > 0 && (
          <div className="mb-6">
            <h2 className="text-base mb-2 mt-2 pl-4">
              {t("SearchHorses.myHorses")}
            </h2>
            {_.map(filteredMyHorses, (horse, index) => {
              const isSelected = _.some(selectedHorses, {
                hisaHorseId: horse.hisaHorseId,
              });
              return (
                <HorseListItemSelect
                  key={`${horse.hisaHorseId}-${horse.name}`}
                  title={horse.name}
                  subTitle={`(${getFormattedId(horse.hisaHorseId)})`}
                  horse={horse}
                  isChecked={isSelected}
                  onCheckedChange={handleItemPress}
                  isLastItem={index === filteredMyHorses.length - 1}
                />
              );
            })}
          </div>
        )}
        {filteredResult.length > 0 && (
          <>
            {filteredMyHorses.length && filteredResult.length ? (
              <h2 className="text-base mb-2 pl-4">
                {t("SearchHorses.otherHorses")}
              </h2>
            ) : null}
            {_.map(filteredResult, (horse, index) => {
              const isSelected = _.some(selectedHorses, {
                hisaHorseId: horse.hisaHorseId,
              });
              return (
                <HorseListItemSelect
                  key={`${horse.hisaHorseId}-${horse.name}`}
                  title={horse.name}
                  subTitle={`(${getFormattedId(horse.hisaHorseId)})`}
                  horse={horse as THorse}
                  isChecked={isSelected}
                  onCheckedChange={handleItemPress}
                  isLastItem={index === filteredMyHorses.length - 1}
                />
              );
            })}
          </>
        )}
      </div>
    );
  }, [
    debouncedSearchText,
    filteredMyHorses,
    filteredResult,
    handleItemPress,
    isFetching,
    isLoading,
    selectedHorses,
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
    <Panel
      className="w-full md:w-1/2 lg:w-1/3"
      open={isOpen}
      title={title}
      onClose={handleOpen}
    >
      <div
        className="flex flex-col bg-mainBackground pb-4"
        style={containerStyle}
      >
        <div className="mb-4 px-4">
          <SearchInput
            className="bg-greyDefault"
            value={searchText}
            onChange={handleSearchChange}
            placeholder={t("SearchHorses.searchHorse")}
          />
        </div>
        <ScrollArea className="flex flex-col flex-1 scroll-thin">
          {renderContent}
        </ScrollArea>
        <div className="mx-4 pb-safe-bottom">
          <Button
            className="w-full"
            title={t("SearchHorses.done")}
            onClick={handleOpen}
          />
        </div>
      </div>
      <Toaster />
    </Panel>
  );
};
