"use client";

import {
  HorseMedicalRecType,
  TreatmentProtocolResponse,
  TreatmentTemplateModel,
} from "@/Types";
import _ from "lodash";
import React, {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";

import { useScreenSize } from "@/hooks/useScreenSize";
import { getUniqId } from "@/runnersQcApp/shared/UniqId";
import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import {
  selectIsAddingTreatment,
  selectProtocolsByUserId,
} from "@/services/store/modules/protocols/selectors";
import { ModalDialog } from "@/ui-kit/blocks/ModalDialog";
import { CloseIcon } from "@/ui-kit/components/Icons/CloseIcon";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { useProtocols } from "@/ui-kit/hooks/useProtocols";
import { toast } from "@/ui-kit/hooks/useToast";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { TreatmentFormComponent } from "../AddProtocolContainer/components";
import { ButtonsFirstStep } from "../AddProtocolContainer/components/ButtonsFirstStep";
import { ProtocolList } from "../AddProtocolContainer/components/ProtocolListContainer";
import { createProtocolVariables } from "../addRecordAndProtocolConfig";
import { getInspectionType } from "../AddRecordContainer/helper";
import { FormHandlers } from "../CreateLocationContainer/CreateLocationContainer";
import { ButtonsEditBlock } from "./ButtonsEditBlock";

type EditProtocolContainerProps = {
  id?: any;
};

export const EditProtocolContainer: React.FC<EditProtocolContainerProps> = memo(
  ({ id }) => {
    const t = useTranslations();
    const router = useRouter();
    const userId = useSelector(selectHisaPersonId);
    const formRef = useRef<FormHandlers>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const {
      addToProtocol,
      deleteFromProtocol,
      updateTreatmentTemplate,
      updateProtocolName,
    } = useProtocols();

    const [activeIndex, setActiveIndex] = useState(0);
    const [protocol, setProtocol] = useState<TreatmentProtocolResponse>({
      protocolName: "",
      treatments: [],
      personId: userId,
    });

    const [recType, setRecType] = useState<HorseMedicalRecType | string>(
      HorseMedicalRecType.AlternativeTreatments
    );
    const [error, setError] = useState<string>("");
    const activeTreatment = useRef<TreatmentTemplateModel | undefined>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(
      null
    );
    const [protocolName, setProtocolName] = useState("");

    const protocols = useSelector(selectProtocolsByUserId);

    const isAddingTreatment = useSelector(selectIsAddingTreatment);

    const currentProtocol = useMemo(() => {
      return _.find(protocols, (protocol) => {
        return protocol.treatmentProtocolId === id;
      });
    }, [id, protocols]);

    useEffect(() => {
      if (currentProtocol) {
        setProtocol(currentProtocol);
      }
      if (protocolName) {
        setProtocol((prev) => ({ ...prev, protocolName }));
      }
    }, [currentProtocol, protocolName]);

    const handleCancelClick = useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleSubmit = useCallback(() => {
      if (selectedProtocolId) {
        deleteFromProtocol(
          protocol?.treatmentProtocolId || "",
          selectedProtocolId
        );
        activeTreatment.current = undefined;
      }
    }, [deleteFromProtocol, protocol?.treatmentProtocolId, selectedProtocolId]);

    const handleSetRecType = useCallback(
      (recType: HorseMedicalRecType | string) => {
        setRecType(recType);
        formRef.current?.resetForm();
      },
      []
    );

    const handleButtonPress = useCallback(() => {
      setActiveIndex(1);
      handleSetRecType(HorseMedicalRecType.AlternativeTreatments);
    }, [handleSetRecType]);

    const handleChangeName = useCallback(
      (text: string | ChangeEvent<HTMLInputElement>) => {
        const newValue = typeof text === "string" ? text : text.target.value;
        setProtocol((prev) => ({ ...prev, protocolName: newValue }));
        setError("");
        setProtocolName(newValue);
      },
      []
    );

    const handleClear = useCallback(() => {
      setProtocol((prev) => ({ ...prev, protocolName: "" }));
      if (inputRef?.current) {
        inputRef.current.value = "";
      }
    }, []);

    const handleRemove = useCallback(
      (id: string) => {
        setSelectedProtocolId(id);
        setIsOpen(!isOpen);
      },
      [isOpen]
    );

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
          setActiveIndex(1);
        }
      },
      [handleSetRecType, protocol.treatments]
    );

    const onSubmit = useCallback(
      (data: any) => {
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

        if (activeTreatment.current) {
          const itemToEdit = {
            ...variables,
            treatmentTemplateId: activeTreatment?.current?.treatmentTemplateId,
            treatmentProtocolId: activeTreatment?.current?.treatmentProtocolId,
          };
          setProtocol((prev) => ({
            ...prev,
            treatments: _.map(prev.treatments, (treatment) =>
              treatment.treatmentTemplateId ===
              activeTreatment?.current?.treatmentTemplateId
                ? {
                    ...variables,
                    treatmentTemplateId:
                      activeTreatment?.current?.treatmentTemplateId,
                    treatmentProtocolId:
                      activeTreatment?.current?.treatmentProtocolId,
                  }
                : treatment
            ),
          }));

          if (itemToEdit) {
            updateTreatmentTemplate(
              protocol?.treatmentProtocolId || "",
              itemToEdit
            );
          }
        } else {
          setProtocol((prev) => ({
            ...prev,
            treatments: prev.treatments
              ? [
                  ...prev.treatments,
                  { ...variables, treatmentTemplateId: getUniqId() },
                ]
              : [variables],
          }));
          addToProtocol({
            treatment: {
              ...variables,
              treatmentProtocolId: currentProtocol?.treatmentProtocolId,
            },
            protocolId: currentProtocol?.treatmentProtocolId || "",
          });
        }
        activeTreatment.current = undefined;
        setActiveIndex(0);
      },
      [
        addToProtocol,
        currentProtocol?.treatmentProtocolId,
        protocol?.treatmentProtocolId,
        recType,
        updateTreatmentTemplate,
      ]
    );

    const handleCancel = useCallback(() => {
      router.back();
    }, [router]);

    const handleSaveEndExit = useCallback(() => {
      if (!protocol.protocolName) {
        setError(t("Error.required"));
        return;
      }
      if (_.isEmpty(protocol.treatments)) {
        toast({ title: t("Protocols.alertTitle"), variant: "default" });
        return;
      }

      if (currentProtocol?.protocolName !== protocol.protocolName) {
        updateProtocolName({
          protocolId: protocol.treatmentProtocolId || "",
          protocolName: protocol.protocolName || "",
        });
      }
      activeTreatment.current = undefined;
      router.push("/dashboard");
    }, [
      currentProtocol?.protocolName,
      protocol.protocolName,
      protocol.treatmentProtocolId,
      protocol.treatments,
      router,
      t,
      updateProtocolName,
    ]);

    const screenSize = useScreenSize();

    const styles = useMemo(
      () => ({ height: `${screenSize.height - 48}px` }),
      [screenSize.height]
    );

    const renderItem = useCallback(
      ({ index }: { index: number }) => {
        switch (index) {
          case 0:
            return (
              <ProtocolList
                name={protocol?.protocolName}
                treatments={protocol?.treatments}
                error={error}
                onChangeName={handleChangeName}
                onEdit={handleEdit}
                onDelete={handleRemove}
                handleClear={handleClear}
              />
            );
          case 1:
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
          <ButtonsEditBlock
            onAddClick={handleButtonPress}
            onSaveClick={handleSaveEndExit}
          />
        );
      } else {
        return (
          <ButtonsFirstStep
            isLoading={isAddingTreatment}
            onPress={() => {
              formRef.current?.submitForm();
            }}
            currentTreatment={activeTreatment.current}
            handleCancel={handleCancel}
          />
        );
      }
    }, [
      activeIndex,
      handleButtonPress,
      handleCancel,
      handleSaveEndExit,
      isAddingTreatment,
    ]);

    useEffect(() => {
      if (activeIndex !== 1) {
        formRef.current?.resetForm();
      }
    }, [activeIndex]);

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
          className="flex flex-col bg-mainBackground pt-2 px-4 pb-safe-bottom sm:pb-safe-bottom-28 sm:px-9 md:px-8 lg:px-16 xl:px-28 2xl:px-40 w-full"
        >
          <header className="font-tDefault text-xl md:text-3xl font-semibold pb-2">
            {t("Protocols.editProtocol")}
          </header>
          <ScrollArea className="flex-1 bg-mainBackground overflow-y-auto">
            {renderItem({ index: activeIndex })}
          </ScrollArea>
          {renderButtons}
        </div>
        <ModalDialog
          open={isOpen}
          title={t("Protocols.removeFromProtocol")}
          description={t("Protocols.areYouSureYouWantToRemoveThisTreatment")}
          buttonTitle={t("Protocols.delete")}
          onCancelClick={handleCancelClick}
          onSubmitClick={handleSubmit}
        />
      </>
    );
  }
);

EditProtocolContainer.displayName = "EditProtocolContainer";
