/**
 * Cache Configuration and Initialization
 * 
 * Configuration management for the AWS Verified Permissions caching system.
 * Supports environment-based configuration with sensible defaults.
 */

import { CacheConfig, CacheBackendType } from '@/Types/cache';
import { CacheManager } from './CacheManager';

/**
 * Default cache configuration
 */
const DEFAULT_CACHE_CONFIG: CacheConfig = {
  primary: 'memory',
  fallback: 'localStorage',
  defaultTtl: 300000, // 5 minutes
  maxSize: 1000,
  memory: {
    maxSize: 1000,
    cleanupInterval: 60000 // 1 minute
  },
  localStorage: {
    keyPrefix: 'avp_cache_',
    maxSize: 500,
    compression: false
  }
};

/**
 * Environment-based cache configuration
 */
export function getCacheConfig(): CacheConfig {
  // Check if we're running on the server side
  const isServerSide = typeof window === 'undefined';
  
  // Cache TTL configuration
  const defaultTtl = parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000', 10); // 5 minutes default
  const shortTtl = parseInt(process.env.NEXT_PUBLIC_CACHE_SHORT_TTL || '60000', 10); // 1 minute
  const longTtl = parseInt(process.env.NEXT_PUBLIC_CACHE_LONG_TTL || '1800000', 10); // 30 minutes

  // Cache size configuration
  const memoryMaxSize = parseInt(process.env.NEXT_PUBLIC_CACHE_MEMORY_SIZE || '1000', 10);
  const localStorageMaxSize = parseInt(process.env.NEXT_PUBLIC_CACHE_LOCALSTORAGE_SIZE || '500', 10);

  // Cache backend configuration - force memory-only on server side
  let primaryBackend = (process.env.NEXT_PUBLIC_CACHE_PRIMARY_BACKEND || 'memory') as CacheBackendType;
  let fallbackBackend = process.env.NEXT_PUBLIC_CACHE_FALLBACK_BACKEND as CacheBackendType | undefined;
  
  // Override to memory-only for server-side execution
  if (isServerSide) {
    primaryBackend = 'memory';
    fallbackBackend = undefined; // No fallback on server side
  }

  // Environment-specific optimizations
  const isProduction = process.env.NODE_ENV === 'production';
  const configuration = process.env.NEXT_PUBLIC_CONFIGURATION || process.env.CONFIGURATION || 'development';

  return {
    primary: primaryBackend,
    fallback: fallbackBackend || (primaryBackend !== 'localStorage' && !isServerSide ? 'localStorage' : undefined),
    defaultTtl,
    maxSize: memoryMaxSize,
    memory: {
      maxSize: memoryMaxSize,
      cleanupInterval: isProduction ? 120000 : 60000 // 2 minutes in prod, 1 minute in dev
    },
    localStorage: !isServerSide ? {
      keyPrefix: `avp_cache_${configuration}_`,
      maxSize: localStorageMaxSize,
      compression: isProduction // Enable compression in production
    } : undefined
  };
}

/**
 * Cache TTL strategies based on data sensitivity and user patterns
 */
export const CACHE_TTL_STRATEGIES = {
  // Very short TTL for highly dynamic data
  CRITICAL: parseInt(process.env.NEXT_PUBLIC_CACHE_SHORT_TTL || '60000', 10), // 1 minute
  
  // Standard TTL for normal permission checks
  STANDARD: parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || '300000', 10), // 5 minutes
  
  // Longer TTL for stable data
  STABLE: parseInt(process.env.NEXT_PUBLIC_CACHE_LONG_TTL || '1800000', 10), // 30 minutes
  
  // Very long TTL for rarely changing data
  STATIC: parseInt(process.env.NEXT_PUBLIC_CACHE_STATIC_TTL || '3600000', 10), // 1 hour
} as const;

/**
 * Cache invalidation patterns based on data types
 */
export const CACHE_INVALIDATION_PATTERNS = {
  // User-specific invalidation
  USER: (userId: string) => [`user:${userId}`, `permissions:${userId}`],
  
  // Resource-specific invalidation
  RESOURCE: (resourceId: string) => [`resource:${resourceId}`, `logs:${resourceId}`],
  
  // Action-specific invalidation
  ACTION: (action: string) => [`action:${action}`],
  
  // Policy-specific invalidation (when policies change)
  POLICY: () => ['policy:*', 'permissions:*'],
  
  // Global invalidation (for major changes)
  GLOBAL: () => ['*']
} as const;

/**
 * Cache key generation utilities
 */
export class CacheKeyGenerator {
  private static version = process.env.NEXT_PUBLIC_CACHE_VERSION || '1.0';

  /**
   * Generate a permission cache key
   */
  static permission(
    userId: string, 
    logsId: string, 
    action: string, 
    contextHash?: string
  ): string {
    const base = `perm:${this.version}`;
    const params = [userId, logsId, action];
    if (contextHash) params.push(contextHash);
    return `${base}:${params.join(':')}`;
  }

  /**
   * Generate a user permissions cache key
   */
  static userPermissions(userId: string): string {
    return `user_perms:${this.version}:${userId}`;
  }

  /**
   * Generate a policy cache key
   */
  static policy(policyId: string): string {
    return `policy:${this.version}:${policyId}`;
  }

  /**
   * Generate a context hash for caching
   */
  static contextHash(context: Record<string, any>): string {
    // Create a stable hash of the context object
    const sortedKeys = Object.keys(context).sort();
    const contextString = sortedKeys
      .map(key => `${key}:${JSON.stringify(context[key])}`)
      .join('|');
    
    // Simple hash function (for production, consider using a proper hash library)
    let hash = 0;
    for (let i = 0; i < contextString.length; i++) {
      const char = contextString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  /**
   * Generate cache tags for invalidation
   */
  static tags(
    userId: string, 
    logsId: string, 
    action: string, 
    additionalTags?: string[]
  ): string[] {
    const tags = [
      `user:${userId}`,
      `resource:${logsId}`,
      `action:${action}`,
      `permissions:${userId}`,
      `logs:${logsId}`
    ];

    if (additionalTags) {
      tags.push(...additionalTags);
    }

    return tags;
  }
}

/**
 * Cache warming strategies for frequently accessed data
 */
export class CacheWarmer {
  constructor(private cacheManager: CacheManager) {}

  /**
   * Warm cache with user's most likely permissions
   */
  async warmUserPermissions(
    userId: string, 
    commonResources: string[] = [],
    commonActions: string[] = ['view']
  ): Promise<void> {
    const promises = [];

    for (const resource of commonResources) {
      for (const action of commonActions) {
        const key = CacheKeyGenerator.permission(userId, resource, action);
        
        // Check if already cached
        if (!(await this.cacheManager.has(key))) {
          // Pre-warm with a placeholder that indicates warming is needed
          promises.push(
            this.cacheManager.set(
              key,
              { needsWarmup: true },
              { 
                ttl: CACHE_TTL_STRATEGIES.CRITICAL,
                tags: CacheKeyGenerator.tags(userId, resource, action, ['warmup'])
              }
            )
          );
        }
      }
    }

    await Promise.all(promises);
  }

  /**
   * Warm cache for application startup
   */
  async warmStartupCache(): Promise<void> {
    // Pre-warm common system checks
    const systemChecks = ['system-check', 'health-check', 'status-check'];
    
    for (const check of systemChecks) {
      await this.cacheManager.set(
        CacheKeyGenerator.permission('system', check, 'view'),
        { needsWarmup: true },
        {
          ttl: CACHE_TTL_STRATEGIES.CRITICAL,
          tags: ['system', 'warmup']
        }
      );
    }
  }
}

/**
 * Cache monitoring and alerting
 */
export class CacheMonitor {
  private alertThresholds = {
    hitRateMin: 0.7, // Alert if hit rate drops below 70%
    missRateMax: 0.3, // Alert if miss rate exceeds 30%
    errorRateMax: 0.05, // Alert if error rate exceeds 5%
    responseTimeMax: 100 // Alert if response time exceeds 100ms
  };

  constructor(private cacheManager: CacheManager) {}

  /**
   * Get cache health status
   */
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'warning' | 'critical';
    metrics: any;
    alerts: string[];
  }> {
    const stats = await this.cacheManager.getStats();
    const metrics = this.cacheManager.getMetrics();
    const alerts: string[] = [];

    // Check hit rate
    if (stats.hitRatio < this.alertThresholds.hitRateMin) {
      alerts.push(`Low cache hit rate: ${(stats.hitRatio * 100).toFixed(1)}%`);
    }

    // Check response time
    if (metrics.performance.avgCacheLookupTime > this.alertThresholds.responseTimeMax) {
      alerts.push(`High cache response time: ${metrics.performance.avgCacheLookupTime.toFixed(1)}ms`);
    }

    // Determine overall status
    const status = alerts.length === 0 ? 'healthy' : 
                  alerts.length <= 2 ? 'warning' : 'critical';

    return {
      status,
      metrics: {
        ...stats,
        performance: metrics.performance,
        estimatedSavings: metrics.estimatedSavings
      },
      alerts
    };
  }

  /**
   * Get optimization recommendations
   */
  async getOptimizationRecommendations(): Promise<string[]> {
    const stats = await this.cacheManager.getStats();
    const metrics = this.cacheManager.getMetrics();
    const recommendations: string[] = [];

    // Hit rate optimization
    if (stats.hitRatio < 0.8) {
      recommendations.push('Consider increasing cache TTL for frequently accessed data');
      recommendations.push('Review cache invalidation patterns to avoid premature eviction');
    }

    // Memory optimization
    if (stats.memoryUsage && stats.memoryUsage > 50 * 1024 * 1024) { // 50MB
      recommendations.push('Consider implementing cache size limits or compression');
    }

    // Cost optimization
    if (metrics.estimatedSavings.totalSavings < 1.0) {
      recommendations.push('Cache hit rate could be improved to increase cost savings');
    }

    return recommendations;
  }
}

// Singleton instance
let cacheManagerInstance: CacheManager | null = null;

/**
 * Get the singleton cache manager instance
 */
export function getCacheManager(): CacheManager {
  if (!cacheManagerInstance) {
    const config = getCacheConfig();
    cacheManagerInstance = new CacheManager(config);
  }
  return cacheManagerInstance;
}

/**
 * Initialize cache manager with custom configuration
 */
export function initializeCacheManager(config?: Partial<CacheConfig>): CacheManager {
  const defaultConfig = getCacheConfig();
  const finalConfig = { ...defaultConfig, ...config };
  cacheManagerInstance = new CacheManager(finalConfig);
  return cacheManagerInstance;
}

/**
 * Cleanup cache manager
 */
export async function cleanupCacheManager(): Promise<void> {
  if (cacheManagerInstance) {
    await cacheManagerInstance.close();
    cacheManagerInstance = null;
  }
}