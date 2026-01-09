"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ReplicateToS3SearchSection from "./ReplicateDataForm";
import ProdDataImporterSection from "./ImportDataForm";

export function ProdDataExporterContainer() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen overflow-y-auto pb-5 pr-5">
      <div className="mx-auto flex w-full min-h-full flex-col px-8 py-8 sm:px-6 lg:px-8 bg-cream border border-darkCream rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            Production Data Exporter
          </h1>
        </div>

        <div className="pt-3 pb-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-sm border border-gray-200 border-t-[8px] border-t-grass bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Replicate Data to S3</h2>
              <p className="text-sm">Copy and obfuscate data from Production to S3</p>
              <ReplicateToS3SearchSection />
            </div>

            <div className="rounded-sm border border-gray-200 border-t-[8px] border-t-grass bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Importa Data from S3 to DynamoDB</h2>
              <p className="text-sm">Load obfuscated data into QA or DEV environment</p>
              <ProdDataImporterSection initialEnv="DEV" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProdDataExporterContainer;