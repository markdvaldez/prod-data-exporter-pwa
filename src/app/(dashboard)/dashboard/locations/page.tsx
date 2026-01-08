"use client";

import { FavoriteLocationsWrapper } from "@/runnersQcApp/containers/FavoriteLocationsContainer";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";

export default function AppLocationPage() {
  return (
    <RouteWithTransition
      id={"route-AppLocationPage"}
      className="w-full h-screen overflow-hidden relative"
    >
      <FavoriteLocationsWrapper />
    </RouteWithTransition>
  );
}
