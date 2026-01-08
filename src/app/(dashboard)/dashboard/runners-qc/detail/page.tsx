"use client";

import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { RunnersQCDetailContainer } from "@/runnersQcApp/containers/RunnersQCDetailContainer";

export default function Page() {
  return (
    <RouteWithTransition
      className="bg-mainBackground min-h-screen"
      id="route-RunnersQCDetailPage"
    >
      <RunnersQCDetailContainer />
    </RouteWithTransition>
  );
}