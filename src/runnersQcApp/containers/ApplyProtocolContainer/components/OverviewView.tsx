import { THorse } from "@/runnersQcApp/shared/types";
import { TreatmentTemplateModel } from "@/Types";
import { AudioVoiceRecorder } from "@/ui-kit/blocks/AudioVoiceRecorder";
import { NotesFormField } from "@/ui-kit/blocks/FormFields/NotesFormField";
import {
  HorsesAccordion,
  TreatmentAccordion,
} from "@/ui-kit/components/Accordion";
import { LocationItem } from "@/ui-kit/components/LocationItem";
import { TreatedByItem } from "@/ui-kit/components/TretedByItem";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export type ProtocolProps = {
  treatments?: TreatmentTemplateModel[] | null;
};

export const OverviewView: React.FC<ProtocolProps> = ({ treatments }) => {
  const t = useTranslations();

  const horses: THorse[] = useWatch({ name: "horses" });
  const location = useWatch({ name: "treatmentLocation" });
  const treatedByPerson = useWatch({ name: "treatedByPerson" });

  const { setValue, getValues } = useFormContext();

  const handleTranscription = useCallback(
    (text: string) => {
      if (text) {
        const prevNotes = getValues("notes") || "";
        const newNotes = _.trim(`${prevNotes} ${text}`);
        setValue("notes", newNotes);
      }
    },
    [getValues, setValue]
  );

  return (
    <div className="flex flex-1 sm:px-4 pb-10 bg-mainBackground ">
      <div className="flex flex-1 flex-col">
        <div className="text-xl text-tDefault sm:pl-4 font-semibold">
          {t("AddRecord.overview")}
        </div>
        <div className="text-md sm:text-sm text-tPlaceholder pt-3 pb-4 sm:pl-4">
          {t("AddRecord.checkIfAll")}
        </div>
        <HorsesAccordion items={horses} />
        <LocationItem location={location} />
        <TreatedByItem treatedByPerson={treatedByPerson} />
        {_.map(treatments, (treatment) => (
          <TreatmentAccordion
            key={treatment.treatmentTemplateId}
            treatment={treatment}
          />
        ))}
        <div className="flex flex-col relative">
          <AudioVoiceRecorder
            className="absolute right-0 z-10"
            onChange={handleTranscription}
          />
          <NotesFormField
            name="notes"
            key="notes"
            label={t("AddRecord.notes")}
            placeholder={t("AddRecord.addYourNotes")}
          />
        </div>
      </div>
    </div>
  );
};
