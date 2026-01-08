"use client";

import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { TransactionLogDetailContainer } from "@/runnersQcApp/containers/TransactionLogDetailContainer";

export default function TransactionLogDetailPage() {
  return (
    <RouteWithTransition
      className="bg-mainBackground min-h-screen"
      id={"route-TransactionLogDetailPage"}
    >
      <TransactionLogDetailContainer />
    </RouteWithTransition>
  );
}