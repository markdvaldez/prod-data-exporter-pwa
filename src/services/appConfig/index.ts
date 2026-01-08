import { DateTime } from "luxon";
import { getIconENV } from "./helpers";

const ENV: TEnvironment =
  (process.env.NEXT_PUBLIC_CONFIGURATION as TEnvironment) ||
  (process.env.CONFIGURATION as TEnvironment) ||
  "development";
const APP_ID = (process.env.APP_ID as TAppId) || "runners-qc-app";

export type AppConfig = ReturnType<typeof getConfig>;

export type TEnvironment =
  | "development"
  | "qa"
  | "rc"
  | "staging"
  | "production"
  | "common"
  | "test";

export type TAppAsset = {
  logo: string;
  logoWhite: string;
  logo58: string;
  logo60: string;
  logo64: string;
  logo80: string;
  logo120: string;
  logo180: string;
  logo192: string;
  logo512: string;
  "HISA-seal-final": string;
};

export type TAppId = "runners-qc-app";

const ICON_ENV = getIconENV(ENV);

const APPS_CONFIG: TAppAsset = {
  logo: `/images/logo-grass.png`,
  logoWhite: `/images/logo-white.png`,
  logo58: `/images/${ICON_ENV}/logo58.png`,
  logo60: `/images/${ICON_ENV}/logo60.png`,
  logo64: `/images/${ICON_ENV}/logo64.png`,
  logo80: `/images/${ICON_ENV}/logo80.png`,
  logo120: `/images/${ICON_ENV}/logo120.png`,
  logo180: `/images/${ICON_ENV}/logo180.png`,
  logo192: `/images/${ICON_ENV}/logo192.png`,
  logo512: `/images/${ICON_ENV}/logo512.png`,
  "HISA-seal-final": `/images/HISA-seal-final.png`,
};

const CONFIG = {
  common: {
    appId: "runners-qc-app",
    name: "Runners QC App",
    shortName: "RQC",
    fullName: "Runners QC",
    description: "Runners QC App Web App",
    permission: ["runners-qc-app:access"],
    permissionName: "runners-qc-app",
    prefix: "RQC",
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    supportPhone: "1-877-513-2919",
    pwaInstallationRejected: "pwa_installation_rejected",
    allowSearchIndexing: false,
    FORGOT_PASSWORD_URL: "https://portal.hisausapps.org/forgot-password",
    REGISTER_URL: "https://portal.hisausapps.org/registration",
    BUILD_DATE: DateTime.now().toMillis(),
    configuration: ENV,
    environmentText: "",
    baseURL: String(process.env.NEXT_PUBLIC_API_URL),
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    useAnalytics: false,
    useDynatrace: false,
    hostname: "",
    siteUrl: "https://runners-qc-app.app/",
  },
  development: {
    useAnalytics: false,
    useDynatrace: true,
    allowSearchIndexing: false,
    FORGOT_PASSWORD_URL: "https://portal.dev1.hisausapps.org/forgot-password",
    REGISTER_URL: "https://portal.dev1.hisausapps.org/registration",
    environmentText: "-DEV",
    hostname: "dev1",
    siteUrl: "https://runners-qc-app.dev/",
  },
  qa: {
    useAnalytics: true,
    useDynatrace: true,
    allowSearchIndexing: false,
    FORGOT_PASSWORD_URL: "https://portal.qa.hisausapps.org/forgot-password",
    REGISTER_URL: "https://portal.qa.hisausapps.org/registration",
    environmentText: "-QA",
    hostname: "qa",
  },
  rc: {
    useAnalytics: true,
    useDynatrace: false,
    allowSearchIndexing: false,
    FORGOT_PASSWORD_URL: "https://portal.rc.hisausapps.org/forgot-password",
    REGISTER_URL: "https://portal.hisausapps.org/registration",
    environmentText: "-RC",
    hostname: "rc",
  },
  staging: {
    useAnalytics: false,
    useDynatrace: false,
    allowSearchIndexing: false,
    FORGOT_PASSWORD_URL:
      "https://portal.staging1.hisausapps.org/forgot-password",
    REGISTER_URL: "https://portal.staging1.hisausapps.org/registration",
    environmentText: "-STAGE",
    hostname: "staging1",
  },
  test: {
    useAnalytics: false,
    useDynatrace: false,
    allowSearchIndexing: false,
    FORGOT_PASSWORD_URL: "https://portal.qa.hisausapps.org/forgot-password",
    REGISTER_URL: "https://portal.qa.hisausapps.org/registration",
    environmentText: "-TEST",
    hostname: "qa",
  },
  production: {
    useAnalytics: true,
    useDynatrace: true,
    allowSearchIndexing: true,
    FORGOT_PASSWORD_URL: "https://portal.hisausapps.org/forgot-password",
    REGISTER_URL: "https://portal.hisausapps.org/registration",
    hostname: "",
  },
};

export const getConfig = () => ({
  ...CONFIG.common,
  ...APPS_CONFIG,
  ...CONFIG[ENV],
});
