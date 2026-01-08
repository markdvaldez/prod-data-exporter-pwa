import { getConfig } from "@/services/appConfig";
import { GoogleTagManager } from "@next/third-parties/google";
import { memo, useMemo } from "react";

export const GoogleAnalyticsLogger: React.FC = memo(() => {
  const config = useMemo(() => getConfig(), []);

  if (!config.gtmId || !config.useAnalytics) {
    return null;
  }

  return <GoogleTagManager gtmId={config.gtmId} />;
});

GoogleAnalyticsLogger.displayName = "GoogleAnalyticsLogger";
