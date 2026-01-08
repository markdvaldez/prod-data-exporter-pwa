import { getConfig } from "@/services/appConfig";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

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
