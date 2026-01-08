import { Button } from "@/ui-kit/components/ui/button";
import { cn } from "@/ui-kit/lib/utils";
import { AlignJustify } from "lucide-react";
import React, { useCallback } from "react";
import { useSidebar } from "./useSidebar";

const SidebarMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
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
      className={cn("h-8 w-8", className)}
      onClick={handleClick}
      {...props}
    >
      <AlignJustify className="!w-6 !h-6" size={24} />
    </Button>
  );
});
SidebarMenuTrigger.displayName = "SidebarMenuTrigger";

export { SidebarMenuTrigger };
