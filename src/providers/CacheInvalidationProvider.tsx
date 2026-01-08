'use client'
/**
 * Cache Invalidation Provider
 * 
 * A React provider that automatically handles cache invalidation for login/logout
 * scenarios and integrates with the Redux auth state to ensure cache consistency.
 * 
 * This provider should be included in the app layout to enable automatic
 * cache management throughout the application lifecycle.
 */

import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectHisaPersonId } from '@/services/store/modules/auth/selectors';
import { useAuthCacheInvalidation, CacheInvalidationUtils } from '@/hooks/useCacheInvalidation';

interface CacheInvalidationProviderProps {
  children: React.ReactNode;
  /** Whether to enable debug logging for cache invalidation events */
  debug?: boolean;
  /** Custom callback for when cache is invalidated */
  onCacheInvalidated?: (reason: string, userId?: string) => void;
}

/**
 * Provider component that automatically manages cache invalidation based on authentication state
 */
export const CacheInvalidationProvider: React.FC<CacheInvalidationProviderProps> = ({
  children,
  debug = false,
  onCacheInvalidated
}) => {
  // Use the enhanced auth cache invalidation hook
  const { userId, isAuthenticated, previousUserId } = useAuthCacheInvalidation();
  
  // Track if this is the initial mount
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip invalidation on initial mount to avoid clearing cache unnecessarily
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Log cache invalidation events if debug is enabled
    if (debug) {
      if (!previousUserId && userId) {
        console.log('[CacheInvalidationProvider] User login detected', { userId });
      } else if (previousUserId && !userId) {
        console.log('[CacheInvalidationProvider] User logout detected', { previousUserId });
      } else if (previousUserId && userId && previousUserId !== userId) {
        console.log('[CacheInvalidationProvider] User switch detected', { 
          from: previousUserId, 
          to: userId 
        });
      }
    }

    // Call custom callback if provided
    if (onCacheInvalidated) {
      if (!previousUserId && userId) {
        onCacheInvalidated('login', userId);
      } else if (previousUserId && !userId) {
        onCacheInvalidated('logout', previousUserId);
      } else if (previousUserId && userId && previousUserId !== userId) {
        onCacheInvalidated('user_switch', userId);
      }
    }
  }, [userId, previousUserId, debug, onCacheInvalidated]);

  // Handle app visibility changes (user switches tabs/apps)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isAuthenticated) {
        // When app becomes visible again, we might want to refresh cache
        // for security-sensitive applications
        if (debug) {
          console.log('[CacheInvalidationProvider] App became visible, user still authenticated');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isAuthenticated, debug]);

  // Handle storage events (user logs in/out in another tab)
  useEffect(() => {
    const handleStorageChange = async (event: StorageEvent) => {
      // Check for auth-related storage changes
      if (event.key?.includes('auth') || event.key?.includes('cognito')) {
        if (debug) {
          console.log('[CacheInvalidationProvider] Auth storage change detected', {
            key: event.key,
            oldValue: event.oldValue,
            newValue: event.newValue
          });
        }

        // Clear cache when auth state changes in other tabs
        try {
          await CacheInvalidationUtils.emergencyCacheClear('Auth storage change detected');
          onCacheInvalidated?.('storage_change', userId);
        } catch (error) {
          console.error('Failed to clear cache on storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [debug, onCacheInvalidated, userId]);

  // Cleanup cache on page unload for security
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isAuthenticated) {
        // Note: This runs synchronously and may not complete
        // It's more of a best-effort cleanup
        try {
          if (debug) {
            console.log('[CacheInvalidationProvider] Page unload - clearing cache');
          }
          // Use synchronous localStorage clear if available
          const keys = Object.keys(localStorage);
          keys.forEach(key => {
            if (key.includes('avp_cache_') || key.includes('permissions')) {
              localStorage.removeItem(key);
            }
          });
        } catch (error) {
          // Silently fail - browser might be restricting access
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAuthenticated, debug]);

  return <>{children}</>;
};

/**
 * Hook for components that need to respond to cache invalidation events
 */
export const useCacheInvalidationEvents = (
  callback: (event: 'login' | 'logout' | 'user_switch' | 'storage_change', userId?: string) => void
) => {
  const userId = useSelector(selectHisaPersonId);
  const previousUserId = useRef<string | undefined>(undefined);

  useEffect(() => {
    const prev = previousUserId.current;
    
    if (prev !== userId) {
      if (!prev && userId) {
        callback('login', userId);
      } else if (prev && !userId) {
        callback('logout', prev);
      } else if (prev && userId && prev !== userId) {
        callback('user_switch', userId);
      }
      
      previousUserId.current = userId;
    }
  }, [userId, callback]);

  return { userId, isAuthenticated: Boolean(userId) };
};

/**
 * Higher-order component that adds automatic cache invalidation
 */
export function withCacheInvalidation<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options?: {
    debug?: boolean;
    onCacheInvalidated?: (reason: string, userId?: string) => void;
  }
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  const WithCacheInvalidationComponent = (props: P) => {
    return (
      <CacheInvalidationProvider 
        debug={options?.debug}
        onCacheInvalidated={options?.onCacheInvalidated}
      >
        <WrappedComponent {...props} />
      </CacheInvalidationProvider>
    );
  };

  WithCacheInvalidationComponent.displayName = `withCacheInvalidation(${displayName})`;
  
  return WithCacheInvalidationComponent;
}

export default CacheInvalidationProvider;