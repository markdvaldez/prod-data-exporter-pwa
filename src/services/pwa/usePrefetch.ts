import { getRoutePaths } from "@/routes/utils";
import { forEach } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePrefetch = () => {
  const router = useRouter();

  useEffect(() => {
    const prefetchRoutes = getRoutePaths();
    forEach(prefetchRoutes, (path) => {
      router.prefetch(path);
    });
  }, [router]);
};
