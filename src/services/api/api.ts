import { extractError } from "@/utils/errors";
import axios from "axios";
import { getConfig } from "../appConfig";
import { printAccessTokenAndIdToken } from "../aws/amplifyActions";
import { store } from "../store";
import { restartAuth } from "../store/modules/auth";
import { logErrorAction } from "../store/modules/logger";

export const apiClient = axios.create({
  baseURL: getConfig().baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    try {
      const accessToken = await printAccessTokenAndIdToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      console.error("Error getting access token:", error);
    }
    return config;
  },
  (error) => {
    store.dispatch(logErrorAction(extractError(error.response?.data || error)));
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    store.dispatch(logErrorAction(extractError(error.response?.data || error)));
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      try {
        store.dispatch(restartAuth());
      } catch (logoutError) {
        console.error("Error during logout:", logoutError);
      }
    }

    return Promise.reject(error);
  }
);
