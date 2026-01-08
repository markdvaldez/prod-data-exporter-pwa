import { getConfig } from "@/services/appConfig";
import { map } from "lodash";
import { DateTime } from "luxon";
import { formatToISODate } from "@/prodDataExporter/shared/DateUtils";
import routes from ".";

export type RouteKey = keyof typeof routes;

type RouteConfig = {
  pageId: number;
  path: string;
  title?: string;
};

export const routeTitles: Record<RouteKey, RouteConfig> = {
  HOME: {
    pageId: 0,
    path: routes.HOME,
    title: "Home Page",
  },
  LOGIN: {
    pageId: 2,
    path: routes.LOGIN,
    title: "Login Page",
  },
  REQUEST_ACCESS: {
    pageId: 3,
    path: routes.REQUEST_ACCESS,
    title: "Request Access Page",
  },
  DASHBOARD: {
    pageId: 5,
    path: routes.DASHBOARD,
    title: "Dashboard",
  },  
  PROD_DATA_EXPORTER: {
    pageId: 6,
    path: routes.PROD_DATA_EXPORTER,
    title: "Prod Data Exporter",
  },
};

export function getRouteConfig(key: RouteKey): RouteConfig {
  return routeTitles[key];
}

export const getPageId = (page: number): string => `RQC-${page}`;

export const getVersion = (): string => {
  const config = getConfig();

  const { appVersion, environmentText, BUILD_DATE } = config;

  const versionDate = formatToISODate(DateTime.fromMillis(BUILD_DATE));

  return `V:${versionDate}v${appVersion}${environmentText}`;
};

export const navigateToLogin = () => window?.location?.replace?.(routes.LOGIN);

export function getRoutePaths(): string[] {
  return map(routeTitles, (route) => route.path);
}
