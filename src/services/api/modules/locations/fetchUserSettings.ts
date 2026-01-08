import { UserSettingsResponse } from "@/Types/global-types";
import { apiClient } from "../../api";

export const fetchUserSettings = async (variables: UserSettingsResponse) => {
  const { appId, userId, settingName } = variables;
  const response = await apiClient.get<UserSettingsResponse>(
    `/usersetting/${appId}/${userId}/${settingName}`
  );
  return response.data;
};
