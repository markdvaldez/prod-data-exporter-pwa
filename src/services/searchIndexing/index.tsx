import { Metadata } from "next";
import { getConfig } from "../appConfig";

const metadata: Metadata = {
  metadataBase: new URL(getConfig().siteUrl),
  title: getConfig().name,
  description: getConfig().name,
  openGraph: {
    title: getConfig().name,
    description: getConfig().name,
    url: getConfig().siteUrl,
    siteName: getConfig().name,
    images: [
      {
        url: getConfig()["HISA-seal-final"],
        width: 183,
        height: 72,
        alt: `Preview image for ${getConfig().name}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: getConfig().name,
    description: getConfig().description,
    images: [getConfig()["HISA-seal-final"]],
  },
};

const isProduction = getConfig().allowSearchIndexing;

if (!isProduction) {
  metadata.robots = { index: false, follow: false };
}

// TODO remove
metadata.robots = { index: true, follow: true };

export default metadata;
