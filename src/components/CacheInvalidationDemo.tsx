'use client'
/**
 * Example component demonstrating automatic cache invalidation for login/logout scenarios
 * 
 * This component shows how the cache invalidation system works automatically
 * when users log in, log out, or switch accounts.
 */

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectHisaPersonId } from '@/services/store/modules/auth/selectors';
import { useCacheInvalidationEvents } from '@/providers/CacheInvalidationProvider';
import { useCacheMonitoring } from '@/hooks/useCacheInvalidation';

interface CacheEventLog {
  timestamp: string;
  event: string;
  userId?: string;
  details: string;
}

export const CacheInvalidationDemo: React.FC = () => {
  const userId = useSelector(selectHisaPersonId);
  const { getPerformanceMetrics } = useCacheMonitoring();
  const [eventLog, setEventLog] = useState<CacheEventLog[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  // Listen to cache invalidation events
  useCacheInvalidationEvents((event, eventUserId) => {
    const logEntry: CacheEventLog = {
      timestamp: new Date().toLocaleTimeString(),
      event,
      userId: eventUserId,
      details: getEventDetails(event, eventUserId)
    };
    
    setEventLog(prev => [logEntry, ...prev.slice(0, 9)]); // Keep last 10 events
    
    // Refresh metrics after cache events
    setTimeout(() => {
      getPerformanceMetrics().then(setMetrics).catch(console.error);
    }, 1000);
  });

  // Load initial metrics
  useEffect(() => {
    getPerformanceMetrics().then(setMetrics).catch(console.error);
  }, [getPerformanceMetrics]);

  const getEventDetails = (event: string, eventUserId?: string): string => {
    switch (event) {
      case 'login':
        return `User ${eventUserId} logged in - cache cleared for fresh start`;
      case 'logout':
        return `User ${eventUserId} logged out - cache cleared for security`;
      case 'user_switch':
        return `User switched to ${eventUserId} - cache invalidated`;
      case 'storage_change':
        return 'Auth storage changed in another tab - cache cleared';
      default:
        return `Cache event: ${event}`;
    }
  };

  const formatMetricValue = (value: number | undefined, suffix = ''): string => {
    if (value === undefined) return 'N/A';
    if (suffix === '%') return `${(value * 100).toFixed(1)}%`;
    if (suffix === 'ms') return `${value.toFixed(1)}ms`;
    if (suffix === '$') return `$${value.toFixed(4)}`;
    return value.toString();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Cache Invalidation Demo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Status</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p><strong>User ID:</strong> {userId || 'Not logged in'}</p>
              <p><strong>Status:</strong> {userId ? '✅ Authenticated' : '❌ Not authenticated'}</p>
            </div>
          </div>

          {/* Cache Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Cache Performance</h3>
            {metrics ? (
              <div className="bg-gray-50 p-4 rounded-md space-y-2 text-sm">
                <p><strong>Hit Rate:</strong> {formatMetricValue(metrics.hitRate, '%')}</p>
                <p><strong>Items Cached:</strong> {metrics.itemCount || 0}</p>
                <p><strong>API Calls Avoided:</strong> {metrics.apiCallsAvoided || 0}</p>
                <p><strong>Cost Savings:</strong> {formatMetricValue(metrics.estimatedSavings, '$')}</p>
                <p><strong>Avg Lookup Time:</strong> {formatMetricValue(metrics.avgCacheLookupTime, 'ms')}</p>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-md">
                <p>Loading metrics...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium mb-4">Cache Invalidation Events</h3>
        
        {eventLog.length > 0 ? (
          <div className="space-y-2">
            {eventLog.map((entry, index) => (
              <div key={index} className="flex items-start space-x-3 py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500 min-w-[80px]">
                  {entry.timestamp}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventColor(entry.event)}`}>
                  {entry.event.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-sm text-gray-700 flex-1">
                  {entry.details}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center py-8">
            <p>No cache invalidation events yet.</p>
            <p className="text-sm mt-2">Login, logout, or switch users to see automatic cache management in action.</p>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-2">How It Works</h3>
        <div className="text-sm space-y-2">
          <p>🔄 <strong>Login:</strong> Cache is cleared when you log in to ensure fresh data</p>
          <p>🔒 <strong>Logout:</strong> Cache is cleared when you log out for security</p>
          <p>👥 <strong>User Switch:</strong> Cache is invalidated when switching between user accounts</p>
          <p>🔁 <strong>Storage Changes:</strong> Cache is cleared if auth changes are detected in other tabs</p>
          <p>🧹 <strong>Page Unload:</strong> Cache is cleaned up when the page is closed</p>
        </div>
      </div>
    </div>
  );
};

const getEventColor = (event: string): string => {
  switch (event) {
    case 'login':
      return 'bg-green-100 text-green-800';
    case 'logout':
      return 'bg-red-100 text-red-800';
    case 'user_switch':
      return 'bg-blue-100 text-blue-800';
    case 'storage_change':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default CacheInvalidationDemo;