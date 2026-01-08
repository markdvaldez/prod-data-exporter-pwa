import { IconProps } from "./type";

export const CircleCheckedIcon: React.FC<IconProps> = ({
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
      <g clipPath="url(#clip0_2_1701)">
        <circle cx="8" cy="8" r="8" fill="#687968" />
        <path
          d="M11.5 5.5L6.75 10L5 8.4"
          stroke="white"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2_1701">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
