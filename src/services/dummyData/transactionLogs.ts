import { TransactionLog, TransactionStatus, TransactionAction, TransactionLogResponse } from "@/Types/transaction-log.types";

export interface SearchFilters {
  searchTerm?: string;
  status?: string;
  action?: string;
  dateFrom?: string;
  dateTo?: string;
  entityId?: string;
  treatmentId?: string;
  complete?: boolean;
}

/**
 * Generates dummy transaction log data based on DynamoDB structure
 */
export const generateDummyTransactionLogs = (count: number = 50): TransactionLog[] => {
  const logs: TransactionLog[] = [];
  const actions = Object.values(TransactionAction);
  const statuses = Object.values(TransactionStatus);
  
  for (let i = 0; i < count; i++) {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - Math.floor(Math.random() * 30)); // Last 30 days
    baseDate.setHours(Math.floor(Math.random() * 24));
    baseDate.setMinutes(Math.floor(Math.random() * 60));
    baseDate.setSeconds(Math.floor(Math.random() * 60));
    
    const entityId = `H${String(Math.floor(Math.random() * 999999999)).padStart(9, '0')}`;
    const timestamp = baseDate.toISOString().replace('T', ' ').slice(0, 19);
    const action = actions[Math.floor(Math.random() * actions.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const complete = status === TransactionStatus.COMPLETED;
    
    // Generate realistic treatment ID
    const treatmentId = `a${Math.random().toString(36).substr(2, 6)}b7-efb5-4050-9864-77${Math.random().toString(36).substr(2, 10)}`;
    
    // Generate AWS Step Function execution ARN
    const executionId = Math.random().toString(36).substr(2, 8);
    const transactionId = `arn:aws:states:us-east-1:285463978628:execution:sek-Human-Confirm:ef367201-e6be-4b79-8f91-deb560683${executionId}`;
    
    // Generate realistic message body based on action
    let messageBody = "";
    switch (action) {
      case TransactionAction.TR_QC_HITL:
        messageBody = complete ? "Human confirmation completed successfully" : "";
        break;
      case TransactionAction.CREATE_RECORD:
        messageBody = `Creating new medical record for ${entityId}`;
        break;
      case TransactionAction.UPDATE_RECORD:
        messageBody = `Updating existing medical record`;
        break;
      case TransactionAction.DELETE_RECORD:
        messageBody = `Deleting medical record`;
        break;
      case TransactionAction.APPLY_PROTOCOL:
        messageBody = `Applying treatment protocol`;
        break;
      case TransactionAction.VALIDATE_TREATMENT:
        messageBody = `Validating treatment data`;
        break;
      default:
        messageBody = "";
    }
    
    logs.push({
      Entity_ID: entityId,
      Timestamp: timestamp,
      Action: action,
      Complete: complete,
      Hisa_Treatment_ID: treatmentId,
      MessageBody: messageBody,
      Status: status,
      Transaction_ID: transactionId
    });
  }
  
  // Sort by timestamp descending (most recent first)
  return logs.sort((a, b) => new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime());
};

/**
 * Enhanced search utilities with startsWith and contains functionality
 */
const searchUtils = {
  /**
   * Check if text starts with search term (case-insensitive)
   */
  startsWith: (text: string, searchTerm: string): boolean => {
    return text.toLowerCase().startsWith(searchTerm.toLowerCase());
  },

  /**
   * Check if text contains search term (case-insensitive)
   */
  contains: (text: string, searchTerm: string): boolean => {
    return text.toLowerCase().includes(searchTerm.toLowerCase());
  },

  /**
   * Enhanced multi-field search with priority scoring
   */
  searchMultipleFields: (fields: string[], searchTerm: string): { matches: boolean; score: number } => {
    let score = 0;
    let matches = false;
    const term = searchTerm.toLowerCase();
    
    for (const field of fields) {
      const fieldLower = field.toLowerCase();
      
      // Exact match gets highest score
      if (fieldLower === term) {
        score += 100;
        matches = true;
      }
      // Starts with gets high score
      else if (fieldLower.startsWith(term)) {
        score += 50;
        matches = true;
      }
      // Contains gets lower score
      else if (fieldLower.includes(term)) {
        score += 10;
        matches = true;
      }
    }
    
    return { matches, score };
  }
};

/**
 * Filters transaction logs based on search criteria with enhanced search algorithms
 */
export const filterTransactionLogs = (logs: TransactionLog[], filters: SearchFilters): TransactionLog[] => {
  let filteredLogs = logs.filter(log => {
    // Global search term - searches across multiple fields with enhanced algorithm
    if (filters.searchTerm) {
      const searchableFields = [
        log.Entity_ID,
        log.Action,
        log.Status,
        log.Hisa_Treatment_ID,
        log.MessageBody || '',
        log.Transaction_ID
      ];
      
      const searchResult = searchUtils.searchMultipleFields(searchableFields, filters.searchTerm);
      if (!searchResult.matches) {
        return false;
      }
    }

    // Specific field filters with enhanced search
    if (filters.status && log.Status !== filters.status) {
      return false;
    }

    if (filters.action && log.Action !== filters.action) {
      return false;
    }

    // Enhanced Entity ID search - prioritize startsWith for ID-like searches
    if (filters.entityId) {
      const entityIdMatch = searchUtils.startsWith(log.Entity_ID, filters.entityId) || 
                           searchUtils.contains(log.Entity_ID, filters.entityId);
      if (!entityIdMatch) {
        return false;
      }
    }

    // Enhanced Treatment ID search - prioritize startsWith for ID-like searches
    if (filters.treatmentId) {
      const treatmentIdMatch = searchUtils.startsWith(log.Hisa_Treatment_ID, filters.treatmentId) || 
                              searchUtils.contains(log.Hisa_Treatment_ID, filters.treatmentId);
      if (!treatmentIdMatch) {
        return false;
      }
    }

    if (filters.complete !== undefined && log.Complete !== filters.complete) {
      return false;
    }

    // Date range filtering
    if (filters.dateFrom || filters.dateTo) {
      const logDate = new Date(log.Timestamp);
      
      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        if (logDate < fromDate) {
          return false;
        }
      }
      
      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999); // End of day
        if (logDate > toDate) {
          return false;
        }
      }
    }

    return true;
  });

  // If there's a search term, sort by relevance score
  if (filters.searchTerm) {
    filteredLogs = filteredLogs
      .map(log => {
        const searchableFields = [
          log.Entity_ID,
          log.Action,
          log.Status,
          log.Hisa_Treatment_ID,
          log.MessageBody || '',
          log.Transaction_ID
        ];
        const searchResult = searchUtils.searchMultipleFields(searchableFields, filters.searchTerm!);
        return { log, score: searchResult.score };
      })
      .sort((a, b) => b.score - a.score) // Sort by score descending
      .map(item => item.log);
  }

  return filteredLogs;
};

/**
 * Mock API response for transaction logs with pagination and search
 */
export const getMockTransactionLogs = (
  limit: number = 20, 
  nextToken?: string, 
  filters?: SearchFilters
): TransactionLogResponse => {
  let allLogs = generateDummyTransactionLogs(100);
  
  // Apply search filters if provided
  if (filters) {
    allLogs = filterTransactionLogs(allLogs, filters);
  }
  
  const startIndex = nextToken ? parseInt(nextToken) : 0;
  const endIndex = Math.min(startIndex + limit, allLogs.length);
  const items = allLogs.slice(startIndex, endIndex);
  
  return {
    items,
    nextToken: endIndex < allLogs.length ? endIndex.toString() : undefined,
    count: items.length,
    total: allLogs.length
  };
};

/**
 * Mock API response for paginated transaction logs
 */
export const getMockTransactionLogsPaginated = (
  page: number = 1, 
  pageSize: number = 20, 
  filters?: SearchFilters
): TransactionLogResponse & { totalPages: number; currentPage: number } => {
  let allLogs = generateDummyTransactionLogs(200); // Larger dataset for pagination demo
  
  // Apply search filters if provided
  if (filters) {
    allLogs = filterTransactionLogs(allLogs, filters);
  }
  
  const totalCount = allLogs.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const items = allLogs.slice(startIndex, endIndex);
  
  return {
    items,
    nextToken: endIndex < totalCount ? endIndex.toString() : undefined,
    count: items.length,
    total: totalCount,
    totalPages,
    currentPage: page
  };
};

/**
 * Sample data matching the exact structure from the DynamoDB screenshot
 */
export const sampleTransactionLog: TransactionLog = {
  Entity_ID: "H000000007",
  Timestamp: "2025-09-28 18:43:58",
  Action: "TR-QC-HITL",
  Complete: true,
  Hisa_Treatment_ID: "a36153b7-efb5-4050-9864-77cabef72705",
  MessageBody: "",
  Status: "Timed Out - Not confirmed",
  Transaction_ID: "arn:aws:states:us-east-1:285463978628:execution:sek-Human-Confirm:ef367201-e6be-4b79-8f91-deb560683801e"
};