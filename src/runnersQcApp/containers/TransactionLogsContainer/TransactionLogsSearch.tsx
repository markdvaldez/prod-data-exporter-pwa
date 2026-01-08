import React, { useState } from 'react';
import { SearchFilters } from '@/services/dummyData/transactionLogs';
import { TransactionStatus, TransactionAction } from '@/Types/transaction-log.types';

interface TransactionLogsSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  totalResults?: number;
}

export const TransactionLogsSearch: React.FC<TransactionLogsSearchProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  totalResults
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSearchTermChange = (value: string) => {
    onFiltersChange({ ...filters, searchTerm: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ ...filters, status: value || undefined });
  };

  const handleActionChange = (value: string) => {
    onFiltersChange({ ...filters, action: value || undefined });
  };

  const handleCompleteChange = (value: string) => {
    const complete = value === '' ? undefined : value === 'true';
    onFiltersChange({ ...filters, complete });
  };

  const handleEntityIdChange = (value: string) => {
    onFiltersChange({ ...filters, entityId: value || undefined });
  };

  const handleTreatmentIdChange = (value: string) => {
    onFiltersChange({ ...filters, treatmentId: value || undefined });
  };

  const handleDateFromChange = (value: string) => {
    onFiltersChange({ ...filters, dateFrom: value || undefined });
  };

  const handleDateToChange = (value: string) => {
    onFiltersChange({ ...filters, dateTo: value || undefined });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== ''
  );

  const hasSearchTerm = filters.searchTerm && filters.searchTerm.trim() !== '';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
      {/* Compact Header with Search */}
      <div className="space-y-2">
        {/* Main Search Bar - Always Visible */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search entity ID, action, status, treatment ID, message..."
              value={filters.searchTerm || ''}
              onChange={(e) => handleSearchTermChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors"
            >
              {isExpanded ? 'Hide Filters' : 'Show Filters'}
              <span className="ml-1">{isExpanded ? '▲' : '▼'}</span>
            </button>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium border border-blue-200 hover:border-blue-300 rounded-md transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {isExpanded && (
          <div className="border-t border-gray-200 pt-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3">
              {/* Status Filter */}
              <div>
                <label htmlFor="status" className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={filters.status || ''}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  {Object.values(TransactionStatus).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Action Filter */}
              <div>
                <label htmlFor="action" className="block text-xs font-medium text-gray-700 mb-1">
                  Action
                </label>
                <select
                  id="action"
                  value={filters.action || ''}
                  onChange={(e) => handleActionChange(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  {Object.values(TransactionAction).map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
              </div>

              {/* Complete Filter */}
              <div>
                <label htmlFor="complete" className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="complete"
                  value={filters.complete === undefined ? '' : filters.complete.toString()}
                  onChange={(e) => handleCompleteChange(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                >
                  <option value="">All</option>
                  <option value="true">✓</option>
                  <option value="false">✗</option>
                </select>
              </div>

              {/* Entity ID Filter */}
              <div>
                <label htmlFor="entityId" className="block text-xs font-medium text-gray-700 mb-1">
                  Entity ID
                </label>
                <input
                  type="text"
                  id="entityId"
                  placeholder="H000000007"
                  value={filters.entityId || ''}
                  onChange={(e) => handleEntityIdChange(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>

              {/* Treatment ID Filter */}
              <div>
                <label htmlFor="treatmentId" className="block text-xs font-medium text-gray-700 mb-1">
                  Treatment ID
                </label>
                <input
                  type="text"
                  id="treatmentId"
                  placeholder="Treatment..."
                  value={filters.treatmentId || ''}
                  onChange={(e) => handleTreatmentIdChange(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>

              {/* Date From */}
              <div>
                <label htmlFor="dateFrom" className="block text-xs font-medium text-gray-700 mb-1">
                  From
                </label>
                <input
                  type="date"
                  id="dateFrom"
                  value={filters.dateFrom || ''}
                  onChange={(e) => handleDateFromChange(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>

              {/* Date To */}
              <div>
                <label htmlFor="dateTo" className="block text-xs font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="date"
                  id="dateTo"
                  value={filters.dateTo || ''}
                  onChange={(e) => handleDateToChange(e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compact Results Summary */}
      {totalResults !== undefined && (
        <div className="mt-2 text-xs text-gray-600">
          {hasActiveFilters || hasSearchTerm ? (
            <>
              <span className="font-medium">{totalResults}</span> results
              {totalResults === 0 && (
                <span className="text-orange-600 ml-1">- try different filters</span>
              )}
            </>
          ) : (
            <>Showing all transactions</>
          )}
        </div>
      )}
    </div>
  );
};