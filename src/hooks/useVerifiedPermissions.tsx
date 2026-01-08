import React, { useState, useEffect, useCallback, useRef } from "react";
import { getVerifiedPermissionsService } from "@/services/aws/verifiedPermissions";
import { DetailedAuthorizationRequest, AuthorizationResult } from "@/Types/verified-permissions";
import { useSelector } from "react-redux";
import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import { 
  useUserCacheInvalidation, 
  useCacheManager,
  CacheInvalidationUtils 
} from "@/hooks/useCacheInvalidation";
import { getCacheManager, CacheKeyGenerator, CACHE_TTL_STRATEGIES } from "@/services/cache";

export interface UsePermissionOptions {
  /** Whether to automatically check permission on component mount */
  autoCheck?: boolean;
  /** Whether to refresh permission when dependencies change */
  refreshOnChange?: boolean;
  /** Custom cache TTL for this permission check */
  cacheTtl?: number;
  /** Whether to use cache for this permission check */
  useCache?: boolean;
  /** Additional cache tags for invalidation */
  cacheTagsExtra?: string[];
}

export interface UsePermissionResult {
  /** Whether the permission check is currently loading */
  isLoading: boolean;
  /** Whether the permission is granted */
  isAllowed: boolean;
  /** Whether the permission check failed */
  hasError: boolean;
  /** Error message if the check failed */
  error?: string;
  /** Function to manually trigger permission check */
  checkPermission: () => Promise<boolean>;
  /** Function to refresh the permission */
  refresh: () => Promise<void>;
  /** Cache statistics for this permission */
  cacheInfo?: {
    cacheHit: boolean;
    cacheKey?: string;
    lastCacheUpdate?: number;
  };
  /** Function to invalidate cache for this permission */
  invalidateCache: () => Promise<void>;
}

/**
 * Hook for checking permissions using AWS Verified Permissions with caching
 * 
 * @param request - The authorization request to check
 * @param options - Configuration options including cache settings
 * @returns Permission check result and control functions
 */
export function usePermission(
  request: DetailedAuthorizationRequest | null,
  options: UsePermissionOptions = {}
): UsePermissionResult {
  const { 
    autoCheck = true, 
    refreshOnChange = true,
    cacheTtl = CACHE_TTL_STRATEGIES.STANDARD,
    useCache = true,
    cacheTagsExtra = []
  } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<string>();
  const [cacheInfo, setCacheInfo] = useState<{
    cacheHit: boolean;
    cacheKey?: string;
    lastCacheUpdate?: number;
  }>();

  const userId = useSelector(selectHisaPersonId);
  const cacheManager = getCacheManager();
  const { invalidateUser } = useUserCacheInvalidation();
  
  // Use ref to track the current request to avoid stale closures
  const currentRequestRef = useRef<DetailedAuthorizationRequest | null>(request);
  currentRequestRef.current = request;

  const generateCacheKey = useCallback((): string | null => {
    if (!currentRequestRef.current || !userId) return null;
    
    const req = currentRequestRef.current;
    const contextHash = CacheKeyGenerator.contextHash(req.context || {});
    
    return CacheKeyGenerator.permission(
      req.principal.entityId,
      req.resource.entityId,
      req.action.actionId.replace(/"/g, ''), // Remove quotes from action ID
      contextHash
    );
  }, [userId]);

  const checkPermission = useCallback(async (): Promise<boolean> => {
    if (!currentRequestRef.current || !userId) {
      setIsAllowed(false);
      return false;
    }

    setIsLoading(true);
    setHasError(false);
    setError(undefined);

    const cacheKey = generateCacheKey();
    let cacheHit = false;

    try {
      // Try cache first if enabled
      if (useCache && cacheKey) {
        const cachedResult = await cacheManager.get<AuthorizationResult>(cacheKey);
        
        if (cachedResult) {
          cacheHit = true;
          const allowed = cachedResult.data.decision === 'ALLOW';
          setIsAllowed(allowed);
          
          setCacheInfo({
            cacheHit: true,
            cacheKey,
            lastCacheUpdate: cachedResult.createdAt
          });
          
          if (cachedResult.data.errors && cachedResult.data.errors.length > 0) {
            setError(cachedResult.data.errors.join(', '));
            setHasError(true);
          }
          
          return allowed;
        }
      }

      // Cache miss - call the service
      const verifiedPermissionsService = getVerifiedPermissionsService();
      const result: AuthorizationResult = await verifiedPermissionsService.isAuthorized(currentRequestRef.current);
      
      const allowed = result.decision === 'ALLOW';
      setIsAllowed(allowed);
      
      // Cache the result if caching is enabled
      if (useCache && cacheKey) {
        const cacheTags = CacheKeyGenerator.tags(
          currentRequestRef.current.principal.entityId,
          currentRequestRef.current.resource.entityId,
          currentRequestRef.current.action.actionId.replace(/"/g, ''),
          [...cacheTagsExtra, 'permission', 'react-hook']
        );

        await cacheManager.set(cacheKey, result, {
          ttl: cacheTtl,
          tags: cacheTags
        });
      }

      setCacheInfo({
        cacheHit: false,
        cacheKey: cacheKey || undefined,
        lastCacheUpdate: Date.now()
      });
      
      if (result.errors && result.errors.length > 0) {
        setError(result.errors.join(', '));
        setHasError(true);
      }
      
      return allowed;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Permission check failed';
      setError(errorMessage);
      setHasError(true);
      setIsAllowed(false);
      
      setCacheInfo({
        cacheHit: false,
        cacheKey: cacheKey || undefined
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [userId, generateCacheKey, useCache, cacheManager, cacheTtl, cacheTagsExtra]);

  const refresh = useCallback(async (): Promise<void> => {
    await checkPermission();
  }, [checkPermission]);

  const invalidateCache = useCallback(async (): Promise<void> => {
    if (!currentRequestRef.current || !userId) return;

    const cacheKey = generateCacheKey();
    if (cacheKey) {
      await cacheManager.delete(cacheKey);
      
      // Also invalidate related user permissions
      await invalidateUser(userId);
    }
  }, [userId, generateCacheKey, cacheManager, invalidateUser]);

  // Auto-check on mount and when dependencies change
  useEffect(() => {
    if (autoCheck && currentRequestRef.current && userId) {
      checkPermission();
    }
  }, [autoCheck, checkPermission, userId]);

  // Refresh when request changes if refreshOnChange is enabled
  useEffect(() => {
    if (refreshOnChange && currentRequestRef.current && userId) {
      checkPermission();
    }
  }, [refreshOnChange, request, userId, checkPermission]);

  return {
    isLoading,
    isAllowed,
    hasError,
    error,
    checkPermission,
    refresh,
    cacheInfo,
    invalidateCache,
  };
}

/**
 * Hook for checking application access permission with caching
 */
export function useApplicationAccess(options?: UsePermissionOptions): UsePermissionResult {
  const userId = useSelector(selectHisaPersonId);

  const request: DetailedAuthorizationRequest | null = userId ? {
    principal: {
      entityType: "LongLivedTransactionsViewer::Person",
      entityId: userId,
    },
    action: {
      actionType: "LongLivedTransactionsViewer::Action",
      actionId: "\"view\"",
    },
    resource: {
      entityType: "LongLivedTransactionsViewer::TransactionLogs",
      entityId: "system-check",
    },
  } : null;

  return usePermission(request, { 
    autoCheck: true, 
    refreshOnChange: true,
    cacheTtl: CACHE_TTL_STRATEGIES.STABLE, // Application access can be cached longer
    cacheTagsExtra: ['application-access', 'system-check'],
    ...options 
  });
}

/**
 * Hook for checking transaction logs permissions with caching
 */
export function useTransactionLogsPermission(
  logsId: string | null,
  action: 'view' = 'view',
  options?: UsePermissionOptions
): UsePermissionResult {
  const userId = useSelector(selectHisaPersonId);

  const request: DetailedAuthorizationRequest | null = userId && logsId ? {
    principal: {
      entityType: "LongLivedTransactionsViewer::Person",
      entityId: userId,
    },
    action: {
      actionType: "LongLivedTransactionsViewer::Action",
      actionId: `"${action}"`,
    },
    resource: {
      entityType: "LongLivedTransactionsViewer::TransactionLogs",
      entityId: logsId,
    },
  } : null;

  return usePermission(request, { 
    autoCheck: true, 
    refreshOnChange: true,
    cacheTtl: CACHE_TTL_STRATEGIES.STANDARD,
    cacheTagsExtra: ['transaction-logs', `logs:${logsId}`, `action:${action}`],
    ...options 
  });
}

/**
 * Hook for checking transaction logs access with context and caching
 */
export function useTransactionLogsWithContext(
  logsId: string | null,
  context: {
    generalAuthGroups?: string[];
    auditLogged?: boolean;
    timestamp?: string;
  },
  options?: UsePermissionOptions
): UsePermissionResult {
  const userId = useSelector(selectHisaPersonId);

  const request: DetailedAuthorizationRequest | null = userId && logsId ? {
    principal: {
      entityType: "LongLivedTransactionsViewer::Person",
      entityId: userId,
    },
    action: {
      actionType: "LongLivedTransactionsViewer::Action",
      actionId: "\"view\"",
    },
    resource: {
      entityType: "LongLivedTransactionsViewer::TransactionLogs",
      entityId: logsId,
    },
    context: {
      timestamp: new Date().toISOString(),
      authenticatedPersonId: userId,
      ...context,
    },
  } : null;

  return usePermission(request, { 
    autoCheck: true, 
    refreshOnChange: true,
    cacheTtl: CACHE_TTL_STRATEGIES.STANDARD,
    cacheTagsExtra: [
      'transaction-logs-context', 
      `logs:${logsId}`, 
      'with-context',
      ...(context.generalAuthGroups?.map(group => `group:${group}`) || [])
    ],
    ...options 
  });
}

/**
 * Hook for checking multiple permissions at once with caching
 */
export function useMultiplePermissions(
  requests: DetailedAuthorizationRequest[],
  options?: {
    cacheTtl?: number;
    useCache?: boolean;
    cacheTagsExtra?: string[];
  }
): {
  isLoading: boolean;
  results: AuthorizationResult[];
  hasError: boolean;
  error?: string;
  checkAll: () => Promise<AuthorizationResult[]>;
  cacheInfo: Array<{
    cacheHit: boolean;
    cacheKey?: string;
    lastCacheUpdate?: number;
  }>;
  invalidateAll: () => Promise<void>;
} {
  const {
    cacheTtl = CACHE_TTL_STRATEGIES.STANDARD,
    useCache = true,
    cacheTagsExtra = []
  } = options || {};

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AuthorizationResult[]>([]);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<string>();
  const [cacheInfo, setCacheInfo] = useState<Array<{
    cacheHit: boolean;
    cacheKey?: string;
    lastCacheUpdate?: number;
  }>>([]);

  const cacheManager = getCacheManager();

  const checkAll = useCallback(async (): Promise<AuthorizationResult[]> => {
    if (requests.length === 0) {
      setResults([]);
      setCacheInfo([]);
      return [];
    }

    setIsLoading(true);
    setHasError(false);
    setError(undefined);

    try {
      const batchResults: AuthorizationResult[] = [];
      const batchCacheInfo: Array<{
        cacheHit: boolean;
        cacheKey?: string;
        lastCacheUpdate?: number;
      }> = [];

      // Process requests individually to leverage caching
      for (const request of requests) {
        const contextHash = CacheKeyGenerator.contextHash(request.context || {});
        const cacheKey = CacheKeyGenerator.permission(
          request.principal.entityId,
          request.resource.entityId,
          request.action.actionId.replace(/"/g, ''),
          contextHash
        );

        let result: AuthorizationResult | undefined;
        let cacheHit = false;

        // Try cache first if enabled
        if (useCache) {
          const cachedResult = await cacheManager.get<AuthorizationResult>(cacheKey);
          
          if (cachedResult) {
            result = cachedResult.data;
            cacheHit = true;
            batchCacheInfo.push({
              cacheHit: true,
              cacheKey,
              lastCacheUpdate: cachedResult.createdAt
            });
          }
        }

        // Cache miss - call the service
        if (!result) {
          const verifiedPermissionsService = getVerifiedPermissionsService();
          result = await verifiedPermissionsService.isAuthorized(request);

          // Cache the result if caching is enabled
          if (useCache) {
            const cacheTags = CacheKeyGenerator.tags(
              request.principal.entityId,
              request.resource.entityId,
              request.action.actionId.replace(/"/g, ''),
              [...cacheTagsExtra, 'permission', 'batch', 'react-hook']
            );

            await cacheManager.set(cacheKey, result, {
              ttl: cacheTtl,
              tags: cacheTags
            });
          }

          batchCacheInfo.push({
            cacheHit: false,
            cacheKey,
            lastCacheUpdate: Date.now()
          });
        }

        batchResults.push(result);
      }
      
      setResults(batchResults);
      setCacheInfo(batchCacheInfo);
      
      const hasErrors = batchResults.some((result: AuthorizationResult) => result.errors && result.errors.length > 0);
      if (hasErrors) {
        const errorMessages = batchResults
          .filter((result: AuthorizationResult) => result.errors && result.errors.length > 0)
          .map((result: AuthorizationResult) => result.errors!.join(', '))
          .join('; ');
        setError(errorMessages);
        setHasError(true);
      }
      
      return batchResults;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Batch permission check failed';
      setError(errorMessage);
      setHasError(true);
      setResults([]);
      setCacheInfo([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [requests, useCache, cacheManager, cacheTtl, cacheTagsExtra]);

  const invalidateAll = useCallback(async (): Promise<void> => {
    // Invalidate cache for all requests
    for (const request of requests) {
      const contextHash = CacheKeyGenerator.contextHash(request.context || {});
      const cacheKey = CacheKeyGenerator.permission(
        request.principal.entityId,
        request.resource.entityId,
        request.action.actionId.replace(/"/g, ''),
        contextHash
      );
      
      await cacheManager.delete(cacheKey);
    }
  }, [requests, cacheManager]);

  useEffect(() => {
    if (requests.length > 0) {
      checkAll();
    }
  }, [requests.length, checkAll]);

  return {
    isLoading,
    results,
    hasError,
    error,
    checkAll,
    cacheInfo,
    invalidateAll,
  };
}

/**
 * Higher-order component for conditional rendering based on permissions
 */
export function withPermission<T extends object>(
  Component: React.ComponentType<T>,
  request: DetailedAuthorizationRequest,
  fallback?: React.ComponentType<T> | React.ReactElement | null
) {
  return function PermissionWrappedComponent(props: T) {
    const { isLoading, isAllowed } = usePermission(request);

    if (isLoading) {
      return <div>Checking permissions...</div>;
    }

    if (!isAllowed) {
      if (fallback) {
        if (React.isValidElement(fallback)) {
          return fallback;
        }
        const FallbackComponent = fallback as React.ComponentType<T>;
        return <FallbackComponent {...props} />;
      }
      return null;
    }

    return <Component {...props} />;
  };
}