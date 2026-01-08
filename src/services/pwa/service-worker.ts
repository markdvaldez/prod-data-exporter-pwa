import { ExpirationPlugin } from "workbox-expiration";
import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  PrecacheFallbackPlugin,
} from "workbox-precaching";
import {
  googleFontsCache,
  imageCache,
  pageCache,
  staticResourceCache,
} from "workbox-recipes";
import { registerRoute } from "workbox-routing";
import { NetworkFirst, StaleWhileRevalidate } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

// @ts-expect-error - type missing
self.__WB_DISABLE_DEV_LOGS = false;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

pageCache();

staticResourceCache();

imageCache();

googleFontsCache();

registerRoute(
  /\/_next\/data\/.+\/.+\.json$/i,
  new StaleWhileRevalidate({
    cacheName: "next-data",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 120,
        maxAgeSeconds: 24 * 60 * 60, // 24 hours
        purgeOnQuotaError: true,
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.mode === "navigate",
  new NetworkFirst({
    cacheName: "app-cache",
    plugins: [new PrecacheFallbackPlugin({ fallbackURL: "/offline" })],
  })
);

addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    // @ts-expect-error - type missing
    self.skipWaiting();
  }
});

addEventListener("install", () => {
  console.log("DEBUG ==> installing...");
});

addEventListener("activate", () => {
  console.log("DEBUG ==> activate...");
});

addEventListener("fetch", () => {
  console.log("DEBUG ==> load...");
});
