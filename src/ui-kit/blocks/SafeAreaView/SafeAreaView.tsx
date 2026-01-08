"use client";

import { useAppHeight } from "@/hooks/useAppHeight";

type Props = {
  children: React.ReactNode;
};

export function SafeAreaView({ children }: Props) {
  useAppHeight();

  return (
    <main className="w-full flex flex-col overflow-hidden max-h-screen-dynamic">
      {children}
    </main>
  );
}
