"use client";

import { removeSpaces } from "@/runnersQcApp/shared/TextUtils";
import { HorseMedicalRecType, TreatmentTemplateModel } from "@/Types";
import { AddTreatmentPanel } from "@/ui-kit/blocks/AddTreatmentPanel";
import { Button } from "@/ui-kit/components/Button";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getApplyProtocolFields,
  getCurrentType,
  getFormattedTitle,
  getInspectionType,
  getRecType,
  hasAllRequiredFields,
  splitCamelCase,
} from "../../addRecordAndProtocolConfig";
import { ProtocolsListItem } from "../../MyProtocolsContainer/ProtocolListItem";

type TreatmentsContainerProps = {
  treatments: TreatmentTemplateModel[];
  onTreatmentsChange: (nextTreatment: TreatmentTemplateModel) => void;
  handleDeleteTreatment: (id: string) => void;
  handleEdit: (treatment: TreatmentTemplateModel) => void;
  handleSetHasTreatmentAllFields?: (value: boolean) => void;
};

export const TreatmentsContainer: React.FC<TreatmentsContainerProps> = memo(
  ({
    treatments,
    onTreatmentsChange,
    handleDeleteTreatment,
    handleEdit,
    handleSetHasTreatmentAllFields,
  }) => {
    const t = useTranslations();

    const scrollRef = useRef<HTMLDivElement>(null);

    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = useCallback(() => {
      setIsPanelOpen(!isPanelOpen);
    }, [isPanelOpen]);

    const derivedTreatments = useMemo(() => {
      return _.map(treatments, (treatment, index) => {
        const currentType = getCurrentType(treatment.recType || "");
        const inspectionType =
          getRecType(removeSpaces(treatment.recType)) ===
          HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
            ? getInspectionType(
                treatment?.clearedToWork,
                treatment?.clearedToRace
              )
            : null;

        const requiredFields = getApplyProtocolFields(
          currentType as HorseMedicalRecType
        );

        const hasTreatmentAllFields = hasAllRequiredFields(
          treatment,
          inspectionType,
          requiredFields
        );

        const drugRoute =
          removeSpaces(treatment.recType) ===
            HorseMedicalRecType.DrugAdministered ||
          removeSpaces(treatment.recType) ===
            HorseMedicalRecType.IntralesionalInjection
            ? treatment.drugRoute
            : null;

        const subTitle = getFormattedTitle([
          treatment?.procedure,
          treatment?.drugName,
          treatment?.vaccine,
          drugRoute,
          treatment?.drugDosage,
          treatment?.limbTreated,
          treatment?.conditionTreated,
          treatment?.structure,
          treatment?.description,
          treatment?.testName,
          treatment?.testResults,
          treatment?.dental,
          inspectionType,
          treatment?.notes,
        ]);

        return {
          key: `${treatment.recType}-${index}`,
          treatment,
          subTitle,
          hasTreatmentAllFields,
          currentType,
        };
      });
    }, [treatments]);

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, []);

    useEffect(() => {
      if (!handleSetHasTreatmentAllFields) return;

      const allValid = _.every(derivedTreatments, "hasTreatmentAllFields");
      handleSetHasTreatmentAllFields(allValid);
    }, [derivedTreatments, handleSetHasTreatmentAllFields]);

    return (
      <>
        <div
          ref={scrollRef}
          className="flex flex-1 sm:px-4 pb-10 bg-mainBackground"
        >
          <div className="flex flex-1 flex-col sm:pl-8">
            <div className="flex flex-row justify-between items-center">
              <div className=" text-lg md:text-xl text-tDefault font-semibold">
                {t("Protocols.treatments")}
              </div>
            </div>
            <div className="pt-4">
              {_.map(
                derivedTreatments,
                (
                  {
                    key,
                    treatment,
                    subTitle,
                    currentType,
                    hasTreatmentAllFields,
                  },
                  index
                ) => (
                  <ProtocolsListItem
                    key={key}
                    id={treatment?.treatmentTemplateId || ""}
                    item={treatment}
                    isApplying={true}
                    errorMessage={t("Protocols.applyProtocolError")}
                    name={splitCamelCase(currentType) || ""}
                    description={subTitle}
                    hasTreatmentAllFields={hasTreatmentAllFields}
                    bordered={false}
                    handleDelete={handleDeleteTreatment}
                    handleEdit={handleEdit}
                  />
                )
              )}
            </div>
            <Button
              variant="outline"
              className="mt-2 w-full 2xl:w-1/2 self-center"
              title={t("Protocols.addNewTreatment")}
              onClick={togglePanel}
            />
          </div>
        </div>
        <AddTreatmentPanel
          title={t("Protocols.addNewTreatment")}
          isOpen={isPanelOpen}
          handleOpen={togglePanel}
          onTreatmentsChange={onTreatmentsChange}
        />
      </>
    );
  }
);

TreatmentsContainer.displayName = "TreatmentsContainer";
