"use client";

import React, { useMemo, useState } from "react";
import { MOCK_HORSES, type Horse } from "./mockHorses";

type ObfuscateResponse = {
  s3Path?: string;
  obfuscated?: Record<string, any>;
};

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function titleCaseWords(s: string) {
  return s
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function cleanSegment(seg: string) {
  return seg
    .replace(/\[\d+\]/g, "") // remove [0]
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase -> spaces
    .replace(/_/g, " ")
    .trim();
}

function toLabel(key: string) {
  const raw = key.replace(/\[\d+\]/g, "");
  const parts = raw.split(".");

  const prefixMap: Record<string, string> = {
    horseLocation: "Horse Location",
  };

  if (parts.length >= 2) {
    const prefix = parts[0];
    const rest = parts.slice(1).join(".");

    const base = prefixMap[prefix] ?? titleCaseWords(cleanSegment(prefix));

    let tail = titleCaseWords(cleanSegment(rest));

    tail = tail.replace(/^Location\s+/i, "");

    tail = tail.replace(/\bId\b/g, "ID");

    return `${base} ${tail}`.trim();
  }

  const label = titleCaseWords(cleanSegment(raw)).replace(/\bId\b/g, "ID");
  return label;
}

function flattenObject(
  obj: any,
  prefix = "",
  out: Array<{ key: string; value: any }> = []
) {
  if (obj == null) return out;

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      out.push({ key: prefix || "value", value: "[]" });
      return out;
    }

    const allPrimitive = obj.every(
      (v) =>
        v == null ||
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean"
    );

    if (allPrimitive) {
      const joined = obj
        .filter((v) => v != null && v !== "")
        .map((v) => String(v))
        .join(", ");
      out.push({ key: prefix || "value", value: joined });
      return out;
    }

    obj.forEach((v, i) => flattenObject(v, `${prefix}[${i}]`, out));
    return out;
  }

  if (typeof obj !== "object") {
    out.push({ key: prefix || "value", value: obj });
    return out;
  }

  const keys = Object.keys(obj);
  if (keys.length === 0) {
    out.push({ key: prefix || "value", value: "{}" });
    return out;
  }

  for (const k of keys) {
    const nextPrefix = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v != null && typeof v === "object") {
      flattenObject(v, nextPrefix, out);
    } else {
      out.push({ key: nextPrefix, value: v });
    }
  }

  return out;
}


function formatValue(v: any) {
  if (v == null) return "";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "number") return String(v);
  if (typeof v === "string") return v;
  return JSON.stringify(v);
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function findHorseByQuery(q: string) {
  const nq = normalize(q);
  if (!nq) return null;

  const exactId = MOCK_HORSES.find((h) => normalize(h.hisaHorseId) === nq);
  if (exactId) return exactId;

  const byName = MOCK_HORSES.find((h) => normalize(h.name).includes(nq));
  if (byName) return byName;

  const byIdContains = MOCK_HORSES.find((h) =>
    normalize(h.hisaHorseId).includes(nq)
  );
  return byIdContains || null;
}

function hashString(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function obfuscateId(id: string, salt: string) {
  const h = hashString(`${salt}:${id}`);
  return `X${String(h % 1000000).padStart(6, "0")}`;
}

function obfuscateName(name: string, salt: string) {
  const h = hashString(`${salt}:${name}`);
  return `Person ${String(h % 10000).padStart(4, "0")}`;
}

function obfuscateStreet(street: string, salt: string) {
  const h = hashString(`${salt}:${street}`);
  return `${(h % 9999) + 1} Placeholder Rd`;
}

function obfuscateHorse(h: Horse) {
  const salt = h.hisaHorseId;

  return {
    ...h,
    hisaHorseId: obfuscateId(h.hisaHorseId, salt),
    name: `Horse ${String(hashString(`${salt}:${h.name}`) % 10000).padStart(4, "0")}`,
    ownerName: obfuscateName(h.ownerName, salt),
    ownerHisaId: obfuscateId(h.ownerHisaId, salt),
    responsiblePersonName: obfuscateName(h.responsiblePersonName, salt),
    responsiblePersonHisaId: obfuscateId(h.responsiblePersonHisaId, salt),
    attendingVetName: (h.attendingVetName || []).map((n) => obfuscateName(n, salt)),
    attendingVet: (h.attendingVet || []).map((id) => obfuscateId(id, salt)),
    horseLocation: {
      ...h.horseLocation,
      locationId: obfuscateId(h.horseLocation.locationId, salt),
      street: obfuscateStreet(h.horseLocation.street, salt),
      zipPostalCode: String(
        (hashString(`${salt}:${h.horseLocation.zipPostalCode}`) % 90000) + 10000
      ),
      unitAptBoxNumber: h.horseLocation.unitAptBoxNumber ? "Unit X" : null,
    },
  };
}

export default function ReplicateToS3SearchSection({
  className,
  obfuscateEndpoint = "/api/horses/replicate-to-s3",
  useMockData = true,
}: {
  className?: string;
  obfuscateEndpoint?: string;
  useMockData?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copying, setCopying] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ObfuscateResponse | null>(null);

  const rows = useMemo(() => {
    const obfuscated = data?.obfuscated;
    if (!obfuscated) return [];
    return flattenObject(obfuscated);
  }, [data]);

  async function handleExportAndObfuscate() {
    const q = query.trim();
    if (!q) return;

    setSubmitting(true);
    setError("");
    setData(null);

    try {
      if (useMockData) {
        const horse = findHorseByQuery(q);
        if (!horse) {
          throw new Error("No horse found. Try Chaotic or H000079116.");
        }

        const obfuscated = obfuscateHorse(horse);
        const date = new Date().toISOString().slice(0, 10);
        const s3Path = `s3://qa-dataset/obfuscated/${horse.hisaHorseId}-${date}.json`;

        setData({ s3Path, obfuscated });
        return;
      }

      const res = await fetch(obfuscateEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || `Request failed (${res.status})`);
      }

      const json = (await res.json()) as ObfuscateResponse;
      setData(json);
    } catch (e: any) {
      setError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopyPath() {
    const path = data?.s3Path;
    if (!path) return;

    try {
      setCopying(true);
      await navigator.clipboard.writeText(path);
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="mt-6">
        <label className="block text-base font-medium text-gray-900">
          Horse Name
        </label>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search horse name or ID"
              className={cn(
                "w-full rounded-[5px] bg-[#f9f9fa] border border-gray-200 px-4 py-4 pr-11 text-base text-gray-900",
                "placeholder:text-gray-400",
                "focus:outline-none focus:ring-2 focus:ring-blue-600"
              )}
              disabled={submitting}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportAndObfuscate}
            disabled={submitting || !query.trim()}
            className={cn(
              "rounded-[5px] bg-blueLink px-5 py-4 text-base font-medium text-white",
              "hover:bg-blueLink focus:outline-none focus:ring-2 focus:ring-blue-600",
              (submitting || !query.trim()) && "cursor-not-allowed opacity-70"
            )}
          >
            {submitting ? "Exporting..." : "Export & Obfuscate"}
          </button>
        </div>

        {error ? (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>

      <div className="mt-6 rounded-[5px] border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-4 py-4">
          <div className="text-lg font-semibold text-gray-900">
            Preview Obfuscated Data
          </div>
        </div>

        <div className="p-0 bg-[#f9f9fa]">
          {!data?.obfuscated ? (
            <div className="rounded-md border border-gray-100 bg-gray-50 px-4 py-4 text-sm text-gray-600">
              No data yet. Search a horse name or ID, then click Export & Obfuscate.
            </div>
          ) : (
            <>
              <div className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {rows.map((r, idx) => (
                    <div
                      key={`${r.key}-${idx}`}
                      className={cn(
                        "border-b border-blue-200 px-4 py-3",
                        "md:border-r md:last:border-r-0",
                        idx >= rows.length - (rows.length % 3 || 3) && "border-b-0"
                      )}
                    >
                      <div className="text-sm">
                        <span className="font-medium text-blue-700">
                          {toLabel(r.key)}:
                        </span>{" "}
                        <span className="text-gray-900">{formatValue(r.value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t-[1px] border-t-blue-200 bg-white px-4 py-3">
                <div className="text-sm text-gray-700">
                  Data saved to S3:{" "}
                  {data.s3Path ? (
                    <span className="text-gray-900">{data.s3Path}</span>
                  ) : (
                    <span className="text-gray-500">No path returned</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCopyPath}
                  disabled={!data.s3Path || copying}
                  className={cn(
                    "rounded-[5px] bg-blueLink px-5 py-2.5 text-sm font-medium text-white",
                    "hover:bg-blueLink focus:outline-none focus:ring-2 focus:ring-blue-600",
                    (!data.s3Path || copying) && "cursor-not-allowed opacity-60"
                  )}
                >
                  {copying ? "Copying..." : "Copy Path"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}