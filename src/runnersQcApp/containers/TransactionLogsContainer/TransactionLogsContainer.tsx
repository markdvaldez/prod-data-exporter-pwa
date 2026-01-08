import React, { useState, useEffect, useCallback } from 'react';
import { TransactionLog } from '@/Types/transaction-log.types';
import { SearchFilters } from '@/services/dummyData/transactionLogs';
import { useTransactionLogs, TRANSACTION_LOGS_CONFIG } from '@/services/api/modules/transactionLogs';
import { useDebounce } from '@/hooks/useDebounce';
import { TransactionLogsSearch } from './TransactionLogsSearch';
import { TransactionLogsTable } from '@/ui-kit/components/TransactionLogsTable';
import { Pagination } from '@/ui-kit/components/Pagination';

interface TransactionLogsContainerProps {
  className?: string;
  useGraphQL?: boolean; // Allow switching between mock and GraphQL
}

export const TransactionLogsContainer: React.FC<TransactionLogsContainerProps> = ({ 
  className,
  useGraphQL = TRANSACTION_LOGS_CONFIG.USE_GRAPHQL // Use config default
}) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(TRANSACTION_LOGS_CONFIG.DEFAULT_PAGE_SIZE);

  // Debounce search-related filters to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(filters.searchTerm || '', 500);
  const debouncedEntityId = useDebounce(filters.entityId || '', 500);
  const debouncedTreatmentId = useDebounce(filters.treatmentId || '', 500);

  // Create debounced filters for API calls
  const debouncedFilters: SearchFilters = {
    ...filters,
    searchTerm: debouncedSearchTerm || undefined,
    entityId: debouncedEntityId || undefined,
    treatmentId: debouncedTreatmentId || undefined,
  };

  // Use the new GraphQL-ready hook with debounced filters
  const {
    data: logs,
    loading,
    error,
    totalResults,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    refetch,
    isRefetching
  } = useTransactionLogs({
    page: currentPage,
    pageSize,
    filters: debouncedFilters,
    sortBy: 'timestamp',
    sortDirection: 'desc',
    useGraphQL
  });

  // Reset to first page when debounced filters change (actual search execution)
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, debouncedEntityId, debouncedTreatmentId, filters.status, filters.action, filters.complete, filters.dateFrom, filters.dateTo]);

  const isSearching = Object.entries(debouncedFilters).some(([key, value]) => 
    value !== undefined && value !== ''
  );

  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages || page === currentPage || loading) return;
    setCurrentPage(page);
  }, [totalPages, currentPage, loading]);

  const changePageSize = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
  }, []);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    // Page reset is handled by useEffect when debounced values change
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setCurrentPage(1); // Immediate reset for clear action
  }, []);

  // Show error state
  if (error) {
    return (
      <div className={`w-full min-h-screen ${className}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center flex flex-col justify-center min-h-[400px]">
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading transaction logs</h3>
            <p className="text-gray-500 mb-4">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading && logs.length === 0 && !isSearching) {
    return (
      <div className={`w-full min-h-screen ${className}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-center h-64 sm:h-96">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600 text-sm sm:text-base">
              Loading transaction logs...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full min-h-screen ${className}`}>
      <div className="w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Transaction Logs</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Monitor long-lived transaction status and history
                {useGraphQL && <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">GraphQL</span>}
                {!useGraphQL && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Mock Data</span>}
              </p>
            </div>
            {(loading || isRefetching) && (
              <div className="flex items-center text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                {isRefetching ? 'Refreshing...' : isSearching ? 'Searching...' : 'Loading...'}
              </div>
            )}
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 mb-4">
          <TransactionLogsSearch
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            totalResults={totalResults}
          />
        </div>

        <TransactionLogsTable
          logs={logs}
          loading={loading}
          emptyMessage={isSearching ? 'No transaction logs found matching your search criteria.' : 'No transaction logs found.'}
          onClearFilters={handleClearFilters}
          showClearFilters={isSearching}
        />

        {/* Pagination floating at bottom of table */}
        {totalResults > 0 && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200">
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
  );
};