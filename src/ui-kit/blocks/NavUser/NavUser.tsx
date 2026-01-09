"use client";

import { getUserInitials } from "@/prodDataExporter/pages/MainPage/helpers";
import routes from "@/routes";
import { handleSignOut } from "@/services/aws/amplifyActions";
import { restartAuth } from "@/services/store/modules/auth";
import { PersonResponse } from "@/Types/global-types";
import { Avatar, AvatarFallback } from "@/ui-kit/components/Avatar";
import { cn } from "@/ui-kit/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui-kit/components/DropdownMenu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/ui-kit/components/SidebarMenu";
import { getFormattedId } from "@/utils/formatters";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";

export type NavUserProps = {
  user: PersonResponse | null | undefined;
  children?: React.ReactNode;
};

export const NavUser: React.FC<NavUserProps> = ({ user, children }) => {
  const { isMobile, setOpenMobile, state } = useSidebar();
  const dispatch = useDispatch();
  const t = useTranslations("Main");
  const { userInitials, personId } = useMemo(() => {
    return {
      userInitials: getUserInitials(user),
      personId: getFormattedId(user?.hisaPersonId),
    };
  }, [user]);

  const handleInfoClick = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, setOpenMobile]);

  const handleLogout = useCallback(() => {
    dispatch(restartAuth());
    handleSignOut();
  }, [dispatch]);

  return (
    <SidebarMenu>
      {children}
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className={cn(
                "h-8 w-8 rounded-lg",
                state === "collapsed" && "m-[2px]"
              )}>
                <AvatarFallback className="rounded-lg bg-a0">
                  <div className="text-w0">{userInitials}</div>
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.displayName} 
                </span>
                <span className="truncate text-xs">{personId}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-a0">
                    <div className="text-w0">{userInitials}</div>
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.displayName}
                  </span>
                  <span className="truncate text-xs">{personId}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={routes.PROD_DATA_EXPORTER} onClick={handleInfoClick}>
                <DropdownMenuItem>
                  <BadgeCheck />
                  {t("myInformation")}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              {t("logOut")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
