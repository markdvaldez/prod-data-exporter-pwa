/**
 * Memory Cache Backend
 * 
 * In-memory cache implementation with LRU eviction and TTL support.
 * This is the fastest cache backend but data is lost on app restart.
 */

import {
  CacheBackend,
  CacheEntry,
  CacheOptions,
  CacheStats,
  CacheEvent,
  CacheEventType,
  CacheEventListener
} from '@/Types/cache';

interface MemoryCacheItem<T = any> extends CacheEntry<T> {
  size: number;
}

export class MemoryCacheBackend implements CacheBackend {
  private cache = new Map<string, MemoryCacheItem>();
  private tagIndex = new Map<string, Set<string>>();
  private accessOrder: string[] = [];
  private stats = {
    hitCount: 0,
    missCount: 0,
    setCount: 0,
    deleteCount: 0
  };
  private cleanupInterval: NodeJS.Timeout | null = null;
  private listeners: CacheEventListener[] = [];

  constructor(
    private maxSize: number = 1000,
    private cleanupIntervalMs: number = 60000, // 1 minute
    private defaultTtl: number = 300000 // 5 minutes
  ) {
    this.startCleanup();
  }

  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.cleanupIntervalMs);
  }

  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const [key, item] of this.cache) {
      if (item.expiresAt <= now) {
        expiredKeys.push(key);
      }
    }

    for (const key of expiredKeys) {
      this.delete(key);
    }

    // Emit cleanup event
    this.emit('clear', undefined, { expiredKeys: expiredKeys.length });
  }

  private emit(type: CacheEventType, key?: string, metadata?: Record<string, any>): void {
    const event: CacheEvent = {
      type,
      key,
      backend: 'memory',
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

  private updateAccessOrder(key: string): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
    this.accessOrder.push(key);
  }

  private evictLRU(): void {
    if (this.cache.size >= this.maxSize && this.accessOrder.length > 0) {
      const oldestKey = this.accessOrder.shift();
      if (oldestKey) {
        this.cache.delete(oldestKey);
        this.removeTags(oldestKey);
        this.emit('delete', oldestKey, { reason: 'eviction' });
      }
    }
  }

  private updateTags(key: string, tags?: string[]): void {
    if (!tags) return;

    for (const tag of tags) {
      if (!this.tagIndex.has(tag)) {
        this.tagIndex.set(tag, new Set());
      }
      this.tagIndex.get(tag)!.add(key);
    }
  }

  private removeTags(key: string): void {
    for (const [tag, keys] of this.tagIndex) {
      keys.delete(key);
      if (keys.size === 0) {
        this.tagIndex.delete(tag);
      }
    }
  }

  private calculateSize(data: any): number {
    // Rough estimation of object size in bytes
    try {
      return JSON.stringify(data).length * 2; // Approximate UTF-16 encoding
    } catch {
      return 1000; // Fallback for non-serializable objects
    }
  }

  async get<T = any>(key: string): Promise<CacheEntry<T> | null> {
    const item = this.cache.get(key);
    
    if (!item) {
      this.stats.missCount++;
      this.emit('miss', key);
      return null;
    }

    // Check expiration
    if (item.expiresAt <= Date.now()) {
      await this.delete(key);
      this.stats.missCount++;
      this.emit('miss', key, { reason: 'expired' });
      return null;
    }

    // Update access tracking
    item.hitCount++;
    item.lastAccessed = Date.now();
    this.updateAccessOrder(key);
    this.stats.hitCount++;
    this.emit('hit', key);

    return {
      data: item.data,
      createdAt: item.createdAt,
      expiresAt: item.expiresAt,
      hitCount: item.hitCount,
      lastAccessed: item.lastAccessed,
      tags: item.tags
    };
  }

  async set<T = any>(key: string, data: T, options?: CacheOptions): Promise<void> {
    const now = Date.now();
    const ttl = options?.ttl || this.defaultTtl;
    const expiresAt = now + ttl;
    const size = this.calculateSize(data);

    // Evict LRU if needed
    this.evictLRU();

    // Remove existing tags if updating
    if (this.cache.has(key)) {
      this.removeTags(key);
    }

    const serializedData = options?.serialize ? options.serialize(data) : data;
    
    const item: MemoryCacheItem<T> = {
      data: serializedData as T,
      createdAt: now,
      expiresAt,
      hitCount: 0,
      lastAccessed: now,
      tags: options?.tags,
      size
    };

    this.cache.set(key, item);
    this.updateTags(key, options?.tags);
    this.updateAccessOrder(key);
    this.stats.setCount++;
    this.emit('set', key, { ttl, size });
  }

  async delete(key: string): Promise<boolean> {
    const existed = this.cache.has(key);
    
    if (existed) {
      this.cache.delete(key);
      this.removeTags(key);
      
      const index = this.accessOrder.indexOf(key);
      if (index > -1) {
        this.accessOrder.splice(index, 1);
      }
      
      this.stats.deleteCount++;
      this.emit('delete', key);
    }

    return existed;
  }

  async clear(): Promise<void> {
    const count = this.cache.size;
    this.cache.clear();
    this.tagIndex.clear();
    this.accessOrder = [];
    this.emit('clear', undefined, { itemsCleared: count });
  }

  async has(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    if (!item) return false;
    
    // Check expiration
    if (item.expiresAt <= Date.now()) {
      await this.delete(key);
      return false;
    }
    
    return true;
  }

  async keys(pattern?: string): Promise<string[]> {
    const allKeys = Array.from(this.cache.keys());
    
    if (!pattern) return allKeys;
    
    // Simple glob pattern matching
    const regex = new RegExp(
      pattern
        .replace(/\*/g, '.*')
        .replace(/\?/g, '.')
    );
    
    return allKeys.filter(key => regex.test(key));
  }

  async invalidateByTags(tags: string[]): Promise<number> {
    let invalidatedCount = 0;
    const keysToDelete = new Set<string>();

    for (const tag of tags) {
      const taggedKeys = this.tagIndex.get(tag);
      if (taggedKeys) {
        taggedKeys.forEach(key => keysToDelete.add(key));
      }
    }

    for (const key of keysToDelete) {
      const deleted = await this.delete(key);
      if (deleted) {
        invalidatedCount++;
      }
    }

    if (invalidatedCount > 0) {
      this.emit('invalidate', undefined, { 
        tags, 
        invalidatedCount,
        keysInvalidated: Array.from(keysToDelete)
      });
    }

    return invalidatedCount;
  }

  async getStats(): Promise<CacheStats> {
    const memoryUsage = Array.from(this.cache.values())
      .reduce((total, item) => total + item.size, 0);

    return {
      itemCount: this.cache.size,
      hitCount: this.stats.hitCount,
      missCount: this.stats.missCount,
      hitRatio: this.stats.hitCount / (this.stats.hitCount + this.stats.missCount) || 0,
      memoryUsage,
      backend: 'memory',
      backendStats: {
        setCount: this.stats.setCount,
        deleteCount: this.stats.deleteCount,
        maxSize: this.maxSize,
        tagCount: this.tagIndex.size,
        accessOrderLength: this.accessOrder.length
      }
    };
  }

  async close(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    await this.clear();
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
}