"use client";

import { useServiceWorker } from "@/services/pwa/useServiceWorker";
import { isAppleMobile } from "@/services/pwa/utils";
import { PWAInstallPromptIos } from "@/ui-kit/blocks/PWAInstallPromptIos/PWAInstallPromptIos";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import { useCallback, useMemo } from "react";
import { usePWAInstall } from "../../services/pwa/usePWAInstall";
import { PWAInstallPrompt } from "../../ui-kit/blocks/PWAInstallPrompt/PWAInstallPrompt";

export const PWAInstallHandler: React.FC = () => {
  const { showInstallPrompt, installPWA, hideInstallPrompt } = usePWAInstall();
  const isSmallScreen = useIsMobile();
  const isAppleMobileDevice = useMemo(() => isAppleMobile(), []);

  useServiceWorker();

  const handleCancel = useCallback(() => {
    hideInstallPrompt(false);
  }, [hideInstallPrompt]);

  if (!showInstallPrompt) {
    return null;
  }

  if (isAppleMobileDevice) {
    return (
      <>
        <PWAInstallPromptIos
          isSmallScreen={isSmallScreen}
          onConfirm={installPWA}
          onCancel={handleCancel}
          onClose={handleCancel}
        />
      </>
    );
  }

  return (
    <>
      {isAppleMobileDevice}
      <PWAInstallPrompt
        isSmallScreen={isSmallScreen}
        onConfirm={installPWA}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </>
  );
};
