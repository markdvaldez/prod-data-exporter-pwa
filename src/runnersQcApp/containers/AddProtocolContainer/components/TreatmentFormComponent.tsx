import {
  formatInput,
  getMeasure,
  getNumbers,
  removeSpaces,
} from "@/runnersQcApp/shared/TextUtils";
import { TFieldName, TFormFields } from "@/runnersQcApp/shared/types";
import {
  HorseMedicalRecType,
  HorseMedicalRouteAdmin,
  TreatmentTemplateModel,
} from "@/Types/global-types";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import _ from "lodash";
import { useTranslations } from "next-intl";
import {
  ChangeEvent,
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { FormProvider, useForm, useWatch, type Resolver, } from "react-hook-form";
import {
  DEFAULT_VALUES,
  getFormFields,
  getInspectionType,
} from "../../addRecordAndProtocolConfig";
import { ProtocolName } from "./ProtocolName";
import { TreatmentFormView } from "./TreatmentFormView";

export type TreatmentFormComponentProps = {
  protocolName: string;
  recType: HorseMedicalRecType | string;
  activeTreatment: TreatmentTemplateModel;
  handleChangeName: (text: string | ChangeEvent<HTMLInputElement>) => void;
  handleClear: () => void;
  onSubmit: (data: any) => void;
  handleSetRecType: (recType: HorseMedicalRecType | string) => void;
};

export type FormHandlers = {
  submitForm: () => void;
  resetForm: () => void;
};

export const TreatmentFormComponent = memo(
  forwardRef<FormHandlers, TreatmentFormComponentProps>(
    (
      {
        protocolName,
        recType,
        activeTreatment,
        handleChangeName,
        handleClear,
        onSubmit,
        handleSetRecType,
      },
      ref
    ) => {
      const t = useTranslations();
      const formOptions = useMemo(() => getFormFields(recType), [recType]);

      const [isReady, setIsReady] = useState(false);

      const inspectionType = useMemo(() => {
        return activeTreatment?.recType ===
          HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
          ? getInspectionType(
              activeTreatment?.clearedToWork,
              activeTreatment?.clearedToRace
            )
          : "";
      }, [
        activeTreatment?.clearedToRace,
        activeTreatment?.clearedToWork,
        activeTreatment?.recType,
      ]);

      const drugRoute = useMemo(() => {
        return activeTreatment?.recType ===
          HorseMedicalRecType.DrugAdministered ||
          activeTreatment?.recType ===
            HorseMedicalRecType.IntralesionalInjection
          ? activeTreatment?.drugRoute
          : "";
      }, [activeTreatment?.drugRoute, activeTreatment?.recType]);

      const methods = useForm<TFormFields>({
        resolver: standardSchemaResolver(formOptions?.protocolSchema) as any,
        defaultValues: {
          ...DEFAULT_VALUES,
          date: "",
          measure: "",
          drugRoute: drugRoute,
          inspectionType: inspectionType,
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
      })

      const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
      } = methods;

      const formData = useWatch({ control });

      const handleFormSubmit = useCallback(
        (data: TFormFields) => {
          const optionNames = _.map(
            formOptions?.protocolFields,
            (field) => field.name
          );

          const formValues = _.pick(data, optionNames) || {};
          if (formData?.measure) {
            formValues.measure = formData?.measure;
          }
          if (formValues?.inspectionType) {
            formValues.clearedToRace = data.clearedToRace;
            formValues.clearedToWork = data.clearedToWork;
          }

          onSubmit?.(formValues);
        },
        [formData?.measure, formOptions?.protocolFields, onSubmit]
      );

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

      useImperativeHandle(ref, () => ({
        submitForm: () => {
          handleSubmit(handleFormSubmit)();
        },
        resetForm: () => {
          setFormValues(DEFAULT_VALUES);
        },
      }));

      useEffect(() => {
        if (activeTreatment) {
          const optionNames = _.map(
            formOptions.protocolFields,
            (field) => field.name
          );

          const formValues =
            activeTreatment.recType === recType
              ? _.pick(activeTreatment, optionNames)
              : {};
          const dosage = formatInput(formValues?.drugDosage || "");
          const dosageNumber = getNumbers(dosage);
          formValues.drugDosage = dosageNumber;

          _.forIn(formValues, (value, key) => {
            setValue(key as any, value, { shouldValidate: false });
          });
          if (_.includes(optionNames, "drugDosage")) {
            setValue(
              "measure",
              getMeasure(
                activeTreatment?.drugDosage ||
                  (formOptions?.defaultValues?.measure as string)
              )
            );
          } else {
            setValue("measure", "");
          }
          setValue("procedure", activeTreatment?.procedure || "");
          setValue("recType", activeTreatment?.recType || "");
        } else {
          setFormValues(formOptions?.defaultValues);
        }
        setIsReady(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      useEffect(() => {
        const clearedFormRecType = removeSpaces(formData?.recType);
        const clearedRecType = removeSpaces(activeTreatment?.recType);
        const shouldChangeValue =
          clearedFormRecType === HorseMedicalRecType.IntralesionalInjection &&
          !activeTreatment;
        const cond =
          activeTreatment &&
          clearedFormRecType === HorseMedicalRecType.IntralesionalInjection &&
          clearedRecType !== clearedFormRecType;
        if (shouldChangeValue || cond) {
          setValue("drugRoute", HorseMedicalRouteAdmin.Intralesional);
        }
      }, [activeTreatment, formData.recType, setFormValues, setValue]);

      return (
        <FormProvider {...methods}>
          <div className="pb-12">
            <ProtocolName
              protocolName={protocolName}
              handleChangeName={handleChangeName}
              handleClear={handleClear}
            />
            {isReady && (
              <TreatmentFormView
                {...{
                  onSubmit,
                  activeTreatment,
                  isReady,
                  recType,
                  formOptions,
                  handleSetRecType,
                }}
              />
            )}
          </div>
        </FormProvider>
      );
    }
  )
);
