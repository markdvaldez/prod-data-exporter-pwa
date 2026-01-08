"use client";

import { useDocumentsQuery } from "@/hooks/useDocumentsQuery";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useUserLocation } from "@/hooks/useUserLocation";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import {
  formatInput,
  getMeasure,
  getNumbers,
  removeSpaces,
} from "@/runnersQcApp/shared/TextUtils";
import {
  InspectionType,
  Modality,
  THorse,
  THorseMedicalRecord,
  TMediaFile,
  TPerson,
} from "@/runnersQcApp/shared/types";
import routes from "@/routes";
import {
  selectHisaPersonId,
  selectUsername,
} from "@/services/store/modules/auth/selectors";
import {
  editHorseMedical,
  updateDocument,
} from "@/services/store/modules/horseMedical";
import { selectHorseMedical } from "@/services/store/modules/horseMedical/selectors";
import {
  setTreatmentLocation,
  updateDescription,
} from "@/services/store/modules/locations";
import { selectLocationDescription } from "@/services/store/modules/locations/selectors";
import { TLocation } from "@/services/store/modules/locations/types";
import {
  HorseMedicalRecType,
  HorseMedicalRouteAdmin,
} from "@/Types/global-types";
import { StepperDesktop } from "@/ui-kit/blocks/Stepper";
import { Stepper } from "@/ui-kit/blocks/Stepper/Stepper";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { cn } from "@/ui-kit/lib/utils";
import { mapFilesToMediaFiles } from "@/utils/fileUtils";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createEditVariables,
  DEFAULT_VALUES,
  getFormFields,
  getInspectionType,
  getRecType,
} from "../addRecordAndProtocolConfig";
import { DateBlock } from "../AddRecordContainer/components";
import { ButtonsBlockEdit } from "./ButtonsBlockEdit";
import { FormContainer, Overview } from "./components";
import { getHorseProps } from "./helpers";
export type EditRecordContainerProps = {
  id: string;
};

type TFormFields = {
  hisaHorseId: string;
  horse: THorse | string | null;
  recType: string;
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
  description?: string;
  testResults?: string;
  files: TMediaFile[];
  modality?: string;
  clearedToWork?: boolean;
  clearedToRace?: boolean;
  inspectionType?: string;
  treatmentLocation?: TLocation;
  responsibleHisaPersonName?: string;
};

type TFieldName = keyof TFormFields;

export const EditRecordContainer: React.FC<EditRecordContainerProps> = memo(
  ({ id }) => {
    const t = useTranslations("AddRecord");
    const { getCurrentLocation, userLocation } = useUserLocation();
    const dispatch = useDispatch();

    const fileUploadProps = useFileUpload();
    const filesRef = useRef<File[]>([]);

    const records = useSelector(selectHorseMedical);

    const record = useMemo(() => {
      return records.find(
        (r) => r?.hisaHorseMedicalId === id || r?.internalId === id
      );
    }, [records, id]);

    const scrollRef = useRef<HTMLDivElement>(null);
    const initialRecord = useRef<THorseMedicalRecord>(record);

    const { files } = useDocumentsQuery(
      initialRecord.current?.hisaHorseMedicalId || ""
    );

    const hisaPersonId = useSelector(selectHisaPersonId);
    const hisaPersonName = useSelector(selectUsername);
    const locationDescription = useSelector(selectLocationDescription);
    const treatmentLocation = useMemo(() => {
      return {
        locationId: record?.locationId,
        locationName: record?.locationName,
      } as TLocation;
    }, [record?.locationId, record?.locationName]);

    const [activeStep, setActiveStep] = useState(1);
    const router = useRouter();
    const [formOptions, setFormOptions] = useState(
      getFormFields(HorseMedicalRecType.DrugAdministered)
    );

    const initialHorse = useMemo(
      () => (record ? getHorseProps(record) : null),
      [record]
    );

    const horse = useMemo(() => {
      const horseId = getFormattedId(initialHorse?.hisaHorseId || "");
      return `${initialHorse?.name} ${horseId}`;
    }, [initialHorse?.hisaHorseId, initialHorse?.name]);

    const location = useMemo(() => {}, []);

    const [isReady, setIsReady] = useState(false);
    const [treatedByPerson, setTreatedByPerson] = useState<TPerson | null>({
      hisaPersonId: record?.treatingHisaPersonId || "",
      hisaPersonName: record?.treatingHisaPersonName || "",
    });

    const methods = useForm<TFormFields>({
      resolver: standardSchemaResolver(formOptions?.schema),
      defaultValues: {
        hisaHorseId: "",
        horse: undefined,
        ...DEFAULT_VALUES,
        recType: initialRecord.current
          ? initialRecord?.current.recType ||
            HorseMedicalRecType.AlternativeTreatments
          : undefined,
        measure: getMeasure(initialRecord?.current?.drugDosage || "") || "",
        modality: initialRecord.current
          ? initialRecord?.current.modality || Modality.PET
          : undefined,
      },
      mode: "onSubmit",
      reValidateMode: "onSubmit",
    });

    const {
      handleSubmit,
      setValue,
      control,
      clearErrors,
      getValues,
      setError,
      watch,
    } = methods;

    const recType = useWatch({ name: "recType", control });
    const prevRecType = useRef<string>(initialRecord?.current?.recType || "");
    const form = watch();
    const formData = useWatch({ control });

    const handlePersonChange = useCallback((person: TPerson) => {
      setTreatedByPerson(person);
    }, []);

    const buttonTitle = useMemo(() => {
      if (activeStep === 3) {
        return t("save");
      }
      return t("next");
    }, [activeStep, t]);

    const stepsConfig = useMemo(() => {
      return [
        { id: 0, title: t("medicalForm") },
        { id: 1, title: t("date&time") },
        { id: 2, title: t("recordOverview") },
      ];
    }, [t]);

    const onSubmit = useCallback(
      async (data: TFormFields) => {
        try {
          scrollRef.current?.scrollTo({ top: 0 });

          switch (activeStep) {
            case 0:
            case 1:
              setActiveStep(activeStep + 1);
              break;
            case 2:
              setActiveStep(activeStep + 1);
              break;
            case 3:
              const optionNames = _.map(
                formOptions?.fields,
                (field) => field.name
              );
              if (
                data.inspectionType === InspectionType.NotCleared &&
                !formData.notes?.trim()?.length
              ) {
                setError("notes", {
                  type: "manual",
                  message: "This field is required",
                });
                return;
              }

              const formValues = _.pick(data, optionNames) || {};
              const currentType = getRecType(removeSpaces(data.recType));

              const limbTreated = removeSpaces(formData.limbTreated);

              const filesToUpload = mapFilesToMediaFiles(filesRef.current);

              if (initialRecord.current) {
                const variables = createEditVariables({
                  ...formValues,
                  record: initialRecord.current,
                  hisaHorseMedicalId:
                    initialRecord.current.hisaHorseMedicalId || "",
                  horseLocationId: initialHorse?.locationId || "",
                  horseLocationName: initialHorse?.locationName || "",
                  horseId: initialHorse?.hisaHorseId,
                  hisaHorseName: initialHorse?.name,
                  hisaPersonId: hisaPersonId,
                  date: formData.date,
                  time: formData.time,
                  recType: currentType,
                  notes: formData.notes,
                  latLng: userLocation || "",
                  drugDosage: formData.drugDosage,
                  measure: formData.measure,
                  clearedToWork: formData.clearedToWork,
                  clearedToRace: formData.clearedToRace,
                  locationId: formData.treatmentLocation?.locationId || "",
                  locationName: formData.treatmentLocation?.locationName || "",
                  responsibleHisaPersonName:
                    formData.responsibleHisaPersonName ||
                    initialRecord.current.responsibleHisaPersonName ||
                    "",
                  treatingHisaPersonName: treatedByPerson?.hisaPersonName,
                  treatingHisaPersonId: treatedByPerson?.hisaPersonId,
                  limbTreated: limbTreated,
                  documentPaths: filesToUpload,
                  files: filesToUpload ? filesToUpload : [],
                  designatedOwner:
                    initialRecord.current?.designatedOwnerId ?? "",
                  attendingVet: initialRecord.current?.attendingVetId ?? "",
                });
                dispatch(
                  editHorseMedical({
                    variables,
                    successMessage: t("recordUploaded"),
                    errorMessage: t("errorMessage"),
                    successOfflineMessage: t("recordSavedLocally"),
                  })
                );
                setTimeout(() => {
                  router.push(routes.DASHBOARD);
                }, 600);
              }
              dispatch(
                updateDocument({
                  documents: mapFilesToMediaFiles(fileUploadProps.files),
                })
              );

              break;
            default:
              break;
          }
        } catch (e) {}
      },
      [
        activeStep,
        formOptions?.fields,
        formData.notes,
        formData.limbTreated,
        formData.date,
        formData.time,
        formData.drugDosage,
        formData.measure,
        formData.clearedToWork,
        formData.clearedToRace,
        formData.treatmentLocation?.locationId,
        formData.treatmentLocation?.locationName,
        formData.responsibleHisaPersonName,
        dispatch,
        fileUploadProps.files,
        setError,
        initialHorse?.locationId,
        initialHorse?.locationName,
        initialHorse?.hisaHorseId,
        initialHorse?.name,
        hisaPersonId,
        userLocation,
        treatedByPerson?.hisaPersonName,
        treatedByPerson?.hisaPersonId,
        t,
        router,
      ]
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

    const renderItem = useCallback(
      ({ index }: { index: number }) => {
        switch (index) {
          case 0:
            return (
              <FormContainer fields={formOptions?.fields} isReady={isReady} />
            );
          case 1:
            return (
              <DateBlock
                activeIndex={activeStep}
                treatedPerson={treatedByPerson}
                handlePersonChange={handlePersonChange}
              />
            );
          case 2:
            return (
              <Overview
                formData={formData}
                filesProps={fileUploadProps}
                currentFiles={files}
              />
            );
        }
      },
      [
        formOptions?.fields,
        isReady,
        activeStep,
        treatedByPerson,
        handlePersonChange,
        formData,
        fileUploadProps,
        files,
      ]
    );

    const back = useCallback(() => {
      if (activeStep > 1) {
        setActiveStep((prev) => prev - 1);
      } else {
        methods?.reset?.();
        router.back();
      }
    }, [activeStep, methods, router]);

    const screenSize = useScreenSize();

    const styles = useMemo(
      () => ({ height: `${screenSize.height - 48}px` }),
      [screenSize.height]
    );

    const handleCancel = useCallback(() => {
      router.push("/dashboard");
    }, [router]);

    useEffect(() => {
      if (activeStep === 2) {
        getCurrentLocation();
      }
    }, [activeStep, getCurrentLocation]);

    useEffect(() => {
      filesRef.current = fileUploadProps.files;
    }, [fileUploadProps.files]);

    useEffect(() => {
      if (record?.hisaHorseId && record?.hisaHorseName) {
        setValue("hisaHorseId", record.hisaHorseId, { shouldValidate: true });
        setValue("horse", record?.hisaHorseName as any);
      }
    }, [record?.hisaHorseId, record?.hisaHorseName, setValue]);

    useEffect(() => {
      const currentType = getRecType(removeSpaces(recType));
      const prevType = getRecType(removeSpaces(prevRecType.current));
      if (currentType !== prevType) {
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
        prevRecType.current = recType;
      }
    }, [clearErrors, recType, setFormValues]);

    useEffect(() => {
      // init form
      if (initialRecord.current) {
        const {
          recType,
          hisaHorseId,
          drugDosage,
          locationId = "",
          locationName = "",
          clearedToWork,
          clearedToRace,
          testResults,
          notes = "",
        } = initialRecord.current || {};

        const nextFormFields = getFormFields(recType || "");
        const data = _.omit(initialRecord.current, ["status", "timestamp"]);
        const dosage = formatInput(drugDosage || "");
        const dosageNumber = getNumbers(dosage);
        data.drugDosage = dosageNumber;
        setFormOptions(nextFormFields);

        _.forIn(data, function (value, key) {
          setValue(key as any, value);
        });

        setValue("hisaHorseId", hisaHorseId || "", {
          shouldValidate: true,
        });
        setValue("treatmentLocation", {
          locationId,
          locationName,
        } as TLocation);
        setValue("testResults", testResults || "");

        setValue("notes", notes || "");

        if (initialHorse) {
          setValue("horse", horse || "");
        }

        if (
          recType ===
          HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
        ) {
          setValue(
            "inspectionType",
            getInspectionType(clearedToWork, clearedToRace)
          );
        }
      }
      setIsReady(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (!_.isEmpty(treatmentLocation)) {
        setValue("treatmentLocation", treatmentLocation);
        dispatch(setTreatmentLocation({ location: {} as TLocation }));
      }
    }, [dispatch, setValue, treatmentLocation]);

    useEffect(() => {
      if (locationDescription) {
        dispatch(updateDescription({ text: "" }));
      }
    }, [dispatch, getValues, locationDescription, setValue]);

    return (
      <FormProvider {...methods}>
        <div
          className={cn(
            "block sm:hidden",
            activeStep === 1 ? "hidden" : "block"
          )}
        >
          <div className="absolute top-3 right-0 w-10 cursor-pointer z-50">
            <div
              role="button"
              aria-label="Close"
              className="w-6 h-6 items-center justify-center"
              onClick={handleCancel}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <div
          style={styles}
          className="flex flex-col bg-mainBackground pt-2 px-4 pb-safe-bottom sm:pb-safe-bottom-28 sm:px-9 md:px-8 lg:px-16 xl:px-28 2xl:px-40 w-full h-[calc(100vh-3rem)]"
        >
          <div className="block md:hidden">
            <Stepper count={3} activeStep={activeStep - 1} />
          </div>
          <header className="font-tDefault text-2xl font-semibold pb-2 z-10">
            {t("editRecord")}
          </header>
          <div className="flex flex-1 flex-row overflow-hidden">
            <aside className="hidden md:block">
              <StepperDesktop data={stepsConfig} index={activeStep - 1} />
            </aside>
            <ScrollArea className="flex-1 bg-mainBackground sm:border-l sm:border-b8 overflow-y-auto">
              {renderItem({ index: activeStep - 1 })}
            </ScrollArea>
          </div>
          <ButtonsBlockEdit
            buttonTitle={buttonTitle}
            onPress={back}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </FormProvider>
    );
  }
);

EditRecordContainer.displayName = "EditRecordContainer";
