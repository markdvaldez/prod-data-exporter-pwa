import { useEffect } from 'react';
import { clearStaleCognitoCookies, getCookieHeaderSize } from '@/services/aws/simplifiedCookieStorage';
import getAwsConfig from '@/services/aws/aws-exports';

/**
 * Cookie Management Hook
 * 
 * Provides automatic cookie size monitoring and cleanup to prevent
 * "400 Bad Request - Request Header Or Cookie Too Large" errors.
 * 
 * Features:
 * - Monitors cookie header size on mount and periodically
 * - Automatically cleans up stale Cognito cookies when size exceeds 6KB
 * - Provides manual cleanup functions
 * - Runs cleanup every 30 minutes
 * 
 * @returns Object with manual cleanup functions
 */
export const useCookieManagement = () => {
  useEffect(() => {
    /**
     * Main cookie management function
     * Checks current cookie header size and triggers cleanup if needed
     */
    const manageCookies = async () => {
      const headerSize = getCookieHeaderSize();
      const maxSafeSize = 6144; // 6KB threshold (server limit ~8KB)
      
      if (headerSize > maxSafeSize) {
        console.warn(`Cookie header size (${headerSize} bytes) exceeds safe limit. Cleaning up...`);
        
        try {
          const { Cognito } = getAwsConfig();
          await clearStaleCognitoCookies(Cognito.userPoolClientId);
          
          const newSize = getCookieHeaderSize();
          console.log(`Cookie cleanup complete. New size: ${newSize} bytes`);
        } catch (error) {
          console.error('Failed to clean up cookies:', error);
        }
      }
    };

    // Run on mount to check initial state
    manageCookies();

    // Set up periodic cleanup every 30 minutes
    const interval = setInterval(manageCookies, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    /**
     * Manually trigger cookie cleanup
     * Useful for testing or emergency cleanup
     */
    cleanupCookies: async () => {
      const { Cognito } = getAwsConfig();
      await clearStaleCognitoCookies(Cognito.userPoolClientId);
    },
    /**
     * Get current cookie header size in bytes
     * Useful for monitoring and debugging
     */
    getCookieSize: getCookieHeaderSize,
  };
};