import { IconProps } from "./type";

export const HistoryIcon: React.FC<IconProps> = ({
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
      <path
        d="M23.2 11.5L21.2005 13.5L19.2 11.5M21.4451 13C21.4814 12.6717 21.5 12.338 21.5 12C21.5 7.02944 17.4706 3 12.5 3C7.52944 3 3.5 7.02944 3.5 12C3.5 16.9706 7.52944 21 12.5 21C15.3273 21 17.85 19.6963 19.5 17.6573M12.5 7V12L15.5 14"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
