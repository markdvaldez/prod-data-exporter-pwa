"use client";

import { Button } from "@/ui-kit/components/ui/button";
import { cn } from "@/ui-kit/lib/utils";
import React, { useCallback } from "react";
import { ArrowLeftToLineIcon } from "../../Icons/ArrowLeftToLineIcon";
import { useSidebar } from "../useSidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      toggleSidebar();
    },
    [onClick, toggleSidebar]
  );

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7 ml-2", className)}
      onClick={handleClick}
      {...props}
    >
      <ArrowLeftToLineIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export { SidebarTrigger };
