import { IconProps } from "./type";

export const ArrowLeftToLineIcon: React.FC<IconProps> = ({
  width = 13,
  height = 8,
  color = "#191C1F",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 13 8"
      fill="none"
    >
      <path
        d="M0.5 0.499939V7.49994M12.5 3.99998L3 3.99994M3 3.99994L6.5 7.49994M3 3.99994L6.5 0.499939"
        stroke="#191C1F"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
