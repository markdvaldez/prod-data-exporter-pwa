"use client";

import { BackButton } from "@/ui-kit/components/BackButton";
import { Button } from "@/ui-kit/components/Button";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { cn } from "@/ui-kit/lib/utils";
import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useCallback } from "react";

export default function Offline() {
  const t = useTranslations("Main");

  const isConnected = useInternetConnection();

  const handleReload = useCallback(() => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-mainBackground text-center px-4">
      <Head>
        <title>{t("offLine")}</title>
      </Head>
      <div className="fixed top-6 left-6">
        <BackButton styles={cn(isConnected ? "pt-2" : "pt-7 sm:pt-2")} />
      </div>
      <WifiOff color={"#595C5E"} size={80} />
      <h1 className="text-2xl font-bold text-gray-700 mb-2 mt-6">
        {t("noInternetConnection")}
      </h1>
      <p className="text-gray-500 mb-4 text-center">
        {t("itSeemsYouAreOffline")}
      </p>
      <Button
        title={t("tryAgain")}
        variant="outline"
        onClick={handleReload}
        className="my-4"
      />
    </div>
  );
}
