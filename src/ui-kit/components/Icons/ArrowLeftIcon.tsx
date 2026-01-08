import { IconProps } from "./type";

export const ArrowLeftIcon: React.FC<IconProps> = ({
  width = 16,
  height = 16,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 8H3M3 8L6.5 11.5M3 8L6.5 4.5"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
