import { useCallback } from "react";
import { TSelectValue } from "../InputAutocomplete/InputAutocomplete";

export type ContentItemProps = {
  item: TSelectValue;
  index?: number;
  itemClassName?: string;
  handleItemClick?: (item: string) => void;
};

export const ContentItem: React.FC<ContentItemProps> = ({
  item,
  index,
  itemClassName,
  handleItemClick,
}) => {
  const handleClick = useCallback(() => {
    handleItemClick?.(item.value || "");
  }, [handleItemClick, item.value]);

  return (
    <li
      key={`${item.label}-${index}`}
      className={itemClassName}
      onClick={handleClick}
    >
      {item.value}
    </li>
  );
};
