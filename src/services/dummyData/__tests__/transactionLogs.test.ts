import { generateDummyTransactionLogs, getMockTransactionLogs, sampleTransactionLog } from '../transactionLogs';
import { TransactionStatus, TransactionAction } from '@/Types/transaction-log.types';

describe('Transaction Logs Dummy Data', () => {
  describe('generateDummyTransactionLogs', () => {
    it('should generate the correct number of logs', () => {
      const logs = generateDummyTransactionLogs(10);
      expect(logs).toHaveLength(10);
    });

    it('should generate logs with all required fields', () => {
      const logs = generateDummyTransactionLogs(5);
      logs.forEach(log => {
        expect(log).toHaveProperty('Entity_ID');
        expect(log).toHaveProperty('Timestamp');
        expect(log).toHaveProperty('Action');
        expect(log).toHaveProperty('Complete');
        expect(log).toHaveProperty('Hisa_Treatment_ID');
        expect(log).toHaveProperty('MessageBody');
        expect(log).toHaveProperty('Status');
        expect(log).toHaveProperty('Transaction_ID');
      });
    });

    it('should generate logs with valid entity IDs', () => {
      const logs = generateDummyTransactionLogs(5);
      logs.forEach(log => {
        expect(log.Entity_ID).toMatch(/^H\d{9}$/);
      });
    });

    it('should generate logs with valid timestamps', () => {
      const logs = generateDummyTransactionLogs(5);
      logs.forEach(log => {
        expect(log.Timestamp).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
        const date = new Date(log.Timestamp);
        expect(date).toBeInstanceOf(Date);
        expect(date.getTime()).not.toBeNaN();
      });
    });

    it('should generate logs with valid actions and statuses', () => {
      const logs = generateDummyTransactionLogs(10);
      const validActions = Object.values(TransactionAction);
      const validStatuses = Object.values(TransactionStatus);
      
      logs.forEach(log => {
        expect(validActions).toContain(log.Action);
        expect(validStatuses).toContain(log.Status);
        expect(typeof log.Complete).toBe('boolean');
      });
    });

    it('should sort logs by timestamp descending', () => {
      const logs = generateDummyTransactionLogs(10);
      for (let i = 0; i < logs.length - 1; i++) {
        const currentTime = new Date(logs[i].Timestamp).getTime();
        const nextTime = new Date(logs[i + 1].Timestamp).getTime();
        expect(currentTime).toBeGreaterThanOrEqual(nextTime);
      }
    });
  });

  describe('getMockTransactionLogs', () => {
    it('should return paginated results', () => {
      const response = getMockTransactionLogs(5);
      expect(response.items).toHaveLength(5);
      expect(response.count).toBe(5);
      expect(response.nextToken).toBeDefined();
    });

    it('should handle pagination with nextToken', () => {
      const firstPage = getMockTransactionLogs(10);
      const secondPage = getMockTransactionLogs(10, firstPage.nextToken);
      
      expect(firstPage.items).toHaveLength(10);
      expect(secondPage.items).toHaveLength(10);
      expect(firstPage.nextToken).toBeDefined();
    });

    it('should return no nextToken when reaching the end', () => {
      const response = getMockTransactionLogs(200); // More than available
      expect(response.nextToken).toBeUndefined();
    });
  });

  describe('sampleTransactionLog', () => {
    it('should match the exact structure from DynamoDB', () => {
      expect(sampleTransactionLog).toEqual({
        Entity_ID: "H000000007",
        Timestamp: "2025-09-28 18:43:58",
        Action: "TR-QC-HITL",
        Complete: true,
        Hisa_Treatment_ID: "a36153b7-efb5-4050-9864-77cabef72705",
        MessageBody: "",
        Status: "Timed Out - Not confirmed",
        Transaction_ID: "arn:aws:states:us-east-1:285463978628:execution:sek-Human-Confirm:ef367201-e6be-4b79-8f91-deb560683801e"
      });
    });
  });
});