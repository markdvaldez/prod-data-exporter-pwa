import { IconProps } from "./type";

export const ChevronRightIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  className,
}) => {
  return (
    <svg
      data-testid="chevron-icon"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 17L15 12L10 7"
        stroke="#191C1F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
