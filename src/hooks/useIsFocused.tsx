"use client";

import { useEffect, useState } from "react";

export function useIsPageVisible() {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    function onVisibilityChange() {
      setVisible(document.visibilityState === "visible");
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    onVisibilityChange();

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return visible;
}
