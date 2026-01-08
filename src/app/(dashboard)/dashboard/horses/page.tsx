"use client";

import { MyHorsesContainer } from "@/runnersQcApp/containers/MyHorsesContainer";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";

export default function HorsesPage() {
  return (
    <RouteWithTransition
      id={"route-HorsesPage"}
      className="w-full h-screen overflow-hidden relative"
    >
      <MyHorsesContainer />
    </RouteWithTransition>
  );
}
