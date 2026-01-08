/**
 * Cache Performance Monitor Component
 * 
 * A React component for monitoring cache performance, cost savings,
 * and optimization recommendations for AWS Verified Permissions caching.
 */

import React, { useState, useEffect } from 'react';
import { useCacheMonitoring, useCacheManager } from '@/hooks/useCacheInvalidation';

interface CacheMetricsDisplayProps {
  /** Whether to show detailed metrics */
  detailed?: boolean;
  /** Refresh interval in milliseconds */
  refreshInterval?: number;
  /** Whether to show cost savings information */
  showCostSavings?: boolean;
  /** Whether to show optimization recommendations */
  showRecommendations?: boolean;
}

export const CacheMetricsDisplay: React.FC<CacheMetricsDisplayProps> = ({
  detailed = false,
  refreshInterval = 30000, // 30 seconds
  showCostSavings = true,
  showRecommendations = true
}) => {
  const { getPerformanceMetrics, getOptimizationRecommendations } = useCacheMonitoring();
  const [metrics, setMetrics] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const refreshMetrics = async () => {
      try {
        setIsLoading(true);
        const [performanceMetrics, optimizationRecs] = await Promise.all([
          getPerformanceMetrics(),
          showRecommendations ? getOptimizationRecommendations() : Promise.resolve([])
        ]);
        
        setMetrics(performanceMetrics);
        setRecommendations(optimizationRecs);
        setError(undefined);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metrics');
      } finally {
        setIsLoading(false);
      }
    };

    refreshMetrics();
    
    const interval = setInterval(refreshMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval, getPerformanceMetrics, getOptimizationRecommendations, showRecommendations]);

  const manualRefresh = async () => {
    try {
      setIsLoading(true);
      const [performanceMetrics, optimizationRecs] = await Promise.all([
        getPerformanceMetrics(),
        showRecommendations ? getOptimizationRecommendations() : Promise.resolve([])
      ]);
      
      setMetrics(performanceMetrics);
      setRecommendations(optimizationRecs);
      setError(undefined);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load metrics');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !metrics) {
    return (
      <div className="cache-metrics-loading">
        <div>Loading cache metrics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cache-metrics-error">
        <div>Error loading cache metrics: {error}</div>
        <button onClick={manualRefresh}>Retry</button>
      </div>
    );
  }

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;
  const formatCurrency = (value: number) => `$${value.toFixed(4)}`;
  const formatTime = (value: number) => `${value.toFixed(1)}ms`;

  return (
    <div className="cache-metrics-display">
      <div className="cache-metrics-header">
        <h3>Cache Performance</h3>
        <button onClick={manualRefresh} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Basic Metrics */}
      <div className="cache-metrics-basic">
        <div className="metric-card">
          <div className="metric-label">Hit Rate</div>
          <div className={`metric-value ${metrics.hitRate > 0.7 ? 'good' : metrics.hitRate > 0.5 ? 'warning' : 'poor'}`}>
            {formatPercentage(metrics.hitRate)}
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Cache Items</div>
          <div className="metric-value">{metrics.itemCount}</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Health</div>
          <div className={`metric-value ${metrics.healthStatus === 'healthy' ? 'good' : metrics.healthStatus === 'warning' ? 'warning' : 'poor'}`}>
            {metrics.healthStatus}
          </div>
        </div>
      </div>

      {/* Cost Savings */}
      {showCostSavings && (
        <div className="cache-metrics-cost">
          <h4>Cost Savings</h4>
          <div className="cost-metrics">
            <div className="cost-metric">
              <span>API Calls Avoided:</span>
              <span>{metrics.apiCallsAvoided}</span>
            </div>
            <div className="cost-metric">
              <span>Estimated Savings:</span>
              <span className="savings-amount">{formatCurrency(metrics.estimatedSavings)}</span>
            </div>
            <div className="cost-metric">
              <span>Cost per Call:</span>
              <span>{formatCurrency(metrics.costPerCall)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Metrics */}
      {detailed && (
        <div className="cache-metrics-detailed">
          <h4>Performance Details</h4>
          <div className="performance-metrics">
            <div className="perf-metric">
              <span>Cache Lookup Time:</span>
              <span>{formatTime(metrics.avgCacheLookupTime)}</span>
            </div>
            <div className="perf-metric">
              <span>API Call Time:</span>
              <span>{formatTime(metrics.avgApiCallTime)}</span>
            </div>
            <div className="perf-metric">
              <span>Time Saved:</span>
              <span className="time-saved">{formatTime(metrics.timeSaved)}</span>
            </div>
            <div className="perf-metric">
              <span>Memory Usage:</span>
              <span>{metrics.memoryUsage ? `${(metrics.memoryUsage / 1024 / 1024).toFixed(2)} MB` : 'N/A'}</span>
            </div>
          </div>

          <div className="cache-activity">
            <div className="activity-metric">
              <span>Cache Hits:</span>
              <span>{metrics.hitCount}</span>
            </div>
            <div className="activity-metric">
              <span>Cache Misses:</span>
              <span>{metrics.missCount}</span>
            </div>
          </div>
        </div>
      )}

      {/* Health Alerts */}
      {metrics.healthAlerts && metrics.healthAlerts.length > 0 && (
        <div className="cache-alerts">
          <h4>Health Alerts</h4>
          {metrics.healthAlerts.map((alert: string, index: number) => (
            <div key={index} className="alert-item warning">
              {alert}
            </div>
          ))}
        </div>
      )}

      {/* Optimization Recommendations */}
      {showRecommendations && recommendations.length > 0 && (
        <div className="cache-recommendations">
          <h4>Optimization Recommendations</h4>
          {recommendations.map((recommendation, index) => (
            <div key={index} className="recommendation-item">
              {recommendation}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Cache Control Panel Component
 */
interface CacheControlPanelProps {
  /** Whether to show advanced controls */
  showAdvanced?: boolean;
}

export const CacheControlPanel: React.FC<CacheControlPanelProps> = ({
  showAdvanced = false
}) => {
  const { clearAllCache, invalidateByTags, invalidateByPattern } = useCacheManager();
  const [isClearing, setIsClearing] = useState(false);
  const [customTags, setCustomTags] = useState('');
  const [customPattern, setCustomPattern] = useState('');
  const [message, setMessage] = useState<string>();

  const handleClearAll = async () => {
    if (!confirm('Are you sure you want to clear all cache? This will temporarily reduce performance.')) {
      return;
    }

    setIsClearing(true);
    try {
      await clearAllCache();
      setMessage('Cache cleared successfully');
    } catch (error) {
      setMessage(`Error clearing cache: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsClearing(false);
    }
  };

  const handleInvalidateByTags = async () => {
    if (!customTags.trim()) return;

    try {
      const tags = customTags.split(',').map(tag => tag.trim());
      const count = await invalidateByTags(tags);
      setMessage(`Invalidated ${count} items with tags: ${tags.join(', ')}`);
      setCustomTags('');
    } catch (error) {
      setMessage(`Error invalidating by tags: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleInvalidateByPattern = async () => {
    if (!customPattern.trim()) return;

    try {
      const count = await invalidateByPattern(customPattern);
      setMessage(`Invalidated ${count} items matching pattern: ${customPattern}`);
      setCustomPattern('');
    } catch (error) {
      setMessage(`Error invalidating by pattern: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="cache-control-panel">
      <h3>Cache Controls</h3>

      {message && (
        <div className="control-message">
          {message}
        </div>
      )}

      {/* Basic Controls */}
      <div className="basic-controls">
        <button 
          onClick={handleClearAll}
          disabled={isClearing}
          className="clear-cache-btn"
        >
          {isClearing ? 'Clearing...' : 'Clear All Cache'}
        </button>
      </div>

      {/* Advanced Controls */}
      {showAdvanced && (
        <div className="advanced-controls">
          <div className="control-group">
            <label>Invalidate by Tags (comma-separated):</label>
            <div className="input-group">
              <input
                type="text"
                value={customTags}
                onChange={(e) => setCustomTags(e.target.value)}
                placeholder="user:123, permissions:456"
              />
              <button onClick={handleInvalidateByTags}>Invalidate</button>
            </div>
          </div>

          <div className="control-group">
            <label>Invalidate by Pattern:</label>
            <div className="input-group">
              <input
                type="text"
                value={customPattern}
                onChange={(e) => setCustomPattern(e.target.value)}
                placeholder="perm:1.0:user123:*"
              />
              <button onClick={handleInvalidateByPattern}>Invalidate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Hook for real-time cache monitoring
 */
export function useRealTimeCacheMonitoring(interval: number = 5000) {
  const { getPerformanceMetrics } = useCacheMonitoring();
  const [metrics, setMetrics] = useState<any>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const startMonitoring = () => {
    setIsMonitoring(true);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
  };

  useEffect(() => {
    if (!isMonitoring) return;

    const updateMetrics = async () => {
      try {
        const currentMetrics = await getPerformanceMetrics();
        setMetrics(currentMetrics);
      } catch (error) {
        console.error('Error updating cache metrics:', error);
      }
    };

    updateMetrics();
    const intervalId = setInterval(updateMetrics, interval);

    return () => clearInterval(intervalId);
  }, [isMonitoring, interval, getPerformanceMetrics]);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring
  };
}

/**
 * Cache event logger for debugging
 */
export class CacheEventLogger {
  private static logs: Array<{
    timestamp: number;
    event: string;
    details: any;
  }> = [];

  static log(event: string, details: any = {}) {
    this.logs.push({
      timestamp: Date.now(),
      event,
      details
    });

    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(-100);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Cache Event] ${event}`, details);
    }
  }

  static getLogs() {
    return [...this.logs];
  }

  static clearLogs() {
    this.logs = [];
  }

  static exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}