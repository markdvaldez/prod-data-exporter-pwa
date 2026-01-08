import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { ButtonProps } from "@/ui-kit/components/Button/Button";
import { cn } from "@/ui-kit/lib/utils";

const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type, disabled, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-between bg-tPlaceholder text-primary-foreground hover:bg-tPlaceholder/90 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
      >
        <>{children}</>
      </Comp>
    );
  }
);
ButtonIcon.displayName = "ButtonIcon";

export { ButtonIcon };
