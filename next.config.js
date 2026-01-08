/* eslint-disable @typescript-eslint/no-require-imports */
const {
  environmentVariables,
} = require("./src/services/appConfig/env.config.js");

const { withNextIntl } = require("./src/services/i18n/withNextIntl.js");

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  customWorkerDir: "worker",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  register: false, // Disable automatic registration, handle manually
  skipWaiting: true,
  fallbacks: {
    document: "/offline",
  },
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    disableDevLogs: process.env.NODE_ENV === "production",
    runtimeCaching: [
      {
        urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
          request.headers.get("RSC") === "1" &&
          request.headers.get("Next-Router-Prefetch") === "1" &&
          sameOrigin &&
          !pathname.startsWith("/api/"),
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-rsc-prefetch",
          matchOptions: {
            ignoreSearch: true,
            ignoreVary: true,
          },
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
          request.headers.get("RSC") === "1" &&
          sameOrigin &&
          !pathname.startsWith("/api/"),
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-rsc",
          matchOptions: {
            ignoreSearch: true,
            ignoreVary: true,
          },
          expiration: {
            maxEntries: 500,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: ({ url: { pathname }, sameOrigin }) =>
          sameOrigin && !pathname.startsWith("/api/"),
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          matchOptions: {
            ignoreSearch: true,
            ignoreVary: true,
          },
          expiration: {
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ...environmentVariables,
  },
  async rewrites() {
    return [
      {
        source: "/storybook/:path*",
        destination: "/storybook-static/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Large-Request-Headers",
            value: "1",
          },
        ],
      },
    ];
  },
  staticPageGenerationTimeout: 120,
  devIndicators: false,
  output: "standalone",
  // Configure for larger request headers
  experimental: {
    largePageDataBytes: 128 * 100000, // 12.8MB
  },
};

module.exports = withNextIntl(withPWA(nextConfig));
