/**
 * Example implementations for user cache invalidation scenarios
 * 
 * This file demonstrates common patterns for clearing cache when user
 * information is updated in various scenarios.
 */

import { useCallback } from 'react';
import { useUserCacheInvalidation, useCacheManager, CacheInvalidationUtils } from '@/hooks/useCacheInvalidation';

/**
 * Hook for handling user profile updates with cache invalidation
 */
export function useUserProfileWithCache() {
  const { invalidateCurrentUser, invalidateUser } = useUserCacheInvalidation();
  const { invalidateByTags } = useCacheManager();

  const updateUserProfile = useCallback(async (
    userId: string,
    profileData: any,
    updateApi: (data: any) => Promise<void>
  ) => {
    try {
      // 1. Update the user profile via API
      await updateApi(profileData);
      
      // 2. Invalidate user-specific cache
      await invalidateUser(userId);
      
      // 3. If profile changes affect permissions, invalidate related cache
      if (profileData.roles || profileData.permissions) {
        await CacheInvalidationUtils.onUserPermissionsChanged(
          userId, 
          profileData.roles
        );
      }
      
      console.log('User profile updated and cache invalidated');
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  }, [invalidateUser]);

  return { updateUserProfile };
}

/**
 * Hook for handling user role/permission changes
 */
export function useUserRoleManagement() {
  const { invalidateUser } = useUserCacheInvalidation();
  const { invalidateByTags } = useCacheManager();

  const assignRole = useCallback(async (
    userId: string,
    newRole: string,
    assignRoleApi: (userId: string, role: string) => Promise<void>
  ) => {
    try {
      // 1. Assign role via API
      await assignRoleApi(userId, newRole);
      
      // 2. Invalidate user permissions cache
      await CacheInvalidationUtils.onUserPermissionsChanged(userId, [newRole]);
      
      // 3. Also invalidate role-specific cache
      await invalidateByTags([`role:${newRole}`]);
      
      console.log(`Role ${newRole} assigned to user ${userId}, cache invalidated`);
    } catch (error) {
      console.error('Failed to assign role:', error);
      throw error;
    }
  }, [invalidateByTags]);

  const removeRole = useCallback(async (
    userId: string,
    roleToRemove: string,
    removeRoleApi: (userId: string, role: string) => Promise<void>
  ) => {
    try {
      // 1. Remove role via API
      await removeRoleApi(userId, roleToRemove);
      
      // 2. Invalidate user permissions cache
      await invalidateUser(userId);
      
      // 3. Invalidate role-specific cache
      await invalidateByTags([`role:${roleToRemove}`, `user:${userId}`]);
      
      console.log(`Role ${roleToRemove} removed from user ${userId}, cache invalidated`);
    } catch (error) {
      console.error('Failed to remove role:', error);
      throw error;
    }
  }, [invalidateUser, invalidateByTags]);

  return { assignRole, removeRole };
}

/**
 * Hook for handling user session management with cache
 */
export function useUserSessionWithCache() {
  const { invalidateCurrentUser } = useUserCacheInvalidation();
  const { clearAllCache } = useCacheManager();

  const login = useCallback(async (
    credentials: any,
    loginApi: (creds: any) => Promise<{ userId: string }>
  ) => {
    try {
      // 1. Login via API
      const result = await loginApi(credentials);
      
      // 2. Cache is automatically invalidated by useAuthCacheInvalidation
      // when the userId changes, but we can also manually trigger it
      await invalidateCurrentUser();
      
      console.log('User logged in, cache invalidated');
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [invalidateCurrentUser]);

  const logout = useCallback(async (
    logoutApi: () => Promise<void>
  ) => {
    try {
      // 1. Clear sensitive cache before logout
      await clearAllCache();
      
      // 2. Logout via API
      await logoutApi();
      
      console.log('User logged out, cache cleared');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }, [clearAllCache]);

  return { login, logout };
}

/**
 * Hook for bulk user operations with cache management
 */
export function useBulkUserOperations() {
  const { invalidateUser } = useUserCacheInvalidation();
  const { invalidateByTags, invalidateByPattern } = useCacheManager();

  const bulkUpdateUsers = useCallback(async (
    userIds: string[],
    updateData: any,
    bulkUpdateApi: (ids: string[], data: any) => Promise<void>
  ) => {
    try {
      // 1. Perform bulk update
      await bulkUpdateApi(userIds, updateData);
      
      // 2. Invalidate cache for all affected users
      await Promise.all(userIds.map(userId => invalidateUser(userId)));
      
      // 3. If permissions changed, invalidate related patterns
      if (updateData.roles || updateData.permissions) {
        await invalidateByPattern('permissions:*');
      }
      
      console.log(`Bulk updated ${userIds.length} users, cache invalidated`);
    } catch (error) {
      console.error('Bulk update failed:', error);
      throw error;
    }
  }, [invalidateUser, invalidateByPattern]);

  const bulkDeleteUsers = useCallback(async (
    userIds: string[],
    deleteApi: (ids: string[]) => Promise<void>
  ) => {
    try {
      // 1. Delete users via API
      await deleteApi(userIds);
      
      // 2. Clean up cache for deleted users
      await Promise.all(userIds.map(userId => 
        invalidateByTags([`user:${userId}`, `permissions:${userId}`])
      ));
      
      console.log(`Bulk deleted ${userIds.length} users, cache cleaned up`);
    } catch (error) {
      console.error('Bulk delete failed:', error);
      throw error;
    }
  }, [invalidateByTags]);

  return { bulkUpdateUsers, bulkDeleteUsers };
}

/**
 * Hook for resource access management affecting users
 */
export function useResourceAccessManagement() {
  const { invalidateUser } = useUserCacheInvalidation();
  const { invalidateByTags } = useCacheManager();

  const grantResourceAccess = useCallback(async (
    resourceId: string,
    userIds: string[],
    permissions: string[],
    grantAccessApi: (resourceId: string, userIds: string[], perms: string[]) => Promise<void>
  ) => {
    try {
      // 1. Grant access via API
      await grantAccessApi(resourceId, userIds, permissions);
      
      // 2. Use resource access utility for proper invalidation
      await CacheInvalidationUtils.onResourceAccessChanged(resourceId, userIds);
      
      console.log(`Granted access to resource ${resourceId} for ${userIds.length} users`);
    } catch (error) {
      console.error('Failed to grant resource access:', error);
      throw error;
    }
  }, []);

  const revokeResourceAccess = useCallback(async (
    resourceId: string,
    userIds: string[],
    revokeAccessApi: (resourceId: string, userIds: string[]) => Promise<void>
  ) => {
    try {
      // 1. Revoke access via API
      await revokeAccessApi(resourceId, userIds);
      
      // 2. Invalidate affected caches
      await CacheInvalidationUtils.onResourceAccessChanged(resourceId, userIds);
      
      console.log(`Revoked access to resource ${resourceId} for ${userIds.length} users`);
    } catch (error) {
      console.error('Failed to revoke resource access:', error);
      throw error;
    }
  }, []);

  return { grantResourceAccess, revokeResourceAccess };
}

/**
 * Hook for emergency cache operations
 */
export function useEmergencyCacheOperations() {
  const { clearAllCache } = useCacheManager();

  const emergencySecurityClear = useCallback(async (reason: string) => {
    // For security incidents - clear everything immediately
    await CacheInvalidationUtils.emergencyCacheClear(reason);
    
    console.warn(`Emergency cache clear executed: ${reason}`);
  }, []);

  const scheduledMaintenance = useCallback(async () => {
    // For maintenance windows - clean up expired items and optimize
    const result = await CacheInvalidationUtils.performScheduledCleanup();
    
    console.log('Scheduled cache maintenance completed:', result);
    return result;
  }, []);

  return { emergencySecurityClear, scheduledMaintenance };
}