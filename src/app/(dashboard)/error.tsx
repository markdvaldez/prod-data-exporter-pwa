"use client";

import routes from "@/routes";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
        <AlertTriangle width={100} height={100} color="#FF4141" />
        <h1 className="text-2xl font-bold mt-4 text-b2">
          {t("NotFound.somethingWentWrong")}
        </h1>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            reset?.();
          }}
          className="text-tDefault text-base mt-4"
        >
          {t("NotFound.tryAgain")}
        </Link>
        <Link href={routes.DASHBOARD} className="text-tDefault text-base mt-2">
          {t("NotFound.goBack")}
        </Link>
      </div>
    </div>
  );
}
