"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect, useRef, useState } from "react";
import { getConfig } from "../appConfig";
import { isAppleMobile, isStandalone } from "./utils";

type UserChoice = Promise<{
  outcome: "accepted" | "dismissed";
  platform: string;
}>;

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: UserChoice;
  prompt(): Promise<UserChoice>;
}

const cookieName = getConfig().pwaInstallationRejected;

export const clearPwaInstallation = () => {
  Cookies.remove(cookieName);
};

export function usePWAInstall() {
  const beforeInstallPromptEvent = useRef<BeforeInstallPromptEvent | undefined>(
    undefined
  );
  const userChoice = useRef<"dismissed" | "accepted" | undefined>(undefined);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    // Cookies.remove(cookieName);
    return () => {
      mounted.current = false;
    };
  }, []);

  const hideInstallPrompt = useCallback((accepted: boolean) => {
    setShowInstallPrompt(false);
    beforeInstallPromptEvent.current = undefined;
    if (!accepted) {
      Cookies.set(cookieName, "1", { secure: true });
    } else {
      clearPwaInstallation();
    }
  }, []);

  const installPWA = useCallback(async () => {
    try {
      if (!beforeInstallPromptEvent.current) {
        // TODO handle error - send to analytics
        return;
      }

      beforeInstallPromptEvent.current.prompt();
      const { outcome } = await beforeInstallPromptEvent.current.userChoice;

      if (!mounted.current) return;

      hideInstallPrompt(outcome === "accepted" ? true : false);

      beforeInstallPromptEvent.current = undefined;
    } catch (e: unknown) {
      console.log(e);
      // TODO handle error - send to analytics
    }
  }, [hideInstallPrompt]);

  useEffect(() => {
    const handleAppInstalled = () => {
      // TODO - send to analytics
    };

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      beforeInstallPromptEvent.current = e as BeforeInstallPromptEvent;

      if (!userChoice.current && !Cookies.get(cookieName)) {
        setShowInstallPrompt(true);
      }
    };

    const shouldShowInstallPrompt = () => {
      const isAppleMobileDevice = isAppleMobile();
      const isStandaloneApp = isStandalone();

      if (isStandaloneApp) {
        return;
      }

      if (
        isAppleMobileDevice &&
        !userChoice.current &&
        !Cookies.get(cookieName)
      ) {
        setShowInstallPrompt(true);
      }
    };

    shouldShowInstallPrompt();
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return { showInstallPrompt, installPWA, hideInstallPrompt } as const;
}
