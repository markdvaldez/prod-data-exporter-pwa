import Image from "next/image";
import Link from "next/link";
import React, { ComponentType } from "react";
import { IconProps } from "../Icons/type";
import { SidebarMenuButton } from "./SidebarMenuButton";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { useSidebar } from "./useSidebar";

export type TSidebarMenuItem = {
  title: string;
  url: string;
  icon?: ComponentType<IconProps>;
  iconSrc?: string;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};
export const SidebarIconMenuItem: React.FC<TSidebarMenuItem> = ({
  title,
  url = "#",
  icon: IconComponent,
  iconSrc,
}) => {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <SidebarMenuItem>
      <Link href={url} onClick={isMobile ? toggleSidebar : undefined}>
        <SidebarMenuButton className="text-base lg:text-sm" tooltip={title}>
          {IconComponent ? <IconComponent /> : null}
          {iconSrc ? (
            <Image
              className="w-5 h-5 lg:w-4 lg:h-4 invert brightness-0"
              alt={title}
              src={iconSrc}
              width={16}
              height={16}
            />
          ) : null}
          <span>{title}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
};
