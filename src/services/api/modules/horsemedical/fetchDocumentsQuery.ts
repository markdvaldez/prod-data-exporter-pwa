import { DocumentFileResponse } from '@/Types';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { apiClient } from '../../api';

type TFetchHorseMedicalDocumentsOptions = Omit<
  UseQueryOptions<DocumentFileResponse[], Error, DocumentFileResponse[]>,
  "queryKey" | "queryFn"
>;

async function fetchHorseMedicalDocuments(
  horseMedicalId: string
): Promise<DocumentFileResponse[]> {
  const response = await apiClient.get<DocumentFileResponse[]>(
    `/horsemedical/${horseMedicalId}/document/all`,
    {
      params: {
        page: 0,
        pageSize: 1000,
        sortBy: 'date',
        sortDirection: 2,
      },
    }
  );
  return response.data;
}

export function useFetchHorseMedicalDocuments(
  horseMedicalId: string,
  options?: TFetchHorseMedicalDocumentsOptions
): UseQueryResult<DocumentFileResponse[], Error> {
  return useQuery<DocumentFileResponse[], Error>({
    queryKey: ["horseMedicalDocuments", horseMedicalId] as const,
    queryFn: () => fetchHorseMedicalDocuments(horseMedicalId),
    ...options,
  });
}