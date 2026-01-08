import { cn } from "@/ui-kit/lib/utils";
import React from "react";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 pt-5 pb-5 pl-2 pr-2", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

export { SidebarHeader };
