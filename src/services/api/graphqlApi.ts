import { extractError } from "@/utils/errors";
import { GraphQLClient } from "graphql-request";
import { getConfig } from "../appConfig";
import { printAccessTokenAndIdToken } from "../aws/amplifyActions";
import { store } from "../store";
import { restartAuth } from "../store/modules/auth";
import { logErrorAction } from "../store/modules/logger";

const endpoint = `${getConfig().baseURL}graphql`;

const rawClient = new GraphQLClient(endpoint);

export type RequestFn = typeof rawClient.request;

export const requestWithAuth: RequestFn = async <T extends any[]>(
  ...args: T
) => {
  try {
    const token = await printAccessTokenAndIdToken();
    rawClient.setHeaders({
      Authorization: `Bearer ${token}`,
    });

    const [query, variables, requestHeaders] = args;
    return await rawClient.request(query, variables, requestHeaders);
  } catch (error: any) {
    store.dispatch(logErrorAction(extractError(error.response?.data || error)));

    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        store.dispatch(restartAuth());
      } catch (logoutError) {
        console.error("Error during logout:", logoutError);
      }
    }

    return Promise.reject(error);
  }
};
