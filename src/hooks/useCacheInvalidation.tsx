/**
 * Cache Invalidation Hooks and Utilities
 * 
 * React hooks and utilities for managing cache invalidation in response to 
 * user permission changes, policy updates, and other events that affect
 * AWS Verified Permissions cache validity.
 */

import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectHisaPersonId } from '@/services/store/modules/auth/selectors';
import {
  invalidateUserPermissions,
  invalidateResourcePermissions,
  invalidatePolicyCache,
  getCacheStatistics
} from '@/services/aws/verifiedPermissions';
import {
  getCacheManager,
  CacheKeyGenerator,
  CACHE_INVALIDATION_PATTERNS
} from '@/services/cache';

/**
 * Hook for managing user-specific cache invalidation
 */
export function useUserCacheInvalidation() {
  const userId = useSelector(selectHisaPersonId);

  const invalidateUser = useCallback(async (targetUserId?: string) => {
    const userIdToInvalidate = targetUserId || userId;
    if (!userIdToInvalidate) return;

    await invalidateUserPermissions(userIdToInvalidate);
  }, [userId]);

  const invalidateCurrentUser = useCallback(async () => {
    if (!userId) return;
    await invalidateUserPermissions(userId);
  }, [userId]);

  return {
    invalidateUser,
    invalidateCurrentUser,
    userId
  };
}

/**
 * Hook for resource-specific cache invalidation
 */
export function useResourceCacheInvalidation() {
  const invalidateResource = useCallback(async (resourceId: string) => {
    await invalidateResourcePermissions(resourceId);
  }, []);

  const invalidateMultipleResources = useCallback(async (resourceIds: string[]) => {
    await Promise.all(resourceIds.map(id => invalidateResourcePermissions(id)));
  }, []);

  return {
    invalidateResource,
    invalidateMultipleResources
  };
}

/**
 * Hook for policy-level cache invalidation
 */
export function usePolicyCacheInvalidation() {
  const invalidateAllPolicies = useCallback(async () => {
    await invalidatePolicyCache();
  }, []);

  const invalidateSpecificPolicy = useCallback(async (policyId: string) => {
    const cacheManager = getCacheManager();
    await cacheManager.invalidateByTags([`policy:${policyId}`]);
  }, []);

  return {
    invalidateAllPolicies,
    invalidateSpecificPolicy
  };
}

/**
 * Hook for comprehensive cache management
 */
export function useCacheManager() {
  const cacheManager = getCacheManager();

  const clearAllCache = useCallback(async () => {
    await cacheManager.clear();
  }, [cacheManager]);

  const getCacheStats = useCallback(async () => {
    return await getCacheStatistics();
  }, []);

  const invalidateByTags = useCallback(async (tags: string[]) => {
    return await cacheManager.invalidateByTags(tags);
  }, [cacheManager]);

  const invalidateByPattern = useCallback(async (pattern: string) => {
    const keys = await cacheManager.keys(pattern);
    await Promise.all(keys.map(key => cacheManager.delete(key)));
    return keys.length;
  }, [cacheManager]);

  return {
    clearAllCache,
    getCacheStats,
    invalidateByTags,
    invalidateByPattern,
    cacheManager
  };
}

/**
 * Hook that automatically invalidates cache when user authentication changes
 */
export function useAuthCacheInvalidation() {
  const userId = useSelector(selectHisaPersonId);
  const { clearAllCache } = useCacheManager();
  const { invalidateCurrentUser } = useUserCacheInvalidation();

  // Track previous userId to detect login/logout transitions
  const previousUserIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const previousUserId = previousUserIdRef.current;
    
    // Handle different authentication state transitions
    if (previousUserId !== userId) {
      if (!previousUserId && userId) {
        // Login: user went from not authenticated to authenticated
        console.log('User login detected, clearing all cache for fresh start');
        clearAllCache().catch(error => 
          console.error('Failed to clear cache on login:', error)
        );
      } else if (previousUserId && !userId) {
        // Logout: user went from authenticated to not authenticated
        console.log('User logout detected, clearing all cache for security');
        clearAllCache().catch(error => 
          console.error('Failed to clear cache on logout:', error)
        );
      } else if (previousUserId && userId && previousUserId !== userId) {
        // User switch: different user logged in
        console.log('User switch detected, clearing cache and invalidating for new user');
        clearAllCache()
          .then(() => invalidateCurrentUser())
          .catch(error => 
            console.error('Failed to clear cache on user switch:', error)
          );
      } else if (userId) {
        // Same user, just invalidate their specific cache
        invalidateCurrentUser().catch(error =>
          console.error('Failed to invalidate user cache:', error)
        );
      }
      
      // Update the ref for next comparison
      previousUserIdRef.current = userId;
    }
  }, [userId, clearAllCache, invalidateCurrentUser]);

  // Also clear cache when component unmounts (app closes)
  useEffect(() => {
    return () => {
      if (userId) {
        // Don't await this as component is unmounting
        clearAllCache().catch(error => 
          console.error('Failed to clear cache on unmount:', error)
        );
      }
    };
  }, [userId, clearAllCache]);

  return { 
    userId,
    isAuthenticated: Boolean(userId),
    previousUserId: previousUserIdRef.current
  };
}

/**
 * Hook for monitoring cache performance and cost savings
 */
export function useCacheMonitoring() {
  const { getCacheStats } = useCacheManager();

  const getPerformanceMetrics = useCallback(async () => {
    const { stats, metrics, health } = await getCacheStats();
    
    return {
      // Basic cache metrics
      hitRate: stats.hitRatio,
      hitCount: stats.hitCount,
      missCount: stats.missCount,
      itemCount: stats.itemCount,
      memoryUsage: stats.memoryUsage,
      
      // Cost savings
      apiCallsAvoided: metrics.estimatedSavings.apiCallsAvoided,
      estimatedSavings: metrics.estimatedSavings.totalSavings,
      costPerCall: metrics.estimatedSavings.costPerCall,
      
      // Performance
      avgCacheLookupTime: metrics.performance.avgCacheLookupTime,
      avgApiCallTime: metrics.performance.avgApiCallTime,
      timeSaved: metrics.performance.timeSaved,
      
      // Health status
      healthStatus: health.status,
      healthAlerts: health.alerts
    };
  }, [getCacheStats]);

  const getOptimizationRecommendations = useCallback(async () => {
    const { CacheMonitor } = await import('@/services/cache/config');
    const cacheManager = getCacheManager();
    const monitor = new CacheMonitor(cacheManager);
    
    return await monitor.getOptimizationRecommendations();
  }, []);

  return {
    getPerformanceMetrics,
    getOptimizationRecommendations
  };
}

/**
 * Utility functions for cache invalidation
 */
export class CacheInvalidationUtils {
  /**
   * Invalidate cache when user roles/permissions change
   */
  static async onUserPermissionsChanged(userId: string, changedRoles?: string[]): Promise<void> {
    // Invalidate user-specific cache
    await invalidateUserPermissions(userId);
    
    // If specific roles changed, also invalidate related caches
    if (changedRoles) {
      const cacheManager = getCacheManager();
      const roleTags = changedRoles.map(role => `role:${role}`);
      await cacheManager.invalidateByTags(roleTags);
    }
  }

  /**
   * Invalidate cache when resource access is modified
   */
  static async onResourceAccessChanged(resourceId: string, affectedUsers?: string[]): Promise<void> {
    // Invalidate resource-specific cache
    await invalidateResourcePermissions(resourceId);
    
    // If specific users are affected, invalidate their caches too
    if (affectedUsers) {
      await Promise.all(
        affectedUsers.map(userId => invalidateUserPermissions(userId))
      );
    }
  }

  /**
   * Invalidate cache when policies are updated
   */
  static async onPolicyUpdated(policyId?: string): Promise<void> {
    if (policyId) {
      // Invalidate specific policy
      const cacheManager = getCacheManager();
      await cacheManager.invalidateByTags([`policy:${policyId}`]);
    } else {
      // Invalidate all policy-related cache
      await invalidatePolicyCache();
    }
  }

  /**
   * Scheduled cache cleanup (can be called periodically)
   */
  static async performScheduledCleanup(): Promise<{
    expiredItemsRemoved: number;
    oldestItemAge: number;
    recommendations: string[];
  }> {
    const cacheManager = getCacheManager();
    const { CacheMonitor } = await import('@/services/cache/config');
    
    // Get current stats
    const statsBefore = await cacheManager.getStats();
    
    // Force cleanup by getting all keys and checking expiration
    const allKeys = await cacheManager.keys();
    let expiredCount = 0;
    let oldestAge = 0;
    
    for (const key of allKeys) {
      const entry = await cacheManager.get(key);
      if (!entry) {
        expiredCount++;
      } else {
        const age = Date.now() - entry.createdAt;
        oldestAge = Math.max(oldestAge, age);
      }
    }
    
    // Get optimization recommendations
    const monitor = new CacheMonitor(cacheManager);
    const recommendations = await monitor.getOptimizationRecommendations();
    
    return {
      expiredItemsRemoved: expiredCount,
      oldestItemAge: oldestAge,
      recommendations
    };
  }

  /**
   * Emergency cache clear (for critical issues)
   */
  static async emergencyCacheClear(reason: string): Promise<void> {
    console.warn(`Emergency cache clear triggered: ${reason}`);
    
    const cacheManager = getCacheManager();
    await cacheManager.clear();
    
    // Log the event for monitoring
    console.log('Emergency cache clear completed', {
      reason,
      timestamp: new Date().toISOString(),
      action: 'cache_emergency_clear'
    });
  }
}

/**
 * Cache warming utilities for preloading frequently accessed data
 */
export class CacheWarmingUtils {
  /**
   * Warm cache for a user's most common permission checks
   */
  static async warmUserCache(
    userId: string,
    commonResources: string[] = ['system-check'],
    commonActions: string[] = ['view']
  ): Promise<void> {
    // This would typically be called after user login
    const { CacheWarmer } = await import('@/services/cache/config');
    const cacheManager = getCacheManager();
    const warmer = new CacheWarmer(cacheManager);
    
    await warmer.warmUserPermissions(userId, commonResources, commonActions);
  }

  /**
   * Warm cache for application startup
   */
  static async warmStartupCache(): Promise<void> {
    const { CacheWarmer } = await import('@/services/cache/config');
    const cacheManager = getCacheManager();
    const warmer = new CacheWarmer(cacheManager);
    
    await warmer.warmStartupCache();
  }

  /**
   * Pre-warm cache based on user's historical access patterns
   */
  static async warmFromAccessPatterns(
    userId: string,
    accessHistory: Array<{ resourceId: string; action: string; frequency: number }>
  ): Promise<void> {
    // Sort by frequency and warm top 10 most accessed items
    const topAccessed = accessHistory
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);

    const cacheManager = getCacheManager();
    
    for (const { resourceId, action } of topAccessed) {
      const key = CacheKeyGenerator.permission(userId, resourceId, action);
      
      // Set a placeholder that indicates this needs warming
      await cacheManager.set(
        key,
        { needsWarmup: true, predictive: true },
        {
          ttl: 30000, // 30 seconds for predictive cache
          tags: CacheKeyGenerator.tags(userId, resourceId, action, ['predictive', 'warmup'])
        }
      );
    }
  }
}