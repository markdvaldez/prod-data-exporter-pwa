"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import { useUserLocation } from "@/hooks/useUserLocation";
import { AddHorsesBlock } from "@/runnersQcApp/containers/AddRecordContainer/components/AddHorsesBlock";
import { removeSpaces } from "@/runnersQcApp/shared/TextUtils";
import {
  TFieldName,
  TFormByProtocolData,
  TFormFields,
  THorse,
  TPerson,
} from "@/runnersQcApp/shared/types";
import { getUniqId } from "@/runnersQcApp/shared/UniqId";
import {
  selectHisaPersonId,
  selectUserData,
} from "@/services/store/modules/auth/selectors";
import { bulkAddRecordsByProtocol } from "@/services/store/modules/horseMedical";
import {
  selectHorsesByPerson,
  selectSearchHorsesResult,
} from "@/services/store/modules/horses/selectors";
import { selectProtocolsByUserId } from "@/services/store/modules/protocols/selectors";
import {
  HorseMedicalRecType,
  TreatmentProtocolResponse,
  TreatmentTemplateModel,
} from "@/Types/global-types";
import { EditTreatmentPanel } from "@/ui-kit/blocks/EditTreatmentPanel";
import { StepperDesktop } from "@/ui-kit/blocks/Stepper";
import { Stepper } from "@/ui-kit/blocks/Stepper/Stepper";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { toast } from "@/ui-kit/hooks/useToast";
import { cn } from "@/ui-kit/lib/utils";
import { getUserFullName } from "@/utils/formatters";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import _ from "lodash";
import { DateTime } from "luxon";
import { getTodayISODate } from "@/runnersQcApp/shared/DateUtils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch, type Resolver } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod/v4";
import { getFormFields } from "../addRecordAndProtocolConfig";
import { ButtonsBlock, DateBlock } from "../AddRecordContainer/components";
import { ButtonsBlockFirstStep } from "../AddRecordContainer/components/ButtonsBlockFirstStep";
import { OverviewView, TreatmentsContainer } from "./components";

export type ApplyProtocolContainerProps = {
  id: any;
  hisaHorseId?: string;
};

const getSchema = () => z.object({});

export const ApplyProtocolContainer: React.FC<ApplyProtocolContainerProps> =
  memo(({ id, hisaHorseId }) => {
    const t = useTranslations();
    const dispatch = useDispatch();

    const protocols = useSelector(selectProtocolsByUserId);
    const userId = useSelector(selectHisaPersonId);

    const protocol = useMemo(() => {
      return _.find(protocols, (protocol) => {
        return protocol.treatmentProtocolId === id;
      });
    }, [id, protocols]);

    const hisaPersonId = useSelector(selectHisaPersonId);
    const searchedHorses = useSelector(selectSearchHorsesResult);
    const myHorses = useSelector(selectHorsesByPerson);

    const [activeStep, setActiveStep] = useState(1);
    const router = useRouter();
    const [formOptions, setFormOptions] = useState(
      getFormFields(HorseMedicalRecType.DrugAdministered)
    );
    const [hasTreatmentAllFields, setHasTreatmentAllFields] = useState(true);

    const [curProtocol, setCurProtocol] = useState<TreatmentProtocolResponse>({
      treatmentProtocolId: getUniqId(),
      protocolName: "",
      treatments: [],
      personId: userId,
    });

    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [activeTreatment, setActiveTreatment] = useState(
      {} as TreatmentTemplateModel
    );

    const userData = useSelector(selectUserData);
    const [treatedByPerson, setTreatedByPerson] = useState<TPerson | null>({
      hisaPersonName: getUserFullName(userData) || "",
      hisaPersonId: userData?.hisaPersonId || "",
    });

    const schema = useMemo(() => getSchema(), []);

    const methods = useForm<TFormFields>({
      resolver: standardSchemaResolver(schema) as any,
      defaultValues: {
        horses: [],
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
      formState: { errors },
      watch,
    } = methods;

    const recType = useWatch({ name: "recType", control });

    const { getCurrentLocation, userLocation } = useUserLocation();

    const handlePersonChange = useCallback((person: TPerson) => {
      setTreatedByPerson(person);
    }, []);

    const handleSetHasTreatmentAllFields = useCallback((value: boolean) => {
      setHasTreatmentAllFields(value);
    }, []);

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
        return horses && horses.length > 1
          ? t("AddRecord.createMedRecords")
          : t("AddRecord.createMedRecord");
      }
      return t("AddRecord.nextStep");
    }, [activeStep, horses, t]);

    const handlePanelOpen = useCallback(() => {
      setIsPanelOpen(!isPanelOpen);
    }, [isPanelOpen]);

    const handleTreatmentsChange = useCallback(
      (nextTreatment: TreatmentTemplateModel) => {
        setCurProtocol((prev) => {
          return {
            ...prev,
            treatments: _.some(prev.treatments, {
              treatmentTemplateId: nextTreatment.treatmentTemplateId,
            })
              ? _.map(prev.treatments, (t) =>
                  t.treatmentTemplateId === nextTreatment.treatmentTemplateId
                    ? nextTreatment
                    : t
                )
              : prev.treatments
              ? [
                  ...prev.treatments,
                  { ...nextTreatment, treatmentTemplateId: getUniqId() },
                ]
              : [nextTreatment],
          };
        });
      },
      []
    );

    const handleDeleteTreatment = useCallback((id: string) => {
      setCurProtocol((prev) => ({
        ...prev,
        treatments: _.reject(prev.treatments, { treatmentTemplateId: id }),
      }));
    }, []);

    const handleEdit = useCallback(
      (item: TreatmentTemplateModel) => {
        if (item) {
          handlePanelOpen();
          setActiveTreatment(item);
        }
      },
      [handlePanelOpen]
    );

    useEffect(() => {
      if (activeStep === 3) {
        getCurrentLocation();
      }
    }, [activeStep, getCurrentLocation]);

    useEffect(() => {
      const currentType =
        recType === "Tests and Diagnostics"
          ? HorseMedicalRecType.Test
          : removeSpaces(recType);
      const nextFormFields = getFormFields(currentType);
      setFormOptions(nextFormFields);
      setTimeout(clearErrors, 64);
      setValue("date", getTodayISODate());
    }, [clearErrors, recType, setFormValues, setValue]);

    useEffect(() => {
      const newHorses = [...(myHorses || []), ...(searchedHorses || [])];
      if (hisaHorseId && _.isEmpty(horses)) {
        const selectedHorse = newHorses.find(
          (horse) => horse.hisaHorseId === hisaHorseId
        );
        if (selectedHorse) {
          setValue("horses", [selectedHorse]);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hisaHorseId, searchedHorses, myHorses, setValue]);

    const next = useCallback(() => {
      setActiveStep((prev) => prev + 1);
    }, []);

    const handleCancelClick = useCallback(() => {
      router.back();
    }, [router]);

    const back = useCallback(() => {
      setActiveStep((prev) => prev - 1);
    }, []);

    const stepsConfig = useMemo(() => {
      return [
        { id: 0, title: t("AddRecord.addHorses") },
        { id: 1, title: t("Protocols.treatments") },
        { id: 2, title: t("AddRecord.date&time") },
        { id: 3, title: t("AddRecord.recordOverview") },
      ];
    }, [t]);

    const isShownBanner = useMemo(() => {
      const innerHorse: THorse | undefined = _.head(horses);
      return innerHorse && innerHorse?.locationId && !innerLocation
        ? true
        : false;
    }, [horses, innerLocation]);

    const validateTreatmentLocation = useCallback(() => {
      if (_.isEmpty(innerLocation)) {
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
          if (activeStep === 2) {
            setActiveStep(activeStep + 1);
          } else if (activeStep === 3) {
            validateTreatmentLocation();
            if (!_.isEmpty(innerLocation)) {
              setActiveStep(activeStep + 1);
            }
          } else if (activeStep === 4) {
            const treatments = curProtocol.treatments;
            const latLng: string | undefined = userLocation;
            const successMessage =
              horses && horses?.length > 1
                ? t("AddRecord.recordsUploaded")
                : t("AddRecord.recordUploaded");
            const successOfflineMessage = t("AddRecord.recordsSavedLocally");
            const errorMessage = t("AddRecord.errorMessage");

            dispatch(
              bulkAddRecordsByProtocol({
                data: formData as TFormByProtocolData,
                treatments: treatments as TreatmentTemplateModel[],
                hisaPersonId,
                treatingHisaPersonName: treatedByPerson?.hisaPersonName,
                treatingHisaPersonId: treatedByPerson?.hisaPersonId,
                latLng,
                successMessage,
                successOfflineMessage,
                errorMessage,
              })
            );

            router.push("/dashboard");
          }
        } catch (e) {}
      },
      [
        activeStep,
        curProtocol.treatments,
        dispatch,
        formData,
        hisaPersonId,
        horses,
        innerLocation,
        router,
        t,
        treatedByPerson,
        userLocation,
        validateTreatmentLocation,
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
            return (
              <TreatmentsContainer
                treatments={curProtocol.treatments as TreatmentTemplateModel[]}
                onTreatmentsChange={handleTreatmentsChange}
                handleDeleteTreatment={handleDeleteTreatment}
                handleEdit={handleEdit}
                handleSetHasTreatmentAllFields={handleSetHasTreatmentAllFields}
              />
            );
          case 2:
            return (
              <DateBlock
                activeIndex={activeStep}
                treatedPerson={treatedByPerson}
                handlePersonChange={handlePersonChange}
              />
            );
          case 3:
            return <OverviewView treatments={curProtocol.treatments} />;
        }
      },
      [
        activeStep,
        curProtocol.treatments,
        handleDeleteHorse,
        handleDeleteTreatment,
        handleEdit,
        handleHorsePress,
        handlePersonChange,
        handleSetHasTreatmentAllFields,
        handleTreatmentsChange,
        horses,
        treatedByPerson,
      ]
    );

    const handleCancel = useCallback(() => {
      router.push("/dashboard");
    }, [router]);

    const screenSize = useScreenSize();

    const styles = useMemo(
      () => ({ height: `${screenSize.height - 48}px` }),
      [screenSize.height]
    );

    useEffect(() => {
      if (protocol) {
        setCurProtocol(protocol);
      }
    }, []);

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
            {t("Protocols.applyProtocol")}
          </header>
          <div className="flex flex-1 flex-row overflow-hidden">
            <div className="hidden md:block">
              <StepperDesktop data={stepsConfig} index={activeStep - 1} />
            </div>
            <ScrollArea className="flex-1 bg-mainBackground sm:border-l sm:border-b8 overflow-y-auto">
              {renderItem({ index: activeStep - 1 })}
            </ScrollArea>
          </div>
          {activeStep === 1 ? (
            <ButtonsBlockFirstStep
              buttonTitle={buttonTitle}
              disabled={isDisabled}
              onPress={next}
              handleCancel={handleCancelClick}
            />
          ) : (
            <ButtonsBlock
              disabled={!hasTreatmentAllFields}
              buttonTitle={buttonTitle}
              activeIndex={activeStep}
              onPress={back}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </div>
        <EditTreatmentPanel
          isOpen={isPanelOpen}
          activeTreatment={activeTreatment}
          handleOpen={handlePanelOpen}
          onTreatmentsChange={handleTreatmentsChange}
        />
      </FormProvider>
    );
  });

ApplyProtocolContainer.displayName = "ApplyProtocolContainer";
