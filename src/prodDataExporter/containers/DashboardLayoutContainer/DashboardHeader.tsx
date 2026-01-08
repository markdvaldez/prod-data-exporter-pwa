import routes from "@/routes";
import { getConfig } from "@/services/appConfig";
import { NoConnectionView } from "@/shared/NetworkStatus";
import { SidebarMenuTrigger } from "@/ui-kit/components/SidebarMenu";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { memo, useMemo } from "react";

const DashboardHeader: React.FC = memo(() => {
  const t = useTranslations("Main");
  const isSmallScreen = useIsMobile();

  const appName = useMemo(() => getConfig().shortName, []);
  return (
    <header className="sticky top-0 flex h-12 w-full bg-w0 shrink-0 items-center gap-2 z-30 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex flex-1 flex-col relative">
        {isSmallScreen && (
          <NoConnectionView classStyles="absolute top-10 t-0 r-0 flex flex-row justify-center items-center w-screen bg-e0 text-white p-1" />
        )}
        <div className="flex items-center gap-2 px-4 mt-3 mb-1">
          <SidebarMenuTrigger className="-ml-1" />
          <Link href={routes.DASHBOARD}>
            <div className="ml-2 text-lg font-semibold sm:hidden">
              {appName}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
});

DashboardHeader.displayName = "DashboardHeader";

export default DashboardHeader;
