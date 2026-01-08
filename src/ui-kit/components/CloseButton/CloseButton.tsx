import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/ui-kit/lib/utils";
import { CloseIcon } from "../Icons/CloseIcon";
import { CloseLightIcon } from "../Icons/CloseLightIcon";

const buttonVariants = cva(
  "items-center justify-center whitespace-nowrap ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "",
        light: "",
      },
      size: {
        default: "h-6 w-6",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const CloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        {...props}
      >
        {variant === "light" ? <CloseLightIcon /> : <CloseIcon />}
      </Comp>
    );
  }
);
CloseButton.displayName = "CloseButton";

export { buttonVariants, CloseButton };
