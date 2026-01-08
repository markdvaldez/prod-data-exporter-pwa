import { IconProps } from "./type";

export const BaseIcon: React.FC<IconProps> = ({ width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    ></svg>
  );
};
