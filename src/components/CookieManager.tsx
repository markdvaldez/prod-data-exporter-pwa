'use client';

import { useCookieManagement } from '@/hooks/useCookieManagement';

/**
 * Cookie Manager Component
 * 
 * A background component that automatically monitors and manages cookie sizes
 * to prevent "400 Bad Request - Request Header Or Cookie Too Large" errors.
 * 
 * This component:
 * - Runs automatic cookie size monitoring
 * - Performs periodic cleanup of stale cookies
 * - Operates silently in the background
 * - Should be included once in the app layout
 * 
 * @returns null (no UI rendered)
 */
export const CookieManager = () => {
  // Initialize cookie management (monitoring + cleanup)
  useCookieManagement();
  
  // This component doesn't render any UI
  return null;
};