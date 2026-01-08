export interface TransactionLog {
  Entity_ID: string;  // Partition key
  Timestamp: string;  // Sort key
  Action: string;
  Complete: boolean;
  Hisa_Treatment_ID: string;
  MessageBody: string;
  Status: string;
  Transaction_ID: string;
}

export interface TransactionLogResponse {
  items: TransactionLog[];
  nextToken?: string;
  count: number;
  total?: number;
  // Additional fields for pagination support
  totalCount?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export enum TransactionStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress", 
  COMPLETED = "Completed",
  FAILED = "Failed",
  TIMED_OUT = "Timed Out - Not confirmed",
  CANCELLED = "Cancelled"
}

export enum TransactionAction {
  TR_QC_HITL = "TR-QC-HITL",
  CREATE_RECORD = "CREATE_RECORD",
  UPDATE_RECORD = "UPDATE_RECORD", 
  DELETE_RECORD = "DELETE_RECORD",
  APPLY_PROTOCOL = "APPLY_PROTOCOL",
  VALIDATE_TREATMENT = "VALIDATE_TREATMENT"
}