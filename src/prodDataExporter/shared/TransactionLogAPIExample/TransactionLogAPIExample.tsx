/**
 * Example component showing how to use the Transaction Log Access API
 * 
 * This demonstrates calling the AWS Verified Permissions API route
 * instead of using the direct service implementation
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectHisaPersonId } from '@/services/store/modules/auth/selectors';
import { checkTransactionLogAccessAPI } from '@/services/api/transactionLogAccessApi';
import { ApiTransactionLogAccessResponse } from '@/services/api/transactionLogAccessApi';

interface TransactionLogAPIExampleProps {
  logsId?: string;
  userPermissions?: {
    generalAuthGroups?: string[];
    [key: string]: any;
  };
  userData?: {
    roles?: string[];
    [key: string]: any;
  };
}

export function TransactionLogAPIExample({
  logsId = 'example-log-123',
  userPermissions = { generalAuthGroups: ['HisaStaff'] },
  userData = { roles: ['staff'] },
}: TransactionLogAPIExampleProps) {
  const userId = useSelector(selectHisaPersonId);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiTransactionLogAccessResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkAccess = async () => {
    if (!userId) {
      setError('User ID not available');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await checkTransactionLogAccessAPI({
        userId,
        logsId,
        action: 'view',
        context: {
          userPermissions,
          userData,
        },
      });

      setResult(response);
      
      if (response.error) {
        setError(response.message || response.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const checkSystemAccess = async () => {
    if (!userId) {
      setError('User ID not available');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await checkTransactionLogAccessAPI({
        userId,
        // No logsId - will default to "system-check"
        context: {
          userPermissions,
          userData,
        },
      });

      setResult(response);
      
      if (response.error) {
        setError(response.message || response.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transaction-log-api-example">
      <h3>Transaction Log Access API Example</h3>
      
      <div className="user-info">
        <p><strong>User ID:</strong> {userId || 'Not available'}</p>
        <p><strong>Logs ID:</strong> {logsId}</p>
        <p><strong>Permissions:</strong> {userPermissions.generalAuthGroups?.join(', ') || 'None'}</p>
      </div>

      <div className="buttons">
        <button 
          onClick={checkAccess} 
          disabled={isLoading || !userId}
          className="check-button"
        >
          {isLoading ? 'Checking...' : 'Check Specific Log Access'}
        </button>
        
        <button 
          onClick={checkSystemAccess} 
          disabled={isLoading || !userId}
          className="check-button"
        >
          {isLoading ? 'Checking...' : 'Check System Access'}
        </button>
      </div>

      {error && (
        <div className="error">
          <h4>Error:</h4>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="result">
          <h4>API Response:</h4>
          
          <div className={`decision ${result.decision.toLowerCase()}`}>
            <strong>Decision:</strong> {result.decision}
          </div>
          
          {result.determining_policies && result.determining_policies.length > 0 && (
            <div className="policies">
              <strong>Determining Policies:</strong>
              <ul>
                {result.determining_policies.map((policy, index) => (
                  <li key={index}>
                    {typeof policy === 'string' ? policy : policy.policyId || 'Unknown Policy'}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {result.errors && result.errors.length > 0 && (
            <div className="errors">
              <strong>Errors:</strong>
              <ul>
                {result.errors.map((error, index) => (
                  <li key={index}>
                    {typeof error === 'string' ? error : error.errorDescription || 'Unknown Error'}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <details className="raw-response">
            <summary>Raw API Response</summary>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </details>
        </div>
      )}

      <style jsx>{`
        .transaction-log-api-example {
          max-width: 600px;
          margin: 20px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: sans-serif;
        }
        
        .user-info {
          background: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .buttons {
          margin: 20px 0;
          display: flex;
          gap: 10px;
        }
        
        .check-button {
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .check-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .error {
          background: #ffe6e6;
          border: 1px solid #ff9999;
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .result {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          padding: 15px;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .decision {
          padding: 8px;
          border-radius: 4px;
          margin: 10px 0;
          font-weight: bold;
        }
        
        .decision.allow {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        
        .decision.deny {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        
        .policies, .errors {
          margin: 10px 0;
        }
        
        .policies ul, .errors ul {
          margin: 5px 0 0 20px;
        }
        
        .raw-response {
          margin-top: 15px;
        }
        
        .raw-response pre {
          background: #f1f3f4;
          padding: 10px;
          border-radius: 4px;
          overflow: auto;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}