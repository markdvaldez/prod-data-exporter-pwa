"use client";
import { useUserPermissions } from "@/hooks/useAuthUser";
import { withAuth } from "@/hooks/withAuth";
import { SidebarInset, SidebarProvider } from "@/ui-kit/components/SidebarMenu";
import { memo } from "react";
import { AppSidebar } from "../AppSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayoutContainer: React.FC<
  Readonly<{
    children: React.ReactNode;
  }>
> = memo(({ children }) => {
  const { userData } = useUserPermissions();

  return (
    <SidebarProvider>
      <AppSidebar userData={userData} />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
});

DashboardLayoutContainer.displayName = "DashboardLayoutContainer";

export default withAuth(DashboardLayoutContainer);
