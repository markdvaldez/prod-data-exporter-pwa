"use client";

import { BottomContainer } from "@/prodDataExporter/containers/BottomContainer";
import DashboardLayoutContainer from "@/prodDataExporter/containers/DashboardLayoutContainer/DashboardLayoutContainer";

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
