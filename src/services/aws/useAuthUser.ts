import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "@aws-amplify/auth";
import { useCallback, useEffect, useState } from "react";

export default function useAuthUser() {
  const [user, setUser] = useState<Record<string, unknown>>();
  const [isReady, setIsReady] = useState(false);

  const getUser = useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        return;
      }

      const currentUser = await getCurrentUser();

      let attributes = {};
      try {
        attributes = await fetchUserAttributes();
      } catch (attrError) {}

      const user = {
        ...currentUser,
        ...attributes,
      };

      setUser(user);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser, isReady]);

  return { user, isReady, getUser };
}

export const getAuthenticatedUser = async () => {
  try {
    const session = await fetchAuthSession();
    if (!session.tokens) {
      return;
    }
    const user = {
      ...(await getCurrentUser()),
      ...(await fetchUserAttributes()),
    };
    return user;
  } catch (e) {
    console.log(e);
  }
};
