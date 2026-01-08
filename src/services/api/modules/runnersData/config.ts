/**
 * Configuration for Runners QC data source
 * 
 * Toggle between mock data and GraphQL:
 * - Mock: Fast development with realistic dummy data
 * - GraphQL: Production-ready with real API integration
 */

export const RUNNERSQC_CONFIG = {
  // Set to true when GraphQL schema includes Runner QC types
  USE_GRAPHQL: true,
  
  // Default pagination settings
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  
  // Query settings
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  REFETCH_ON_WINDOW_FOCUS: false,
  
  // Mock data settings
  MOCK_API_DELAY: 300, // milliseconds
  
  // Feature flags
  FEATURES: {
    REAL_TIME_UPDATES: false, // Enable WebSocket updates
    EXPORT_FUNCTIONALITY: true,
    ADVANCED_FILTERING: true,
  }
} as const;

export type RunnersQCConfig = typeof RUNNERSQC_CONFIG;