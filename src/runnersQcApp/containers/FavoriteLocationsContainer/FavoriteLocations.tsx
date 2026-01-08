import { useUserLocation } from "@/hooks/useUserLocation";
import {
  clearSearchText,
  joinAddressParts,
} from "@/runnersQcApp/shared/TextUtils";
import { locationTypes } from "@/runnersQcApp/shared/types";
import {
  searchLocations,
  searchNearestLocations,
} from "@/services/store/modules/locations";
import {
  selectIsFetching,
  selectLocationsList,
  selectNearestLocations,
} from "@/services/store/modules/locations/selectors";
import { TLocation } from "@/services/store/modules/locations/types";
import { LocationType } from "@/Types";
import { InformationBlock } from "@/ui-kit/blocks/InformationBlock";
import { LocationsFiltersBlock } from "@/ui-kit/blocks/LocationsFiltersBlock/LocationsFiltersBlock";
import { LocationTypesFilterItem } from "@/ui-kit/blocks/LocationTypesFilter";
import { MyCurrentLocationBlock } from "@/ui-kit/blocks/MyCurrentLocationBlock";
import { Loader } from "@/ui-kit/components/Loader";
import { LocationIconButton } from "@/ui-kit/components/LocationIconButton/LocationIconButton";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { SearchLocationListItem } from "@/ui-kit/components/SearchLocationListItem";
import { toast } from "@/ui-kit/hooks/useToast";
import { cn } from "@/ui-kit/lib/utils";
import { getFormattedLocation } from "@/utils/locationId";
import _, { debounce, map } from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detectSearchType,
  distanceFilterFn,
  filterRecords,
  SearchType,
  searchWordFilterFn,
  typeFilterFn,
} from "./helpers";

export type FavoriteLocationsProps = {
  itemStyles: string | undefined;
  favorites: [] | TLocation[];
  onChange: ((value: TLocation) => void) | undefined;
  onFavoritesClick: (location: TLocation) => void;
};

const MIN_LENGTH = 1;
const MILE = 1609.34;
const DISTANCE = 100 * MILE;
const DEFAULT_DISTANCE = 100;

export const FavoriteLocations: React.FC<FavoriteLocationsProps> = ({
  favorites,
  itemStyles,
  onFavoritesClick,
  onChange,
}) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState<SearchType>(SearchType.BY_NAME);
  const [distanceFilter, setDistanceFilter] = useState(DEFAULT_DISTANCE);
  const [locationTypeFilter, setLocationTypeFilter] = useState<LocationType[]>(
    []
  );

  const isFetching = useSelector(selectIsFetching);
  const locations = useSelector(selectLocationsList);
  const nearestLocations = useSelector(selectNearestLocations);

  const { getCurrentLocation } = useUserLocation();

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
      const nextSearchType = detectSearchType(nextValue);
      setSearchText(nextValue);
      setSearchType(nextSearchType);
      if (nextSearchType === SearchType.BY_GEOLOCATION) {
        dispatch(
          searchNearestLocations({
            text: "",
            locationTypes,
            latLong: nextValue,
            distanceMeters: DISTANCE,
          })
        );
        return;
      }
      handleApiCallRef.current(
        clearSearchText(nextValue),
        dispatch,
        locationTypes
      );
    },
    [dispatch]
  );

  const handleCurrentLocation = useCallback(async () => {
    try {
      const { position, error } = await getCurrentLocation();
      if (error) {
        toast({ title: error, variant: "destructive" });
        return;
      }
      setSearchType(SearchType.BY_GEOLOCATION);
      setSearchText("");
      dispatch(
        searchNearestLocations({
          text: "",
          locationTypes,
          latLong: position,
          distanceMeters: DISTANCE,
        })
      );
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  }, [dispatch, getCurrentLocation]);

  const handleFilterChange = useCallback(
    (nextDistance: number, nextTypes: LocationTypesFilterItem[]) => {
      setDistanceFilter(nextDistance);
      const nextFilter = _.chain(nextTypes)
        .filter({ isSelected: true })
        .map((item: LocationTypesFilterItem) => item.value)
        .flatten()
        .value();
      setLocationTypeFilter(nextFilter);
    },
    []
  );

  const hasFilters = useMemo(() => {
    return (
      distanceFilter !== DEFAULT_DISTANCE || !_.isEmpty(locationTypeFilter)
    );
  }, [distanceFilter, locationTypeFilter]);

  const filteredLocations = useMemo(() => {
    if (searchType === SearchType.BY_GEOLOCATION) {
      const filtersToApply = [typeFilterFn, distanceFilterFn];
      return filterRecords(nearestLocations, filtersToApply, {
        searchWord: searchText,
        distance: distanceFilter,
        types: locationTypeFilter,
      });
    }

    if (!searchText) return [] as TLocation[];
    const filtersToApply = [searchWordFilterFn, typeFilterFn];
    return filterRecords(locations, filtersToApply, {
      searchWord: searchText,
      distance: distanceFilter,
      types: locationTypeFilter,
    });
  }, [
    distanceFilter,
    locationTypeFilter,
    locations,
    nearestLocations,
    searchText,
    searchType,
  ]);

  const filteredFavorites = useMemo(() => {
    if (searchType === SearchType.BY_GEOLOCATION) {
      return [];
    }

    const filtersToApply = [searchWordFilterFn, typeFilterFn];
    return filterRecords(favorites, filtersToApply, {
      searchWord: searchText,
      distance: distanceFilter,
      types: locationTypeFilter,
    });
  }, [distanceFilter, favorites, locationTypeFilter, searchText, searchType]);

  const renderItem = useCallback(
    (location: TLocation, index: number, arrayLength: number) => {
      const isFavorite = _.some(favorites, {
        locationId: location.locationId,
      });
      const label = getFormattedLocation({
        name: location.locationName,
        hisaId: location.locationId,
      });
      const address = location.address;
      const addressText = address
        ? joinAddressParts(
            address.street,
            address.city,
            address.state,
            address.zipPostalCode,
            address.country
          )
        : "";
      const distance = String(location?.distance || "");
      return (
        <SearchLocationListItem
          key={`SearchLocationListItem-${location.locationId}`}
          label={label}
          address={addressText}
          distance={distance}
          itemStyles={cn("my-1", itemStyles)}
          value={location}
          searchText={searchText}
          bordered={index !== arrayLength - 1}
          isFavorite={isFavorite}
          onClick={onChange}
          onFavoriteClick={onFavoritesClick}
          showDistance={searchType === SearchType.BY_GEOLOCATION}
        />
      );
    },
    [favorites, itemStyles, onChange, onFavoritesClick, searchText, searchType]
  );

  const renderContent = useMemo(() => {
    const hasFavorites = !_.isEmpty(favorites);
    const hasFilteredLocations = !_.isEmpty(filteredLocations);
    const isSearchByName = searchType === SearchType.BY_NAME;
    const hasSearchText = searchText?.length >= 1;

    if (isFetching && !hasFilteredLocations) {
      return (
        <div className="flex justify-center w-full p-8">
          <Loader />
        </div>
      );
    }

    if (!hasSearchText && !hasFavorites && !hasFilteredLocations) {
      return <MyCurrentLocationBlock onSubmit={handleCurrentLocation} />;
    }

    const shouldShowEmptyState =
      !isFetching &&
      !hasFilteredLocations &&
      ((isSearchByName && hasSearchText) || !isSearchByName);

    if (shouldShowEmptyState) {
      return (
        <InformationBlock
          icon="search"
          iconSize="h-24 w-24"
          text={
            hasFilters ? t("Location.noResultsFound") : t("Location.notFound")
          }
          iconRoundBg="bg-c3"
        />
      );
    }

    return map(filteredLocations, (location, index) =>
      renderItem(location, index, filteredLocations.length)
    );
  }, [
    favorites,
    filteredLocations,
    handleCurrentLocation,
    hasFilters,
    isFetching,
    renderItem,
    searchText,
    searchType,
    t,
  ]);

  const renderFavorites = useMemo(() => {
    const hasFavorites = !_.isEmpty(favorites);
    const hasFilteredFavorites = !_.isEmpty(filteredFavorites);
    const isSearchByName = searchType === SearchType.BY_NAME;
    const hasSearchText = searchText?.length >= 1;

    if (hasSearchText || !isSearchByName || !hasFavorites) return null;

    if (!isFetching && hasFilters && isSearchByName && !hasFilteredFavorites) {
      return (
        <InformationBlock
          icon="search"
          iconSize="h-24 w-24"
          text={t("Location.noResultsFound")}
          iconRoundBg="bg-c3"
        />
      );
    }

    return (
      <>
        <div className="text-md sm:text-sm font-semibold text-tDefault mt-2">
          {t("Location.yourFavoriteLocations")}
        </div>
        {map(filteredFavorites, (location, index) =>
          renderItem(location, index, favorites.length)
        )}
      </>
    );
  }, [
    favorites,
    filteredFavorites,
    hasFilters,
    isFetching,
    renderItem,
    searchText,
    searchType,
    t,
  ]);

  return (
    <>
      <div className="sticky top-0 z-10 flex-col pb-2 sm:pt-4 bg-mainBackground">
        <div className="flex items-center justify-between w-full">
          <SearchInput
            value={searchText}
            onChange={handleSearch}
            placeholder={t("Location.enterTheLocationName")}
          />
          <LocationIconButton
            className="ml-2"
            onClick={handleCurrentLocation}
            isActive={searchType === SearchType.BY_GEOLOCATION}
          />
        </div>
        <LocationsFiltersBlock onChange={handleFilterChange} />
      </div>
      {renderContent}
      {renderFavorites}
      <div className="flex flex-col pb-20"></div>
    </>
  );
};
