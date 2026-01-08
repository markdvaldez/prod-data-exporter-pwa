"use client";

import { logScreenAction } from "@/services/store/modules/logger";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const NavigationLogger = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      logScreenAction({ screenName: pathname + "?" + searchParams.toString() })
    );
  }, [dispatch, pathname, searchParams]);

  return null;
};
