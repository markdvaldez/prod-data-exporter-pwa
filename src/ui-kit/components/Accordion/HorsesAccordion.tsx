import { THorse } from "@/runnersQcApp/shared/types";
import _ from "lodash";
import { useTranslations } from "next-intl";
import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionMain,
  AccordionTrigger,
} from "./AccordionParts";
import { HorsesContentItem } from "./HorsesContentItem";

export type RecordAccordionProps = {
  items: THorse[];
};

export const HorsesAccordion: React.FC<RecordAccordionProps> = ({ items }) => {
  const t = useTranslations();

  return (
    <AccordionMain type="single" className="!mt-0 bg-w0" collapsible>
      <AccordionItem
        value="item-1"
        className="border rounded-md px-4 py-2 border-b8"
      >
        <AccordionTrigger className="text-tDefault">
          <div className="flex w-full text-base md:text-sm">
            <div className="flex w-full flex-row justify-between items-center">
              <div className="font-semibold">{t("AddRecord.horsesList")}</div>
              <div className="pr-2">{`${items.length} ${t(
                "Protocols.horses"
              )}`}</div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sm text-tDefault list-none mt-3 pb-0">
          <div className="w-full h-px bg-b8 mt-3 mb-2" />
          {_.map(items, (item, index) => (
            <div key={item.hisaHorseId}>
              <HorsesContentItem
                item={item}
                index={index}
                itemClassName="pb-1 pt-1 text-base sm:text-sm"
              />
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </AccordionMain>
  );
};
