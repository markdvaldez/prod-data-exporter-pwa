"use client"

import React, { useState } from "react"

export interface RunnersQCSearchFilters {
  searchTerm?: string
  partitionKey?: string
  sortKey?: string
  raceTrackId?: string
  unnersId?: string
  raceCountry?: string
  raceSurface?: string
  raceType?: string
  runnerDNF?: string
  runnerStart?: string
  runnerScratched?: string
  runnerIncludeInMetrics?: string
  locked?: string
  raceDateFrom?: string
  raceDateTo?: string
}

interface RunnersQCSearchProps {
  filters: RunnersQCSearchFilters
  onFiltersChange: (filters: RunnersQCSearchFilters) => void
  onClearFilters: () => void
  totalResults?: number
}

export const RunnersQCSearch: React.FC<RunnersQCSearchProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearchTermChange = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value })
  }

  const handleSimpleChange = (key: keyof RunnersQCSearchFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value || undefined })
  }

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => key !== "searchTerm" && value !== undefined && value !== ""
  )

  const hasSearchTerm = filters.searchTerm && filters.searchTerm.trim() !== ""

  return (
    <div className="mb-3 sm:mb-4">
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search runner, race, HISA, TJC, notes..."
              value={filters.searchTerm || ""}
              onChange={(e) => handleSearchTermChange(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsExpanded((v) => !v)}
              className="px-3 py-2 text-sm font-medium text-w0 hover:text-gray-700 bg-grass hover:bg-gray-200 border border-grass hover:border-gray-300 rounded-[5px] transition-colors"
            >
              {isExpanded ? "Hide Filters" : "Show Filters"}
              <span className="ml-1">{isExpanded ? "▲" : "▼"}</span>
            </button>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium border border-blue-200 hover:border-blue-300 rounded-[5px] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
              {/* Partition Key */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  ID
                </label>
                <input
                  type="text"
                  placeholder="RUN#001"
                  value={filters.partitionKey || ""}
                  onChange={(e) =>
                    handleSimpleChange("partitionKey", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>

              {/* Track ID */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Course
                </label>
                <input
                  type="text"
                  placeholder="CD, SA..."
                  value={filters.raceTrackId || ""}
                  onChange={(e) =>
                    handleSimpleChange("raceTrackId", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="USA, CAN..."
                  value={filters.raceCountry || ""}
                  onChange={(e) =>
                    handleSimpleChange("raceCountry", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>

              {/* Surface */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Surface
                </label>
                <select
                  value={filters.raceSurface || ""}
                  onChange={(e) =>
                    handleSimpleChange("raceSurface", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  <option value="Dirt">Dirt</option>
                  <option value="Turf">Turf</option>
                  <option value="Synthetic">Synthetic</option>
                </select>
              </div>

              {/* Race Type */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Race Type
                </label>
                <select
                  value={filters.raceType || ""}
                  onChange={(e) =>
                    handleSimpleChange("raceType", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  <option value="Allowance">Allowance</option>
                  <option value="Claiming">Claiming</option>
                  <option value="Stakes">Stakes</option>
                </select>
              </div>

              {/* Runner DNF */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Runner DNF
                </label>
                <select
                  value={filters.runnerDNF || ""}
                  onChange={(e) =>
                    handleSimpleChange("runnerDNF", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Runner Start */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Runner Start
                </label>
                <select
                  value={filters.runnerStart || ""}
                  onChange={(e) =>
                    handleSimpleChange("runnerStart", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Scratched */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Scratched
                </label>
                <select
                  value={filters.runnerScratched || ""}
                  onChange={(e) =>
                    handleSimpleChange("runnerScratched", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Include in metrics */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Include in metrics
                </label>
                <select
                  value={filters.runnerIncludeInMetrics || ""}
                  onChange={(e) =>
                    handleSimpleChange("runnerIncludeInMetrics", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Locked */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Locked
                </label>
                <select
                  value={filters.locked || ""}
                  onChange={(e) => handleSimpleChange("locked", e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Race date from */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Race date from
                </label>
                <input
                  type="date"
                  value={filters.raceDateFrom || ""}
                  onChange={(e) =>
                    handleSimpleChange("raceDateFrom", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>

              {/* Race date to */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Race date to
                </label>
                <input
                  type="date"
                  value={filters.raceDateTo || ""}
                  onChange={(e) =>
                    handleSimpleChange("raceDateTo", e.target.value)
                  }
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-[5px] shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results summary */}
      {totalResults !== undefined && (
        <div className="p-2 text-xs text-gray-600">
          {hasActiveFilters || hasSearchTerm ? (
            <>
              <span className="font-medium">{totalResults}</span> results
            </>
          ) : (
            <>Showing all runners</>
          )}
        </div>
      )}
    </div>
  )
}
