import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  RunnersData, 
  RunnersDataResponse 
} from '@/Types/runners-qc.types';
import { 
  getMockTransactionLogsPaginated, 
  SearchFilters 
} from '@/services/dummyData/transactionLogs';
import { 
  useRunnersDataQuery,
  convertFiltersToGraphQL,
  convertPaginationToGraphQL,
  RunnersDataVariables
} from './runnersDataQuery';
import { SortEnumType } from '@/services/gql/graphql';
import { RUNNERSQC_CONFIG } from './config';

export interface UseRunnersQCParams {
  page?: number;
  pageSize?: number;
  filters?: SearchFilters;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  useGraphQL?: boolean; // Flag to switch between mock and GraphQL
}

export interface UseRunnersDataResult {
  data: RunnersData[];
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

export const useRunnersQC = ({
  page = 1,
  pageSize = 20,
  filters = {},
  sortBy = 'sk',
  sortDirection = 'desc',
  useGraphQL = RUNNERSQC_CONFIG.USE_GRAPHQL, // Use config default
}: UseRunnersQCParams = {}): UseRunnersDataResult => {
  
  // GraphQL variables
  const graphQLVariables = useMemo((): RunnersDataVariables => {
    if (!useGraphQL) return {};

    const pagination = convertPaginationToGraphQL(page, pageSize);
    const where = convertFiltersToGraphQL(filters);
    
    const order = [{
      [sortBy]: sortDirection === 'asc' ? SortEnumType.Asc : SortEnumType.Desc
    }];

    return {
      ...pagination,
      where,
      order,
    };
  }, [page, pageSize, filters, sortBy, sortDirection, useGraphQL]);

  // GraphQL query (disabled by default)
  const {
    data: graphQLData,
    isLoading: graphQLLoading,
    error: graphQLError,
    refetch: graphQLRefetch,
    isRefetching: graphQLRefetching,
  } = useRunnersDataQuery(graphQLVariables, {
    enabled: useGraphQL,
    staleTime: 5 * 60 * 1000, // 5 minutes
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
  const result = useMemo((): UseRunnersDataResult => {
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
    const totalResults = useGraphQL ? (activeData.totalCount || 0) : (activeData.total || 0);
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
export const useRunnersQCGraphQL = (params: Omit<UseRunnersQCParams, 'useGraphQL'> = {}) => {
  return useRunnersQC({ ...params, useGraphQL: true });
};

/**
 * Hook specifically for mock runner QC data
 * Use this for development and testing
 */
export const useRunnersQCMock = (params: Omit<UseRunnersQCParams, 'useGraphQL'> = {}) => {
  return useRunnersQC({ ...params, useGraphQL: false });
};