import { clearSearchText } from "@/runnersQcApp/shared/TextUtils";
import { useFetchLocationByAddressQuery } from "@/services/api/modules/locations/fetchLocationByAddress";
import { searchAddresses } from "@/services/store/modules/locations";
import {
  selectAddresses,
  selectIsFetching,
} from "@/services/store/modules/locations/selectors";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { debounce, head } from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchType } from "../SearchLocationContainer/SearchLocationContainer";
import { ConfirmContent } from "./ConfirmContent";
import { mapLocationAddressesToProps } from "./helpers";
import { SearchResults } from "./SearchResults";

const MIN_LENGTH = 2;

type SearchLocationAddressContainerProps = {
  onChange?: (value: any) => void;
  onClose: () => void;
  handleChangeType: (type: SearchType) => void;
  handleSetSelectedLocationAddress: (location: any) => void;
};

type TScreenState = "searching" | "confirming";

const SearchLocationAddressContainer: React.FC<SearchLocationAddressContainerProps> =
  memo(
    ({
      onChange,
      onClose,
      handleChangeType,
      handleSetSelectedLocationAddress,
    }) => {
      const t = useTranslations("Location");
      const dispatch = useDispatch();
      const isFetching = useSelector(selectIsFetching);
      const addresses = useSelector(selectAddresses);

      const [searchText, setSearchText] = useState("");
      const [selectedLocation, setSelectedLocation] = useState<any>(undefined);
      const [foundLocation, setFoundLocation] = useState<any>(undefined);

      const { mutateAsync, isPending } = useFetchLocationByAddressQuery();

      const screenState: TScreenState = selectedLocation
        ? "confirming"
        : "searching";

      const handleApiCallRef = useRef(
        debounce((text: string) => {
          if (text.length >= MIN_LENGTH) {
            dispatch(searchAddresses({ text }));
          }
        }, 600)
      );

      const handleSearch = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
          e?.preventDefault?.();
          const nextValue = e.target.value || "";
          setSearchText(nextValue);
          setFoundLocation(undefined);
          setSelectedLocation(undefined);
          handleApiCallRef.current(clearSearchText(nextValue));
        },
        []
      );

      const handleClear = useCallback(() => {
        setFoundLocation(undefined);
        setSelectedLocation(undefined);
        setSearchText("");
      }, []);

      const filteredLocations = useMemo(() => {
        if (!searchText) return [];
        return mapLocationAddressesToProps(addresses);
      }, [addresses, searchText]);

      const searchWordValue = useMemo(() => {
        return screenState === "searching"
          ? searchText
          : selectedLocation?.address;
      }, [screenState, searchText, selectedLocation?.address]);

      const handleItemPress = useCallback(
        async (location: any) => {
          setSelectedLocation(location);
          const response = await mutateAsync({
            address: location.item,
          });
          const nextLocation = head(response);
          if (nextLocation) {
            setFoundLocation(nextLocation);
          } else {
            handleSetSelectedLocationAddress(location.item);
          }
        },
        [handleSetSelectedLocationAddress, mutateAsync]
      );

      const handleConfirm = useCallback(() => {
        if (foundLocation?.locationId) {
          onChange?.({
            locationId: foundLocation.locationId,
            locationName: foundLocation.name || "",
          });

          handleClear();
        }
      }, [
        foundLocation?.locationId,
        foundLocation?.name,
        handleClear,
        onChange,
      ]);

      return (
        <>
          <div className="flex-col mt-6">
            <div className="text-tDefault text-sm font-semibold mb-2">
              {t("locationAddress")}
            </div>
            <SearchInput
              value={searchWordValue}
              onChange={handleSearch}
              onClear={handleClear}
              placeholder={t("enterLocationAddress")}
              isLeftIcon={false}
            />
          </div>
          <ScrollArea className="flex flex-col items-center">
            {screenState === "confirming" ? (
              <ConfirmContent
                foundLocation={foundLocation}
                isPending={isPending}
                onConfirm={handleConfirm}
                onClose={onClose}
                handleChangeType={handleChangeType}
                t={t}
              />
            ) : (
              <SearchResults
                searchText={searchText}
                isFetching={isFetching}
                filteredLocations={filteredLocations}
                handleItemPress={handleItemPress}
                t={t}
              />
            )}
          </ScrollArea>
        </>
      );
    }
  );

SearchLocationAddressContainer.displayName = "SearchLocationAddressContainer";

export { SearchLocationAddressContainer };
