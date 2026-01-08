import * as React from "react";

import { cn } from "@/ui-kit/lib/utils";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2 pb-safe-bottom-8", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

export { SidebarFooter };
