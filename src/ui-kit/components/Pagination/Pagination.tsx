import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  pageSize: number;
  loading?: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalResults,
  pageSize,
  loading = false,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
  showPageSizeSelector = true,
  className = ''
}) => {

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = isMobile ? 7 : 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 2) pages.push("...");

    let middleStart = Math.max(2, currentPage - Math.floor(maxVisible / 2));
    let middleEnd = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2));

    // Clamp to avoid breaking near edges
    if (middleStart <= 2) middleStart = 2;
    if (middleEnd >= totalPages - 1) middleEnd = totalPages - 1;

    for (let i = middleStart; i <= middleEnd; i++) {
      pages.push(i);
    }

    if (middleEnd < totalPages - 1) pages.push("...");

    // Always show last page
    pages.push(totalPages);

    return pages;
  };

  const startItem = ((currentPage - 1) * pageSize) + 1;
  const endItem = Math.min(currentPage * pageSize, totalResults);

  // Show page navigation controls only when there are multiple pages
  const showPageNavigation = totalPages > 1;

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-3 ${className}`}>
      {/* Results info and page size selector */}
      <div className="flex justify-between items-center text-sm text-gray-700 w-full sm:justify-start gap-4">
        <div>
          <span className="font-medium">{startItem} - {endItem} of {totalResults}</span>
        </div>
        
        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm">Show:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={loading}
              className="border border-gray-300 rounded-sm px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {pageSizeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className="text-sm">per page</span>
          </div>
        )}
      </div>

      {/* Pagination controls - only show when there are multiple pages */}
      {showPageNavigation && (
        <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="inline-flex items-center px-2 py-2 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Page numbers */}
        <div className="flex">
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                  ...
                </span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  disabled={loading}
                  className={`inline-flex items-center px-3 sm:px-5 py-2 text-sm font-medium border ${
                    currentPage === page
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  } focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || loading}
          className="inline-flex items-center px-2 py-2 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        </div>
      )}
    </div>
  );
};