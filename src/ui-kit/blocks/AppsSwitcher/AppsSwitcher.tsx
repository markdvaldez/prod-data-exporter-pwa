"use client";

import * as React from "react";

import routes from "@/routes";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/ui-kit/components/SidebarMenu";
import Image from "next/image";
import Link from "next/link";

type AppsSwitcherProps = {
  name: string;
  logo: string;
};

export const AppsSwitcher: React.FC<AppsSwitcherProps> = ({ name, logo }) => {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-1 items-center">
        <Link href={routes.DASHBOARD} className="flex-1">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-inherit active:bg-inherit"
          >
            <Image priority alt="Logo" src={logo} width={45} height={45} />
            <div className="grid flex-1 text-left text-lg sm:text-xl leading-tight">
              <span className="text-grass font-semibold">{name}</span>
            </div>
          </SidebarMenuButton>
        </Link>
        <SidebarTrigger className="sm:hidden" />
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
