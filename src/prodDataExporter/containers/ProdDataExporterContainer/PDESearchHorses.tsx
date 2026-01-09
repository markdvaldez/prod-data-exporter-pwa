"use client";

import React, { useState } from "react";
import HorseNameSearchSection from "./HorseNameSearchSection";

export default function LeftGrid() {
  const [horse, setHorse] = useState(null);

  async function handleExport() {
    if (!horse?.id) return;

    // call your export endpoint using horse.id
    await fetch(`/api/replicate/export?horseId=${encodeURIComponent(horse.id)}`, {
      method: "POST",
    });
  }

  return (
    <div className="rounded-md border-none bg-transparent">
      <HorseNameSearchSection
        onSelectHorse={setHorse}
        onExport={handleExport}
      />
    </div>
  );
}