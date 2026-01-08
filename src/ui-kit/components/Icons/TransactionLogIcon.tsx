import { IconProps } from "./type";

export const TransactionLogIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  className,
}) => {
  return (
    <i className={`fa-solid fa-sheet-plastic ${className}`} style={{ width, height }}></i>
  );
};
