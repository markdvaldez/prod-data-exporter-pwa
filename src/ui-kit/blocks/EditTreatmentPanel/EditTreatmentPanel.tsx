import { useScreenSize } from "@/hooks/useScreenSize";
import {
  createProtocolVariables,
  getCurrentType,
  getFormFields,
  getInspectionType,
  getRecType,
  splitWords,
} from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { TreatmentFormContainer } from "@/runnersQcApp/containers/AddRecordContainer/components";
import { getTodayISODate } from "@/runnersQcApp/shared/DateUtils";
import {
  formatInput,
  getMeasure,
  getNumbers,
  removeSpaces,
} from "@/runnersQcApp/shared/TextUtils";
import { TFieldName, TFormFields } from "@/runnersQcApp/shared/types";
import { HorseMedicalRecType, TreatmentTemplateModel } from "@/Types";
import { Button } from "@/ui-kit/components/Button";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { Toaster } from "@/ui-kit/components/Toaster";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Panel from "../Panel/Panel";

export type EditTreatmentPanelProps = {
  isOpen: boolean;
  activeTreatment: TreatmentTemplateModel;
  handleOpen: () => void;
  onTreatmentsChange: (nextTreatment: TreatmentTemplateModel) => void;
};

export const EditTreatmentPanel: React.FC<EditTreatmentPanelProps> = ({
  isOpen,
  activeTreatment,
  handleOpen,
  onTreatmentsChange,
}) => {
  const t = useTranslations();
  const screen = useScreenSize();

  const [formOptions, setFormOptions] = useState(
    getFormFields(HorseMedicalRecType.DrugAdministered)
  );

  const methods = useForm<TFormFields>({
    resolver: standardSchemaResolver(formOptions.schema),
    defaultValues: {
      horses: [],
      recType: HorseMedicalRecType.AlternativeTreatments,
      measure: activeTreatment.drugDosage
        ? getMeasure(activeTreatment.drugDosage)
        : "",
      date: getTodayISODate(),
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { handleSubmit, setValue, control, clearErrors, formState } = methods;

  const recType = useWatch({ name: "recType", control });
  const formData = useWatch({ control });

  const setFormValues = useCallback(
    (data?: Partial<TFormFields>) => {
      if (data) {
        _.forEach(data, (value, key) => {
          setValue(key as TFieldName, value);
        });
      }
    },
    [setValue]
  );

  const containerStyle = useMemo(
    () => ({ height: screen.height - 40 }),
    [screen.height]
  );

  const onSubmit = useCallback(
    (data: any) => {
      const variables = createProtocolVariables({
        ...data,
        clearedToRace: formData.clearedToRace,
        clearedToWork: formData.clearedToWork,
        measure: formData.measure,
        notes: formData.notes,

        recType,
      });
      onTreatmentsChange({
        ...variables,
        treatmentTemplateId: activeTreatment.treatmentTemplateId,
      });
      handleOpen();
    },
    [
      activeTreatment.treatmentTemplateId,
      formData,
      handleOpen,
      onTreatmentsChange,
      recType,
    ]
  );

  const renderContent = useMemo(() => {
    return (
      <TreatmentFormContainer
        styles="px-4 pt-2 sm:pl-4"
        isRecTypeVisible={false}
        fields={formOptions.applyProtocolFields}
      />
    );
  }, [formOptions.applyProtocolFields]);

  useEffect(() => {
    const currentType =
      recType === "Tests and Diagnostics"
        ? HorseMedicalRecType.Test
        : removeSpaces(recType);
    const nextFormFields = getFormFields(currentType);
    setFormOptions(nextFormFields);
    setTimeout(clearErrors, 64);
  }, [clearErrors, recType, setFormValues]);

  useEffect(() => {
    if (activeTreatment) {
      const {
        recType,
        drugDosage,
        clearedToWork,
        clearedToRace,
        testResults,
        notes = "",
      } = activeTreatment || {};

      const data = _.omit(activeTreatment, ["status", "timestamp"]);
      const dosage = formatInput(drugDosage || "");
      const dosageNumber = getNumbers(dosage);

      data.drugDosage = dosageNumber;

      _.forIn(data, function (value, key) {
        setValue(key as any, value);
      });

      setValue("testResults", testResults || "");

      setValue("notes", notes || "");

      setValue("measure", getMeasure(activeTreatment?.drugDosage || ""));

      if (
        getRecType(removeSpaces(recType)) ===
        HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
      ) {
        setValue(
          "inspectionType",
          getInspectionType(clearedToWork, clearedToRace)
        );
      }
    }
  }, [activeTreatment, setValue]);

  const currentType = useMemo(() => getCurrentType(recType || ""), [recType]);

  return (
    <Panel
      className="w-full md:w-1/2 lg:w-1/3"
      open={isOpen}
      title={splitWords(currentType as HorseMedicalRecType)}
      onClose={handleOpen}
    >
      <FormProvider {...methods}>
        <div
          className="flex flex-col bg-mainBackground "
          style={containerStyle}
        >
          <ScrollArea className="flex flex-col flex-1 scroll-thin">
            {renderContent}
          </ScrollArea>
          <div className="mx-4 pb-safe-bottom">
            <Button
              className="w-full"
              title={t("AddRecord.save")}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
        <Toaster />
      </FormProvider>
    </Panel>
  );
};
