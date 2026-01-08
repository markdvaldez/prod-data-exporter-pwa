"use client";

import { ApplyProtocolContainer } from "@/runnersQcApp/containers/ApplyProtocolContainer";
import { useSearchParams } from "next/navigation";

export default function ApplyProtocolPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const hisaHorseId = searchParams.get("hisaHorseId") || "";

  return <ApplyProtocolContainer id={id} hisaHorseId={hisaHorseId} />;
}
