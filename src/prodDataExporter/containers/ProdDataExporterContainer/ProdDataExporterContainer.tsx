"use client";

import React from "react"
import { useRouter } from "next/navigation"

export function ProdDataExporterContainer() {
  const router = useRouter();

  return (
    <div
      className={`w-full min-h-screen pt-0 pb-5 pr-5 pl-0`}
    >
      <div className="flex-1 min-h-screen px-8 sm:px-6 lg:px-8 py-8 bg-cream rounded-lg flex flex-col shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Production Data Exporter</h1>
        </div>

        <div className="rounded-md border-none bg-transparent">
          Here
        </div>
      </div>
    </div>
  )
}

export default ProdDataExporterContainer;