import { IconProps } from "./type";

export const PlayIcon: React.FC<IconProps> = ({
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM10.5 16.3301L16.5 12.866C17.1667 12.4811 17.1667 11.5189 16.5 11.134L10.5 7.66987C9.83333 7.28497 9 7.7661 9 8.5359V15.4641C9 16.2339 9.83333 16.715 10.5 16.3301Z"
        fill={color ?? "#687968"}
      />
    </svg>
  );
};
