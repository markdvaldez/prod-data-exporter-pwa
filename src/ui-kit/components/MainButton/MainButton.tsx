import { cn } from "@/ui-kit/lib/utils";
import { ClassValue } from "clsx";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export type MainButtonProps = LinkProps & {
  href: string;
  title: string;
  iconSrc?: string;
  className?: ClassValue;
  icon: React.ReactNode;
};

export const MainButton = React.forwardRef<HTMLAnchorElement, MainButtonProps>(
  ({ href, title, iconSrc, className, icon, ...props }, ref) => {
    const router = useRouter();

    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      router.push(href);
    };

    return (
      <Link
        onClick={onClick}
        ref={ref}
        className={cn(
          "flex flex-col items-center w-full sm:w-52 h-28 bg-a9 pt-4 pb-4 pl-3 pr-3 rounded-2xl overflow-hidden shadow-custom border",
          className
        )}
        href={href}
        {...props}
      >
        {icon ? icon : null}
        <span className="mt-1 sm:mt-3 text-md sm:text-sm font-medium text-a0">
          {title}
        </span>
      </Link>
    );
  }
);

MainButton.displayName = "MainButton";
