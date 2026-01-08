"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  RunnersResultTable,
  RunnerQCRow,
} from "@/ui-kit/components/RunnersQCTable";
import {
  useRunnersResult,
  RUNNERS_RESULT_CONFIG,
} from "@/services/api/modules/runnersResult";
import { Pagination } from "@/ui-kit/components/Pagination";
import { RunnersQCSearch, RunnersQCSearchFilters } from "./RunnersQCSearch";
import routes from "@/routes";
import { useDebounce } from "@/hooks/useDebounce";
import { LoaderLottie } from "@/ui-kit/components/LoaderLottie";

interface RunnersQCContainerProps {
  className?: string;
}

export function RunnersQCContainer({ className }: RunnersQCContainerProps) {
  const router = useRouter();

  const handleRowClick = useCallback(
    (row: RunnerQCRow) => {
      router.push(routes.RUNNERS_QC_DETAIL(row.partitionKey, row.sortKey));
    },
    [router]
  );

  const [filters, setFilters] = useState<RunnersQCSearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Debounce search-related filters to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(filters.searchTerm || "", 500);
  const debouncedPK = useDebounce(filters.partitionKey || "", 500);
  const debouncedSK = useDebounce(filters.sortKey || "", 500);

  // Query params for GraphQL (dateRange etc.)
  const [queryParams, setQueryParams] = useState({
    dateRange: {
      startDate: "2025-11-01",
      endDate: "2025-12-01",
    },
  });

  // Create debounced filters for API calls
  const debouncedFilters: RunnersQCSearchFilters = {
    ...filters,
    searchTerm: debouncedSearchTerm || undefined,
    partitionKey: debouncedPK || undefined,
    sortKey: debouncedSK || undefined,
  };

  // Use the new GraphQL-ready hook with debounced filters
  const {
    data: runnersData,
    loading,
    error,
    totalResults,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    refetch,
    isRefetching,
  } = useRunnersResult({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    filters: debouncedFilters,
    queryParams,
    sortBy: "timestamp",
    sortDirection: "desc",
    useGraphQL: true,
  });

  
  console.log("pagination", pagination);
  // Reset to first page when debounced filters change (actual search execution)
  useEffect(() => {
    setCurrentPage(1);
  }, [
    debouncedSearchTerm,
    debouncedPK,
    debouncedSK,
    filters.partitionKey,
    filters.sortKey,
  ]);
  

  const goToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;
      setCurrentPage(page);
    },
    [currentPage, totalPages]
  );

  const changePageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const handleFiltersChange = useCallback(
    (newFilters: RunnersQCSearchFilters) => {
      setFilters(newFilters);
      setCurrentPage(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setCurrentPage(1);
  }, []);

  if (loading) return <LoaderLottie />;

  return (
    <div
      className={`w-full min-h-screen pt-0 pb-5 pr-5 pl-0 ${className ?? ""}`}
    >
      <div className="flex-1 min-h-screen px-8 sm:px-6 lg:px-8 py-8 bg-cream rounded-lg flex flex-col shadow-md">
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

        <div className="rounded-md border-none bg-transparent">
          <RunnersResultTable
            data={runnersData}
            pageIndex={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
    </div>
  );
}

export default RunnersQCContainer;
