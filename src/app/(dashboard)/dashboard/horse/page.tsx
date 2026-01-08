"use client";

import { HorseReportContainer } from "@/runnersQcApp/containers/HorseReportContainer";
import { useSearchParams } from "next/navigation";

export default function HorsePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("horseId");

  return <HorseReportContainer id={id as string} />;
}
