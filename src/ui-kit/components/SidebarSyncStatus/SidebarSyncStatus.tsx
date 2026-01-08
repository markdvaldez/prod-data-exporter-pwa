import { cn } from "@/ui-kit/lib/utils";
import { RefreshCw } from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../SidebarMenu";

type SyncStatusProps = {
  title: string;
  isDataSynced: boolean;
  className?: string;
  isSyncing?: boolean;
  onClick?: () => void;
} & React.ComponentProps<"button">;

export const SidebarSyncStatus = forwardRef<HTMLButtonElement, SyncStatusProps>(
  (
    { title = "", isSyncing, isDataSynced, className, onClick, ...props },
    ref
  ) => {
    const prevStatus = useRef(isSyncing);
    const [isAnimating, setIsAnimating] = useState(false);
    const timer = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
      if (isSyncing && prevStatus.current === false && !isAnimating) {
        setIsAnimating(true);
        timer.current = setTimeout(() => setIsAnimating(false), 3000);
      }
      prevStatus.current = !!isSyncing;
    }, [isSyncing, isAnimating]);

    useEffect(() => {
      return () => {
        setIsAnimating(false);
        if (timer.current) {
          clearTimeout(timer.current);
        }
      };
    }, []);

    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          ref={ref}
          className={cn(
            "text-b0/90 hover:bg-algae active:bg-inherit",
            className
          )}
          data-sidebar="trigger"
          onClick={onClick}
          {...props}
        >
          <RefreshCw
            className={cn(
              isDataSynced === false ? "text-b0/90" : "",
              isDataSynced === false && isAnimating && "animate-spin"
            )}
          />
          <span className={cn(isDataSynced === false ? "text-b0-90" : "")}>
            {title}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }
);

SidebarSyncStatus.displayName = "SidebarSyncStatus";
