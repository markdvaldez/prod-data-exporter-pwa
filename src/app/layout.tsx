import { QueryProvider } from "@/services/api/queryProvider";
import { ConfigureAmplifyServerSide } from "@/services/aws/amplify-cognito-config-server";
import { StoreProvider } from "@/services/store/provider";
import { CacheInvalidationProvider } from "@/providers/CacheInvalidationProvider";
import { CookieErrorBoundary } from "@/components/CookieErrorBoundary";
import { CookieManager } from "@/components/CookieManager";
import { DynatraceScript } from "@/shared/DynatraceScript";
import { GoogleAnalyticsLogger } from "@/shared/GoogleAnalyticsLogger";
import { NavigationLogger } from "@/shared/NavigationLogger";
import { PWAInstallHandler } from "@/shared/PWAInstallHandler";
import { SafeAreaView } from "@/ui-kit/blocks/SafeAreaView";
import { Toaster } from "@/ui-kit/components/Toaster";
import { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Roboto } from "next/font/google";
import defaultMetadata from "../services/searchIndexing";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="bg-mainBackground">
      <GoogleAnalyticsLogger />
      <head>
        <DynatraceScript />
      </head>
      <body
        className={`${roboto.variable} ${roboto.className} className="font-sans antialiased flex flex-col relative bg-mainBackground text-tDefault max-h-screen overflow-hidden`}
      >
        <ConfigureAmplifyServerSide>
          <CookieErrorBoundary>
            <NextIntlClientProvider messages={messages}>
              <StoreProvider>
                <QueryProvider>
                  <CacheInvalidationProvider debug={process.env.NODE_ENV === 'development'}>
                    <SafeAreaView>
                      <CookieManager />
                      {children}
                      <PWAInstallHandler />
                      <NavigationLogger />
                      <Toaster />
                    </SafeAreaView>
                  </CacheInvalidationProvider>
                </QueryProvider>
              </StoreProvider>
            </NextIntlClientProvider>
          </CookieErrorBoundary>
        </ConfigureAmplifyServerSide>
      </body>
    </html>
  );
}
