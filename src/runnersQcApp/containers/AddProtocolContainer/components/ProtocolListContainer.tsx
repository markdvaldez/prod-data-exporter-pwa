import { ErrorMessage } from "@/ui-kit/components/ErrorMessage";

import { HorseMedicalRecType, TreatmentTemplateModel } from "@/Types";
import { TreatmentCard } from "@/ui-kit/components/TreatmentCard";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { ChangeEvent, memo } from "react";
import {
  getCurrentType,
  getFormattedTitle,
  getInspectionType,
  splitWords,
} from "../../addRecordAndProtocolConfig";
import { ProtocolName } from "./ProtocolName";

export type ProtocolListProps = {
  name?: string | null;
  treatments?: TreatmentTemplateModel[] | null;
  error?: string;
  onChangeName: (text: string | ChangeEvent<HTMLInputElement>) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  handleClear: () => void;
};

export const ProtocolList: React.FC<ProtocolListProps> = memo(
  ({
    name,
    treatments,
    error = "",
    onChangeName,
    onEdit,
    onDelete,
    handleClear,
  }) => {
    const t = useTranslations();

    return (
      <div className="pb-12">
        <div className="mb-6">
          <ProtocolName
            protocolName={name}
            handleChangeName={onChangeName}
            handleClear={handleClear}
          />
        </div>

        <ErrorMessage message={error} />
        {_.map(treatments, (treatment, index) => {
          const inspectionType =
            treatment.recType ===
            HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
              ? getInspectionType(
                  treatment.clearedToWork,
                  treatment.clearedToRace
                )
              : "";

          const drugRoute =
            treatment.recType === HorseMedicalRecType.DrugAdministered ||
            treatment.recType === HorseMedicalRecType.IntralesionalInjection
              ? treatment.drugRoute
              : null;
          const recType = getCurrentType(treatment.recType || "");
          const subTitle = getFormattedTitle([
            treatment.drugName,
            treatment.vaccine,
            drugRoute,
            treatment.drugDosage,
            treatment.limbTreated,
            treatment.conditionTreated,
            treatment.procedure,
            treatment.modality,
            treatment.structure,
            treatment.description,
            treatment.testName,
            treatment.testResults,
            treatment.dental,
            inspectionType,
            treatment.notes,
          ]);

          return (
            <TreatmentCard
              key={`TreatmentCard-${treatment.treatmentTemplateId}`}
              id={treatment.treatmentTemplateId || ""}
              index={index + 1}
              title={splitWords(recType)}
              subTitle={subTitle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    );
  }
);

ProtocolList.displayName = "ProtocolList";
