"use client";

import { useFileUpload } from "@/hooks/useFileUpload";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useUserLocation } from "@/hooks/useUserLocation";
import { AddHorsesBlock } from "@/runnersQcApp/containers/AddRecordContainer/components/AddHorsesBlock";
import { removeSpaces } from "@/runnersQcApp/shared/TextUtils";
import { InspectionType, THorse } from "@/runnersQcApp/shared/types";
import {
  selectHisaPersonId,
  selectUserData,
  selectUsername,
} from "@/services/store/modules/auth/selectors";
import {
  addHorseMedical,
  addHorseMedicalBulk,
  updateDocument,
} from "@/services/store/modules/horseMedical";
import {
  selectHorsesByPerson,
  selectSearchHorsesResult,
} from "@/services/store/modules/horses/selectors";
import { TPerson } from "@/Types";
import {
  HorseMedicalRecType,
  HorseMedicalRouteAdmin,
} from "@/Types/global-types";
import { RecordOverview } from "@/ui-kit/blocks/RecordOverview";
import { StepperDesktop } from "@/ui-kit/blocks/Stepper";
import { Stepper } from "@/ui-kit/blocks/Stepper/Stepper";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { toast } from "@/ui-kit/hooks/useToast";
import { cn } from "@/ui-kit/lib/utils";
import { mapFilesToMediaFiles } from "@/utils/fileUtils";
import { getUserFullName } from "@/utils/formatters";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import _ from "lodash";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm, useWatch, type Resolver } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createVariables,
  getFormFields,
  getRecType,
} from "../addRecordAndProtocolConfig";
import { ButtonsBlock, DateBlock } from "./components";
import { ButtonsBlockFirstStep } from "./components/ButtonsBlockFirstStep";
import { TreatmentFormContainer } from "./components/TreatmentFormContainer";
import { TFieldName, TFormFields } from "./types";

export type AddRecordContainerProps = {
  route?: any;
};

const steps = 4;

export const AddRecordContainer: React.FC<AddRecordContainerProps> = memo(
  () => {
    const t = useTranslations("AddRecord");
    const dispatch = useDispatch();

    const scrollRef = useRef<HTMLDivElement>(null);

    const hisaPersonId = useSelector(selectHisaPersonId);
    const hisaPersonName = useSelector(selectUsername);
    const hisaPersonData = useSelector(selectUserData);
    const searchedHorses = useSelector(selectSearchHorsesResult);
    const myHorses = useSelector(selectHorsesByPerson);

    const fileUploadProps = useFileUpload();

    const filesRef = useRef<File[]>([]);

    const searchParams = useSearchParams();
    const horseId = searchParams.get("horseId");

    const [activeStep, setActiveStep] = useState(1);
    const router = useRouter();
    const [formOptions, setFormOptions] = useState(
      getFormFields(HorseMedicalRecType.DrugAdministered)
    );

    const [treatedByPerson, setTreatedByPerson] = useState<TPerson | null>({
      hisaPersonName: getUserFullName(hisaPersonData) || "",
      hisaPersonId: hisaPersonData?.hisaPersonId || "",
    });

    const methods = useForm<TFormFields>({
      resolver: standardSchemaResolver(formOptions.schema) as any,
      defaultValues: {
        horses: [],
        recType: HorseMedicalRecType.AlternativeTreatments,
      },
      mode: "onSubmit",
      reValidateMode: "onSubmit",
    });

    const {
      handleSubmit,
      setValue,
      control,
      clearErrors,
      setError,
      formState,
      watch,
    } = methods;

    const recType = useWatch({ name: "recType", control });
    const form = watch();

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

    const horses = useWatch({ name: "horses", control });
    const formData = useWatch({ control });
    const innerLocation = useWatch({ name: "treatmentLocation", control });

    const buttonTitle = useMemo(() => {
      if (activeStep === 4) {
        return horses.length > 1 ? t("createMedRecords") : t("createMedRecord");
      }
      return t("nextStep");
    }, [activeStep, horses.length, t]);

    const { getCurrentLocation, userLocation } = useUserLocation();

    const handlePersonChange = useCallback((person: TPerson) => {
      setTreatedByPerson(person);
    }, []);

    useEffect(() => {
      if (activeStep === 3) {
        getCurrentLocation();
      }
    }, [activeStep, getCurrentLocation]);

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

    useEffect(() => {
      const newHorses = [...(myHorses || []), ...(searchedHorses || [])];
      if (horseId && _.isEmpty(horses)) {
        const selectedHorse = newHorses.find(
          (horse) => horse.hisaHorseId === horseId
        );
        if (selectedHorse) {
          setValue("horses", [selectedHorse]);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [horseId, searchedHorses, myHorses, setValue]);

    useEffect(() => {
      filesRef.current = fileUploadProps.files;
    }, [fileUploadProps.files]);

    const next = useCallback(() => {
      setActiveStep((prev) => prev + 1);
    }, []);

    const back = useCallback(() => {
      setActiveStep((prev) => prev - 1);
    }, []);

    const stepsConfig = useMemo(() => {
      return [
        { id: 0, title: t("findHorse") },
        { id: 1, title: t("medicalForm") },
        { id: 2, title: t("date&time") },
        { id: 3, title: t("recordOverview") },
      ];
    }, [t]);

    const isShownBanner = useMemo(() => {
      const innerHorse: THorse | undefined = _.head(horses);
      return innerHorse && innerHorse?.locationId && !innerLocation?.locationId
        ? true
        : false;
    }, [horses, innerLocation]);

    const validateTreatmentLocation = useCallback(() => {
      if (_.isEmpty(innerLocation?.locationId)) {
        const errorMessage = "Treatment location is required";
        if (isShownBanner) {
          toast({
            title: errorMessage,
            variant: "destructive",
          });
        }

        setError("treatmentLocation", {
          type: "manual",
          message: isShownBanner ? "" : errorMessage,
        });

        return;
      }

      setError("treatmentLocation", {
        type: "manual",
        message: "",
      });
    }, [innerLocation, isShownBanner, setError]);

    const isDisabled = useMemo(() => {
      return _.isEmpty(horses);
    }, [horses]);

    const onSubmit = useCallback(
      async (data: TFormFields) => {
        try {
          scrollRef.current?.scrollTo({ top: 0 });

          if (activeStep === 2) {
            setActiveStep(activeStep + 1);
          } else if (activeStep === 3) {
            validateTreatmentLocation();
            if (!_.isEmpty(innerLocation?.locationId)) {
              setActiveStep(activeStep + 1);
            }
          } else if (activeStep === 4) {
            const filesToUpload = mapFilesToMediaFiles(filesRef.current);
            const optionNames = _.map(
              formOptions.fields,
              (field) => field.name
            );

            const formValues = _.pick(data, optionNames) || {};

            if (
              formData.inspectionType === InspectionType.NotCleared &&
              !formData.notes?.trim().length
            ) {
              setError("notes", {
                type: "manual",
                message: "This field is required",
              });
              return;
            }

            const firstHorse = _.head(horses);
            const currentType = getRecType(removeSpaces(data.recType));
            const limbTreated = removeSpaces(formData.limbTreated);

            _.map(formData.horses, (horseItem) => {
              const variables = createVariables({
                ...formValues,
                horseLocationId: firstHorse?.locationId,
                horseLocationName: firstHorse?.locationName,
                horseId: horseItem.hisaHorseId,
                hisaHorseName: horseItem?.name,
                hisaPersonId: hisaPersonId,
                date: formData.date,
                time: formData.time,
                recType: currentType,
                notes: formData.notes,
                latLng: userLocation || "",
                drugDosage: formData.drugDosage,
                measure: formData.measure,
                responsibleHisaPersonId: horseItem?.responsiblePersonHisaId,
                ownerHisaId: horseItem?.ownerHisaId,
                clearedToWork: formData.clearedToWork,
                clearedToRace: formData.clearedToRace,
                locationId: formData.treatmentLocation?.locationId,
                locationName: formData.treatmentLocation?.locationName,
                responsibleHisaPersonName: horseItem?.responsiblePersonName,
                treatingHisaPersonName: treatedByPerson?.hisaPersonName,
                treatingHisaPersonId: treatedByPerson?.hisaPersonId,
                designatedOwnerName: horseItem?.ownerName,
                limbTreated: limbTreated,
                documentPaths: filesToUpload,
                files: horses?.length === 1 ? filesToUpload : [],
              });

              const errorMessage = t("errorMessage");
              if (formData.horses?.length === 1) {
                const successMessage = t("recordUploaded");
                const successOfflineMessage = t("recordSavedLocally");
                dispatch(
                  addHorseMedical({
                    variables,
                    successMessage,
                    errorMessage,
                    successOfflineMessage,
                  })
                );
              } else {
                const successMessage = t("recordsUploaded");
                const successOfflineMessage = t("recordsSavedLocally");
                dispatch(
                  addHorseMedicalBulk({
                    variables,
                    successMessage,
                    errorMessage,
                    successOfflineMessage,
                  })
                );
              }
              dispatch(
                updateDocument({
                  documents: mapFilesToMediaFiles(fileUploadProps.files),
                })
              );
            });
            router.push("/dashboard");
          }
        } catch (e) {}
      },
      [
        activeStep,
        validateTreatmentLocation,
        innerLocation?.locationId,
        formOptions.fields,
        formData.inspectionType,
        formData.notes,
        formData.limbTreated,
        formData.horses,
        formData.date,
        formData.time,
        formData.drugDosage,
        formData.measure,
        formData.clearedToWork,
        formData.clearedToRace,
        formData.treatmentLocation?.locationId,
        formData.treatmentLocation?.locationName,
        horses,
        router,
        setError,
        hisaPersonId,
        userLocation,
        treatedByPerson?.hisaPersonName,
        treatedByPerson?.hisaPersonId,
        t,
        dispatch,
        fileUploadProps.files,
      ]
    );

    const handleHorsePress = useCallback(
      (item: THorse) => {
        const exists = _.some(horses, { hisaHorseId: item.hisaHorseId });

        if (exists) {
          const newHorses = _.filter(
            horses,
            (horseItem) => horseItem.hisaHorseId !== item.hisaHorseId
          );
          return setValue("horses", newHorses);
        } else {
          const newHorses = [...(horses || []), item];
          return setValue("horses", newHorses as THorse[]);
        }
      },
      [horses, setValue]
    );

    const handleDeleteHorse = useCallback(
      (item: THorse) => {
        const newHorses = _.filter(
          horses,
          (horseItem) => horseItem.hisaHorseId !== item.hisaHorseId
        );
        setValue("horses", newHorses);
      },
      [horses, setValue]
    );

    const renderItem = useCallback(
      ({ index }: { index: number }) => {
        switch (index) {
          case 0:
            return (
              <AddHorsesBlock
                horses={horses || []}
                handleItemPress={handleHorsePress}
                handleDeleteHorse={handleDeleteHorse}
              />
            );
          case 1:
            return <TreatmentFormContainer fields={formOptions.fields} />;
          case 2:
            return (
              <DateBlock
                activeIndex={activeStep}
                treatedPerson={treatedByPerson}
                handlePersonChange={handlePersonChange}
              />
            );
          case 3:
            return (
              <RecordOverview
                formData={formData}
                filesProps={fileUploadProps}
              />
            );
        }
      },
      [
        horses,
        handleHorsePress,
        handleDeleteHorse,
        formOptions.fields,
        activeStep,
        treatedByPerson,
        handlePersonChange,
        formData,
        fileUploadProps,
      ]
    );

    const screenSize = useScreenSize();

    const styles = useMemo(
      () => ({ height: `${screenSize.height - 48}px` }),
      [screenSize.height]
    );

    const handleCancel = useCallback(() => {
      router.push("/dashboard");
    }, [router]);

    return (
      <FormProvider {...methods}>
        <div
          className={cn(
            "block sm:hidden",
            activeStep === 1 ? "hidden" : "fixed top-0 right-0 z-50"
          )}
        >
          <div className="absolute top-3 right-0 w-10 cursor-pointer z-50">
            <div
              className="w-6 h-6 items-center justify-center"
              onClick={handleCancel}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
        <div
          style={styles}
          className="flex flex-col bg-mainBackground pt-2 px-4 pb-safe-bottom sm:pb-safe-bottom-28 sm:px-9 md:px-8 lg:px-16 xl:px-28 2xl:px-40 w-full"
        >
          <div className="block md:hidden">
            <Stepper count={4} activeStep={activeStep - 1} />
          </div>
          <header className="font-tDefault text-2xl font-semibold pb-2 z-10">
            {t("newMedRecord")}
          </header>
          <div className="flex flex-1 flex-row overflow-hidden">
            <aside className="hidden md:block">
              <StepperDesktop data={stepsConfig} index={activeStep - 1} />
            </aside>
            <ScrollArea className="flex-1 bg-mainBackground sm:border-l sm:border-b8 overflow-y-auto">
              {renderItem({ index: activeStep - 1 })}
            </ScrollArea>
          </div>
          {activeStep === 1 ? (
            <ButtonsBlockFirstStep
              buttonTitle={buttonTitle}
              disabled={isDisabled}
              onPress={next}
            />
          ) : (
            <ButtonsBlock
              buttonTitle={buttonTitle}
              activeIndex={activeStep}
              onPress={back}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </div>
      </FormProvider>
    );
  }
);

AddRecordContainer.displayName = "AddRecordContainer";
