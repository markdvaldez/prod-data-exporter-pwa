"use client"

import React, { useMemo, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { RunnersQCTable, RunnerQCRow } from "@/ui-kit/components/RunnersQCTable"
import { Pagination } from "@/ui-kit/components/Pagination"
import { RunnersQCSearch, RunnersQCSearchFilters } from "./RunnersQCSearch"
import routes from "@/routes"

interface RunnersQCContainerProps {
  className?: string
}

export function RunnersQCContainerOld({ className }: RunnersQCContainerProps) {
  const router = useRouter()

  const handleRowClick = useCallback(
    (row: RunnerQCRow) => {
      router.push(
        routes.RUNNERS_QC_DETAIL(row.partitionKey, row.sortKey)
      )
    },
    [router]
  )

  // Mock data
  const allData: RunnerQCRow[] = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => {
        const n = i + 1
        return {
          partitionKey: `RUN#${String(n).padStart(3, "0")}`,
          sortKey: `2025-01-${String((n % 28) + 1).padStart(2, "0")}`,
          runnerDeath: "No",
          runnerDNF: n % 7 === 0 ? "Yes" : "No",
          runnerRaceDeath: "No",
          runnerStart: n % 5 === 0 ? "No" : "Yes",
          locked: n % 9 === 0 ? "Yes" : "No",
          note: `Sample note ${n}`,
          preferredCurrentAsOf: `2025-01-${String((n % 15) + 1).padStart(
            2,
            "0"
          )}`,
          preferredRectype: n % 3 === 0 ? "Type B" : "Type A",
          raceBreed: "TB",
          raceCountry: ["USA", "CAN", "AUS"][n % 3],
          raceDate: `2025-01-${String((n % 27) + 1).padStart(2, "0")}`,
          raceDistanceFurlong: `${5 + (n % 4)}.0`,
          raceNumber: `${(n % 10) + 1}`,
          raceOnTheFlat: n % 2 === 0 ? "Yes" : "No",
          raceSurface: ["Dirt", "Turf", "Synthetic"][n % 3],
          raceSurfaceCondition: ["Fast", "Good", "Sloppy"][n % 3],
          raceTrackId: ["CD", "SA", "GP"][n % 3],
          raceType: ["Allowance", "Claiming", "Stakes"][n % 3],
          runnerHisaId: `HISA${10000 + n}`,
          runnerHorseBreed: "Thoroughbred",
          runnerIncludeInMetrics: n % 6 === 0 ? "No" : "Yes",
          runnerScratched: n % 11 === 0 ? "Yes" : "No",
          runnerTjcNumber: `TJC${90000 + n}`,
        }
      }),
    []
  )

  const [filters, setFilters] = useState<RunnersQCSearchFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const loading = false

  const filteredData = useMemo(() => {
    const term = filters.searchTerm?.toLowerCase().trim()

    return allData.filter((row) => {
      // global search
      if (term) {
        const haystack = [
          row.partitionKey,
          row.sortKey,
          row.note,
          row.raceTrackId,
          row.raceCountry,
          row.raceType,
          row.raceSurface,
          row.runnerHisaId,
          row.runnerTjcNumber,
        ]
          .join(" ")
          .toLowerCase()

        if (!haystack.includes(term)) {
          return false
        }
      }

      const matchStr = (value: string | undefined, actual: string) => {
        if (!value) return true
        return actual.toLowerCase() === value.toLowerCase()
      }

      const raceDate = row.raceDate
      if (filters.raceDateFrom && raceDate < filters.raceDateFrom) {
        return false
      }
      if (filters.raceDateTo && raceDate > filters.raceDateTo) {
        return false
      }

      if (!matchStr(filters.partitionKey, row.partitionKey)) return false
      if (!matchStr(filters.raceTrackId, row.raceTrackId)) return false
      if (!matchStr(filters.raceCountry, row.raceCountry)) return false
      if (!matchStr(filters.raceSurface, row.raceSurface)) return false
      if (!matchStr(filters.raceType, row.raceType)) return false
      if (!matchStr(filters.runnerDNF, row.runnerDNF)) return false
      if (!matchStr(filters.runnerStart, row.runnerStart)) return false
      if (!matchStr(filters.runnerScratched, row.runnerScratched)) return false
      if (!matchStr(filters.runnerIncludeInMetrics, row.runnerIncludeInMetrics))
        return false
      if (!matchStr(filters.locked, row.locked)) return false

      return true
    })
  }, [allData, filters])

  const totalResults = filteredData.length
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    return filteredData.slice(start, end)
  }, [filteredData, currentPage, pageSize])

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return
      setCurrentPage(page)
    },
    [currentPage, totalPages]
  )

  const changePageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
  }, [])

  const handleFiltersChange = useCallback(
    (newFilters: RunnersQCSearchFilters) => {
      setFilters(newFilters)
      setCurrentPage(1)
    },
    []
  )

  const handleClearFilters = useCallback(() => {
    setFilters({})
    setCurrentPage(1)
  }, [])

  return (
    <div className={`w-full min-h-screen ${className ?? ""}`}>
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Runners QC
            </h1>
            <p className="text-sm text-gray-600">
              Review and validate runner and race level quality control data
            </p>
          </div>
        </div>

        <div className="pt-8">
          <RunnersQCSearch
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            totalResults={totalResults}
          />
        </div>

        <div className="rounded-md border bg-white">
          <RunnersQCTable data={paginatedData} onRowClick={handleRowClick} />
        </div>

        {totalResults > 0 && (
          <div className="mt-0">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              pageSize={pageSize}
              loading={loading}
              onPageChange={goToPage}
              onPageSizeChange={changePageSize}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default RunnersQCContainer