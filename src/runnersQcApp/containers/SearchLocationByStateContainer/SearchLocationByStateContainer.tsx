import { checkSubstring } from "@/runnersQcApp/shared/CompareUtils";
import { getTruncatedText } from "@/runnersQcApp/shared/TextUtils";
import { useFetchDefaultLocationsQuery } from "@/services/api/modules/locations/fetchDefaultLocations";
import {
  updateDefaultLocations,
  updateDescription,
} from "@/services/store/modules/locations";
import { mapStatesToProps } from "@/services/store/modules/locations/helpers";
import { selectDefaultLocations } from "@/services/store/modules/locations/selectors";
import { TLocation } from "@/services/store/modules/locations/types";
import { InformationBlock } from "@/ui-kit/blocks/InformationBlock";
import { Loader } from "@/ui-kit/components/Loader";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { SearchLocationListItem } from "@/ui-kit/components/SearchLocationListItem";
import { useIsSmallPhone } from "@/ui-kit/hooks/useSmallPhone";
import { getFormattedLocation } from "@/utils/locationId";
import _, { filter, map } from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationView } from "./ConfirmationView";

export type SearchLocationContainerProps = {
  onChange?: (value: TLocation) => void;
};

const MIN_LENGTH = 2;

type TScreenState = "searching" | "confirming";

export const SearchLocationByStateContainer: React.FC<SearchLocationContainerProps> =
  memo(({ onChange }) => {
    const t = useTranslations("Location");
    const dispatch = useDispatch();

    const defaultLocations = useSelector(selectDefaultLocations);

    const [searchWord, setSearchWord] = useState("");
    const [selectedLocation, setSelectedLocation] = useState<TLocation>();
    const [description, setDescription] = useState<string>();

    const { data, isFetching } = useFetchDefaultLocationsQuery();

    const isSmallPhone = useIsSmallPhone();

    const screenState: TScreenState = selectedLocation
      ? "confirming"
      : "searching";

    const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        e?.preventDefault?.();
        const nextValue = e?.target?.value || "";
        setSearchWord(nextValue);
      },
      []
    );

    const filteredLocations = useMemo(() => {
      if (!searchWord) return [] as TLocation[];
      return filter(
        defaultLocations,
        (location: TLocation) =>
          checkSubstring(location.locationName, searchWord) ||
          checkSubstring(location.locationId, searchWord)
      );
    }, [defaultLocations, searchWord]);

    const searchWordValue = useMemo(() => {
      if (screenState === "searching") {
        return searchWord;
      }

      const formattedName = getFormattedLocation({
        name: selectedLocation?.locationName,
        hisaId: selectedLocation?.locationId,
      });

      const maxLength = isSmallPhone ? 36 : formattedName.length;

      return getTruncatedText(formattedName, maxLength);
    }, [
      isSmallPhone,
      screenState,
      searchWord,
      selectedLocation?.locationId,
      selectedLocation?.locationName,
    ]);

    const handleItemPress = useCallback((location: TLocation) => {
      setSelectedLocation(location);
    }, []);

    const handleClear = useCallback(() => {
      setSelectedLocation(undefined);
      setSearchWord("");
      setDescription("");
    }, []);

    const handleConfirm = useCallback(() => {
      if (selectedLocation) {
        dispatch(updateDescription({ text: description || "" }));
        onChange?.(selectedLocation);
      }
    }, [description, dispatch, onChange, selectedLocation]);

    const renderItem = useCallback(
      (location: TLocation, index: number) => (
        <SearchLocationListItem
          key={`SearchLocationListItem-${location.locationId}`}
          label={getFormattedLocation({
            name: location.locationName,
            hisaId: location.locationId,
          })}
          value={location}
          isState={true}
          searchText={searchWord}
          itemStyles="bg-w0"
          bordered={index !== filteredLocations.length - 1}
          onClick={handleItemPress}
        />
      ),
      [filteredLocations.length, handleItemPress, searchWord]
    );

    const renderContent = useMemo(() => {
      if (screenState === "confirming") {
        return (
          <div className="flex flex-1 justify-between pt-5">
            <ConfirmationView
              description={description}
              onChange={setDescription}
              onConfirm={handleConfirm}
            />
          </div>
        );
      }
      if (isFetching && _.isEmpty(filteredLocations)) {
        return (
          <div className="flex justify-center w-full p-8">
            <Loader />
          </div>
        );
      }

      if (!searchWord) {
        return (
          <InformationBlock
            icon="search"
            iconSize="h-24 w-24"
            text={t("startSearch")}
            iconRoundBg="bg-c3"
          />
        );
      }

      if (
        !isFetching &&
        searchWord &&
        searchWord.length >= 2 &&
        _.isEmpty(filteredLocations)
      ) {
        return (
          <InformationBlock
            icon="search"
            iconSize="h-24 w-24"
            text={t("notFound")}
            iconRoundBg="bg-c3"
          />
        );
      }
      return map(filteredLocations, renderItem);
    }, [
      description,
      filteredLocations,
      handleConfirm,
      isFetching,
      renderItem,
      screenState,
      searchWord,
      t,
    ]);

    useEffect(() => {
      if (data && !_.isEmpty(data)) {
        dispatch(updateDefaultLocations({ locations: mapStatesToProps(data) }));
      }
    }, [data, dispatch]);

    return (
      <>
        <div className="relative flex-col mt-6">
          <div className="text-tDefault text-sm font-semibold mb-2">
            {t("chooseState")}
          </div>
          <SearchInput
            value={searchWordValue}
            placeholder={t("enterState")}
            isLeftIcon={false}
            onChange={handleSearch}
            onClear={handleClear}
          />
        </div>
        <ScrollArea className="flex-1 flex-col items-center">
          {renderContent}
        </ScrollArea>
      </>
    );
  });

SearchLocationByStateContainer.displayName = "SearchLocationByStateContainer";
