"use client";

import { BottomContainer } from "@/runnersQcApp/containers/BottomContainer";
import DashboardLayoutContainer from "@/runnersQcApp/containers/DashboardLayoutContainer/DashboardLayoutContainer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayoutContainer>
      {children}
      <BottomContainer />
    </DashboardLayoutContainer>
  );
}
