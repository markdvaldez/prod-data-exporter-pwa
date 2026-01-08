import {
  getCurrentType,
  getRecType,
  splitWords,
} from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { HorseMedicalRecType, TreatmentTemplateModel } from "@/Types";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { TreatmentItem } from "../TreatmentItem";
import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionMain,
  AccordionTrigger,
} from "./AccordionParts";

export type TreatmentAccordionProps = {
  treatment: TreatmentTemplateModel;
};

export const TreatmentAccordion: React.FC<TreatmentAccordionProps> = ({
  treatment,
}) => {
  const t = useTranslations();

  const recType = useMemo(() => {
    const currentType = getCurrentType(treatment.recType as string);
    return getRecType(currentType);
  }, [treatment.recType]);

  return (
    <AccordionMain type="single" className="bg-w0 mt-2" collapsible>
      <AccordionItem
        value="item-1"
        className="border rounded-md px-4 py-2 border-b8"
      >
        <AccordionTrigger className="text-tDefault">
          <div className="flex w-full text-base md:text-sm">
            <div className="flex w-full flex-row justify-between items-center">
              <div className="font-semibold">
                {splitWords(recType as HorseMedicalRecType)}
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="text-sm text-tDefault list-none mt-3 pb-0">
          <div className="w-full flex h-px bg-b8 mt-3 mb-2" />
          <TreatmentItem
            key={treatment.treatmentTemplateId}
            treatment={treatment}
          />
        </AccordionContent>
      </AccordionItem>
    </AccordionMain>
  );
};
