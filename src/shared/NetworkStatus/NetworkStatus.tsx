import { SidebarNetworkStatus } from "@/ui-kit/components/SidebarNetworkStatus";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { cn } from "@/ui-kit/lib/utils";
import { Wifi, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";

export const NetworkStatus = memo(() => {
  const t = useTranslations("Main");
  const isConnected = useInternetConnection();

  const { icon, text } = useMemo(() => {
    return {
      icon: isConnected ? (
        <Wifi color="currentColor" size={64} />
      ) : (
        <WifiOff color="currentColor" size={64} />
      ),
      text: (
        <span
          className={cn(
            "pl-2 text-base lg:text-sm",
            isConnected ? "text-b0/90 hover:text-w0" : "text-absoluteBlack"
          )}
        >
          {isConnected ? t("onLine") : t("offLine")}
        </span>
      ),
    };
  }, [isConnected, t]);

  return <SidebarNetworkStatus icon={icon} text={text} />;
});

NetworkStatus.displayName = "NetworkStatus";
