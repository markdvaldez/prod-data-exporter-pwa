"use client";

import { AddProtocolContainer } from "@/runnersQcApp/containers/AddProtocolContainer/AddProtocolContainer";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";

export default function AppProtocolPage() {
  return (
    <RouteWithTransition
      className="bg-mainBackground"
      id={"route-AppProtocolPage"}
    >
      <AddProtocolContainer />
    </RouteWithTransition>
  );
}
