"use client";

import routes from "@/routes";
import useAuthUser from "@/services/aws/useAuthUser";
import { checkAuthData } from "@/services/store/modules/auth";
import { LoaderLottie } from "@/ui-kit/components/LoaderLottie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserPermissions } from "./useAuthUser";

export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return function ProtectedComponent(props: T) {
    const router = useRouter();
    const dispatch = useDispatch();

    const { hasAccess, permissions } = useUserPermissions();
    const { user, isReady } = useAuthUser();

    useEffect(() => {
      if (!isReady) {
        return;
      }

      if (user && permissions && !hasAccess) {
        router.replace(routes.REQUEST_ACCESS);
      }

      if (!user) {
        router.replace(routes.LOGIN);
      }
    }, [router, hasAccess, permissions, user, isReady]);

    useEffect(() => {
      dispatch(checkAuthData());
    }, [dispatch]);

    if (!isReady || !user || !hasAccess) {
      return (
        <>
          <LoaderLottie />
        </>
      );
    }

    if (user) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
