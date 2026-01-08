"use client";

import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { RunnersQCContainer } from "@/runnersQcApp/containers/RunnersQCContainer";

export default function Page() {
  return (
    <RouteWithTransition
      className="bg-mainBackground min-h-screen"
      id={"route-TransactionLogsPage"}
    >
      <RunnersQCContainer />
    </RouteWithTransition>
  );
}
