import { TLocation } from "@/services/store/modules/locations/types";
import { BackButton } from "@/ui-kit/components/BackButton";
import { useFavorites } from "@/ui-kit/hooks/useFavorites";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { cn } from "@/ui-kit/lib/utils";
import { noop } from "lodash";
import { useTranslations } from "next-intl";
import React, { memo } from "react";
import { FavoriteLocations } from "./FavoriteLocations";

export type FavoriteLocationsWrapperProps = {
  itemStyles?: string;
  onChange?: (value: TLocation) => void;
};

export const FavoriteLocationsWrapper: React.FC<FavoriteLocationsWrapperProps> =
  memo(({ onChange }) => {
    const t = useTranslations();

    const isConnected = useInternetConnection();

    const { toggleFavorite, favorites } = useFavorites();

    return (
      <div className="bg-mainBackground flex flex-col flex-1 items-center">
        <div className="px-4 w-full xl:w-2/3 max-h-[calc(100vh-150px)] flex flex-col flex-1 overflow-y-auto no-scrollbar">
          <BackButton styles={cn(isConnected ? "pt-2" : "pt-7 sm:pt-2")} />
          <h1 className="text-2xl font-semibold text-start pb-2 self-start">
            {t("Location.favoriteLocations")}
          </h1>
          <FavoriteLocations
            itemStyles={"hover:bg-w0 hover:cursor-default"}
            favorites={favorites}
            onChange={noop}
            onFavoritesClick={toggleFavorite}
          />
        </div>
      </div>
    );
  });

FavoriteLocationsWrapper.displayName = "FavoriteLocationsWrapper";
