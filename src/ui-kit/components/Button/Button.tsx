import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/ui-kit/lib/utils";
import { Loader } from "../Loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md sm:text-sm font-medium ring-offset-background transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none ",
  {
    variants: {
      variant: {
        default: "bg-beige text-b0 hover:bg-mint/90 hover:text-b0/90 border border-beige",
        destructive:
          "bg-sand text-b0 hover:bg-destructive/90",
        outline:
          "border border-b5 text-tDefault bg-sand hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ",
      },
      size: {
        default: "h-12 sm:h-10 rounded-[5px] px-4 py-2",
        sm: "h-9 rounded-[5px] px-3",
        lg: "h-11 w-52 rounded-[5px] px-8",
        icon: "h-10 w-10",
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
  title?: string;
  fetching?: boolean;
  disabled?: boolean;
  titleClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      type,
      title,
      fetching,
      disabled,
      asChild = false,
      // titleClassName,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
      >
        {fetching ? <Loader variant={variant} /> : title}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
