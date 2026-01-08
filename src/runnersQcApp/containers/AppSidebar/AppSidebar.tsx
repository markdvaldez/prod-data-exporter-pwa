"use client";

import * as React from "react";

import { NetworkStatus } from "@/shared/NetworkStatus";
import { SyncStatus } from "@/shared/SyncStatus";
import { PersonResponse } from "@/Types/global-types";
import { AppsSwitcher } from "@/ui-kit/blocks/AppsSwitcher";
import { NavMain } from "@/ui-kit/blocks/NavMain";
import { NavUser } from "@/ui-kit/blocks/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/ui-kit/components/SidebarMenu";
import { data } from "./helpers";

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userData: PersonResponse | null | undefined;
  icon?: React.JSX.Element;
  text?: React.JSX.Element;
};

export function AppSidebar({
  userData,
  icon,
  text,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppsSwitcher {...data.app} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData}>
          <SyncStatus />
          <NetworkStatus />
        </NavUser>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
