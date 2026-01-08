/**
 * AWS Verified Permissions Types
 * 
 * Type definitions for the AWS Verified Permissions service integration
 */

export interface AuthorizationRequest {
  userId: string;
  logsId: string;
  action: TransactionLogsAction;
  context?: Record<string, any>;
}

export interface AuthorizationResponse {
  decision: 'ALLOW' | 'DENY';
  determining_policies?: Array<{ policyId: string }>;
  errors?: Array<{ errorDescription: string }>;
}

export interface TransactionLogsPermissionContext {
  generalAuthGroups?: string[];
  auditLogged?: boolean;
  timestamp?: string;
  userPermissions?: {
    generalAuthGroups?: string[];
    [key: string]: any;
  };
  userData?: {
    roles?: string[];
    [key: string]: any;
  };
}

export type EntityType = 'Person' | 'TransactionLogs';

export type TransactionLogsAction = 'view';

export interface VerifiedPermissionsConfig {
  policyStoreId: string;
  region: string;
}

export interface AuthorizationResult {
  decision: 'ALLOW' | 'DENY';
  determining_policies?: string[];
  errors?: string[];
}

export interface DetailedAuthorizationRequest {
  principal: {
    entityType: string;
    entityId: string;
  };
  action: {
    actionType: string;
    actionId: string;
  };
  resource: {
    entityType: string;
    entityId: string;
  };
  context?: Record<string, any>;
}

export interface TransactionLogAccessRequest {
  userId: string;
  logsId?: string;
  action?: TransactionLogsAction;
  context?: {
    userPermissions?: any;
    userData?: any;
    [key: string]: any;
  };
}

export interface TransactionLogAccessContext extends TransactionLogsPermissionContext {
  timestamp: string;
  requestSource: string;
  authenticatedPersonId: string;
  securityGroups?: string[];
  generalAuthGroups: string[];
  userPermissions?: any;
  userData?: any;
}