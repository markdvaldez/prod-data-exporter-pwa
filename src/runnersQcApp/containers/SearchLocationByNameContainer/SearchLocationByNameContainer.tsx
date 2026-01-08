import { checkSubstring } from "@/runnersQcApp/shared/CompareUtils";
import { clearSearchText } from "@/runnersQcApp/shared/TextUtils";
import { locationTypes } from "@/runnersQcApp/shared/types";
import { searchLocations } from "@/services/store/modules/locations";
import {
  selectIsFetching,
  selectLocationsList,
} from "@/services/store/modules/locations/selectors";
import { TLocation } from "@/services/store/modules/locations/types";
import { InformationBlock } from "@/ui-kit/blocks/InformationBlock";
import { Loader } from "@/ui-kit/components/Loader";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { SearchLocationListItem } from "@/ui-kit/components/SearchLocationListItem";
import { getFormattedLocation } from "@/utils/locationId";
import _, { debounce, filter, map } from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export type SearchLocationByNameContainerProps = {
  isOpen?: boolean;
  onChange?: (value: TLocation) => void;
};

const MIN_LENGTH = 2;

export const SearchLocationByNameContainer: React.FC<SearchLocationByNameContainerProps> =
  memo(({ onChange }) => {
    const t = useTranslations("Location");
    const dispatch = useDispatch();
    const [searchText, setSearchText] = React.useState("");
    const isFetching = useSelector(selectIsFetching);
    const locations = useSelector(selectLocationsList);

    const handleApiCallRef = useRef(
      debounce((text: string, dispatch, locationTypes) => {
        if (text.length >= MIN_LENGTH) {
          dispatch(searchLocations({ text, locationTypes }));
        }
      }, 600)
    );

    const handleSearch = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        e?.preventDefault?.();
        const nextValue = e?.target?.value || "";
        setSearchText(nextValue);
        handleApiCallRef.current(
          clearSearchText(nextValue),
          dispatch,
          locationTypes
        );
      },
      [dispatch]
    );

    const filteredLocations = useMemo(() => {
      if (!searchText) return [] as TLocation[];
      return filter(
        locations,
        (location: TLocation) =>
          checkSubstring(location.locationName, searchText) ||
          checkSubstring(location.locationId, searchText)
      );
    }, [locations, searchText]);

    const renderItem = useCallback(
      (location: TLocation) => (
        <SearchLocationListItem
          key={`SearchLocationListItem-${location.locationId}`}
          label={getFormattedLocation({
            name: location.locationName,
            hisaId: location.locationId,
          })}
          value={location}
          searchText={searchText}
          bordered={true}
          onClick={onChange}
        />
      ),
      [onChange, searchText]
    );

    const renderContent = useMemo(() => {
      if (isFetching && _.isEmpty(filteredLocations)) {
        return (
          <div className="flex justify-center w-full p-8">
            <Loader />
          </div>
        );
      }

      if (!searchText) {
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
        searchText &&
        searchText.length >= 2 &&
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
    }, [filteredLocations, isFetching, renderItem, searchText, t]);

    return (
      <>
        <div className="flex-col mt-6">
          <div className="text-tDefault text-sm font-semibold mb-2">
            {t("locationName")}
          </div>
          <SearchInput
            value={searchText}
            onChange={handleSearch}
            placeholder={t("enterTheLocationName")}
            isLeftIcon={false}
          />
        </div>
        <ScrollArea className="flex-1 flex-col items-center">
          {renderContent}
        </ScrollArea>
      </>
    );
  });

SearchLocationByNameContainer.displayName = "SearchLocationByNameContainer";
