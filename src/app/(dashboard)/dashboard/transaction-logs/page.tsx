"use client";

import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { TransactionLogsContainer } from "@/runnersQcApp/containers/TransactionLogsContainer";

export default function TransactionLogsPage() {
  return (
    <RouteWithTransition
      className="bg-mainBackground min-h-screen"
      id={"route-TransactionLogsPage"}
    >
      <TransactionLogsContainer />
    </RouteWithTransition>
  );
}
