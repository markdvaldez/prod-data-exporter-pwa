import { useQueries } from "@tanstack/react-query";
import _ from "lodash";
import { apiClient } from "../../api";

export const fetchUserData = async (personId: string) => {
  const response = await apiClient.get(`/person/${personId}`);
  return response.data;
};

export const fetchPermissions = async (personId: string) => {
  const response = await apiClient.get(`/auth/permission/list?${personId}`);
  return response.data;
};

export const useGetAuthUser = (personId: string) => {
  return useQueries({
    queries: [
      {
        queryKey: ["userData", personId],
        queryFn: () => fetchUserData(personId),
        enabled: !!personId,
      },
      {
        queryKey: ["userPermissions", personId],
        queryFn: () => fetchPermissions(personId),
        enabled: !!personId,
      },
    ],
    combine: (results) => {
      return {
        data: { userData: results[0].data, userPermissions: results[1].data },
        isLoading: results.some((result) => result.isLoading),
        error: _.find(results, (result) => !!result.error)?.error,
      };
    },
  });
};
