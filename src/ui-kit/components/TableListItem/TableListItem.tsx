import { Slot } from "@radix-ui/react-slot";
import React from "react";

import { cn } from "@/ui-kit/lib/utils";
import { LucideProps } from "lucide-react";

export type TableListItemProps = {
  title: string;
  iconSrc?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  className?: string;
  asChild?: boolean;
  iconColor?: string;
};

const TableListItem: React.FC<TableListItemProps> = ({
  className,
  iconSrc: Icon,
  iconColor,
  title,
  asChild,
  ...props
}) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "inline-flex py-3 gap-4 items-center text-primary-foreground whitespace-nowrap text-sm font-medium",
        className
      )}
      {...props}
    >
      {Icon ? <Icon size={24} color={iconColor} /> : null}
      {title}
    </Comp>
  );
};
TableListItem.displayName = "TableListItem";

export { TableListItem };
