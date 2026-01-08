import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { THorse } from "@/runnersQcApp/shared/types";

export type HorsesContentItemProps = {
  item: THorse;
  index?: number;
  itemClassName?: string;
};

export const HorsesContentItem: React.FC<HorsesContentItemProps> = ({
  item,
  index,
  itemClassName,
}) => {
  return (
    <li key={`${item.hisaHorseId}-${index}`} className={itemClassName}>
      {`${item.name} (${getFormattedId(item.hisaHorseId)})`}
    </li>
  );
};
