import { IconProps } from "./type";

export const ArrowUpDownIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#898B8C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className || "lucide lucide-arrow-down-up"}
    >
      <path d="m3 16 4 4 4-4" />
      <path d="M7 20V4" />
      <path d="m21 8-4-4-4 4" />
      <path d="M17 4v16" />
    </svg>
  );
};
