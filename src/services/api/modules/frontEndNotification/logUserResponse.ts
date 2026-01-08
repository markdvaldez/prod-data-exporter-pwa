import { TLogResponsePayload } from "@/services/store/modules/frontEndNotification/types";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api";

export async function logUserResponseFn(payload: TLogResponsePayload) {
  const { frontEndNotificationId, response } = payload;
  const result = await apiClient.post(
    `/frontendnotification/log-user-response/${frontEndNotificationId}`,
    null,
    {
      params: { response },
    },
  );
  return result.data;
}


export function useLogUserResponse() {
  return useMutation<any, Error, TLogResponsePayload>({
    mutationFn: logUserResponseFn,
  });
}