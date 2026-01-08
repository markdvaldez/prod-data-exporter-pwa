import type { MetadataRoute } from "next";
import { getConfig } from "../appConfig";

export default function robots(): MetadataRoute.Robots {
  const isProduction = getConfig().allowSearchIndexing;

  return isProduction
    ? {
        rules: { userAgent: "*", allow: "/" },
      }
    : {
        rules: { userAgent: "*", disallow: "/" },
      };
}
