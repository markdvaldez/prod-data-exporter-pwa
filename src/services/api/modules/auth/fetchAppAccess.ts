import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api";

type AppAccessRequest = {
  userId: string;
  appName: string;
};

const fetchAppAccess = async ({ userId, appName }: AppAccessRequest) => {
  const response = await apiClient.post(`/auth/request-app-access`, undefined, {
    params: { userId, appName },
  });
  return response.data;
};

export const useAppAccessMutation = () =>
  useMutation({ mutationFn: fetchAppAccess });
