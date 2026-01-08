import { getConfig } from "@/services/appConfig";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const config = getConfig();
  return {
    name: config.name,
    short_name: config.shortName,
    description: config.description,
    start_url: ".",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: config.logo58,
        sizes: "58x58",
        type: "image/png",
      },
      {
        src: config.logo64,
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/png",
      },
      {
        src: config.logo80,
        sizes: "80x80",
        type: "image/png",
      },
      {
        src: config.logo120,
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: config.logo180,
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: config.logo192,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: config.logo512,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
