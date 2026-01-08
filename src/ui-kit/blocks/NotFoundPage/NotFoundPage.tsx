"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { useRouter } from "next/navigation";

export const NotFoundPage: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <RouteWithTransition
      id={"NotFoundPage"}
      className="w-full overflow-x-hidden"
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-8xl font-bold text-tDefault">404</div>
        <h1 className="text-2xl font-bold mt-4 text-b2">
          {t("NotFound.notFound")}
        </h1>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
          className="text-tDefault text-base mt-4"
        >
          {t("NotFound.goBack")}
        </Link>
      </div>
    </RouteWithTransition>
  );
};
