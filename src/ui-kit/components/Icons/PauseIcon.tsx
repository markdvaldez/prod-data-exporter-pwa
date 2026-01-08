import { IconProps } from "./type";

export const PauseIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill={color ?? "#687968"} />
      <rect x="8" y="7" width="2" height="10" fill="white" />
      <rect x="14" y="7" width="2" height="10" fill="white" />
    </svg>
  );
};
