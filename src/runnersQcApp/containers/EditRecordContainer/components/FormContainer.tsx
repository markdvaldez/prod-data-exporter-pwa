"use client";

import { HorseMedicalRecType } from "@/Types/global-types";
import { DrugDosageFormField } from "@/ui-kit/blocks/FormFields/DrugDosageFormField";
import { FormFieldAutocomplete } from "@/ui-kit/blocks/FormFields/FormFieldAutocomplete";
import { FormFieldOnceAutocomplete } from "@/ui-kit/blocks/FormFields/FormFieldOnceAutocomplete";
import { HorseField } from "@/ui-kit/blocks/FormFields/HorseField";
import { InspectionTypeField } from "@/ui-kit/blocks/FormFields/InspectionTypeField";
import { LimbTreatedField } from "@/ui-kit/blocks/FormFields/LimbTreatedField";
import { ModalityField } from "@/ui-kit/blocks/FormFields/ModalityField";
import { RecordTypeField } from "@/ui-kit/blocks/FormFields/RecordTypeField";
import { TestResultsField } from "@/ui-kit/blocks/FormFields/ResultsField";
import { RouteAdministeredField } from "@/ui-kit/blocks/FormFields/RouteAdministeredField";
import { TextField } from "@/ui-kit/blocks/FormFields/TextField";
import { TreatmentTypeField } from "@/ui-kit/blocks/FormFields/TreatmentTypeField";
import { FieldLabel } from "@/ui-kit/components/FieldLabel";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
  Field,
  getCurrentType,
  getKeyByTreatmentType,
  getLimbTreatedTypesOptions,
} from "../../addRecordAndProtocolConfig";

type FormViewProps = {
  fields: Field[];
  isReady: boolean;
};

export const FormContainer: React.FC<FormViewProps> = memo(
  ({ fields, isReady }) => {
    const t = useTranslations("AddRecord");

    const scrollRef = useRef<HTMLDivElement>(null);

    const { getValues } = useFormContext();

    const limbTreatedOptions = useMemo(() => {
      return getLimbTreatedTypesOptions();
    }, []);

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
      limbTreated,
    ] = getValues([
      "drugRoute",
      "recType",
      "modality",
      "inspectionType",
      "procedure",
      "limbTreated",
    ]);

    if (!isReady) {
      return <div className="flex-grow pb-4 bg-mainBackground" />;
    }

    return (
      <div ref={scrollRef} className="flex-grow pb-4 bg-mainBackground">
        <div className="sm:pl-8">
          <div className="md:pt-2 text-lg md:text-xl text-tDefault">
            {t("fillForm")}
          </div>
          <HorseField
            fieldKey="horse"
            name="horse"
            placeholder={t("searchHorse")}
            disabled={true}
            label={`${t("horse")}*`}
          />
          <RecordTypeField
            key={`${recType}-${isReady}`}
            label={t("recordType")}
            value={getCurrentType(recType)}
          />
          {_.map(fields, (field: Field) => {
            switch (field.name) {
              case "conditionTreated": {
                const autocompleteKey =
                  recType === HorseMedicalRecType.AlternativeTreatments
                    ? getKeyByTreatmentType(treatmentType, field.key)
                    : field.key;
                return (
                  <FormFieldAutocomplete
                    key={`${field.key}-${isReady}`}
                    name="conditionTreated"
                    label={
                      field.isRequired
                        ? `${t("conditionTreated")}*`
                        : t("conditionTreated")
                    }
                    placeholder="Start typing..."
                    autocompleteKey={autocompleteKey}
                  />
                );
              }
              case "drugName":
                return (
                  <FormFieldAutocomplete
                    key={`drugName-${isReady}`}
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
                    key={`drugRoute-${isReady}`}
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
                    key={`modality-${isReady}`}
                    value={modality}
                    label={
                      field.isRequired ? `${t("modality")}*` : t("modality")
                    }
                  />
                );
              case "drugDosage":
                return (
                  <DrugDosageFormField
                    key={`drugDosage-${isReady}`}
                    label={
                      field.isRequired ? `${t("drugDosage")}*` : t("drugDosage")
                    }
                  />
                );
              case "limbTreated":
                return (
                  <LimbTreatedField
                    key={`limbTreated-${isReady}`}
                    value={limbTreated}
                    label={
                      field.isRequired
                        ? `${t("limbTreated")}*`
                        : t("limbTreated")
                    }
                    placeholder={t("startTyping")}
                  />
                );
              case "structure":
                return (
                  <div key="structure-wrapper">
                    {field.key ===
                    "HorseMedical.RecTypeIsIntraarticularinjection.Structure" ? (
                      <FormFieldOnceAutocomplete
                        key={`structure-${isReady}`}
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
                        key={`structure-${isReady}`}
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
                    key={`description-${isReady}`}
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
                    key={`dental-${isReady}`}
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
                    key={`testName-${isReady}`}
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
                    key={`testResults-${isReady}`}
                    fieldKey="testResults"
                    name="testResults"
                    label={field.isRequired ? `${t("results")}*` : t("results")}
                  />
                );
              case "vaccine":
                return (
                  <FormFieldAutocomplete
                    key={`vaccine-${isReady}`}
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
                    key={`surgery-${isReady}`}
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
              // case "necropsyCategory":
              //   return (
              //     <NecropsyCategoryField
              //       key={`necropsyCategory-${isReady}`}
              //       label={
              //         field.isRequired
              //           ? `${t("records.necropsyCategories")}*`
              //           : t("records.necropsyCategories")
              //       }
              //     />
              //   );
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

              default:
                return (
                  <React.Fragment key={`field-${isReady}`}>
                    <FieldLabel label={`${t("field")}:`} />
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
      </div>
    );
  }
);

FormContainer.displayName = "FormContainer";
