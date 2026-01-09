"use client";

import React, { useMemo, useState } from "react";

type TargetEnv = "DEV" | "QA";

type ImportStatus = "idle" | "running" | "success" | "error";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFileNameFromPath(path: string) {
  const trimmed = path.trim();
  if (!trimmed) return "";
  const parts = trimmed.split("/");
  return parts[parts.length - 1] || trimmed;
}

function getDatasetNameFromFile(fileName: string) {
  // "SampleData-2026-01-07.json" -> "SampleData-2026-01-07"
  return fileName.replace(/\.json$/i, "");
}

function isLikelyS3Path(value: string) {
  const v = value.trim();
  return v.startsWith("s3://") || v.startsWith("https://") || v.startsWith("http://");
}

export default function ProdDataImporterSection({
  className,
  initialEnv = "DEV",
  initialS3Path = "",
}: {
  className?: string;
  initialEnv?: TargetEnv;
  initialS3Path?: string;
}) {
  const [env, setEnv] = useState<TargetEnv>(initialEnv);
  const [s3Path, setS3Path] = useState(initialS3Path);
  const [status, setStatus] = useState<ImportStatus>("idle");
  const [error, setError] = useState("");
  const [logLines, setLogLines] = useState<string[]>([]);
  const [recordsInserted, setRecordsInserted] = useState<number | null>(null);

  const fileName = useMemo(() => getFileNameFromPath(s3Path), [s3Path]);
  const datasetName = useMemo(() => getDatasetNameFromFile(fileName), [fileName]);

  function pushLog(line: string) {
    setLogLines((prev) => [...prev, line]);
  }

  async function handleRunImport() {
    const path = s3Path.trim();

    setError("");
    setRecordsInserted(null);
    setLogLines([]);

    if (!path) {
      setError("Please paste the S3 path to the obfuscated data file.");
      setStatus("error");
      return;
    }

    if (!isLikelyS3Path(path)) {
      setError('Please enter a valid S3 path (example: "s3://..." or "https://...").');
      setStatus("error");
      return;
    }

    setStatus("running");

    try {
      const fakeCount = 125;

      pushLog(`Dropping dataset "${datasetName || "dataset"}" on ${env}...`);
      await sleep(450);

      pushLog(`Importing file: ${fileName || path}`);
      await sleep(700);

      pushLog(`Importing completed: ${fakeCount} records inserted.`);
      await sleep(350);

      setRecordsInserted(fakeCount);
      setStatus("success");
    } catch {
      setError("Import failed. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-[5px] border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[260px_1fr_160px] md:items-end">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Target Environments
            </label>
            <div className="mt-2 relative">
              <select
                value={env}
                onChange={(e) => setEnv(e.target.value as TargetEnv)}
                className={cn(
                  "w-full appearance-none rounded-[5px] bg-[#f9f9fa] border border-gray-200 px-4 py-3 text-base text-gray-900",
                  "focus:outline-none focus:ring-2 focus:ring-blue-600"
                )}
                disabled={status === "running"}
              >
                <option value="DEV">DEV</option>
                <option value="QA">QA</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">
              Source data file
            </label>
            <div className="mt-2">
              <input
                value={s3Path}
                onChange={(e) => setS3Path(e.target.value)}
                placeholder="Paste S3 path (s3://... or https://...)"
                className={cn(
                  "w-full rounded-[5px] bg-[#f9f9fa] border border-gray-200 px-4 py-3 text-base text-gray-900",
                  "placeholder:text-gray-400",
                  "focus:outline-none focus:ring-2 focus:ring-blue-600"
                )}
                disabled={status === "running"}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleRunImport}
              disabled={status === "running"}
              className={cn(
                "w-full rounded-[5px] bg-blueLink px-5 py-3 text-base font-medium text-white",
                "hover:bg-blueLink focus:outline-none focus:ring-2 focus:ring-blue-600",
                status === "running" && "cursor-not-allowed opacity-70"
              )}
            >
              {status === "running" ? "Running..." : "Run Import"}
            </button>
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-[5px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6">
          <div className="text-lg font-semibold text-gray-900">Import Log</div>

          <div className="mt-3 overflow-hidden rounded-[5px] border border-blue-200 bg-[#f9f9fa]">
            {logLines.length === 0 ? (
              <div className="px-4 py-4 text-sm text-gray-600">
                No logs yet. Select an environment, paste the S3 path, then click Run Import.
              </div>
            ) : (
              <div className="divide-y divide-blue-200">
                {logLines.map((line, idx) => (
                  <div key={idx} className="px-4 py-3 text-sm text-gray-800">
                    {line}
                  </div>
                ))}

                {status === "success" && recordsInserted != null ? (
                  <div className="px-4 py-3 text-sm text-green-700 bg-green-50 border-t border-green-200">
                    Success! {recordsInserted} records imported.
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}