"use client";

import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { cn } from "@/ui-kit/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";

export type PanelContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> & {
  onClose?: () => void;
};

const PanelContent = React.forwardRef<HTMLDivElement, PanelContentProps>(
  ({ onClose, className, children, ...props }, ref) => (
    <DialogPrimitive.DialogPortal>
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 bg-b0/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        )}
      />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[none] top-0 bottom-0 right-0 z-50 w-full md:w-auto md:max-w-[50%] bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 sm:rounded-none",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          className="absolute right-4 top-2 md:top-4 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 focus-visible:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={onClose}
        >
          <CloseIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.DialogPortal>
  )
);

PanelContent.displayName = "PanelContent";

export default PanelContent;
