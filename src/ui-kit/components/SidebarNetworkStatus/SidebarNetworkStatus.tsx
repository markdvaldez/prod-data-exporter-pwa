import { cn } from "@/ui-kit/lib/utils";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../SidebarMenu";

export type SidebarNetworkStatusProps = {
  icon?: React.JSX.Element;
  text?: React.JSX.Element;
  className?: string;
} & React.ComponentProps<"button">;

export const SidebarNetworkStatus = React.forwardRef<
  HTMLButtonElement,
  SidebarNetworkStatusProps
>(({ className, icon, text, onClick, ...props }, ref) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        ref={ref}
        className={cn(
          "text-b0/90 hover:bg-algae !hover:text-w0 active:bg-inherit",
          className
        )}
        data-sidebar="trigger"
        {...props}
      >
        {icon}
        {text}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});
SidebarNetworkStatus.displayName = "SidebarNetworkStatus";
