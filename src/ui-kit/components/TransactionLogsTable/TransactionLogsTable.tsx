import React from 'react';
import { useRouter } from 'next/navigation';
import { TransactionLog } from '@/Types/transaction-log.types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui-kit/components/Table';
import routes from '@/routes';

interface TransactionLogsTableProps {
  logs: TransactionLog[];
  loading?: boolean;
  emptyMessage?: string;
  onClearFilters?: () => void;
  showClearFilters?: boolean;
  className?: string;
}

export const TransactionLogsTable: React.FC<TransactionLogsTableProps> = ({
  logs,
  loading = false,
  emptyMessage = 'No transaction logs found.',
  onClearFilters,
  showClearFilters = false,
  className = ''
}) => {
  const router = useRouter();

  const handleRowClick = (log: TransactionLog) => {
    router.push(routes.TRANSACTION_LOG_DETAIL(log.Entity_ID, log.Timestamp));
  };

  // Helper function to check if entity ID is a horse ID and extract the horse ID
  const getHorseIdFromEntityId = (entityId: string): string | null => {
    if (entityId.startsWith('H-') || entityId.startsWith('H')) {
      // Remove dashes to get the original horse ID (e.g., "H-000-000-087" -> "H000000087")
      return entityId.replace(/-/g, '');
    }
    return null;
  };

  const handleEntityIdClick = (e: React.MouseEvent, entityId: string) => {
    e.stopPropagation(); // Prevent row click
    const horseId = getHorseIdFromEntityId(entityId);
    if (horseId) {
      router.push(routes.HORSE(horseId));
    }
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'in progress':
        return 'text-blue-600 bg-blue-50';
      case 'timed out - not confirmed':
        return 'text-orange-600 bg-orange-50';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (logs.length === 0 && !loading) {
    return (
      <div className={`w-full bg-white shadow-sm border-t border-gray-200 ${className}`}>
        <div className="px-4 py-24 sm:py-32 text-center min-h-[400px] flex flex-col justify-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">No transaction logs</h3>
          <p className="text-gray-500 text-sm sm:text-base mb-4">{emptyMessage}</p>
          {showClearFilters && onClearFilters && (
            <button
              onClick={onClearFilters}
              className="mx-auto inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear filters to see all transactions
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full bg-white shadow-sm border-t border-gray-200 ${className}`}>
      {/* Desktop Table View */}
      <div className={`hidden lg:block w-full overflow-x-auto ${logs.length >= 20 ? 'max-h-[50vh] overflow-y-auto border-b border-gray-200' : ''}`}>
        <Table>
          <TableHeader className={`bg-gray-50 ${logs.length >= 20 ? 'sticky top-0 z-10 shadow-sm' : ''}`}>
            <TableRow>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entity ID
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-8rem">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Complete
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Treatment ID
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payload
              </TableHead>
              <TableHead className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {logs.map((log, index) => (
              <TableRow 
                key={`${log.Entity_ID}-${log.Timestamp}-${index}`} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(log)}
              >
                <TableCell className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {getHorseIdFromEntityId(log.Entity_ID) ? (
                    <span
                      className="text-blue-600 hover:text-blue-800 underline cursor-pointer"
                      onClick={(e) => handleEntityIdClick(e, log.Entity_ID)}
                    >
                      {log.Entity_ID}
                    </span>
                  ) : (
                    log.Entity_ID
                  )}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-500">
                  {new Date(log.Timestamp).toLocaleString()}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-900">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {log.Action}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 text-sm max-w-8rem">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.Status)}`}>
                    {log.Status}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center vertical-align-middle">
                  <span className={`inline-flex items-center ${log.Complete ? 'text-green-600' : 'text-red-600'}`}>
                    {log.Complete ? '✓' : '✗'}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-500 font-mono break-all whitespace-normal">
                  {log.Hisa_Treatment_ID}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-500 max-w-md truncate">
                  {log.MessageBody || '-'}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-gray-500">
                  <span className="text-blue-600 hover:text-blue-800 font-medium">
                    View Details →
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden w-full max-h-[75vh] overflow-y-auto overscroll-y-contain">
        <div className="divide-y divide-gray-200">
          {logs.map((log, index) => (
            <div 
              key={`${log.Entity_ID}-${log.Timestamp}-${index}`} 
              className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick(log)}
            >
              <div className="flex flex-col space-y-2">
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      {getHorseIdFromEntityId(log.Entity_ID) ? (
                        <span
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 underline cursor-pointer truncate"
                          onClick={(e) => handleEntityIdClick(e, log.Entity_ID)}
                        >
                          {log.Entity_ID}
                        </span>
                      ) : (
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {log.Entity_ID}
                        </span>
                      )}
                      <span className={`inline-flex items-center ${log.Complete ? 'text-green-600' : 'text-red-600'}`}>
                        {log.Complete ? '✓' : '✗'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 mt-0.5">
                      {new Date(log.Timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end space-y-0.5">
                    <span className="inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {log.Action}
                    </span>
                    <span className={`inline-flex px-1.5 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(log.Status)}`}>
                      {log.Status}
                    </span>
                  </div>
                </div>

                {/* Compact Info in single line format */}
                <div className="text-xs text-gray-600 space-y-1">
                  {log.Hisa_Treatment_ID && (
                    <div>
                      <span className="text-gray-500">Treatment: </span>
                      <span className="font-mono">{log.Hisa_Treatment_ID.substring(0, 20)}...</span>
                    </div>
                  )}
                  {log.Transaction_ID && (
                    <div>
                      <span className="text-gray-500">Transaction: </span>
                      <span className="font-mono">{log.Transaction_ID.substring(0, 20)}...</span>
                    </div>
                  )}
                  {log.MessageBody && log.MessageBody !== '-' && (
                    <div>
                      <span className="text-gray-500">Message: </span>
                      <span>{log.MessageBody.length > 40 ? `${log.MessageBody.substring(0, 40)}...` : log.MessageBody}</span>
                    </div>
                  )}
                </div>
                
                {/* Click indicator */}
                <div className="text-right mt-2">
                  <span className="text-blue-600 text-xs font-medium">
                    Tap for details →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};