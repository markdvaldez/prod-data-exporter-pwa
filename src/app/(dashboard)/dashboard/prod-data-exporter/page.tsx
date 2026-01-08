"use client";

import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { ProdDataExporterContainer } from "@/prodDataExporter/containers/ProdDataExporterContainer";

export default function Page() {
  return (
    <RouteWithTransition
      className="bg-mainBackground min-h-screen"
      id={"route-TransactionLogsPage"}
    >
      <ProdDataExporterContainer />
    </RouteWithTransition>
  );
}
