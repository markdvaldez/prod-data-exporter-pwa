/**
 * Cache Layer Types
 * 
 * Type definitions for the multi-backend caching system used to optimize
 * AWS Verified Permissions calls and reduce costs.
 */

export interface CacheEntry<T = any> {
  /** The cached data */
  data: T;
  /** When the entry was created (timestamp) */
  createdAt: number;
  /** When the entry expires (timestamp) */
  expiresAt: number;
  /** Cache hit count for this entry */
  hitCount: number;
  /** Last accessed timestamp */
  lastAccessed: number;
  /** Tags for cache invalidation patterns */
  tags?: string[];
}

export interface CacheOptions {
  /** Time to live in milliseconds */
  ttl?: number;
  /** Tags for invalidation patterns */
  tags?: string[];
  /** Whether to refresh TTL on access */
  refreshOnAccess?: boolean;
  /** Custom serialization for complex objects */
  serialize?: (data: any) => string;
  /** Custom deserialization for complex objects */
  deserialize?: (data: string) => any;
}

export interface CacheBackend {
  /** Get an item from cache */
  get<T = any>(key: string): Promise<CacheEntry<T> | null>;
  
  /** Set an item in cache */
  set<T = any>(key: string, data: T, options?: CacheOptions): Promise<void>;
  
  /** Delete an item from cache */
  delete(key: string): Promise<boolean>;
  
  /** Clear all items from cache */
  clear(): Promise<void>;
  
  /** Check if key exists in cache */
  has(key: string): Promise<boolean>;
  
  /** Get all keys matching a pattern */
  keys(pattern?: string): Promise<string[]>;
  
  /** Invalidate cache entries by tags */
  invalidateByTags(tags: string[]): Promise<number>;
  
  /** Get cache statistics */
  getStats(): Promise<CacheStats>;
  
  /** Close/cleanup the cache backend */
  close(): Promise<void>;
}

export interface CacheStats {
  /** Total number of items in cache */
  itemCount: number;
  /** Total cache hits */
  hitCount: number;
  /** Total cache misses */
  missCount: number;
  /** Cache hit ratio (0-1) */
  hitRatio: number;
  /** Memory usage in bytes (if applicable) */
  memoryUsage?: number;
  /** Cache backend type */
  backend: CacheBackendType;
  /** Additional backend-specific stats */
  backendStats?: Record<string, any>;
}

export type CacheBackendType = 'memory' | 'redis' | 'localStorage' | 'sessionStorage' | 'indexedDB';

export interface CacheConfig {
  /** Primary cache backend */
  primary: CacheBackendType;
  /** Fallback cache backend */
  fallback?: CacheBackendType;
  /** Default TTL in milliseconds */
  defaultTtl: number;
  /** Maximum cache size (items) */
  maxSize?: number;
  /** Memory cache specific options */
  memory?: {
    maxSize: number;
    cleanupInterval: number;
  };
  /** Redis cache specific options */
  redis?: {
    url: string;
    keyPrefix: string;
    maxRetries: number;
    retryDelay: number;
  };
  /** Local storage options */
  localStorage?: {
    keyPrefix: string;
    maxSize: number;
    compression?: boolean;
  };
}

export interface CacheKey {
  /** Base identifier for the cache key */
  base: string;
  /** Additional parameters that affect the key */
  params: Record<string, any>;
  /** Version for cache invalidation */
  version?: string;
}

export interface PermissionCacheEntry extends CacheEntry {
  data: {
    decision: 'ALLOW' | 'DENY';
    determining_policies?: Array<{ policyId: string }>;
    errors?: Array<{ errorDescription: string }>;
  };
}

export interface PermissionCacheOptions extends CacheOptions {
  /** User-specific tags for invalidation */
  userTags?: string[];
  /** Resource-specific tags for invalidation */
  resourceTags?: string[];
  /** Action-specific tags for invalidation */
  actionTags?: string[];
}

/**
 * Cache invalidation patterns for verified permissions
 */
export interface InvalidationPattern {
  /** User ID patterns to invalidate */
  userIds?: string[];
  /** Resource ID patterns to invalidate */
  resourceIds?: string[];
  /** Action patterns to invalidate */
  actions?: string[];
  /** Custom tag patterns */
  tags?: string[];
  /** Wildcard pattern matching */
  patterns?: string[];
}

/**
 * Cache performance metrics for cost optimization
 */
export interface CacheMetrics {
  /** Total requests handled */
  totalRequests: number;
  /** Cache hits (avoided AWS calls) */
  cacheHits: number;
  /** Cache misses (AWS calls made) */
  cacheMisses: number;
  /** Estimated cost savings */
  estimatedSavings: {
    /** AWS API calls avoided */
    apiCallsAvoided: number;
    /** Estimated cost per API call */
    costPerCall: number;
    /** Total estimated savings */
    totalSavings: number;
    /** Currency for cost calculations */
    currency: string;
  };
  /** Performance metrics */
  performance: {
    /** Average cache lookup time (ms) */
    avgCacheLookupTime: number;
    /** Average AWS API call time (ms) */
    avgApiCallTime: number;
    /** Time saved by caching (ms) */
    timeSaved: number;
  };
  /** Time period for these metrics */
  period: {
    startTime: number;
    endTime: number;
    duration: number;
  };
}

/**
 * Event types for cache monitoring
 */
export type CacheEventType = 
  | 'hit' 
  | 'miss' 
  | 'set' 
  | 'delete' 
  | 'invalidate' 
  | 'clear' 
  | 'error' 
  | 'backend_switch';

export interface CacheEvent {
  type: CacheEventType;
  key?: string;
  backend: CacheBackendType;
  timestamp: number;
  metadata?: Record<string, any>;
  error?: Error;
}

export interface CacheEventListener {
  (event: CacheEvent): void;
}