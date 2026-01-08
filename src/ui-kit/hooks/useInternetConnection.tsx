"use client";

import { useEffect, useState } from "react";

export const useInternetConnection = () => {
  const [isConnected, setIsConnected] = useState(() => {
    if (typeof window !== "undefined" && "onLine" in navigator) {
      return navigator.onLine;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateOnlineStatus = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, [isConnected]);

  return isConnected;
};
