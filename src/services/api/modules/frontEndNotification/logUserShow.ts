"use client";

import { TLogShowPayload } from "@/services/store/modules/frontEndNotification/types";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api";

export async function logUserShowFn(payload: TLogShowPayload) {
  const { frontEndNotificationId } = payload;
  const response = await apiClient.post(
    `/frontendnotification/log-user-show/${frontEndNotificationId}`,
  );
  return response.data;
}

export function useLogUserShow() {
  return useMutation<any, Error, TLogShowPayload>({
    mutationFn: logUserShowFn,
  });
}