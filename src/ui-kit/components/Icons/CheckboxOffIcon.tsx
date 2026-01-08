import { IconProps } from "./type";

export const CheckboxOffIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="3.5"
        fill="#E2E6E2"
        stroke="#687968"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
