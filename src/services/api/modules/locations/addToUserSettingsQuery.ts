import { UserSettingsResponse } from "@/Types/global-types";
import { apiClient } from "../../api";

export const putFavorites = async (variables: UserSettingsResponse) => {
  const { appId, userId, settingName, value } = variables;
  const response = await apiClient.put<UserSettingsResponse>(
    `/usersetting/${appId}/${userId}/${settingName}`,
    value,
    { headers: { "Content-Type": "text/plain" } }
  );
  return response.data;
};
