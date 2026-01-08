import { cn } from "@/ui-kit/lib/utils";
import { IconProps } from "./type";

export const DashboardIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  className,
}) => {
  return (
    <svg
      className={cn(className)}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" />
      <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" />
      <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" />
      <rect x="11.5" y="11.5" width="6" height="6" rx="1.5" />
    </svg>
  );
};
