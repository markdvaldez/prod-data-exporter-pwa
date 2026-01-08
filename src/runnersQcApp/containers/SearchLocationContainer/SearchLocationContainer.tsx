import { TLocation } from "@/services/store/modules/locations/types";
import { LocationType } from "@/Types";
import { Dialog, DialogTitle } from "@/ui-kit/components/Dialog";
import { LocationButton } from "@/ui-kit/components/LocationButton";
import { useFavorites } from "@/ui-kit/hooks/useFavorites";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { ChooseLocationType } from "../ChooseLocationType";
import { getLocationType } from "../ChooseLocationType/helpers";
import { CreateLocationContainer } from "../CreateLocationContainer";
import { FavoriteLocations } from "../FavoriteLocationsContainer/FavoriteLocations";
import { SearchLocationAddressContainer } from "../SearchLocationAddressContainer";
import { SearchLocationByStateContainer } from "../SearchLocationByStateContainer";
import { SearchContent } from "./SearchContent";

export type SearchLocationContainerProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (nextLocation?: TLocation) => void;
};

export type SearchType =
  | "name"
  | "address"
  | "perform"
  | "choose"
  | "fillForm"
  | "details"
  | null;

const MIN_LENGTH = 2;

export const SearchLocationContainer: React.FC<SearchLocationContainerProps> =
  memo(({ isOpen, onClose, onChange }) => {
    const t = useTranslations("Location");

    const { toggleFavorite, favorites } = useFavorites();

    const [searchType, setSearchType] = useState<SearchType>(null);
    const [activeType, setActiveType] = useState<string | null>(null);
    const [selectedLocationAddress, setSelectedLocationAddress] =
      useState(null);

    const { locationType } = useMemo(() => {
      return {
        locationType: activeType
          ? getLocationType(activeType)
          : ("" as LocationType),
      };
    }, [activeType]);

    const title = useMemo(() => {
      switch (searchType) {
        case "name":
        case "address":
        case "perform":
        case null:
          return t("searchForTreatmentLocation");
        case "choose":
          return t("chooseLocationType");
        case "fillForm":
          return t("fillForm");
        case "details":
          return t("locationDetails");
        default:
          return "";
      }
    }, [searchType, t]);

    const handleSetSelectedLocationAddress = useCallback((location: any) => {
      setSelectedLocationAddress(location);
    }, []);

    const handleSetActiveType = useCallback((type: string) => {
      setActiveType(type);
    }, []);

    const handleChangeType = useCallback((type: SearchType) => {
      setSearchType(type);
    }, []);

    const renderContent = useCallback(() => {
      switch (searchType) {
        case null:
          return (
            <>
              <div className="text-base text-tDefault font-medium pt-5">
                {t("chooseTypeOfSearching")}
              </div>
              <LocationButton
                title={t("locationName")}
                onButtonClick={() => setSearchType("name")}
              />
              <LocationButton
                title={t("locationAddress")}
                onButtonClick={() => setSearchType("address")}
              />
              <LocationButton
                title={t("performAtLocation")}
                onButtonClick={() => setSearchType("perform")}
              />
            </>
          );
        case "name":
          return (
            <div className="w-full h-full overflow-auto no-scrollbar">
              <FavoriteLocations
                favorites={favorites}
                onChange={onChange}
                onFavoritesClick={toggleFavorite}
                itemStyles="bg-w0"
              />
            </div>
          );
        case "address":
          return (
            <SearchLocationAddressContainer
              onChange={onChange}
              onClose={onClose}
              handleChangeType={handleChangeType}
              handleSetSelectedLocationAddress={
                handleSetSelectedLocationAddress
              }
            />
          );
        case "perform":
          return <SearchLocationByStateContainer onChange={onChange} />;
        case "choose":
          return (
            <ChooseLocationType
              activeType={activeType}
              handleChangeType={handleChangeType}
              handleSetActiveType={handleSetActiveType}
            />
          );
        case "fillForm":
          return (
            <CreateLocationContainer
              locationType={locationType}
              selectedLocationAddress={selectedLocationAddress}
              onClose={onClose}
              onChange={onChange}
              handleChangeType={handleChangeType}
            />
          );
        default:
          return null;
      }
    }, [
      activeType,
      favorites,
      handleChangeType,
      handleSetActiveType,
      handleSetSelectedLocationAddress,
      locationType,
      onChange,
      onClose,
      searchType,
      selectedLocationAddress,
      t,
      toggleFavorite,
    ]);

    useEffect(() => {
      if (!isOpen) setSearchType(null);
    }, [isOpen]);

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <SearchContent className="w-full max-w-full h-full sm:h-[80vh] sm:max-h-[90vh] md:max-w-xl flex flex-col px-4 pt-4">
          <DialogTitle className="flex justify-center text-xl">
            {title}
          </DialogTitle>
          {renderContent()}
        </SearchContent>
      </Dialog>
    );
  });

SearchLocationContainer.displayName = "SearchLocationContainer";
