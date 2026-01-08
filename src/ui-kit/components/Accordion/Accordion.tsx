import _ from "lodash";
import { useTranslations } from "next-intl";
import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionMain,
  AccordionTrigger,
} from "./AccordionParts";

export type AccordionType = {
  items: string[];
  itemClassName?: string;
  classNameTrigger?: string;
};

export const Accordion: React.FC<AccordionType> = ({
  items,
  itemClassName,
  classNameTrigger,
}) => {
  const t = useTranslations("Auth");

  return (
    <AccordionMain type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className={classNameTrigger}>
          <div className="font-bold">{t("whatIncluded")}</div>
        </AccordionTrigger>
        <AccordionContent>
          {_.map(items, (item, index) => (
            <li key={`${item}-${index}`} className={itemClassName}>
              {item}
            </li>
          ))}
        </AccordionContent>
      </AccordionItem>
    </AccordionMain>
  );
};
