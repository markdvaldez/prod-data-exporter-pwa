/**
 * Multi-Backend Cache Manager
 * 
 * A cache manager that supports multiple cache backends with fallback capabilities,
 * designed specifically for optimizing AWS Verified Permissions calls.
 */

import {
  CacheBackend,
  CacheEntry,
  CacheOptions,
  CacheStats,
  CacheConfig,
  CacheBackendType,
  CacheEvent,
  CacheEventListener,
  CacheMetrics
} from '@/Types/cache';
import { MemoryCacheBackend } from './backends/MemoryCacheBackend';
import { LocalStorageCacheBackend } from './backends/LocalStorageCacheBackend';

export class CacheManager implements CacheBackend {
  private primaryBackend: CacheBackend;
  private fallbackBackend?: CacheBackend;
  private config: CacheConfig;
  private listeners: CacheEventListener[] = [];
  private metrics!: CacheMetrics;

  constructor(config: CacheConfig) {
    this.config = config;
    this.primaryBackend = this.createBackend(config.primary);
    
    // Only create fallback if it's specified and different from primary
    if (config.fallback && config.fallback !== config.primary) {
      try {
        this.fallbackBackend = this.createBackend(config.fallback);
      } catch (error) {
        console.warn(`Failed to create fallback cache backend (${config.fallback}):`, error);
        this.fallbackBackend = undefined;
      }
    }

    this.initializeMetrics();
    this.setupEventListeners();
  }

  private createBackend(type: CacheBackendType): CacheBackend {
    switch (type) {
      case 'memory':
        return new MemoryCacheBackend(
          this.config.memory?.maxSize || 1000,
          this.config.memory?.cleanupInterval || 60000,
          this.config.defaultTtl
        );
      
      case 'localStorage':
        // Check if localStorage is available (client-side only)
        if (typeof window === 'undefined' || !window.localStorage) {
          console.warn('localStorage not available, falling back to memory cache');
          return this.createBackend('memory');
        }
        
        return new LocalStorageCacheBackend(
          this.config.localStorage?.keyPrefix || 'avp_cache_',
          this.config.localStorage?.maxSize || 500,
          this.config.localStorage?.compression || false
        );
      
      // Future backends can be added here (Redis, SessionStorage, IndexedDB)
      default:
        console.warn(`Unsupported cache backend: ${type}, falling back to memory`);
        return this.createBackend('memory');
    }
  }

  private initializeMetrics(): void {
    const now = Date.now();
    this.metrics = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      estimatedSavings: {
        apiCallsAvoided: 0,
        costPerCall: 0.0001, // Estimated AWS Verified Permissions cost per call
        totalSavings: 0,
        currency: 'USD'
      },
      performance: {
        avgCacheLookupTime: 0,
        avgApiCallTime: 0,
        timeSaved: 0
      },
      period: {
        startTime: now,
        endTime: now,
        duration: 0
      }
    };
  }

  private setupEventListeners(): void {
    const eventHandler = (event: CacheEvent) => {
      this.updateMetrics(event);
      this.emit(event.type, event.key, event.metadata);
    };

    // Type assertion for event listener methods
    (this.primaryBackend as any).addListener?.(eventHandler);
    (this.fallbackBackend as any)?.addListener?.(eventHandler);
  }

  private updateMetrics(event: CacheEvent): void {
    this.metrics.totalRequests++;
    
    switch (event.type) {
      case 'hit':
        this.metrics.cacheHits++;
        this.metrics.estimatedSavings.apiCallsAvoided++;
        break;
      case 'miss':
        this.metrics.cacheMisses++;
        break;
    }

    // Update calculated metrics
    this.metrics.estimatedSavings.totalSavings = 
      this.metrics.estimatedSavings.apiCallsAvoided * this.metrics.estimatedSavings.costPerCall;
    
    this.metrics.period.endTime = Date.now();
    this.metrics.period.duration = this.metrics.period.endTime - this.metrics.period.startTime;
  }

  private emit(type: string, key?: string, metadata?: Record<string, any>): void {
    const event: CacheEvent = {
      type: type as any,
      key,
      backend: this.config.primary,
      timestamp: Date.now(),
      metadata
    };

    this.listeners.forEach(listener => {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in cache event listener:', error);
      }
    });
  }

  async get<T = any>(key: string): Promise<CacheEntry<T> | null> {
    const startTime = Date.now();
    
    try {
      // Try primary backend first
      let result = await this.primaryBackend.get<T>(key);
      
      if (result) {
        this.updateLookupTime(Date.now() - startTime);
        return result;
      }

      // Try fallback backend if available
      if (this.fallbackBackend) {
        result = await this.fallbackBackend.get<T>(key);
        
        if (result) {
          // Promote to primary cache
          await this.primaryBackend.set(key, result.data, {
            ttl: result.expiresAt - Date.now(),
            tags: result.tags
          });
          
          this.updateLookupTime(Date.now() - startTime);
          return result;
        }
      }

      this.updateLookupTime(Date.now() - startTime);
      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      this.emit('error', key, { error, operation: 'get' });
      return null;
    }
  }

  async set<T = any>(key: string, data: T, options?: CacheOptions): Promise<void> {
    const effectiveOptions = {
      ttl: this.config.defaultTtl,
      ...options
    };

    try {
      // Set in primary backend
      await this.primaryBackend.set(key, data, effectiveOptions);
      
      // Also set in fallback backend for redundancy
      if (this.fallbackBackend) {
        try {
          await this.fallbackBackend.set(key, data, effectiveOptions);
        } catch (error) {
          console.warn('Failed to set in fallback cache:', error);
        }
      }
    } catch (error) {
      console.error('Cache set error:', error);
      this.emit('error', key, { error, operation: 'set' });
      
      // Try fallback if primary fails
      if (this.fallbackBackend) {
        try {
          await this.fallbackBackend.set(key, data, effectiveOptions);
        } catch (fallbackError) {
          console.error('Fallback cache set error:', fallbackError);
        }
      }
    }
  }

  async delete(key: string): Promise<boolean> {
    let deleted = false;
    
    try {
      deleted = await this.primaryBackend.delete(key) || deleted;
    } catch (error) {
      console.error('Primary cache delete error:', error);
    }

    if (this.fallbackBackend) {
      try {
        deleted = await this.fallbackBackend.delete(key) || deleted;
      } catch (error) {
        console.error('Fallback cache delete error:', error);
      }
    }

    return deleted;
  }

  async clear(): Promise<void> {
    const errors: Error[] = [];

    try {
      await this.primaryBackend.clear();
    } catch (error) {
      errors.push(error as Error);
    }

    if (this.fallbackBackend) {
      try {
        await this.fallbackBackend.clear();
      } catch (error) {
        errors.push(error as Error);
      }
    }

    if (errors.length > 0) {
      console.error('Cache clear errors:', errors);
    }

    // Reset metrics
    this.initializeMetrics();
  }

  async has(key: string): Promise<boolean> {
    try {
      if (await this.primaryBackend.has(key)) {
        return true;
      }
      
      if (this.fallbackBackend && await this.fallbackBackend.has(key)) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Cache has error:', error);
      return false;
    }
  }

  async keys(pattern?: string): Promise<string[]> {
    const allKeys = new Set<string>();

    try {
      const primaryKeys = await this.primaryBackend.keys(pattern);
      primaryKeys.forEach(key => allKeys.add(key));
    } catch (error) {
      console.error('Primary cache keys error:', error);
    }

    if (this.fallbackBackend) {
      try {
        const fallbackKeys = await this.fallbackBackend.keys(pattern);
        fallbackKeys.forEach(key => allKeys.add(key));
      } catch (error) {
        console.error('Fallback cache keys error:', error);
      }
    }

    return Array.from(allKeys);
  }

  async invalidateByTags(tags: string[]): Promise<number> {
    let totalInvalidated = 0;

    try {
      totalInvalidated += await this.primaryBackend.invalidateByTags(tags);
    } catch (error) {
      console.error('Primary cache invalidation error:', error);
    }

    if (this.fallbackBackend) {
      try {
        totalInvalidated += await this.fallbackBackend.invalidateByTags(tags);
      } catch (error) {
        console.error('Fallback cache invalidation error:', error);
      }
    }

    return totalInvalidated;
  }

  async getStats(): Promise<CacheStats> {
    try {
      const primaryStats = await this.primaryBackend.getStats();
      
      if (this.fallbackBackend) {
        const fallbackStats = await this.fallbackBackend.getStats();
        
        return {
          itemCount: primaryStats.itemCount + fallbackStats.itemCount,
          hitCount: primaryStats.hitCount + fallbackStats.hitCount,
          missCount: primaryStats.missCount + fallbackStats.missCount,
          hitRatio: (primaryStats.hitCount + fallbackStats.hitCount) / 
                   (primaryStats.hitCount + fallbackStats.hitCount + primaryStats.missCount + fallbackStats.missCount) || 0,
          memoryUsage: (primaryStats.memoryUsage || 0) + (fallbackStats.memoryUsage || 0),
          backend: this.config.primary,
          backendStats: {
            primary: primaryStats,
            fallback: fallbackStats
          }
        };
      }
      
      return primaryStats;
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return {
        itemCount: 0,
        hitCount: 0,
        missCount: 0,
        hitRatio: 0,
        backend: this.config.primary,
        backendStats: { error: error instanceof Error ? error.message : String(error) }
      };
    }
  }

  async close(): Promise<void> {
    const errors: Error[] = [];

    try {
      await this.primaryBackend.close();
    } catch (error) {
      errors.push(error as Error);
    }

    if (this.fallbackBackend) {
      try {
        await this.fallbackBackend.close();
      } catch (error) {
        errors.push(error as Error);
      }
    }

    if (errors.length > 0) {
      console.error('Cache close errors:', errors);
    }
  }

  // Metrics and monitoring
  getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }

  resetMetrics(): void {
    this.initializeMetrics();
  }

  private updateLookupTime(duration: number): void {
    const currentAvg = this.metrics.performance.avgCacheLookupTime;
    const totalRequests = this.metrics.totalRequests;
    
    this.metrics.performance.avgCacheLookupTime = 
      (currentAvg * (totalRequests - 1) + duration) / totalRequests;
  }

  // Cache key utilities
  generateKey(base: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${JSON.stringify(params[key])}`)
      .join('|');
    
    return `${base}:${sortedParams}`;
  }

  generatePermissionKey(userId: string, logsId: string, action: string, contextHash?: string): string {
    const base = 'permission';
    const params = {
      userId,
      logsId,
      action,
      ...(contextHash && { context: contextHash })
    };
    return this.generateKey(base, params);
  }

  // Event listener management
  addListener(listener: CacheEventListener): void {
    this.listeners.push(listener);
  }

  removeListener(listener: CacheEventListener): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  removeAllListeners(): void {
    this.listeners = [];
  }

  // Backend switching for failover
  async switchPrimaryBackend(newBackendType: CacheBackendType): Promise<void> {
    if (newBackendType === this.config.primary) return;

    try {
      const newBackend = this.createBackend(newBackendType);
      
      // Migrate data if possible
      const keys = await this.primaryBackend.keys();
      for (const key of keys) {
        try {
          const entry = await this.primaryBackend.get(key);
          if (entry) {
            await newBackend.set(key, entry.data, {
              ttl: entry.expiresAt - Date.now(),
              tags: entry.tags
            });
          }
        } catch (error) {
          console.warn(`Failed to migrate key ${key}:`, error);
        }
      }

      // Close old backend
      await this.primaryBackend.close();
      
      // Switch to new backend
      this.primaryBackend = newBackend;
      this.config.primary = newBackendType;
      
      this.emit('backend_switch', undefined, { 
        newBackend: newBackendType, 
        migratedKeys: keys.length 
      });
    } catch (error) {
      console.error('Failed to switch cache backend:', error);
      throw error;
    }
  }
}