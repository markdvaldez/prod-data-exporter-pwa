import * as React from "react";
import { useEffect } from "react";

const MOBILE_BREAKPOINT = 600;

export const useIsSmallPhone = () => {
  const [isSmallPhone, setIsSmallPhone] = React.useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-height: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsSmallPhone(window.innerHeight < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsSmallPhone(window.innerHeight < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isSmallPhone;
};
