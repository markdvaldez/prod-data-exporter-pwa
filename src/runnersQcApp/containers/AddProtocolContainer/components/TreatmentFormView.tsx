import { removeSpaces } from "@/runnersQcApp/shared/TextUtils";
import {
  HorseMedicalRecType,
  TreatmentTemplateModel,
} from "@/Types/global-types";
import { DrugDosageFormField } from "@/ui-kit/blocks/FormFields/DrugDosageFormField";
import { FormFieldAutocomplete } from "@/ui-kit/blocks/FormFields/FormFieldAutocomplete";
import { FormFieldOnceAutocomplete } from "@/ui-kit/blocks/FormFields/FormFieldOnceAutocomplete";
import { InspectionTypeField } from "@/ui-kit/blocks/FormFields/InspectionTypeField";
import { LimbTreatedField } from "@/ui-kit/blocks/FormFields/LimbTreatedField";
import { ModalityField } from "@/ui-kit/blocks/FormFields/ModalityField";
import { NotesFormField } from "@/ui-kit/blocks/FormFields/NotesFormField";
import { RecordTypeField } from "@/ui-kit/blocks/FormFields/RecordTypeField";
import { TestResultsField } from "@/ui-kit/blocks/FormFields/ResultsField";
import { RouteAdministeredField } from "@/ui-kit/blocks/FormFields/RouteAdministeredField";
import { TextField } from "@/ui-kit/blocks/FormFields/TextField";
import { TreatmentTypeField } from "@/ui-kit/blocks/FormFields/TreatmentTypeField";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import {
  Field,
  FormFieldType,
  getCurrentType,
  getKeyByTreatmentType,
  getRecType,
} from "../../addRecordAndProtocolConfig";

type TFormFields = {
  name: string;
  recType: HorseMedicalRecType;
  conditionTreated?: string;
  drugName?: string;
  drugRoute?: string;
  drugDosage?: string;
  measure?: string;
  date?: string;
  time?: string;
  vaccine?: string;
  procedure?: string;
  surgery?: string;
  dental?: string;
  physiotherapy?: string;
  chiropractic?: string;
  notes?: string;
  limbTreated?: string;
  structure?: string;
  prescribingVet?: string;
  modality?: string;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  inspectionType?: string;
};

type TreatmentFormViewProps = {
  isReady: boolean;
  activeTreatment?: TreatmentTemplateModel;
  isEdit?: boolean;
  withNavigationOptions?: boolean;
  formOptions: FormFieldType;
  recType: HorseMedicalRecType | string;
  onSubmit?: (data: any) => void;
  handleSetRecType: (recType: HorseMedicalRecType | string) => void;
};

export const TreatmentFormView: React.FC<TreatmentFormViewProps> = ({
  isReady,
  recType,
  formOptions,
  handleSetRecType,
}) => {
  const t = useTranslations();

  const { control, reset } = useFormContext();

  const formData = useWatch({ control });

  useEffect(() => {
    const formRecType = removeSpaces(formData.recType as string);
    const stateRecType = removeSpaces(recType as string);
    if (formRecType && formRecType !== stateRecType) {
      handleSetRecType(getRecType(formRecType as HorseMedicalRecType));
    }
  }, [handleSetRecType, formData.recType, recType, reset]);

  return (
    <>
      <RecordTypeField
        label={t("Protocols.selectType")}
        value={getCurrentType(recType)}
        placeholder={t("Protocols.treatmentType")}
      />
      {recType ? (
        <div key={`TreatmentForm-${isReady}`} className="pt-0">
          {_.map(formOptions?.protocolFields, (field: Field) => {
            switch (field.name) {
              case "conditionTreated": {
                const autocompleteKey =
                  recType === HorseMedicalRecType.AlternativeTreatments
                    ? getKeyByTreatmentType(formData.treatmentType, field.key)
                    : field.key;
                return (
                  <FormFieldAutocomplete
                    key={field.key}
                    name="conditionTreated"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.conditionTreated")}*`
                        : t("AddRecord.conditionTreated")
                    }
                    placeholder={t("AddRecord.startTyping")}
                    autocompleteKey={autocompleteKey}
                  />
                );
              }
              case "drugName":
                return (
                  <FormFieldAutocomplete
                    key={"drugName"}
                    name="drugName"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.drugName")}*`
                        : t("AddRecord.drugName")
                    }
                    placeholder={t("AddRecord.drugName")}
                    autocompleteKey={field.key}
                  />
                );
              case "drugRoute":
                return (
                  <RouteAdministeredField
                    key={"drugRoute"}
                    value={formData.drugRoute}
                    label={
                      field.isRequired
                        ? `${t("AddRecord.routeAdministered")}*`
                        : t("AddRecord.routeAdministered")
                    }
                  />
                );
              case "modality":
                return (
                  <ModalityField
                    key={"modality"}
                    value={formData.modality}
                    label={
                      field.isRequired
                        ? `${t("AddRecord.modality")}*`
                        : t("AddRecord.modality")
                    }
                  />
                );
              case "drugDosage":
                return (
                  <DrugDosageFormField
                    key={"drugDosage"}
                    label={
                      field.isRequired
                        ? `${t("AddRecord.drugDosage")}*`
                        : t("AddRecord.drugDosage")
                    }
                  />
                );
              case "limbTreated":
                return (
                  <LimbTreatedField
                    key="limbTreated"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.limbTreated")}*`
                        : t("AddRecord.limbTreated")
                    }
                    value={formData.limbTreated}
                    placeholder={t("AddRecord.selectFromTheList")}
                  />
                );
              case "structure":
                return (
                  <div key="structure-wrapper">
                    {field.key ===
                    "HorseMedical.RecTypeIsIntraarticularinjection.Structure" ? (
                      <FormFieldOnceAutocomplete
                        name="structure"
                        label={
                          field.isRequired
                            ? `${t("AddRecord.structure")}*`
                            : t("AddRecord.structure")
                        }
                        placeholder={"Start typing..."}
                        autocompleteKey={field.key}
                      />
                    ) : (
                      <FormFieldAutocomplete
                        name="structure"
                        label={
                          field.isRequired
                            ? `${t("AddRecord.structure")}*`
                            : t("AddRecord.structure")
                        }
                        placeholder={"Start typing..."}
                        autocompleteKey={field.key}
                      />
                    )}
                  </div>
                );
              case "description":
                return (
                  <FormFieldAutocomplete
                    key={"description"}
                    name="description"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.description")}*`
                        : t("AddRecord.description")
                    }
                    placeholder={t("AddRecord.leaveMoreInformation")}
                    autocompleteKey={"Description"}
                  />
                );
              case "dental":
                return (
                  <FormFieldAutocomplete
                    key={"dental"}
                    name="dental"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.medicalName")}*`
                        : t("AddRecord.medicalName")
                    }
                    placeholder={t("AddRecord.medicalName")}
                    autocompleteKey={field.key}
                  />
                );
              case "testName":
                return (
                  <FormFieldAutocomplete
                    key={"testName"}
                    name="testName"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.testAndDiagnostics")}*`
                        : t("AddRecord.testAndDiagnostics")
                    }
                    placeholder={t("AddRecord.testAndDiagnostics")}
                    autocompleteKey={field.key}
                  />
                );
              case "testResults":
                return (
                  <TestResultsField
                    key={`testResults-${isReady}`}
                    fieldKey="testResults"
                    name="testResults"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.results")}*`
                        : t("AddRecord.results")
                    }
                  />
                );
              case "vaccine":
                return (
                  <FormFieldAutocomplete
                    key={"vaccine"}
                    name="vaccine"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.vaccineName")}*`
                        : t("AddRecord.vaccineName")
                    }
                    placeholder={t("AddRecord.vaccineName")}
                    autocompleteKey={field.key}
                  />
                );
              case "surgery":
                return (
                  <FormFieldAutocomplete
                    key={"surgery"}
                    name="surgery"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.surgeryDescription")}*`
                        : t("AddRecord.surgeryDescription")
                    }
                    placeholder={t("AddRecord.surgeryDescription")}
                    autocompleteKey={field.key}
                  />
                );
              case "procedure":
                return (
                  <TreatmentTypeField
                    key="procedure"
                    name="procedure"
                    value={formData.procedure}
                    fieldKey="procedure"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.treatmentType")}*`
                        : t("AddRecord.treatmentType")
                    }
                  />
                );
              case "inspectionType": {
                return (
                  <InspectionTypeField
                    key="inspectionType"
                    fieldKey="inspectionType"
                    value={formData.inspectionType}
                    name="inspectionType"
                    label={
                      field.isRequired
                        ? `${t("AddRecord.inspectionType")}*`
                        : t("AddRecord.inspectionType")
                    }
                  />
                );
              }
              case "notes": {
                return (
                  <NotesFormField
                    key="notes"
                    name="notes"
                    label={t("AddRecord.notes")}
                    value={formData.notes}
                    placeholder={t("AddRecord.addYourNotes")}
                  />
                );
              }
              default:
                return (
                  <React.Fragment key={field.name}>
                    <FieldLabel label={`${t("AddRecord.field")}:`} />
                    <TextField
                      key={field.name}
                      fieldKey={field.name}
                      name={field.name}
                      label={t(field.name)}
                    />
                  </React.Fragment>
                );
            }
          })}
        </div>
      ) : null}
    </>
  );
};
