import { cn } from "@/ui-kit/lib/utils";
import { IconProps } from "./type";

export const LocationMenuIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  className,
  color = "#808E80",
}) => {
  return (
    <svg
      className={cn(className)}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 10.1714C11.2426 10.1714 12.25 9.17366 12.25 7.94286C12.25 6.71205 11.2426 5.71429 10 5.71429C8.75736 5.71429 7.75 6.71205 7.75 7.94286C7.75 9.17366 8.75736 10.1714 10 10.1714Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#191C1F"
      />
      <path
        d="M10 18C13 15.0286 16 11.225 16 7.94286C16 4.66071 13.3137 2 10 2C6.68629 2 4 4.66071 4 7.94286C4 11.225 7 15.0286 10 18Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#191C1F"
      />
    </svg>
  );
};
