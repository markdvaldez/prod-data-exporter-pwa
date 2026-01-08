/**
 * Transaction Log Access API Client
 * 
 * Utility functions for calling the transaction log access API
 */

import { 
  TransactionLogAccessRequest, 
  AuthorizationResponse 
} from "@/Types/verified-permissions";

export interface ApiTransactionLogAccessResponse extends AuthorizationResponse {
  error?: string;
  message?: string;
  details?: string;
}

/**
 * Check if a user has permission to access transaction logs via the API
 */
export async function checkTransactionLogAccessAPI(
  request: TransactionLogAccessRequest
): Promise<ApiTransactionLogAccessResponse> {
  try {
    const response = await fetch('/api/avp/transaction-log-access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Transaction log access API error:', result);
      return {
        decision: 'DENY',
        errors: [{ errorDescription: result.message || 'API request failed' }],
        error: result.error,
        message: result.message,
        details: result.details,
      };
    }

    return result;
  } catch (error) {
    console.error('Failed to call transaction log access API:', error);
    return {
      decision: 'DENY',
      errors: [{ errorDescription: 'Failed to check permissions' }],
      error: 'Network Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get API endpoint information
 */
export async function getTransactionLogAccessInfo(): Promise<any> {
  try {
    const response = await fetch('/api/avp/transaction-log-access', {
      method: 'GET',
    });

    if (response.ok) {
      return await response.json();
    }

    return null;
  } catch (error) {
    console.error('Failed to get API info:', error);
    return null;
  }
}