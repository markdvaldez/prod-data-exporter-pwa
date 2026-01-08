import { extractError } from "@/utils/errors";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const useUserLocation = () => {
  const [userLocation, setLocation] = useState<string | undefined>(undefined);
  const t = useTranslations("Location");

  function getCurrentLocationPromise(): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        return reject(new Error(t("geolocationIsNotSupported")));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          reject(new Error(t("thisBrowserDoesNotHaveLocationsEnabled")));
        }
      );
    });
  }

  async function getCurrentLocation(): Promise<{
    position: string | undefined;
    error: string | undefined;
  }> {
    try {
      const position = await getCurrentLocationPromise();
      if (position) {
        setLocation(position);
      }
      return { position, error: undefined };
    } catch (error) {
      return { position: undefined, error: extractError(error).message };
    }
  }

  return { userLocation, getCurrentLocation };
};
