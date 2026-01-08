"use client";

import { getConfig } from "@/services/appConfig";
import Script from "next/script";
import { useMemo } from "react";

export const DynatraceScript = () => {
  const config = useMemo(() => getConfig(), []);
  const dynatraceSrc = process.env.NEXT_PUBLIC_REACT_APP_DYNATRACE;

  if (config.useDynatrace && dynatraceSrc) {
    return (
      <Script
        src={dynatraceSrc}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    );
  }

  return null;
};
