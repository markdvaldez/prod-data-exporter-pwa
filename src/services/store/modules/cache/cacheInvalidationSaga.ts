/**
 * Cache Invalidation Saga
 * 
 * Redux-Saga implementation for handling cache invalidation in response to
 * authentication state changes. This saga listens to auth actions and
 * automatically clears cache at the appropriate times.
 */

import { call, put, select, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCacheManager } from '@/services/cache';
import { CacheInvalidationUtils } from '@/hooks/useCacheInvalidation';
import { 
  resetAuthStore, 
  restartAuth, 
  changeHisaPersonId,
  checkAuthData 
} from '@/services/store/modules/auth';
import { selectHisaPersonId } from '@/services/store/modules/auth/selectors';
import { TAuthSagaActions } from '@/services/store/modules/auth/sagaActions';
import { SagaIterator } from 'redux-saga';

/**
 * Clear all cache when user logs out
 */
function* handleLogoutCacheInvalidation(): SagaIterator {
  try {
    console.log('[CacheInvalidationSaga] User logout detected - clearing all cache');
    
    // Clear all cache for security
    yield call([CacheInvalidationUtils, 'emergencyCacheClear'], 'User logout');
    
    // Also clear any localStorage cache manually
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          if (key.includes('avp_cache_') || key.includes('permissions')) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn('Failed to clear localStorage cache on logout:', error);
      }
    }
    
    console.log('[CacheInvalidationSaga] Cache cleared successfully on logout');
  } catch (error) {
    console.error('[CacheInvalidationSaga] Failed to clear cache on logout:', error);
  }
}

/**
 * Clear cache when authentication is restarted (error recovery)
 */
function* handleAuthRestartCacheInvalidation(): SagaIterator {
  try {
    console.log('[CacheInvalidationSaga] Auth restart detected - clearing all cache');
    
    yield call([CacheInvalidationUtils, 'emergencyCacheClear'], 'Authentication restart');
    
    console.log('[CacheInvalidationSaga] Cache cleared successfully on auth restart');
  } catch (error) {
    console.error('[CacheInvalidationSaga] Failed to clear cache on auth restart:', error);
  }
}

/**
 * Handle cache invalidation when user ID changes (login/user switch)
 */
function* handleUserIdChangeCacheInvalidation(action: PayloadAction<{ hisaPersonId: string }>): SagaIterator {
  try {
    const newUserId = action.payload.hisaPersonId;
    const currentUserId: string = yield select(selectHisaPersonId);
    
    if (newUserId && newUserId !== currentUserId) {
      console.log('[CacheInvalidationSaga] User ID change detected', {
        from: currentUserId,
        to: newUserId
      });
      
      if (!currentUserId) {
        // First login - clear all cache for fresh start
        console.log('[CacheInvalidationSaga] First login - clearing all cache');
        yield call([CacheInvalidationUtils, 'emergencyCacheClear'], 'User login');
      } else {
        // User switch - clear old user cache and invalidate new user
        console.log('[CacheInvalidationSaga] User switch - invalidating caches');
        
        // Clear all cache to be safe during user switch
        yield call([CacheInvalidationUtils, 'emergencyCacheClear'], 'User switch');
        
        // Small delay to ensure cache is cleared before new operations
        yield delay(100);
      }
    }
  } catch (error) {
    console.error('[CacheInvalidationSaga] Failed to handle user ID change:', error);
  }
}

/**
 * Handle successful login cache warming
 */
function* handleSuccessfulLoginCacheWarmup(): SagaIterator {
  try {
    // Small delay to let login process complete
    yield delay(1000);
    
    const userId: string = yield select(selectHisaPersonId);
    
    if (userId) {
      console.log('[CacheInvalidationSaga] Starting cache warmup for logged in user:', userId);
      
      // Import CacheWarmingUtils using call effect
      const cacheInvalidationModule: typeof import('@/hooks/useCacheInvalidation') = yield call(() => import('@/hooks/useCacheInvalidation'));
      const { CacheWarmingUtils } = cacheInvalidationModule;
      
      // Warm up cache with common permissions
      yield call([CacheWarmingUtils, 'warmUserCache'], userId, ['system-check'], ['view']);
      
      console.log('[CacheInvalidationSaga] Cache warmup completed for user:', userId);
    }
  } catch (error) {
    console.error('[CacheInvalidationSaga] Failed to warm cache after login:', error);
  }
}

/**
 * Periodic cache cleanup (runs every 5 minutes)
 */
function* performPeriodicCacheCleanup(): SagaIterator {
  try {
    console.log('[CacheInvalidationSaga] Performing periodic cache cleanup');
    
    const result = yield call([CacheInvalidationUtils, 'performScheduledCleanup']);
    
    console.log('[CacheInvalidationSaga] Periodic cache cleanup completed:', result);
    
    // If there are recommendations, log them
    if (result.recommendations && result.recommendations.length > 0) {
      console.log('[CacheInvalidationSaga] Cache optimization recommendations:', result.recommendations);
    }
  } catch (error) {
    console.error('[CacheInvalidationSaga] Failed to perform periodic cache cleanup:', error);
  }
}

/**
 * Handle auth check cache validation
 */
function* handleAuthCheckCacheValidation(): SagaIterator {
  try {
    const userId: string = yield select(selectHisaPersonId);
    
    if (userId) {
      // When auth is checked, validate that cache is still valid for this user
      const cacheManager = getCacheManager();
      const stats = yield call([cacheManager, 'getStats']);
      
      console.log('[CacheInvalidationSaga] Auth check - cache stats:', {
        itemCount: stats.itemCount,
        hitRatio: stats.hitRatio,
        userId
      });
      
      // If cache hit ratio is very low, might indicate stale cache
      if (stats.hitRatio < 0.1 && stats.itemCount > 0) {
        console.log('[CacheInvalidationSaga] Low cache hit ratio detected, clearing stale cache');
        yield call([cacheManager, 'clear']);
      }
    }
  } catch (error) {
    console.error('[CacheInvalidationSaga] Failed to validate cache on auth check:', error);
  }
}

/**
 * Main cache invalidation saga
 */
export function* cacheInvalidationSaga(): SagaIterator {
  yield takeEvery(resetAuthStore, handleLogoutCacheInvalidation);
  yield takeEvery(restartAuth, handleAuthRestartCacheInvalidation);
  yield takeEvery(changeHisaPersonId, handleUserIdChangeCacheInvalidation);
  yield takeLatest(TAuthSagaActions.REQUEST, handleSuccessfulLoginCacheWarmup);
  yield takeEvery(checkAuthData, handleAuthCheckCacheValidation);
  
  // Periodic cleanup every 5 minutes
  // yield takeEvery(channel.take(), performPeriodicCacheCleanup);
  // Note: Uncomment above and implement channel for periodic cleanup if needed
}

/**
 * Enhanced cache invalidation utils with saga integration
 */
export class SagaCacheInvalidationUtils extends CacheInvalidationUtils {
  /**
   * Trigger cache invalidation from saga context
   */
  static* invalidateFromSaga(reason: string, userId?: string) {
    try {
      yield call([CacheInvalidationUtils, 'emergencyCacheClear'], reason);
      
      if (userId) {
        // Also invalidate user-specific cache
        const { invalidateUserPermissions } = yield import('@/services/aws/verifiedPermissions');
        yield call(invalidateUserPermissions, userId);
      }
    } catch (error) {
      console.error('Failed to invalidate cache from saga:', error);
    }
  }

  /**
   * Clear cache with user context from saga
   */
  static* clearUserCacheFromSaga(userId: string, reason: string) {
    try {
      console.log(`[SagaCacheInvalidationUtils] Clearing cache for user ${userId}: ${reason}`);
      
      const { invalidateUserPermissions } = yield import('@/services/aws/verifiedPermissions');
      yield call(invalidateUserPermissions, userId);
      
      console.log(`[SagaCacheInvalidationUtils] User cache cleared successfully for ${userId}`);
    } catch (error) {
      console.error(`Failed to clear cache for user ${userId}:`, error);
    }
  }
}

export default cacheInvalidationSaga;