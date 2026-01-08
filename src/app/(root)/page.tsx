"use client";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(routes.DASHBOARD);
  }, [router]);

  return null;
}
