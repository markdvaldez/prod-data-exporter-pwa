/**
 * Cache Service Entry Point
 * 
 * Barrel export for the caching system components.
 */

// Main cache manager
export { CacheManager } from './CacheManager';

// Cache backends
export { MemoryCacheBackend } from './backends/MemoryCacheBackend';
export { LocalStorageCacheBackend } from './backends/LocalStorageCacheBackend';

// Configuration and utilities
export {
  getCacheConfig,
  getCacheManager,
  initializeCacheManager,
  cleanupCacheManager,
  CacheKeyGenerator,
  CacheWarmer,
  CacheMonitor,
  CACHE_TTL_STRATEGIES,
  CACHE_INVALIDATION_PATTERNS
} from './config';

// Re-export types
export type {
  CacheBackend,
  CacheEntry,
  CacheOptions,
  CacheStats,
  CacheConfig,
  CacheBackendType,
  CacheEvent,
  CacheEventListener,
  CacheMetrics,
  PermissionCacheEntry,
  PermissionCacheOptions,
  InvalidationPattern
} from '@/Types/cache';