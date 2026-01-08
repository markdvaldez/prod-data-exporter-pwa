"use client";

import { SidebarGroup, SidebarMenu } from "@/ui-kit/components/SidebarMenu";
import {
  SidebarIconMenuItem,
  TSidebarMenuItem,
} from "@/ui-kit/components/SidebarMenu/SidebarIconMenuItem";
import { map } from "lodash";
import { useCallback } from "react";

type NavMainProps = {
  items: TSidebarMenuItem[];
};

export const NavMain: React.FC<NavMainProps> = ({ items }) => {
  const renderItem = useCallback((item: TSidebarMenuItem) => {
    return (
      <SidebarIconMenuItem
        key={`sidebar-menu-item-${item.title}`}
        title={item.title}
        icon={item.icon}
        iconSrc={item.iconSrc}
        isActive={item.isActive}
        url={item.url}
      />
    );
  }, []);

  return (
    <SidebarGroup>
      <SidebarMenu>{map(items, renderItem)}</SidebarMenu>
    </SidebarGroup>
  );
};
