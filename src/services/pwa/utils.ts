import { RequestErrorType } from "@/utils/errors";

export type IRelatedApp = {
  id: string;
  platform: string;
  url: string;
};

export const isAppleMobile = (): boolean => {
  const { platform, userAgent, maxTouchPoints } = navigator;
  return (
    ["iPhone", "iPad", "iPod"].includes(platform) ||
    /iPad|iPhone|iPod/.test(userAgent) ||
    (userAgent.includes("Mac") && maxTouchPoints > 2)
  );
};

export const isAndroid = (): boolean =>
  Boolean(navigator.userAgent.toLowerCase().match(/android/));

export const isStandalone = () => {
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && navigator?.standalone === true)
  )
    return true;
  return false;
};

export const getInstalledRelatedApps = async (): Promise<IRelatedApp[]> => {
  if ("getInstalledRelatedApps" in navigator)
    try {
      return await (navigator as any)
        .getInstalledRelatedApps()
        .then((relatedApps: IRelatedApp[]) => {
          return relatedApps;
        });
    } catch (e) {
      console.log(e);
    }

  return [];
};

export const isRelatedAppsInstalled = async (): Promise<boolean> => {
  const _relatedApps = await getInstalledRelatedApps();
  return _relatedApps.length ? true : false;
};

export const setUserId = (userId: string) => {
  if (window.dtrum && userId) {
    try {
      window.dtrum.identifyUser(userId);
    } catch (error) {
      console.error("Dynatrace identifyUser error:", error);
    }
  }
};

export const logError = (error: Error | RequestErrorType): void => {
  if (window.dtrum) {
    try {
      window.dtrum.reportError(JSON.stringify(error));
    } catch (e) {
      console.error("Dynatrace error reporting failed:", e);
    }
  } else {
    console.warn("Dynatrace RUM is not initialized.");
  }
};

export const ednSession = (): void => {
  if (window.dtrum) {
    try {
      window.dtrum.endSession();
    } catch (e) {
      console.error("Dynatrace error reporting failed:", e);
    }
  } else {
    console.warn("Dynatrace RUM is not initialized.");
  }
};
