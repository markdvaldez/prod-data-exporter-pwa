import { useEffect, useState } from "react";

export const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState(
    window.matchMedia("(orientation: portrait)").matches
      ? "portrait"
      : "landscape"
  );

  useEffect(() => {
    const handleChange = (e: MediaQueryListEvent) => {
      setOrientation(e.matches ? "portrait" : "landscape");
    };

    const mediaQuery = window.matchMedia("(orientation: portrait)");
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return orientation;
};
