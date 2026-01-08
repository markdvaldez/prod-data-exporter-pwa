# Transaction Logs Dummy Data

This module provides dummy data generation for the Runners QC App (formerly Long-Lived Transactions Viewer), specifically for DynamoDB transaction log records.

## Overview

The transaction logs track long-running operations in the veterinary medical system, particularly those involving human confirmation steps, medical record operations, and treatment protocols.

## Data Structure

Based on the DynamoDB table structure, each transaction log record contains:

```typescript
interface TransactionLog {
  Entity_ID: string;        // Partition key (format: H000000001-H999999999)
  Timestamp: string;        // Sort key (format: YYYY-MM-DD HH:mm:ss)
  Action: string;           // Operation type (TR-QC-HITL, CREATE_RECORD, etc.)
  Complete: boolean;        // Whether the transaction completed successfully
  Hisa_Treatment_ID: string; // UUID for the treatment record
  MessageBody: string;      // Optional descriptive message
  Status: string;           // Current status (Pending, Completed, Failed, etc.)
  Transaction_ID: string;   // AWS Step Function execution ARN
}
```

## Available Actions

- **TR-QC-HITL**: Treatment Quality Control - Human In The Loop
- **CREATE_RECORD**: Creating new medical records
- **UPDATE_RECORD**: Updating existing medical records
- **DELETE_RECORD**: Deleting medical records
- **APPLY_PROTOCOL**: Applying treatment protocols
- **VALIDATE_TREATMENT**: Validating treatment data

## Available Statuses

- **Pending**: Transaction initiated but not yet processing
- **In Progress**: Currently being processed
- **Completed**: Successfully finished
- **Failed**: Processing failed
- **Timed Out - Not confirmed**: Human confirmation step timed out
- **Cancelled**: Transaction was cancelled

## API Functions

### `generateDummyTransactionLogs(count: number): TransactionLog[]`

Generates an array of realistic transaction log entries with:
- Random entity IDs in the format H000000001-H999999999
- Timestamps distributed across the last 30 days
- Realistic action/status combinations
- AWS Step Function execution ARNs
- Contextual message bodies based on action type

**Example:**
```typescript
const logs = generateDummyTransactionLogs(50);
console.log(logs.length); // 50
```

### `getMockTransactionLogs(limit: number, nextToken?: string): TransactionLogResponse`

Provides paginated mock API responses with:
- Configurable page size
- Pagination tokens for loading more data
- Realistic response structure matching API expectations

**Example:**
```typescript
const response = getMockTransactionLogs(20);
console.log(response.items.length);    // 20
console.log(response.nextToken);       // "20" (for next page)
console.log(response.count);           // 20

// Load next page
const nextResponse = getMockTransactionLogs(20, response.nextToken);
```

### `sampleTransactionLog: TransactionLog`

A single sample record that matches the exact structure from the DynamoDB screenshot provided, useful for testing and reference.

## Usage in Components

The `TransactionLogsContainer` demonstrates how to use this dummy data:

```typescript
import { getMockTransactionLogs } from '@/services/dummyData/transactionLogs';

// Load initial data
const response = getMockTransactionLogs(20);
setLogs(response.items);

// Load more data
const nextResponse = getMockTransactionLogs(20, response.nextToken);
setLogs(prev => [...prev, ...nextResponse.items]);
```

## Data Characteristics

- **Entity IDs**: Horse identifiers in format H000000001-H999999999
- **Timestamps**: Distributed across last 30 days, sorted descending (newest first)
- **Treatment IDs**: Realistic UUIDs in format a######-####-####-####-############
- **Transaction IDs**: AWS Step Function ARNs with realistic structure
- **Status Distribution**: Weighted towards completed transactions with realistic failure rates
- **Message Bodies**: Contextual descriptions based on action type

## Testing

The module includes comprehensive tests covering:
- Data generation with correct counts and formats
- Pagination behavior
- Field validation and structure
- Timestamp sorting
- Sample data accuracy

Run tests with:
```bash
npm test -- src/services/dummyData/__tests__/transactionLogs.test.ts
```

## Integration

The dummy data integrates with:
- **Redux state management**: Can be used in sagas for mock API calls
- **TanStack Query**: Compatible with query hooks for caching and pagination
- **UI components**: Provides realistic data for development and testing
- **Offline scenarios**: Can be persisted for offline functionality testing

## Future Enhancements

- Add filtering options (by status, action, date range)
- Include error scenarios and edge cases
- Add data relationships (linking related transactions)
- Implement search functionality across transaction data
- Add performance metrics and timing data