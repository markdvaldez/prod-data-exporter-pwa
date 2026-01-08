import * as React from "react";

import { cn } from "@/ui-kit/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, value, onChange, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-a0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
