import { IconProps } from "./type";

export const TrashIcon: React.FC<IconProps> = ({ width = 16, height = 16 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.86628 1.59961H10.1329M1.59961 3.73294H14.3996M12.9774 3.73294L12.4787 11.2133C12.4039 12.3356 12.3665 12.8968 12.1241 13.3223C11.9107 13.6969 11.5888 13.998 11.2008 14.1861C10.7601 14.3996 10.1977 14.3996 9.07292 14.3996H6.9263C5.8015 14.3996 5.2391 14.3996 4.79843 14.1861C4.41046 13.998 4.08856 13.6969 3.87515 13.3223C3.63275 12.8968 3.59534 12.3356 3.52052 11.2133L3.02183 3.73294"
        stroke="#687968"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
