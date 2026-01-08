import { IconProps } from "./type";

export const SyncIcon: React.FC<IconProps> = ({
  width = 25,
  height = 24,
  color = "#7C7E7F",
  className,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.5 14C2.5 14 2.62132 14.8492 6.13604 18.364C9.65076 21.8787 15.3492 21.8787 18.864 18.364C20.1092 17.1187 20.9133 15.5993 21.2762 14M2.5 14V20M2.5 14H8.5M22.5 10C22.5 10 22.3787 9.15076 18.864 5.63604C15.3492 2.12132 9.65076 2.12132 6.13604 5.63604C4.89076 6.88131 4.08669 8.40072 3.72383 10M22.5 10V4M22.5 10H16.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
