import { IconProps } from "./type";

export const DocumentAddMenuIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  className,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="cut-out">
          <rect width="20" height="20" fill="white" />
          <circle cx="14.5" cy="15.5" r="5" fill="black" />
        </mask>
      </defs>

      <path
        d="M11.5 2.20215V5.30005C11.5 5.72009 11.5 5.93011 11.5817 6.09055C11.6537 6.23167 11.7684 6.3464 11.9095 6.41831C12.0699 6.50005 12.28 6.50005 12.7 6.50005H15.7979M11.5 13.25H7M13 10.25H7M16 7.99117V13.4C16 14.6601 16 15.2902 15.7548 15.7715C15.539 16.1948 15.1948 16.539 14.7715 16.7548C14.2902 17 13.6601 17 12.4 17H7.6C6.33988 17 5.70982 17 5.22852 16.7548C4.80516 16.539 4.46095 16.1948 4.24524 15.7715C4 15.2902 4 14.6601 4 13.4V5.6C4 4.33988 4 3.70982 4.24524 3.22852C4.46095 2.80516 4.80516 2.46095 5.22852 2.24524C5.70982 2 6.33988 2 7.6 2H10.0088C10.5592 2 10.8343 2 11.0933 2.06217C11.3229 2.11729 11.5423 2.2082 11.7436 2.33156C11.9707 2.4707 12.1653 2.66527 12.5544 3.05442L14.9456 5.44558C15.3347 5.83473 15.5293 6.0293 15.6684 6.25636C15.7918 6.45767 15.8827 6.67715 15.9378 6.90673C16 7.16568 16 7.44084 16 7.99117Z"
        stroke="#191C1F"
        strokeLinecap="round"
        strokeLinejoin="round"
        mask="url(#cut-out)"
      />
      <path d="M12.5 15.5H16.5" stroke="#191C1F" strokeLinecap="round" />
      <path d="M14.5 13.5L14.5 17.5" stroke="#191C1F" strokeLinecap="round" />
    </svg>
  );
};
