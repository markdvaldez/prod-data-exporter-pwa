import { filterTransactionLogs, getMockTransactionLogs, SearchFilters } from '../transactionLogs';
import { TransactionStatus, TransactionAction, TransactionLog } from '@/Types/transaction-log.types';

// Sample test data
const sampleLogs: TransactionLog[] = [
  {
    Entity_ID: "H000000001",
    Timestamp: "2025-10-20 10:30:00",
    Action: "TR-QC-HITL",
    Complete: true,
    Hisa_Treatment_ID: "abc123-def4-5678-9abc-def123456789",
    MessageBody: "Human confirmation completed successfully",
    Status: "Completed",
    Transaction_ID: "arn:aws:states:us-east-1:test:execution:test1"
  },
  {
    Entity_ID: "H000000002",
    Timestamp: "2025-10-19 14:45:00",
    Action: "CREATE_RECORD",
    Complete: false,
    Hisa_Treatment_ID: "xyz789-ghi1-2345-6789-mno123456789",
    MessageBody: "Creating new medical record",
    Status: "Pending",
    Transaction_ID: "arn:aws:states:us-east-1:test:execution:test2"
  },
  {
    Entity_ID: "H000000003",
    Timestamp: "2025-10-18 09:15:00",
    Action: "UPDATE_RECORD",
    Complete: true,
    Hisa_Treatment_ID: "def456-ghi7-8901-2345-ghi789012345",
    MessageBody: "Updating existing medical record",
    Status: "Completed",
    Transaction_ID: "arn:aws:states:us-east-1:test:execution:test3"
  }
];

describe('Transaction Logs Search Functionality', () => {
  describe('filterTransactionLogs', () => {
    it('should return all logs when no filters are applied', () => {
      const filters: SearchFilters = {};
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(3);
    });

    it('should filter by global search term across multiple fields', () => {
      const filters: SearchFilters = { searchTerm: 'H000000001' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
      expect(result[0].Entity_ID).toBe('H000000001');
    });

    it('should filter by global search term in message body', () => {
      const filters: SearchFilters = { searchTerm: 'Human confirmation' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
      expect(result[0].Entity_ID).toBe('H000000001');
    });

    it('should filter by status', () => {
      const filters: SearchFilters = { status: 'Completed' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(2);
      expect(result.every(log => log.Status === 'Completed')).toBe(true);
    });

    it('should filter by action', () => {
      const filters: SearchFilters = { action: 'CREATE_RECORD' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
      expect(result[0].Action).toBe('CREATE_RECORD');
    });

    it('should filter by completion status', () => {
      const filters: SearchFilters = { complete: true };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(2);
      expect(result.every(log => log.Complete === true)).toBe(true);
    });

    it('should filter by entity ID partial match', () => {
      const filters: SearchFilters = { entityId: '000000002' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
      expect(result[0].Entity_ID).toBe('H000000002');
    });

    it('should filter by treatment ID partial match', () => {
      const filters: SearchFilters = { treatmentId: 'abc123' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
      expect(result[0].Hisa_Treatment_ID).toContain('abc123');
    });

    it('should filter by date range', () => {
      const filters: SearchFilters = { 
        dateFrom: '2025-10-19',
        dateTo: '2025-10-20'
      };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(2);
    });

    it('should filter by date from only', () => {
      const filters: SearchFilters = { dateFrom: '2025-10-19' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(2);
    });

    it('should filter by date to only', () => {
      const filters: SearchFilters = { dateTo: '2025-10-19' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(2);
    });

    it('should combine multiple filters (AND logic)', () => {
      const filters: SearchFilters = { 
        status: 'Completed',
        complete: true,
        searchTerm: 'medical'
      };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
      expect(result[0].Entity_ID).toBe('H000000003');
    });

    it('should return empty array when no matches found', () => {
      const filters: SearchFilters = { searchTerm: 'nonexistent' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(0);
    });

    it('should be case insensitive for search terms', () => {
      const filters: SearchFilters = { searchTerm: 'HUMAN CONFIRMATION' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
      expect(result[0].Entity_ID).toBe('H000000001');
    });

    it('should be case insensitive for entity ID search', () => {
      const filters: SearchFilters = { entityId: 'h000000001' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
    });

    it('should be case insensitive for treatment ID search', () => {
      const filters: SearchFilters = { treatmentId: 'ABC123' };
      const result = filterTransactionLogs(sampleLogs, filters);
      expect(result).toHaveLength(1);
    });
  });

  describe('getMockTransactionLogs with search', () => {
    it('should return filtered results when filters are provided', () => {
      const filters: SearchFilters = { status: 'Completed' };
      const response = getMockTransactionLogs(10, undefined, filters);
      
      expect(response.items.length).toBeGreaterThan(0);
      expect(response.items.every(log => log.Status === 'Completed')).toBe(true);
      expect(response.count).toBeGreaterThan(0);
    });

    it('should return unfiltered results when no filters provided', () => {
      const response = getMockTransactionLogs(10);
      expect(response.items.length).toBe(10);
      expect(response.count).toBe(10);
    });

    it('should handle pagination with search filters', () => {
      const filters: SearchFilters = { complete: true };
      const firstPage = getMockTransactionLogs(5, undefined, filters);
      
      if (firstPage.nextToken) {
        const secondPage = getMockTransactionLogs(5, firstPage.nextToken, filters);
        expect(secondPage.items.every(log => log.Complete === true)).toBe(true);
      }
    });

    it('should return empty results for non-matching filters', () => {
      const filters: SearchFilters = { searchTerm: 'nonexistent-search-term-12345' };
      const response = getMockTransactionLogs(10, undefined, filters);
      expect(response.items.length).toBe(0);
      expect(response.count).toBe(0);
    });
  });
});