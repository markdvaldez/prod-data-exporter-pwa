import { useEffect, useState } from "react";

export function useAppHeight() {
  const [appHeight, setScreenSize] = useState(() => "");

  useEffect(() => {
    const setAppHeight = () => {
      const height = window.visualViewport?.height || window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${height}px`);
      setScreenSize(`${height}px`);
    };

    setAppHeight();

    window.addEventListener("resize", setAppHeight);
    window.visualViewport?.addEventListener("resize", setAppHeight);
    window.visualViewport?.addEventListener("scroll", setAppHeight);

    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.visualViewport?.removeEventListener("resize", setAppHeight);
      window.visualViewport?.removeEventListener("scroll", setAppHeight);
    };
  }, []);

  return appHeight;
}
