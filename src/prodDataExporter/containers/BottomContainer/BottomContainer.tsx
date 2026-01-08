"use client";
import { getPageId, getVersion, routeTitles } from "@/routes/utils";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { FrontEndNotificationContainer } from "../FrontEndNotificationContainer";

type BottomContainerProps = {
  withAssistance?: boolean;
};

const ASSISTANCE = "tel:18775132919";
const ASSISTANCE_PHONE = "1-877-513-2919";

export const BottomContainer: React.FC<BottomContainerProps> = ({
  withAssistance = false,
}) => {
  const pathname = usePathname();
  const version = getVersion();
  const t = useTranslations("Auth");

  const normalizePath = (path: string) =>
    path.split("?")[0].replace(/\/+$/, "");

  const matchedRoute = useMemo(() => {
    const current = normalizePath(pathname);

    return Object.values(routeTitles).find((cfg) => {
      const base = normalizePath(cfg.path);
      return current === base;
    });
  }, [pathname]);

  const containerStyles = useMemo(() => {
    if (withAssistance) {
      return "flex flex-col items-center text-center md:flex-row md:justify-between";
    }
    return "flex flex-col fixed bottom-0 left-0 w-full items-end px-4 bg-w0 pb-insets-bottom opacity-0";
  }, [withAssistance]);

  const showPage = useMemo(() => {
    if (
      matchedRoute &&
      (matchedRoute.pageId === 2 ||
        matchedRoute.pageId === 3 ||
        matchedRoute.pageId === 37)
    ) {
      return false;
    } else {
      return true;
    }
  }, [matchedRoute]);

  if (!matchedRoute) {
    return null;
  }

  const pageNumberText = getPageId(matchedRoute.pageId);

  return (
    <div className={containerStyles}>
      {withAssistance ? (
        <>
          <div data-testid="call" className="flex text-w0 text-xs">
            {t("call")}
            <a
              href={ASSISTANCE}
              className="text-w0 text-xs font-bold ml-1 mr-1"
            >
              {ASSISTANCE_PHONE}
            </a>
            {t("forAssistance")}
          </div>
          <span className="text-w0 text-xs">{`${pageNumberText}, ${version}`}</span>
        </>
      ) : (
        <div>
          <span className="text-w0 text-[0.625rem] sm-text-sm">{`${pageNumberText}, ${version}`}</span>
        </div>
      )}
      {showPage ? (
        <FrontEndNotificationContainer page={matchedRoute.pageId} />
      ) : null}
    </div>
  );
};
