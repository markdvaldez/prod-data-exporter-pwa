/**
 * @jest-environment jsdom
 */

import { LocalStorageCacheBackend } from '../backends/LocalStorageCacheBackend';

// Mock localStorage for server-side environment simulation
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0
};

describe('LocalStorageCacheBackend', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear actual localStorage if available
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  describe('Client-side environment (localStorage available)', () => {
    it('should initialize successfully with localStorage available', () => {
      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);
      
      expect(backend).toBeDefined();
    });

    it('should set and get cache entries', async () => {
      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      await backend.set('test-key', 'test-value');
      const result = await backend.get('test-key');
      
      expect(result).not.toBeNull();
      expect(result?.data).toBe('test-value');
    });

    it('should handle cache operations without errors', async () => {
      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      // Test basic operations
      await backend.set('key1', 'value1');
      const hasKey = await backend.has('key1');
      expect(hasKey).toBe(true);

      const deleted = await backend.delete('key1');
      expect(deleted).toBe(true);

      const hasKeyAfterDelete = await backend.has('key1');
      expect(hasKeyAfterDelete).toBe(false);
    });
  });

  describe('Server-side environment (localStorage unavailable)', () => {
    let originalLocalStorage: Storage;

    beforeAll(() => {
      // Save original localStorage
      originalLocalStorage = global.localStorage;
    });

    afterAll(() => {
      // Restore original localStorage
      global.localStorage = originalLocalStorage;
    });

    it('should handle missing localStorage gracefully', () => {
      // Simulate server-side environment by removing localStorage
      delete (global as any).localStorage;

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);
      
      expect(backend).toBeDefined();
    });

    it('should return null for get operations when localStorage unavailable', async () => {
      // Simulate server-side environment
      delete (global as any).localStorage;

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      const result = await backend.get('test-key');
      expect(result).toBeNull();
    });

    it('should handle set operations gracefully when localStorage unavailable', async () => {
      // Simulate server-side environment
      delete (global as any).localStorage;

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      // Should not throw an error
      await expect(backend.set('test-key', 'test-value')).resolves.not.toThrow();
    });

    it('should return false for has operations when localStorage unavailable', async () => {
      // Simulate server-side environment
      delete (global as any).localStorage;

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      const hasKey = await backend.has('test-key');
      expect(hasKey).toBe(false);
    });

    it('should return false for delete operations when localStorage unavailable', async () => {
      // Simulate server-side environment
      delete (global as any).localStorage;

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      const deleted = await backend.delete('test-key');
      expect(deleted).toBe(false);
    });

    it('should return empty array for keys when localStorage unavailable', async () => {
      // Simulate server-side environment
      delete (global as any).localStorage;

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      const keys = await backend.keys();
      expect(keys).toEqual([]);
    });

    it('should return default stats when localStorage unavailable', async () => {
      // Simulate server-side environment
      delete (global as any).localStorage;

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      const stats = await backend.getStats();
      expect(stats).toEqual({
        itemCount: 0,
        hitCount: 0,
        missCount: 0,
        hitRatio: 0,
        backend: 'localStorage',
        backendStats: { error: 'localStorage unavailable' }
      });
    });
  });

  describe('localStorage access errors', () => {
    it('should handle localStorage.getItem errors gracefully', async () => {
      // Mock localStorage to throw an error
      const errorSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      const result = await backend.get('test-key');
      expect(result).toBeNull();

      errorSpy.mockRestore();
    });

    it('should handle localStorage.setItem errors gracefully', async () => {
      // Mock localStorage to throw an error on setItem
      const errorSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      const backend = new LocalStorageCacheBackend('test_cache_', 100, false);

      // Should not throw, but handle gracefully
      await expect(backend.set('test-key', 'test-value')).resolves.not.toThrow();

      errorSpy.mockRestore();
    });
  });
});