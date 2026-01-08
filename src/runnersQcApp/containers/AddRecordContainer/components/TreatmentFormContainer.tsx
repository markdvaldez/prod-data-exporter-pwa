"use client";

import { UseFileUploadType } from "@/hooks/useFileUpload";
import { HorseMedicalRecType } from "@/Types/global-types";
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
import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { Field, getKeyByTreatmentType } from "../../addRecordAndProtocolConfig";

type TreatmentFormViewProps = {
  fields: Field[] | null;
  styles?: any;
  isRecTypeVisible?: boolean;
  filesProps?: UseFileUploadType;
};

export const TreatmentFormContainer: React.FC<TreatmentFormViewProps> = memo(
  ({ fields, styles, isRecTypeVisible = true }) => {
    const t = useTranslations("AddRecord");

    const scrollRef = useRef<HTMLDivElement>(null);

    const { control } = useFormContext();

    const { getValues } = useFormContext();
    const formData = useWatch({ control });

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, []);

    const [
      drugRoute,
      recType,
      modality,
      inspectionType,
      treatmentType,
      notes,
      measure,
    ] = getValues([
      "drugRoute",
      "recType",
      "modality",
      "inspectionType",
      "procedure",
      "notes",
      "measure",
    ]);

    return (
      <div ref={scrollRef} className="flex-grow pb-4 bg-mainBackground">
        <div className={cn("sm:pl-8", styles)}>
          {isRecTypeVisible ? (
            <>
              <div className="md:pt-2 text-lg md:text-xl text-tDefault">
                {t("fillForm")}
              </div>
              <RecordTypeField label={t("recordType")} value={recType} />
            </>
          ) : null}
          {_.map(fields, (field: Field) => {
            switch (field.name) {
              case "conditionTreated": {
                const autocompleteKey =
                  recType === HorseMedicalRecType.AlternativeTreatments
                    ? getKeyByTreatmentType(treatmentType, field.key)
                    : field.key;
                return (
                  <FormFieldAutocomplete
                    key={field.key}
                    name="conditionTreated"
                    label={
                      field.isRequired
                        ? `${t("conditionTreated")}*`
                        : t("conditionTreated")
                    }
                    placeholder={t("startTyping")}
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
                      field.isRequired ? `${t("drugName")}*` : t("drugName")
                    }
                    placeholder={t("drugName")}
                    autocompleteKey={field.key}
                  />
                );
              case "drugRoute":
                return (
                  <RouteAdministeredField
                    key={"drugRoute"}
                    value={drugRoute}
                    label={
                      field.isRequired
                        ? `${t("routeAdministered")}*`
                        : t("routeAdministered")
                    }
                  />
                );
              case "modality":
                return (
                  <ModalityField
                    key={"modality"}
                    value={modality}
                    label={
                      field.isRequired ? `${t("modality")}*` : t("modality")
                    }
                  />
                );
              case "drugDosage":
                return (
                  <DrugDosageFormField
                    key={"drugDosage"}
                    label={
                      field.isRequired ? `${t("drugDosage")}*` : t("drugDosage")
                    }
                  />
                );
              case "limbTreated":
                return (
                  <LimbTreatedField
                    key="limbTreated"
                    label={
                      field.isRequired
                        ? `${t("limbTreated")}*`
                        : t("limbTreated")
                    }
                    value={formData.limbTreated}
                    placeholder={t("selectFromTheList")}
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
                            ? `${t("structure")}*`
                            : t("structure")
                        }
                        placeholder={"Start typing..."}
                        autocompleteKey={field.key}
                      />
                    ) : (
                      <FormFieldAutocomplete
                        name="structure"
                        label={
                          field.isRequired
                            ? `${t("structure")}*`
                            : t("structure")
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
                        ? `${t("description")}*`
                        : t("description")
                    }
                    placeholder={t("leaveMoreInformation")}
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
                        ? `${t("medicalName")}*`
                        : t("medicalName")
                    }
                    placeholder={t("medicalName")}
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
                        ? `${t("testAndDiagnostics")}*`
                        : t("testAndDiagnostics")
                    }
                    placeholder={t("testAndDiagnostics")}
                    autocompleteKey={field.key}
                  />
                );
              case "testResults":
                return (
                  <TestResultsField
                    key="testResults"
                    fieldKey="testResults"
                    name="testResults"
                    label={field.isRequired ? `${t("results")}*` : t("results")}
                  />
                );
              case "vaccine":
                return (
                  <FormFieldAutocomplete
                    key={"vaccine"}
                    name="vaccine"
                    label={
                      field.isRequired
                        ? `${t("vaccineName")}*`
                        : t("vaccineName")
                    }
                    placeholder={t("vaccineName")}
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
                        ? `${t("surgeryDescription")}*`
                        : t("surgeryDescription")
                    }
                    placeholder={t("surgeryDescription")}
                    autocompleteKey={field.key}
                  />
                );
              case "procedure":
                return (
                  <TreatmentTypeField
                    key="procedure"
                    name="procedure"
                    value={treatmentType}
                    fieldKey="procedure"
                    label={
                      field.isRequired
                        ? `${t("treatmentType")}*`
                        : t("treatmentType")
                    }
                  />
                );
              case "inspectionType": {
                return (
                  <InspectionTypeField
                    key="inspectionType"
                    fieldKey="inspectionType"
                    value={inspectionType}
                    name="inspectionType"
                    label={`${t("inspectionType")}*`}
                  />
                );
              }
              case "notes": {
                return (
                  <NotesFormField
                    key="notes"
                    name="notes"
                    label={t("notes")}
                    value={notes}
                    placeholder={t("addYourNotes")}
                  />
                );
              }
              default:
                return (
                  <React.Fragment key={field.name}>
                    <FieldLabel label={`${t("field")}:`} />
                    <TextField
                      fieldKey={field.name}
                      name={field.name}
                      label={t(field.name)}
                    />
                  </React.Fragment>
                );
            }
          })}
        </div>
      </div>
    );
  }
);

TreatmentFormContainer.displayName = "TreatmentFormContainer";
