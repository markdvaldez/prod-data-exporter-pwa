import { TransactionLog, TransactionAction, TransactionStatus } from '@/Types/transaction-log.types';
import { filterTransactionLogs, SearchFilters } from '../transactionLogs';

// Sample test data
const testLogs: TransactionLog[] = [
  {
    Entity_ID: "H742746595",
    Timestamp: "2025-10-28 7:48:28",
    Action: TransactionAction.CREATE_RECORD,
    Complete: false,
    Hisa_Treatment_ID: "a92bwa3b7-efb5-4050-9864-77b5x",
    MessageBody: "Creating new record",
    Status: TransactionStatus.IN_PROGRESS,
    Transaction_ID: "arn:aws:states:001"
  },
  {
    Entity_ID: "H508865689",
    Timestamp: "2025-10-28 3:53:39",
    Action: TransactionAction.UPDATE_RECORD,
    Complete: false,
    Hisa_Treatment_ID: "a3d18byb7-efb5-4050-9864-77sd01",
    MessageBody: "Updating existing record",
    Status: TransactionStatus.TIMED_OUT,
    Transaction_ID: "arn:aws:states:002"
  },
  {
    Entity_ID: "H090122709",
    Timestamp: "2025-10-28 3:37:38",
    Action: TransactionAction.TR_QC_HITL,
    Complete: false,
    Hisa_Treatment_ID: "auxdsymb7-efb5-4050-9864-77r4ye",
    MessageBody: "",
    Status: TransactionStatus.FAILED,
    Transaction_ID: "arn:aws:states:003"
  }
];

describe('Enhanced Transaction Logs Search', () => {
  describe('startsWith functionality', () => {
    it('should prioritize results that start with search term', () => {
      const filters: SearchFilters = { entityId: 'H742' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].Entity_ID).toBe('H742746595');
    });

    it('should find entity IDs starting with partial match', () => {
      const filters: SearchFilters = { entityId: 'H50' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].Entity_ID).toBe('H508865689');
    });

    it('should find treatment IDs starting with search term', () => {
      const filters: SearchFilters = { treatmentId: 'a92b' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].Hisa_Treatment_ID).toBe('a92bwa3b7-efb5-4050-9864-77b5x');
    });
  });

  describe('contains functionality', () => {
    it('should find records containing search term anywhere in field', () => {
      const filters: SearchFilters = { entityId: '865' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].Entity_ID).toBe('H508865689');
    });

    it('should find treatment IDs containing search term', () => {
      const filters: SearchFilters = { treatmentId: 'efb5-4050' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(3); // All treatment IDs contain this pattern
    });

    it('should search message body with contains', () => {
      const filters: SearchFilters = { searchTerm: 'existing' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].MessageBody).toContain('existing');
    });
  });

  describe('global search with relevance scoring', () => {
    it('should prioritize exact matches', () => {
      const filters: SearchFilters = { searchTerm: 'H742746595' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].Entity_ID).toBe('H742746595');
    });

    it('should prioritize startsWith matches over contains', () => {
      const filters: SearchFilters = { searchTerm: 'CREATE' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results.length).toBeGreaterThan(0);
      // The first result should be the one with CREATE_RECORD action (startsWith priority)
      expect(results[0].Action).toBe(TransactionAction.CREATE_RECORD);
    });

    it('should find partial matches across multiple fields', () => {
      const filters: SearchFilters = { searchTerm: 'record' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results.length).toBeGreaterThan(0);
      // Should find logs with "record" in action or message
    });
  });

  describe('case insensitive search', () => {
    it('should handle mixed case entity ID search', () => {
      const filters: SearchFilters = { entityId: 'h742' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].Entity_ID).toBe('H742746595');
    });

    it('should handle mixed case global search', () => {
      const filters: SearchFilters = { searchTerm: 'create_record' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results.length).toBeGreaterThan(0);
    });

    it('should handle uppercase search terms', () => {
      const filters: SearchFilters = { searchTerm: 'FAILED' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].Status).toBe(TransactionStatus.FAILED);
    });
  });

  describe('combined filters', () => {
    it('should apply both entity ID and action filters', () => {
      const filters: SearchFilters = { 
        entityId: 'H742',
        action: TransactionAction.CREATE_RECORD 
      };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(1);
      expect(results[0].Entity_ID).toBe('H742746595');
      expect(results[0].Action).toBe(TransactionAction.CREATE_RECORD);
    });

    it('should return empty array when no matches found', () => {
      const filters: SearchFilters = { 
        entityId: 'H999',
        action: TransactionAction.CREATE_RECORD 
      };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty search term', () => {
      const filters: SearchFilters = { searchTerm: '' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results).toHaveLength(3); // Should return all logs
    });

    it('should handle undefined message body', () => {
      const logsWithNullMessage = [
        { ...testLogs[0], MessageBody: undefined as any }
      ];
      const filters: SearchFilters = { searchTerm: 'test' };
      
      expect(() => {
        filterTransactionLogs(logsWithNullMessage, filters);
      }).not.toThrow();
    });

    it('should handle special characters in search', () => {
      const filters: SearchFilters = { treatmentId: 'efb5-4050' };
      const results = filterTransactionLogs(testLogs, filters);
      
      expect(results.length).toBeGreaterThan(0);
    });
  });
});