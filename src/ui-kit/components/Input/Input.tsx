import * as React from "react";

import { cn } from "@/ui-kit/lib/utils";
import { RequestErrorType } from "@/utils/errors";

export interface InputProps extends React.ComponentProps<"input"> {
  error?: string | RequestErrorType | null;
  placeholder?: string | undefined;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, value, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-12 sm:h-10 w-full !mt-0 rounded-[5px] border bg-w0 px-3 py-2 text-base md:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed`,
          error
            ? "border-e0 focus-visible:border-e0"
            : "border-b8 focus-visible:border-a0",
          className
        )}
        value={value}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
