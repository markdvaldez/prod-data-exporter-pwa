/**
 * AWS Verified Permissions Service with Caching
 * 
 * This service handles authorization using AWS Verified Permissions with Cedar policies.
 * Includes multi-layer caching to reduce AWS API calls and costs.
 * 
 * Debug Logging:
 * - Set NODE_ENV=development OR DEBUG_AVP=true to enable detailed logging
 * - Logs are prefixed with "[AVP Debug]" for easy filtering
 * 
 * Caching:
 * - Memory cache for fastest access (default 5 minutes TTL)
 * - LocalStorage fallback for persistence across sessions
 * - Smart invalidation based on user/resource/policy changes
 * - Cost tracking and optimization recommendations
 */

import {
  VerifiedPermissionsClient,
  IsAuthorizedCommand,
  IsAuthorizedCommandInput,
  IsAuthorizedCommandOutput,
  EntityIdentifier,
  AttributeValue
} from '@aws-sdk/client-verifiedpermissions';
import {
  AuthorizationRequest,
  AuthorizationResponse,
  TransactionLogsPermissionContext,
  EntityType,
  TransactionLogsAction,
  DetailedAuthorizationRequest,
  AuthorizationResult
} from '../../Types/verified-permissions';
import {
  getCacheManager,
  CacheKeyGenerator,
  CACHE_TTL_STRATEGIES,
  CACHE_INVALIDATION_PATTERNS
} from '../cache';

/**
 * Check if AWS Verified Permissions is properly configured
 */
function isAWSConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_AVP_POLICY_STORE_ID &&
    process.env.NEXT_PUBLIC_AWS_REGION
  );
}

/**
 * Debug logging utility for AWS Verified Permissions
 * Only logs in development or when DEBUG_AVP is enabled
 */
export function debugLog(message: string, data?: any): void {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_AVP === 'true') {
    if (data) {
      console.log(`[AVP Debug] ${message}`, data);
    } else {
      console.log(`[AVP Debug] ${message}`);
    }
  }
}

// AWS Verified Permissions client singleton
let verifiedPermissionsClient: VerifiedPermissionsClient | null = null;

function getVerifiedPermissionsClient(): VerifiedPermissionsClient {
  if (!verifiedPermissionsClient) {
    const region = process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1';
    const configuration = process.env.NEXT_PUBLIC_CONFIGURATION || process.env.CONFIGURATION || 'development';
    const useServiceRole = configuration !== 'development';
    
    debugLog('Initializing AWS Verified Permissions client', {
      region,
      configuration,
      environment: process.env.NODE_ENV,
      useServiceRole
    });

    // Use service role for all non-development environments (qa, staging, production)
    // Use access keys only for local development
    if (useServiceRole) {
      // Production/QA/Staging: Use IAM service role
      verifiedPermissionsClient = new VerifiedPermissionsClient({
        region
        // No credentials needed - uses IAM role
      });
    } else {
      // Development: Use access keys
      const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

      if (!accessKeyId || !secretAccessKey) {
        throw new Error('Development mode requires NEXT_PUBLIC_AWS_ACCESS_KEY_ID and NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY environment variables.');
      }

      debugLog('Using development credentials', {
        hasAccessKey: !!accessKeyId,
        hasSecretKey: !!secretAccessKey,
      });

      verifiedPermissionsClient = new VerifiedPermissionsClient({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        }
      });
    }
  }
  return verifiedPermissionsClient;
}

/**
 * Converts context object to AWS Verified Permissions AttributeValue format
 */
function convertContextToAttributeValues(context: Record<string, any>): Record<string, AttributeValue> {
  const contextAttributes: Record<string, AttributeValue> = {};

  try {
    Object.entries(context).forEach(([key, value]) => {
      // Skip undefined, null, or empty values
      if (value === undefined || value === null) {
        return;
      }

      if (typeof value === 'string') {
        contextAttributes[key] = { string: value };
      } else if (typeof value === 'number') {
        contextAttributes[key] = { long: value };
      } else if (typeof value === 'boolean') {
        contextAttributes[key] = { boolean: value };
      } else if (Array.isArray(value)) {
        // Filter out undefined/null values from arrays
        const validItems = value.filter(item => item !== undefined && item !== null);
        if (validItems.length > 0) {
          contextAttributes[key] = {
            set: validItems.map(item => {
              if (typeof item === 'string') return { string: item };
              if (typeof item === 'number') return { long: item };
              if (typeof item === 'boolean') return { boolean: item };
              return { string: String(item) };
            }) as AttributeValue[]
          };
        }
      } else {
        // Convert objects to JSON strings
        try {
          contextAttributes[key] = { string: JSON.stringify(value) };
        } catch (jsonError) {
          debugLog(`Failed to stringify context value for key: ${key}`, jsonError);
          contextAttributes[key] = { string: String(value) };
        }
      }
    });
  } catch (error) {
    debugLog('Error converting context to AttributeValues', error);
    throw new Error(`Context conversion failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  return contextAttributes;
}

/**
 * Development fallback when AWS Verified Permissions is not configured
 * This provides basic HisaStaff checking for development/testing
 */
function developmentFallback(
  request: AuthorizationRequest,
  additionalContext?: TransactionLogsPermissionContext
): AuthorizationResponse {
  debugLog('Using development fallback for authorization check', {
    reason: !isAWSConfigured() ? 'AWS not configured' : 'AWS service error',
    environment: process.env.NODE_ENV
  });

  const { context = {} } = request;
  const userPermissions = context.userPermissions;
  const userData = context.userData;

  // Check for HisaStaff access using the same logic as before
  const hasHisaStaff = checkHisaStaffInContext(userPermissions, userData);

  return {
    decision: hasHisaStaff ? 'ALLOW' : 'DENY',
    determining_policies: hasHisaStaff ? [{ policyId: 'development-hisa-staff-policy' }] : [],
    errors: hasHisaStaff ? [] : [{
      errorDescription: 'Development mode: User does not have HisaStaff access'
    }]
  };
}

/**
 * Helper function to check HisaStaff access in development mode
 */
function checkHisaStaffInContext(userPermissions: any, userData: any): boolean {
  // Check in generalAuthGroups from permissions
  if (userPermissions?.generalAuthGroups?.includes('HisaStaff')) {
    return true;
  }

  // Check in roles from user data
  if (userData?.roles?.includes('HisaStaff')) {
    return true;
  }

  // Additional checks for variations of the group name
  const hisaStaffVariations = ['HisaStaff', 'HISA_STAFF', 'hisa-staff', 'HisaStaffAccess'];

  const hasInAuthGroups = userPermissions?.generalAuthGroups?.some((group: string) =>
    hisaStaffVariations.includes(group)
  );

  const hasInRoles = userData?.roles?.some((role: string) =>
    hisaStaffVariations.includes(role)
  );

  return hasInAuthGroups || hasInRoles || false;
}

/**
 * Check authorization using AWS Verified Permissions with caching
 */
export async function checkAuthorization(
  request: AuthorizationRequest,
  additionalContext?: TransactionLogsPermissionContext
): Promise<AuthorizationResponse> {
  const startTime = Date.now();
  
  // Early check for AWS configuration
  if (!isAWSConfigured()) {
    debugLog('AWS Verified Permissions not properly configured - using development fallback');
    return developmentFallback(request, additionalContext);
  }

  // Initialize cache manager
  const cacheManager = getCacheManager();
  
  // Create context hash for cache key
  const mergedContext = {
    ...request.context,
    ...additionalContext,
    generalAuthGroups: request.context?.userPermissions?.generalAuthGroups || request.context?.generalAuthGroups || [],
    timestamp: new Date().toISOString(),
    requestSource: 'runners-qc-app',
    authenticatedPersonId: request.userId
  };
  
  const contextHash = CacheKeyGenerator.contextHash(mergedContext);
  const cacheKey = CacheKeyGenerator.permission(
    request.userId,
    request.logsId,
    request.action,
    contextHash
  );
  
  // Generate cache tags for invalidation
  const cacheTags = CacheKeyGenerator.tags(
    request.userId,
    request.logsId,
    request.action,
    ['permission', 'authorization']
  );

  try {
    // Try to get from cache first
    const cachedResult = await cacheManager.get<AuthorizationResponse>(cacheKey);
    
    if (cachedResult) {
      debugLog('Cache hit for authorization check', {
        userId: request.userId,
        logsId: request.logsId,
        action: request.action,
        cacheKey,
        cacheAge: Date.now() - cachedResult.createdAt,
        hitCount: cachedResult.hitCount
      });
      
      return cachedResult.data;
    }

    debugLog('Cache miss - calling AWS Verified Permissions', {
      userId: request.userId,
      logsId: request.logsId,
      action: request.action,
      cacheKey
    });

    // Cache miss - call AWS Verified Permissions
    const result = await callAWSVerifiedPermissions(request, mergedContext);
    
    // Determine cache TTL based on result and context
    const cacheTtl = determineCacheTTL(result, mergedContext);
    
    // Cache the result
    await cacheManager.set(cacheKey, result, {
      ttl: cacheTtl,
      tags: cacheTags
    });
    
    debugLog('Cached authorization result', {
      userId: request.userId,
      logsId: request.logsId,
      action: request.action,
      decision: result.decision,
      cacheTtl,
      responseTime: Date.now() - startTime
    });

    return result;
  } catch (error) {
    // Check if it's a configuration error vs service error
    const isConfigError = error instanceof Error && (
      error.message.includes('credentials') ||
      error.message.includes('POLICY_STORE_ID') ||
      error.message.includes('region')
    );

    console.error('AWS Verified Permissions Error:', {
      type: isConfigError ? 'Configuration Error' : 'Service Error',
      error: error instanceof Error ? error.message : String(error),
      userId: request.userId,
      logsId: request.logsId,
      action: request.action,
      responseTime: Date.now() - startTime
    });

    // Use development fallback only for local development or when AWS is not configured
    const configuration = process.env.NEXT_PUBLIC_CONFIGURATION || process.env.CONFIGURATION || 'development';
    if (configuration === 'development' || isConfigError) {
      debugLog('Using development fallback due to AWS service error');
      return developmentFallback(request, additionalContext);
    }

    // Return a DENY decision instead of throwing to prevent app crashes
    return {
      decision: 'DENY',
      errors: [{
        errorDescription: isConfigError
          ? `Configuration error: ${error instanceof Error ? error.message : 'Unknown configuration error'}`
          : `AWS Verified Permissions service error: ${error instanceof Error ? error.message : 'Unknown error'}`
      }]
    };
  }
}

/**
 * Internal function to call AWS Verified Permissions (extracted for caching)
 */
async function callAWSVerifiedPermissions(
  request: AuthorizationRequest,
  mergedContext: Record<string, any>
): Promise<AuthorizationResponse> {
  const client = getVerifiedPermissionsClient();
  const policyStoreId = process.env.NEXT_PUBLIC_AVP_POLICY_STORE_ID!;

  debugLog('Starting AWS authorization check', {
    userId: request.userId,
    logsId: request.logsId,
    action: request.action,
    policyStoreId: policyStoreId.substring(0, 8) + '...'
  });

  const { userId, logsId, action } = request;

  // Define the principal (person) with proper namespace
  const principal: EntityIdentifier = {
    entityType: 'LongLivedTransactionsViewer::Person',
    entityId: userId
  };

  // Define the resource (transaction logs) with proper namespace
  const resource: EntityIdentifier = {
    entityType: 'LongLivedTransactionsViewer::TransactionLogs',
    entityId: logsId
  };

  // Convert context to AttributeValue format
  const contextAttributes = convertContextToAttributeValues(mergedContext);

  debugLog('Context conversion', {
    originalContextKeys: Object.keys(mergedContext),
    convertedContextKeys: Object.keys(contextAttributes),
    generalAuthGroups: mergedContext.generalAuthGroups
  });

  // Prepare the IsAuthorized command input
  const commandInput: IsAuthorizedCommandInput = {
    policyStoreId,
    principal,
    action: {
      actionType: 'LongLivedTransactionsViewer::Action',
      actionId: action
    },
    resource,
    context: {
      contextMap: contextAttributes
    }
  };

  debugLog('Command Input', {
    policyStoreId: policyStoreId.substring(0, 8) + '...',
    principal,
    action: { actionType: 'LongLivedTransactionsViewer::Action', actionId: action },
    resource,
    contextKeys: Object.keys(contextAttributes),
    generalAuthGroups: mergedContext.generalAuthGroups
  });

  // Execute the authorization check
  const command = new IsAuthorizedCommand(commandInput);

  debugLog('Sending command to AWS Verified Permissions...');
  const response: IsAuthorizedCommandOutput = await client.send(command);
  
  debugLog('Received AWS response', {
    decision: response.decision,
    determiningPoliciesCount: response.determiningPolicies?.length || 0,
    errorsCount: response.errors?.length || 0
  });

  return {
    decision: response.decision!,
    determining_policies: response.determiningPolicies?.map(policy => ({
      policyId: policy.policyId!
    })),
    errors: response.errors?.map(error => ({
      errorDescription: error.errorDescription!
    }))
  };
}

/**
 * Determine appropriate cache TTL based on authorization result and context
 */
function determineCacheTTL(
  result: AuthorizationResponse,
  context: Record<string, any>
): number {
  // DENY results can be cached longer since they're less likely to change quickly
  if (result.decision === 'DENY') {
    return CACHE_TTL_STRATEGIES.STABLE; // 30 minutes
  }

  // ALLOW results with specific policies can be cached for standard time
  if (result.determining_policies && result.determining_policies.length > 0) {
    return CACHE_TTL_STRATEGIES.STANDARD; // 5 minutes
  }

  // General ALLOW results get shorter cache time
  return CACHE_TTL_STRATEGIES.CRITICAL; // 1 minute
}

/**
 * Invalidate cache for user permissions
 */
export async function invalidateUserPermissions(userId: string): Promise<void> {
  const cacheManager = getCacheManager();
  const userTags = CACHE_INVALIDATION_PATTERNS.USER(userId);
  
  debugLog('Invalidating user permissions cache', { userId, tags: userTags });
  
  const invalidatedCount = await cacheManager.invalidateByTags(userTags);
  
  debugLog('Cache invalidation completed', { userId, invalidatedCount });
}

/**
 * Invalidate cache for resource permissions
 */
export async function invalidateResourcePermissions(resourceId: string): Promise<void> {
  const cacheManager = getCacheManager();
  const resourceTags = CACHE_INVALIDATION_PATTERNS.RESOURCE(resourceId);
  
  debugLog('Invalidating resource permissions cache', { resourceId, tags: resourceTags });
  
  const invalidatedCount = await cacheManager.invalidateByTags(resourceTags);
  
  debugLog('Cache invalidation completed', { resourceId, invalidatedCount });
}

/**
 * Invalidate all policy-related cache (when policies change)
 */
export async function invalidatePolicyCache(): Promise<void> {
  const cacheManager = getCacheManager();
  const policyTags = CACHE_INVALIDATION_PATTERNS.POLICY();
  
  debugLog('Invalidating policy cache', { tags: policyTags });
  
  const invalidatedCount = await cacheManager.invalidateByTags(policyTags);
  
  debugLog('Policy cache invalidation completed', { invalidatedCount });
}

/**
 * Get cache statistics for monitoring
 */
export async function getCacheStatistics(): Promise<{
  stats: any;
  metrics: any;
  health: any;
}> {
  const cacheManager = getCacheManager();
  const stats = await cacheManager.getStats();
  const metrics = cacheManager.getMetrics();
  
  // Import CacheMonitor here to avoid circular dependencies
  const { CacheMonitor } = await import('../cache/config');
  const monitor = new CacheMonitor(cacheManager);
  const health = await monitor.getHealthStatus();
  
  return { stats, metrics, health };
}

/**
 * Batch authorization check for multiple resources/actions
 */
export async function checkBatchAuthorization(
  requests: AuthorizationRequest[],
  additionalContext?: TransactionLogsPermissionContext
): Promise<AuthorizationResponse[]> {
  // For now, we'll execute them sequentially
  // AWS Verified Permissions doesn't have a native batch API yet
  const results: AuthorizationResponse[] = [];

  for (const request of requests) {
    try {
      const result = await checkAuthorization(request, additionalContext);
      results.push(result);
    } catch (error) {
      // Continue with other requests even if one fails
      results.push({
        decision: 'DENY',
        errors: [{
          errorDescription: `Failed to check authorization: ${error instanceof Error ? error.message : 'Unknown error'}`
        }]
      });
    }
  }

  return results;
}

/**
 * Helper function to check if a user can perform a specific action on transaction logs
 */
export async function canUserPerformAction(
  userId: string,
  logsId: string,
  action: TransactionLogsAction,
  context?: TransactionLogsPermissionContext
): Promise<boolean> {
  try {
    const result = await checkAuthorization({
      userId,
      logsId,
      action,
      context
    });

    return result.decision === 'ALLOW';
  } catch (error) {
    console.error('Error checking user permission:', error);
    return false; // Deny by default on error
  }
}

/**
 * Legacy service class interface for backward compatibility
 */
export class VerifiedPermissionsService {
  /**
   * Check if a person has access to the application
   */
  async checkApplicationAccess(personId: string): Promise<boolean> {
    return canUserPerformAction(personId, 'system-check', 'view');
  }

  /**
   * Check if a person can perform a specific action on transaction logs
   */
  async checkTransactionLogsAccess(
    personId: string, 
    logsId: string, 
    action: TransactionLogsAction = 'view'
  ): Promise<boolean> {
    return canUserPerformAction(personId, logsId, action);
  }

  /**
   * Check if a person can view transaction logs with context
   */
  async checkTransactionLogsAccessWithContext(
    personId: string,
    logsId: string,
    context: TransactionLogsPermissionContext
  ): Promise<boolean> {
    return canUserPerformAction(personId, logsId, 'view', context);
  }

  /**
   * Evaluate if a principal is authorized to perform an action on a resource
   */
  async isAuthorized(request: DetailedAuthorizationRequest): Promise<AuthorizationResult> {
    const response = await checkAuthorization({
      userId: request.principal.entityId,
      logsId: request.resource.entityId,
      action: 'view' as TransactionLogsAction,
      context: request.context
    });

    return {
      decision: response.decision,
      determining_policies: response.determining_policies?.map(p => p.policyId) || [],
      errors: response.errors?.map(e => e.errorDescription) || []
    };
  }

  /**
   * Batch check multiple permissions for performance
   */
  async checkMultiplePermissions(requests: DetailedAuthorizationRequest[]): Promise<AuthorizationResult[]> {
    const authRequests: AuthorizationRequest[] = requests.map(req => ({
      userId: req.principal.entityId,
      logsId: req.resource.entityId,
      action: 'view' as TransactionLogsAction,
      context: req.context
    }));

    const responses = await checkBatchAuthorization(authRequests);
    
    return responses.map(response => ({
      decision: response.decision,
      determining_policies: response.determining_policies?.map(p => p.policyId) || [],
      errors: response.errors?.map(e => e.errorDescription) || []
    }));
  }
}

// Singleton instance
let verifiedPermissionsService: VerifiedPermissionsService | null = null;

/**
 * Get the singleton instance of VerifiedPermissionsService
 */
export const getVerifiedPermissionsService = (): VerifiedPermissionsService => {
  if (!verifiedPermissionsService) {
    verifiedPermissionsService = new VerifiedPermissionsService();
  }
  return verifiedPermissionsService;
};

export default VerifiedPermissionsService;