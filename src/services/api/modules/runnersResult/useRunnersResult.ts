import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMockRunnersResultPaginated } from '@/services/dummyData/mockData';
import { 
  RunnersResult, 
  RunnersResultResponse 
} from '@/Types/runners-result.types';
import { 
  useRunnersResultQuery,
  convertFiltersToGraphQL,
  convertPaginationToGraphQL,
  convertQueryParamsToGraphQL,
  RunnersResultVariables
} from './runnersResultQuery';
import { SortEnumType } from '@/services/gql/graphql';
import { RUNNERS_RESULT_CONFIG } from './config';



export interface SearchFilters {
  searchTerm?: string;
  id?: string;
  timestamp?: string;
}

export interface UseRunnersResultParams {
  page?: number;
  pageSize?: number;
  filters?: SearchFilters;
  queryParams?: Record<string, any>;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  useGraphQL?: boolean; // Flag to switch between mock and GraphQL
}

export interface UseRunnersResultData {
  data: RunnersResult[];
  loading: boolean;
  error: Error | null;
  totalResults: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  refetch: () => void;
  isRefetching: boolean;
}

export const useRunnersResult = ({
  page = 1,
  pageSize = 5,
  filters = {},
  queryParams = {},
  sortBy = 'timestamp',
  sortDirection = 'desc',
  useGraphQL = RUNNERS_RESULT_CONFIG.USE_GRAPHQL, // Use config default
}: UseRunnersResultParams = {}): UseRunnersResultData => {
  
  // GraphQL variables
  const graphQLVariables = useMemo((): RunnersResultVariables => {
    if (!useGraphQL) return {
         filter: {
            dateRange: undefined
        }
    };

    const pagination = convertPaginationToGraphQL(page, pageSize);
    const where = convertFiltersToGraphQL(filters);
    const queryParamsGraphQL = convertQueryParamsToGraphQL(queryParams);
    
    const order = [{
      [sortBy]: sortDirection === 'asc' ? SortEnumType.Asc : SortEnumType.Desc
    }];

    return {
      ...pagination,
      filter: queryParamsGraphQL,
      where,
      order,
    };
  }, [page, pageSize, filters, queryParams, sortBy, sortDirection, useGraphQL]);

  // GraphQL query (disabled by default)
  console.log('variables', graphQLVariables, useGraphQL);
  const {
    data: graphQLData,
    isLoading: graphQLLoading,
    error: graphQLError,
    refetch: graphQLRefetch,
    isRefetching: graphQLRefetching,
  } = useRunnersResultQuery(graphQLVariables, {
    enabled: useGraphQL,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Mock data query
  const {
    data: mockData,
    isLoading: mockLoading,
    error: mockError,
    refetch: mockRefetch,
    isRefetching: mockRefetching,
  } = useQuery<RunnersResultResponse, Error>({
    queryKey: ['transactionLogs', 'mock', page, pageSize, filters, sortBy, sortDirection],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const hasFilters = Object.entries(filters).some(([key, value]) => 
        value !== undefined && value !== ''
      );
      
      return getMockRunnersResultPaginated(
        page, 
        pageSize, 
        hasFilters ? filters : undefined
      );
    },
    enabled: true,
    staleTime: 2 * 60 * 1000, // 2 minutes for mock data
    refetchOnWindowFocus: false,
  });

  // Select the appropriate data source
  console.log('graphQLData', graphQLData, useGraphQL);
  const activeData = graphQLData
  const loading = graphQLLoading
  const error = graphQLError
  const refetch = graphQLRefetch
  const isRefetching = graphQLRefetching

  // Memoized result
  const result = useMemo((): UseRunnersResultData => {
    if (!activeData) {
      return {
        data: [],
        loading,
        error,
        totalResults: 0,
        totalPages: 0,
        currentPage: page,
        hasNextPage: false,
        hasPreviousPage: false,
        refetch,
        isRefetching,
      };
    }

    // For GraphQL, use totalCount; for mock data, use total
    const totalResults = useGraphQL ? (activeData.totalCount || 0) : (activeData.count || 0);
    const totalPages = Math.ceil(totalResults / pageSize);
    return {
      data: activeData.items || [],
      loading,
      error,
      totalResults,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      refetch,
      isRefetching,
    };
  }, [activeData, loading, error, page, pageSize, refetch, isRefetching, useGraphQL]);

  return result;
};

/**
 * Hook specifically for GraphQL-based runner QC data
 * Use this when you want to force GraphQL usage
 */
export const useRunnersResultGraphQL = (params: Omit<UseRunnersResultParams, 'useGraphQL'> = {}) => {
  return useRunnersResult({ ...params, useGraphQL: true });
};

