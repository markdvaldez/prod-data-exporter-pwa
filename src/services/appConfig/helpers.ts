import { TEnvironment } from ".";

export const getIconENV = (ENV: TEnvironment): string => {
  const envMap: Record<string, string> = {
    development: "qa",
    qa: "qa",
    rc: "rc",
    staging: "staging",
    production: "production",
  };

  return envMap[ENV] ?? "production";
};
