/**
 * LocalStorage Cache Backend
 * 
 * Browser localStorage cache implementation with TTL support and compression.
 * Persists cache across browser sessions but has size limitations.
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

interface LocalStorageCacheMetadata {
  keys: string[];
  tagIndex: Record<string, string[]>;
  stats: {
    hitCount: number;
    missCount: number;
    setCount: number;
    deleteCount: number;
  };
}

export class LocalStorageCacheBackend implements CacheBackend {
  private keyPrefix: string;
  private metadataKey: string;
  private maxSize: number;
  private useCompression: boolean;
  private listeners: CacheEventListener[] = [];
  private isAvailable: boolean;

  constructor(
    keyPrefix: string = 'avp_cache_',
    maxSize: number = 500,
    useCompression: boolean = false
  ) {
    this.keyPrefix = keyPrefix;
    this.metadataKey = `${keyPrefix}metadata`;
    this.maxSize = maxSize;
    this.useCompression = useCompression;
    
    // Check if localStorage is available
    this.isAvailable = this.checkLocalStorageAvailability();
    
    if (this.isAvailable) {
      // Initialize metadata if not exists
      this.initializeMetadata();
      
      // Cleanup expired items on initialization
      this.cleanup();
    }
  }

  private checkLocalStorageAvailability(): boolean {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      
      // Test localStorage functionality
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  private initializeMetadata(): void {
    if (!this.isAvailable) return;
    
    if (!this.getMetadata()) {
      this.setMetadata({
        keys: [],
        tagIndex: {},
        stats: {
          hitCount: 0,
          missCount: 0,
          setCount: 0,
          deleteCount: 0
        }
      });
    }
  }

  private getMetadata(): LocalStorageCacheMetadata | null {
    if (!this.isAvailable) return null;
    
    try {
      const data = localStorage.getItem(this.metadataKey);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private setMetadata(metadata: LocalStorageCacheMetadata): void {
    if (!this.isAvailable) return;
    
    try {
      localStorage.setItem(this.metadataKey, JSON.stringify(metadata));
    } catch (error) {
      console.error('Failed to save cache metadata:', error);
    }
  }

  private updateMetadata(updater: (metadata: LocalStorageCacheMetadata) => void): void {
    if (!this.isAvailable) return;
    
    const metadata = this.getMetadata();
    if (metadata) {
      updater(metadata);
      this.setMetadata(metadata);
    }
  }

  private emit(type: CacheEventType, key?: string, metadata?: Record<string, any>): void {
    const event: CacheEvent = {
      type,
      key,
      backend: 'localStorage',
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

  private compress(data: string): string {
    if (!this.useCompression) return data;
    
    // Simple compression using LZ-string could be added here
    // For now, return as-is
    return data;
  }

  private decompress(data: string): string {
    if (!this.useCompression) return data;
    
    // Simple decompression using LZ-string could be added here
    // For now, return as-is
    return data;
  }

  private getStorageKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  private cleanup(): void {
    if (!this.isAvailable) return;
    
    const metadata = this.getMetadata();
    if (!metadata) return;

    const now = Date.now();
    const expiredKeys: string[] = [];

    for (const key of metadata.keys) {
      try {
        const storageKey = this.getStorageKey(key);
        const rawData = localStorage.getItem(storageKey);
        
        if (!rawData) {
          expiredKeys.push(key);
          continue;
        }

        const entry: CacheEntry = JSON.parse(this.decompress(rawData));
        
        if (entry.expiresAt <= now) {
          expiredKeys.push(key);
          localStorage.removeItem(storageKey);
        }
      } catch {
        expiredKeys.push(key);
      }
    }

    if (expiredKeys.length > 0) {
      this.updateMetadata(metadata => {
        // Remove expired keys
        metadata.keys = metadata.keys.filter(key => !expiredKeys.includes(key));
        
        // Clean up tag index
        for (const [tag, keys] of Object.entries(metadata.tagIndex)) {
          metadata.tagIndex[tag] = keys.filter(key => !expiredKeys.includes(key));
          if (metadata.tagIndex[tag].length === 0) {
            delete metadata.tagIndex[tag];
          }
        }
      });

      this.emit('clear', undefined, { expiredKeys: expiredKeys.length });
    }
  }

  private evictLRU(): void {
    if (!this.isAvailable) return;
    
    const metadata = this.getMetadata();
    if (!metadata || metadata.keys.length < this.maxSize) return;

    // Find the oldest item to evict
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const key of metadata.keys) {
      try {
        const storageKey = this.getStorageKey(key);
        const rawData = localStorage.getItem(storageKey);
        
        if (rawData) {
          const entry: CacheEntry = JSON.parse(this.decompress(rawData));
          if (entry.lastAccessed < oldestTime) {
            oldestTime = entry.lastAccessed;
            oldestKey = key;
          }
        }
      } catch {
        // If there's an error reading the item, mark it for eviction
        oldestKey = key;
        break;
      }
    }

    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  async get<T = any>(key: string): Promise<CacheEntry<T> | null> {
    if (!this.isAvailable) {
      this.emit('miss', key, { reason: 'localStorage_unavailable' });
      return null;
    }

    try {
      const storageKey = this.getStorageKey(key);
      const rawData = localStorage.getItem(storageKey);
      
      if (!rawData) {
        this.updateMetadata(metadata => metadata.stats.missCount++);
        this.emit('miss', key);
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(this.decompress(rawData));
      
      // Check expiration
      if (entry.expiresAt <= Date.now()) {
        await this.delete(key);
        this.updateMetadata(metadata => metadata.stats.missCount++);
        this.emit('miss', key, { reason: 'expired' });
        return null;
      }

      // Update access tracking
      entry.hitCount++;
      entry.lastAccessed = Date.now();
      
      // Save updated entry
      const serializedData = this.compress(JSON.stringify(entry));
      localStorage.setItem(storageKey, serializedData);
      
      this.updateMetadata(metadata => metadata.stats.hitCount++);
      this.emit('hit', key);

      // Handle deserialization if custom deserializer was used
      return {
        data: entry.data,
        createdAt: entry.createdAt,
        expiresAt: entry.expiresAt,
        hitCount: entry.hitCount,
        lastAccessed: entry.lastAccessed,
        tags: entry.tags
      };
    } catch (error) {
      console.error('Error getting cache entry:', error);
      this.updateMetadata(metadata => metadata.stats.missCount++);
      this.emit('miss', key, { error });
      return null;
    }
  }

  async set<T = any>(key: string, data: T, options?: CacheOptions): Promise<void> {
    if (!this.isAvailable) {
      this.emit('error', key, { error: 'localStorage unavailable', operation: 'set' });
      return;
    }

    try {
      const now = Date.now();
      const ttl = options?.ttl || 300000; // 5 minutes default
      const expiresAt = now + ttl;

      // Evict LRU if needed
      this.evictLRU();

      const entry: CacheEntry<T> = {
        data: options?.serialize ? options.serialize(data) as T : data,
        createdAt: now,
        expiresAt,
        hitCount: 0,
        lastAccessed: now,
        tags: options?.tags
      };

      const storageKey = this.getStorageKey(key);
      const serializedData = this.compress(JSON.stringify(entry));
      
      localStorage.setItem(storageKey, serializedData);
      
      this.updateMetadata(metadata => {
        // Add key if not exists
        if (!metadata.keys.includes(key)) {
          metadata.keys.push(key);
        }
        
        // Update tag index
        if (options?.tags) {
          for (const tag of options.tags) {
            if (!metadata.tagIndex[tag]) {
              metadata.tagIndex[tag] = [];
            }
            if (!metadata.tagIndex[tag].includes(key)) {
              metadata.tagIndex[tag].push(key);
            }
          }
        }
        
        metadata.stats.setCount++;
      });

      this.emit('set', key, { ttl, tags: options?.tags });
    } catch (error) {
      console.error('Error setting cache entry:', error);
      this.emit('error', key, { error, operation: 'set' });
    }
  }

  async delete(key: string): Promise<boolean> {
    if (!this.isAvailable) {
      return false;
    }

    try {
      const storageKey = this.getStorageKey(key);
      const existed = localStorage.getItem(storageKey) !== null;
      
      if (existed) {
        localStorage.removeItem(storageKey);
        
        this.updateMetadata(metadata => {
          // Remove key
          metadata.keys = metadata.keys.filter(k => k !== key);
          
          // Clean up tag index
          for (const [tag, keys] of Object.entries(metadata.tagIndex)) {
            metadata.tagIndex[tag] = keys.filter(k => k !== key);
            if (metadata.tagIndex[tag].length === 0) {
              delete metadata.tagIndex[tag];
            }
          }
          
          metadata.stats.deleteCount++;
        });
        
        this.emit('delete', key);
      }

      return existed;
    } catch (error) {
      console.error('Error deleting cache entry:', error);
      this.emit('error', key, { error, operation: 'delete' });
      return false;
    }
  }

  async clear(): Promise<void> {
    if (!this.isAvailable) {
      return;
    }

    try {
      const metadata = this.getMetadata();
      if (!metadata) return;

      // Remove all cache entries
      for (const key of metadata.keys) {
        const storageKey = this.getStorageKey(key);
        localStorage.removeItem(storageKey);
      }

      // Reset metadata
      this.setMetadata({
        keys: [],
        tagIndex: {},
        stats: {
          hitCount: 0,
          missCount: 0,
          setCount: 0,
          deleteCount: 0
        }
      });

      this.emit('clear', undefined, { itemsCleared: metadata.keys.length });
    } catch (error) {
      console.error('Error clearing cache:', error);
      this.emit('error', undefined, { error, operation: 'clear' });
    }
  }

  async has(key: string): Promise<boolean> {
    if (!this.isAvailable) {
      return false;
    }

    try {
      const storageKey = this.getStorageKey(key);
      const rawData = localStorage.getItem(storageKey);
      
      if (!rawData) return false;
      
      const entry: CacheEntry = JSON.parse(this.decompress(rawData));
      
      // Check expiration
      if (entry.expiresAt <= Date.now()) {
        await this.delete(key);
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  }

  async keys(pattern?: string): Promise<string[]> {
    if (!this.isAvailable) {
      return [];
    }

    const metadata = this.getMetadata();
    if (!metadata) return [];
    
    let keys = metadata.keys;
    
    if (pattern) {
      const regex = new RegExp(
        pattern
          .replace(/\*/g, '.*')
          .replace(/\?/g, '.')
      );
      keys = keys.filter(key => regex.test(key));
    }
    
    return keys;
  }

  async invalidateByTags(tags: string[]): Promise<number> {
    if (!this.isAvailable) {
      return 0;
    }

    const metadata = this.getMetadata();
    if (!metadata) return 0;

    let invalidatedCount = 0;
    const keysToDelete = new Set<string>();

    for (const tag of tags) {
      const taggedKeys = metadata.tagIndex[tag];
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
    if (!this.isAvailable) {
      return {
        itemCount: 0,
        hitCount: 0,
        missCount: 0,
        hitRatio: 0,
        backend: 'localStorage',
        backendStats: { error: 'localStorage unavailable' }
      };
    }

    const metadata = this.getMetadata();
    if (!metadata) {
      return {
        itemCount: 0,
        hitCount: 0,
        missCount: 0,
        hitRatio: 0,
        backend: 'localStorage',
        backendStats: {}
      };
    }

    // Estimate memory usage
    let memoryUsage = 0;
    try {
      for (const key of metadata.keys) {
        const storageKey = this.getStorageKey(key);
        const rawData = localStorage.getItem(storageKey);
        if (rawData) {
          memoryUsage += rawData.length * 2; // UTF-16 encoding
        }
      }
    } catch {
      // Ignore errors in size calculation
    }

    return {
      itemCount: metadata.keys.length,
      hitCount: metadata.stats.hitCount,
      missCount: metadata.stats.missCount,
      hitRatio: metadata.stats.hitCount / (metadata.stats.hitCount + metadata.stats.missCount) || 0,
      memoryUsage,
      backend: 'localStorage',
      backendStats: {
        setCount: metadata.stats.setCount,
        deleteCount: metadata.stats.deleteCount,
        maxSize: this.maxSize,
        tagCount: Object.keys(metadata.tagIndex).length,
        useCompression: this.useCompression
      }
    };
  }

  async close(): Promise<void> {
    // localStorage doesn't need explicit closing
    // Just cleanup any expired items
    this.cleanup();
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