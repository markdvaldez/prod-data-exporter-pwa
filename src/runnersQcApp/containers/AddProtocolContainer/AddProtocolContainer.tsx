"use client";

import {
  HorseMedicalRecType,
  TreatmentProtocolResponse,
  TreatmentTemplateModel,
  TreatmentTemplateRequest,
} from "@/Types";
import _ from "lodash";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";

import { useScreenSize } from "@/hooks/useScreenSize";
import { getUniqId } from "@/runnersQcApp/shared/UniqId";
import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { useProtocols } from "@/ui-kit/hooks/useProtocols";
import { toast } from "@/ui-kit/hooks/useToast";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { createProtocolVariables } from "../addRecordAndProtocolConfig";
import { getInspectionType } from "../AddRecordContainer/helper";
import { FormHandlers } from "../CreateLocationContainer/CreateLocationContainer";
import { TreatmentFormComponent } from "./components";
import { ButtonsFirstStep } from "./components/ButtonsFirstStep";
import { ButtonsSecondStep } from "./components/ButtonsSecondStep";
import { ProtocolList } from "./components/ProtocolListContainer";

type AddRecordContainerProps = {
  route?: any;
};

type ExtendedTreatment = TreatmentTemplateRequest & {
  treatmentTemplateId: string;
};

export const AddProtocolContainer: React.FC<AddRecordContainerProps> = memo(
  () => {
    const t = useTranslations();
    const router = useRouter();

    const { createProtocol } = useProtocols();
    const userId = useSelector(selectHisaPersonId);
    const formRef = useRef<FormHandlers>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isConnected = useInternetConnection();

    const [activeIndex, setActiveIndex] = useState(0);
    const [protocol, setProtocol] = useState<TreatmentProtocolResponse>({
      protocolName: "",
      treatments: [],
      personId: userId,
    });
    const [recType, setRecType] = useState<HorseMedicalRecType>(
      HorseMedicalRecType.AlternativeTreatments
    );
    const [error, setError] = useState<string>("");
    const activeTreatment = useRef<TreatmentTemplateModel | undefined>(null);

    const handleSetRecType = useCallback(
      (recType: HorseMedicalRecType | string) => {
        setRecType(recType as HorseMedicalRecType);
        formRef.current?.resetForm();
      },
      []
    );

    const handleButtonPress = useCallback(() => {
      setActiveIndex(0);
      handleSetRecType(HorseMedicalRecType.AlternativeTreatments);
    }, [handleSetRecType]);

    const handleChangeName = useCallback(
      (text: string | ChangeEvent<HTMLInputElement>) => {
        const newValue = typeof text === "string" ? text : text.target.value;
        setProtocol((prev) => ({ ...prev, protocolName: newValue }));
        setError("");
      },
      []
    );

    const handleClear = useCallback(() => {
      setProtocol((prev) => ({ ...prev, name: "" }));
      if (inputRef?.current) {
        inputRef.current.value = "";
      }
    }, []);

    const handleRemove = useCallback((id: string) => {
      setProtocol((prev) => ({
        ...prev,
        treatments: _.filter(
          (prev.treatments as ExtendedTreatment[]) ?? [],
          (item) => item.treatmentTemplateId !== id
        ),
      }));
      activeTreatment.current = undefined;
    }, []);

    const handleEdit = useCallback(
      (id: string) => {
        const itemToEdit = protocol.treatments
          ? _.find(protocol.treatments, {
              treatmentTemplateId: id,
            })
          : undefined;

        if (itemToEdit) {
          activeTreatment.current = itemToEdit;
          handleSetRecType(itemToEdit.recType || "");
          setActiveIndex(0);
        }
      },
      [handleSetRecType, protocol.treatments]
    );

    const onSubmit = useCallback(
      (data: any = {}) => {
        let newData = {};
        if (data.inspectionType) {
          newData = getInspectionType(data);
        } else {
          newData = data;
        }

        const variables = createProtocolVariables({
          ...newData,
          recType,
        });

        const variablesForSetState = {
          ...createProtocolVariables({
            ...newData,
            recType,
          }),
          treatmentTemplateId: getUniqId(),
        };

        if (activeTreatment.current) {
          setProtocol((prev) => ({
            ...prev,
            treatments: _.map(prev.treatments, (treatment) => {
              return treatment.treatmentTemplateId ===
                activeTreatment?.current?.treatmentTemplateId
                ? {
                    ...variables,
                    treatmentTemplateId:
                      activeTreatment?.current?.treatmentTemplateId,
                  }
                : treatment;
            }),
          }));
        } else {
          setProtocol((prev) => ({
            ...prev,
            treatments: prev.treatments
              ? [...prev.treatments, variablesForSetState]
              : [variablesForSetState],
          }));
        }
        activeTreatment.current = undefined;
        setActiveIndex(1);
      },
      [recType]
    );

    const handleCancel = useCallback(() => {
      if (!_.isEmpty(protocol.treatments)) {
        activeTreatment.current = undefined;
        setActiveIndex(1);
      } else {
        router.back();
      }
    }, [protocol.treatments, router]);

    const handleComplete = useCallback(() => {
      setActiveIndex(1);
    }, []);

    const handleSaveEndExit = useCallback(() => {
      if (!protocol.protocolName) {
        setError(t("Error.required"));
        return;
      }
      if (_.isEmpty(protocol.treatments)) {
        toast({ title: t("Protocols.alertTitle"), variant: "default" });
        return;
      }

      createProtocol({
        protocolName: protocol.protocolName,
        treatments: protocol.treatments,
        personId: protocol.personId,
        isPublic: false,
      });

      activeTreatment.current = undefined;
      router.push("/dashboard");
    }, [
      protocol.protocolName,
      protocol.treatments,
      protocol.personId,
      createProtocol,
      t,
      router,
    ]);

    const renderItem = useCallback(
      ({ index }: { index: number }) => {
        switch (index) {
          case 0:
            return (
              <TreatmentFormComponent
                ref={formRef}
                protocolName={protocol?.protocolName || ""}
                recType={recType}
                activeTreatment={
                  activeTreatment.current as TreatmentTemplateModel
                }
                handleChangeName={handleChangeName}
                handleClear={handleClear}
                onSubmit={onSubmit}
                handleSetRecType={handleSetRecType}
              />
            );
          case 1:
            return (
              <ProtocolList
                name={protocol?.protocolName}
                treatments={protocol?.treatments as TreatmentTemplateModel[]}
                error={error}
                onChangeName={handleChangeName}
                onEdit={handleEdit}
                onDelete={handleRemove}
                handleClear={handleClear}
              />
            );
        }
      },
      [
        error,
        handleChangeName,
        handleClear,
        handleEdit,
        handleRemove,
        handleSetRecType,
        onSubmit,
        protocol?.protocolName,
        protocol?.treatments,
        recType,
      ]
    );

    const renderButtons = useMemo(() => {
      if (activeIndex === 0) {
        return (
          <ButtonsFirstStep
            onPress={() => {
              formRef.current?.submitForm();
            }}
            currentTreatment={activeTreatment?.current}
            treatments={protocol.treatments as TreatmentTemplateRequest[]}
            handleComplete={handleComplete}
            handleCancel={handleCancel}
          />
        );
      } else {
        return (
          <ButtonsSecondStep
            onAddClick={handleButtonPress}
            onSaveClick={handleSaveEndExit}
          />
        );
      }
    }, [
      activeIndex,
      handleButtonPress,
      handleCancel,
      handleComplete,
      handleSaveEndExit,
      protocol.treatments,
    ]);

    const screenSize = useScreenSize();

    const styles = useMemo(
      () => ({ height: `${screenSize.height - 48}px` }),
      [screenSize.height]
    );

    return (
      <>
        <div className={cn("block sm:hidden")}>
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
          className="flex flex-col bg-mainBackground pt-2 px-4 pb-safe-bottom sm:pb-safe-bottom-28 sm:px-9 md:px-8 lg:px-16 xl:px-28 2xl:px-40 w-full overflow-hidden"
        >
          <header
            className={cn(
              "font-tDefault text-2xl font-semibold pb-2 z-10",
              isConnected ? "pt-0" : "pt-5 sm:pt-0"
            )}
          >
            {t("Protocols.createProtocol")}
          </header>
          <ScrollArea className="bg-mainBackground w-full flex-1 overflow-y-auto">
            {renderItem({ index: activeIndex })}
          </ScrollArea>
          {renderButtons}
        </div>
      </>
    );
  }
);

AddProtocolContainer.displayName = "AddProtocolContainer";
