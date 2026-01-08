import { getConfig } from "@/services/appConfig";
import { map } from "lodash";
import { DateTime } from "luxon";
import { formatToISODate } from "@/runnersQcApp/shared/DateUtils";
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
  HORSES: {
    pageId: 6,
    path: routes.HORSES,
    title: "All Horses",
  },
  HORSE: {
    pageId: 7,
    path: routes.HORSE(""),
    title: "Horse Details",
  },
  ADD_RECORD: {
    pageId: 8,
    path: routes.ADD_RECORD(),
    title: "Add Record",
  },
  ADD_PROTOCOL: {
    pageId: 9,
    path: routes.ADD_PROTOCOL,
    title: "Add Protocol",
  },
  PROTOCOLS: {
    pageId: 10,
    path: routes.PROTOCOLS,
    title: "Protocols",
  },
  RECENT_RECORDS: {
    pageId: 11,
    path: routes.RECENT_RECORDS,
    title: "Recent Records",
  },
  EDIT_RECORD: {
    pageId: 12,
    path: routes.EDIT_RECORD(""),
    title: "Edit Record",
  },
  EDIT_PROTOCOL: {
    pageId: 13,
    path: routes.EDIT_PROTOCOL(""),
    title: "Edit Protocol",
  },
  SETTINGS: {
    pageId: 15,
    path: routes.SETTINGS,
    title: "Settings Page",
  },
  SEARCH: {
    pageId: 17,
    path: routes.SEARCH,
    title: "Search Page",
  },
  APPLY_PROTOCOL: {
    pageId: 22,
    path: routes.APPLY_PROTOCOL(""),
    title: "Apply Protocol Page",
  },
  RECORD_DETAIL: {
    pageId: 23,
    path: routes.RECORD_DETAIL(""),
    title: "Record Detail",
  },
  // PROTOCOL: {
  //   pageId: 30,
  //   path: routes.PROTOCOL(""),
  //   title: "Protocol Details",
  // },
  LOCATIONS: {
    pageId: 36,
    path: routes.LOCATIONS,
    title: "Add Location",
  },
  // MFA: {
  //   pageId: 37,
  //   path: routes.MFA,
  //   title: "MFA Page",
  // },
  TRANSACTION_LOGS: {
    pageId: 23,
    path: routes.TRANSACTION_LOGS,
    title: "Transaction Logs",
  },
  TRANSACTION_LOG_DETAIL: {
    pageId: 24,
    path: routes.TRANSACTION_LOG_DETAIL("", ""),
    title: "Transaction Log Detail",
  },
  RUNNERS_QC: {
    pageId: 25,
    path: routes.RUNNERS_QC,
    title: "Runners QC",
  },
  RUNNERS_QC_DETAIL: {
    pageId: 26,
    path: routes.RUNNERS_QC_DETAIL("", ""),
    title: "Runners QC Detail",
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
