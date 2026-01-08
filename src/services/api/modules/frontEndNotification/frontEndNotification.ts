import { FrontEndNotificationFullResponse } from "@/Types";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { apiClient } from "../../api";

type TFetchActiveByPageOptions = Omit<
  UseQueryOptions<
    FrontEndNotificationFullResponse[],
    Error,
    FrontEndNotificationFullResponse[]
  >,
  "queryKey" | "queryFn"
>;

async function fetchActiveByPageFn(
  pageId: string
): Promise<FrontEndNotificationFullResponse[]> {
  const response = await apiClient.get<FrontEndNotificationFullResponse[]>(
    `/frontendnotification/get-active-by-page-and-user/${pageId}`
  );
  return response.data;
}

export function useFetchActiveByPage(
  pageId: string,
  options?: TFetchActiveByPageOptions
): UseQueryResult<FrontEndNotificationFullResponse[], Error> {
  return useQuery<FrontEndNotificationFullResponse[], Error>({
    queryKey: ["frontEndNotification", pageId] as const,
    queryFn: () => fetchActiveByPageFn(pageId),
    ...options,
  });
}
