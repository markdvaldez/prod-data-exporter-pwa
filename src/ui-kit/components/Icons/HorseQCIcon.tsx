import { IconProps } from "./type";

export const HorseQCIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horse Head */}
      <path
        d="M14.5 3.5C13.3 3 11.7 3 10.5 3.5C9 4.1 8 5.2 7.5 6.8L5.7 11.8C5.5 12.4 5.4 12.8 5.6 13.3C5.9 14 6.7 14.4 7.4 14.2L9.2 13.7C9.7 13.6 10 13.7 10.3 14C11.4 15.1 12.9 15.5 14.4 15c2.4-.8 3.7-3.3 3.2-5.7C17.2 6.6 16 4.8 14.5 3.5Z"
        stroke="#191C1F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* QC Checkmark */}
      <path
        d="M16 17.5L18 19.5L22 15.5"
        stroke="#191C1F"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
