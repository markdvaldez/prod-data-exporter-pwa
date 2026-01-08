import { IconProps } from "./type";

export const MinusIcon: React.FC<IconProps> = ({ width = 24, height = 24 }) => {
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
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21ZM7.5 11C7.22386 11 7 11.2239 7 11.5C7 11.7761 7.22386 12 7.5 12H15.5C15.7761 12 16 11.7761 16 11.5C16 11.2239 15.7761 11 15.5 11H7.5Z"
        fill="#7C7E7F"
      />
    </svg>
  );
};
