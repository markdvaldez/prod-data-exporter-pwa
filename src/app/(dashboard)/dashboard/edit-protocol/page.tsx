"use client";
import { EditProtocolContainer } from "@/runnersQcApp/containers/EditProtocolContainer";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";

import { useSearchParams } from "next/navigation";

export default function EditProtocolPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <RouteWithTransition
      id={"route-RouteWithTransition"}
      className="bg-mainBackground"
    >
      <EditProtocolContainer id={id} />
    </RouteWithTransition>
  );
}
