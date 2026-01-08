"use client"

import React, { useMemo } from "react"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui-kit/components/Table/Table"

export type RunnerQCRow = {
  partitionKey: string
  sortKey: string
  runnerDeath: string
  runnerDNF: string
  runnerRaceDeath: string
  runnerStart: string
  locked: string
  note: string
  preferredCurrentAsOf: string
  preferredRectype: string
  raceBreed: string
  raceCountry: string
  raceDate: string
  raceDistanceFurlong: string
  raceNumber: string
  raceOnTheFlat: string
  raceSurface: string
  raceSurfaceCondition: string
  raceTrackId: string
  raceType: string
  runnerHisaId: string
  runnerHorseBreed: string
  runnerIncludeInMetrics: string
  runnerScratched: string
  runnerTjcNumber: string
}

interface RunnersQCTableProps {
  className?: string
  data: RunnerQCRow[]
  onRowClick?: (row: RunnerQCRow) => void
}

export const RunnersQCTable: React.FC<RunnersQCTableProps> = ({
  className = "",
  data,
  onRowClick,
}) => {
  const columns = useMemo<ColumnDef<RunnerQCRow>[]>(
    () => [
      { accessorKey: "runnerHisaId", header: "Runner HISA ID" },
      { accessorKey: "runnerDeath", header: "Runner Death" },
      { accessorKey: "runnerDNF", header: "Runner DNF" },
      { accessorKey: "runnerRaceDeath", header: "Runner Race Death" },
      { accessorKey: "runnerStart", header: "Runner Start" },      
      { accessorKey: "preferredCurrentAsOf", header: "Preferred Current as of" },
      { accessorKey: "preferredRectype", header: "Preferred Rectype" },
      { accessorKey: "raceBreed", header: "Race Breed" },
      { accessorKey: "raceCountry", header: "Race Country" },
      { accessorKey: "raceDate", header: "Race Date" },
      { accessorKey: "raceDistanceFurlong", header: "Race Distance Furlong" },
      { accessorKey: "raceNumber", header: "Race Number" },
      { accessorKey: "raceOnTheFlat", header: "Race on the Flat" },
      { accessorKey: "raceSurface", header: "Race Surface" },
      { accessorKey: "raceSurfaceCondition", header: "Race Surface Condition" },
      { accessorKey: "raceTrackId", header: "Race Track ID" },
      { accessorKey: "raceType", header: "Race Type" },      
      { accessorKey: "runnerHorseBreed", header: "Runner Horse Breed" },      {
        accessorKey: "runnerIncludeInMetrics",
        header: "Runner Include in Metrics",
      },
      { accessorKey: "runnerScratched", header: "Runner Scratched" },
      { accessorKey: "runnerTjcNumber", header: "Runner TJC Number" },
      { accessorKey: "note", header: "Note" },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className={`w-full bg-white shadow-sm border overflow-hidden rounded-md ${className}`}>
      {/* Desktop table view */}
      <div className="hidden lg:block w-full overflow-x-auto">
        <div className="hidden max-h-[300px] overflow-y-auto">
          <Table className="w-full min-w-[2200px] caption-bottom text-center text-sm whitespace-nowrap">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="sticky top-0 z-20 bg-gray-50"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="whitespace-nowrap min-w-[160px] px-4 py-2 text-center text-sm font-medium text-gray-600"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap min-w-[160px] px-4 py-3 text-center text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile / tablet card view */}
      <div className="lg:hidden w-full max-h-[60vh] overflow-y-auto overscroll-y-contain">
        <div className="divide-y divide-gray-200">
          {data.map((runner, index) => (
            <div
              key={`${runner.partitionKey}-${runner.sortKey}-${index}`}
              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onRowClick?.(runner)}
            >
              <div className="flex flex-col space-y-2">
                {/* Top row: ID + basic race info */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center flex-wrap gap-1">
                      <span className="text-base font-medium text-gray-900 truncate max-w-[180px]">
                        {runner.partitionKey}
                      </span>
                      {runner.runnerStart === "Yes" && (
                        <span className="text-[14px] px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                          Started
                        </span>
                      )}
                      {runner.runnerDNF === "Yes" && (
                        <span className="text-[14px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                          DNF
                        </span>
                      )}
                      {runner.runnerScratched === "Yes" && (
                        <span className="text-[14px] px-1.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                          Scratched
                        </span>
                      )}
                      {runner.locked === "Yes" && (
                        <span className="text-[14px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                          Locked
                        </span>
                      )}
                    </div>
                    <span className="text-[14px] text-gray-500 mt-0.5">
                      {runner.raceDate} · Race {runner.raceNumber}
                    </span>
                  </div>

                  <div className="flex flex-col items-end space-y-1 text-right flex-shrink-0">
                    <span className="text-[14px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {runner.raceType}
                    </span>
                    <span className="text-[14px] text-gray-500">
                      {runner.raceTrackId} · {runner.raceCountry}
                    </span>
                  </div>
                </div>

                {/* Middle: quick metrics in two columns */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[14px] text-gray-700 mt-1">
                  <div>
                    <span className="text-gray-500">Surface: </span>
                    <span>
                      {runner.raceSurface} ({runner.raceSurfaceCondition})
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Distance: </span>
                    <span>{runner.raceDistanceFurlong} f</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Include in metrics: </span>
                    <span>{runner.runnerIncludeInMetrics}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">On the flat: </span>
                    <span>{runner.raceOnTheFlat}</span>
                  </div>
                </div>

                {/* Note (truncated) */}
                {runner.note && (
                  <div className="mt-1 text-[14px] text-gray-600">
                    <span className="text-gray-500">Note: </span>
                    <span>
                      {runner.note.length > 70
                        ? `${runner.note.substring(0, 70)}...`
                        : runner.note}
                    </span>
                  </div>
                )}

                {/* Bottom meta line */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[14px] text-gray-500 truncate max-w-[60%]">
                    HISA: {runner.runnerHisaId} · TJC: {runner.runnerTjcNumber}
                  </span>
                  <span className="text-[14px] text-gray-500 truncate max-w-[40%] text-right">
                    Breed: {runner.runnerHorseBreed} ({runner.raceBreed})
                  </span>
                </div>

                {/* Tap hint */}
                <div className="text-right mt-1">
                  <span className="text-blue-600 text-[14px] font-medium">
                    Tap for details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}