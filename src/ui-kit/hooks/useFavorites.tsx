import {
  addToUserSettings,
  fetchUserSettingsSettings,
} from "@/services/store/modules/locations";
import { selectFavoriteLocations } from "@/services/store/modules/locations/selectors";
import { TLocation } from "@/services/store/modules/locations/types";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFavorites = () => {
  const dispatch = useDispatch();

  const favorites = useSelector(selectFavoriteLocations);

  const toggleFavorite = useCallback(
    (location: TLocation) => {
      dispatch(
        addToUserSettings({
          location,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchUserSettingsSettings());
  }, [dispatch]);

  return { toggleFavorite, favorites };
};
