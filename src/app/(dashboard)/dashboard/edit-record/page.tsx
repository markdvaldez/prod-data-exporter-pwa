"use client";

import { EditRecordContainer } from "@/runnersQcApp/containers/EditRecordContainer";
import { useSearchParams } from "next/navigation";

export default function EditRecordPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <EditRecordContainer id={id as string} />;
}
