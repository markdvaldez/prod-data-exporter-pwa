import { useScreenSize } from "@/hooks/useScreenSize";
import {
  createProtocolVariables,
  getFormFields,
} from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { TreatmentFormContainer } from "@/runnersQcApp/containers/AddRecordContainer/components";
import { removeSpaces } from "@/runnersQcApp/shared/TextUtils";
import { TFieldName, TFormFields } from "@/runnersQcApp/shared/types";
import {
  HorseMedicalRecType,
  HorseMedicalRouteAdmin,
  TreatmentTemplateModel,
} from "@/Types";
import { Button } from "@/ui-kit/components/Button";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { Toaster } from "@/ui-kit/components/Toaster";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Panel from "../Panel/Panel";

export type AddTreatmentPanelProps = {
  isOpen: boolean;
  title: string;
  handleOpen: () => void;
  onTreatmentsChange: (nextTreatment: TreatmentTemplateModel) => void;
};

export const AddTreatmentPanel: React.FC<AddTreatmentPanelProps> = ({
  isOpen,
  title,
  handleOpen,
  onTreatmentsChange,
}) => {
  const t = useTranslations();
  const screen = useScreenSize();

  const [formOptions, setFormOptions] = useState(
    getFormFields(HorseMedicalRecType.DrugAdministered)
  );

  const methods = useForm<TFormFields>({
    resolver: standardSchemaResolver(formOptions.protocolSchema),
    defaultValues: {
      horses: [],
      recType: HorseMedicalRecType.AlternativeTreatments,
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { handleSubmit, setValue, control, clearErrors } = methods;

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
        recType,
      });

      onTreatmentsChange(variables);
      handleOpen();
      setValue("recType", HorseMedicalRecType.AlternativeTreatments);
    },
    [formData, handleOpen, onTreatmentsChange, recType, setValue]
  );

  const handleClose = () => {
    handleOpen();
    setValue("recType", HorseMedicalRecType.AlternativeTreatments);
  };

  const renderContent = useMemo(() => {
    return (
      <TreatmentFormContainer
        styles="px-4 sm:pl-4"
        fields={formOptions.protocolFields}
      />
    );
  }, [formOptions]);

  useEffect(() => {
    let defaultValues = {};
    const currentType =
      recType === "Tests and Diagnostics"
        ? HorseMedicalRecType.Test
        : removeSpaces(recType);
    const nextFormFields = getFormFields(currentType);
    setFormOptions(nextFormFields);
    setTimeout(clearErrors, 64);
    if (recType === "Intralesional Injection") {
      defaultValues = {
        ...nextFormFields?.defaultValues,
        drugRoute: HorseMedicalRouteAdmin.Intralesional,
      };
    } else {
      defaultValues = nextFormFields?.defaultValues as Record<
        string,
        string | boolean | null
      >;
    }
    setFormValues(defaultValues);
  }, [clearErrors, recType, setFormValues]);

  return (
    <Panel
      className="w-full md:w-1/2 lg:w-1/3"
      open={isOpen}
      title={title}
      onClose={handleClose}
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
              title={t("SearchHorses.done")}
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
        <Toaster />
      </FormProvider>
    </Panel>
  );
};
