"use client";

import { useScreenSize } from "@/hooks/useScreenSize";
import { checkSubstring } from "@/runnersQcApp/shared/CompareUtils";
import { clearSearchText } from "@/runnersQcApp/shared/TextUtils";
import routes from "@/routes";
import { selectProtocolsByUserId } from "@/services/store/modules/protocols/selectors";
import { HorseMedicalRecType, TreatmentProtocolResponse } from "@/Types";
import { ModalDialog } from "@/ui-kit/blocks/ModalDialog";
import { BackButton } from "@/ui-kit/components/BackButton";
import { Button } from "@/ui-kit/components/Button";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import { useProtocols } from "@/ui-kit/hooks/useProtocols";
import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  getCurrentType,
  getFormattedTitle,
  getInspectionType,
  splitCamelCase,
} from "../addRecordAndProtocolConfig";
import { ProtocolsListItem } from "./ProtocolListItem";

export const MyProtocolsContainer: React.FC = () => {
  const t = useTranslations();
  const protocols = useSelector(selectProtocolsByUserId);
  const router = useRouter();

  const { deleteProtocol } = useProtocols();

  const isConnected = useInternetConnection();

  const screenSize = useScreenSize();
  const isSmallScreen = useIsMobile();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(
    null
  );

  const styles = useMemo(() => {
    const h = isSmallScreen ? 120 : 46;
    return { height: `${screenSize.height - h}px` };
  }, [isSmallScreen, screenSize.height]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const onOpenChange = useCallback(
    (id: string) => {
      setIsOpen(!isOpen);
      setSelectedProtocolId(id);
    },
    [isOpen]
  );

  const handleEdit = useCallback(
    (id: string) => {
      if (id) {
        router.push(routes.EDIT_PROTOCOL(id));
      }
    },
    [router]
  );

  const handleProtocolClick = useCallback(
    (id: string) => {
      router.push(routes.APPLY_PROTOCOL(id as string));
    },
    [router]
  );

  const handleCancelClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedProtocolId) {
      deleteProtocol(selectedProtocolId);
    }
  }, [deleteProtocol, selectedProtocolId]);

  const filteredProtocols = useMemo(() => {
    let result = [...protocols];
    if (searchQuery) {
      result = result.filter((protocol: TreatmentProtocolResponse) => {
        const name = protocol.protocolName || "";
        const recType = protocol.treatments?.[0].recType || "";
        const procedure = protocol.treatments?.[0].procedure || "";
        const drugName = protocol.treatments?.[0].drugName || "";
        const vaccine = protocol.treatments?.[0].vaccine || "";
        const drugRoute = protocol.treatments?.[0].drugRoute || "";
        const drugDosage = protocol.treatments?.[0].drugDosage || "";
        const limbTreated = protocol.treatments?.[0].limbTreated || "";
        const conditionTreated =
          protocol.treatments?.[0].conditionTreated || "";
        const structure = protocol.treatments?.[0].structure || "";
        const description = protocol.treatments?.[0].description || "";
        const testName = protocol.treatments?.[0].testName || "";
        const testResults = protocol.treatments?.[0].testResults || "";
        const dental = protocol.treatments?.[0].dental || "";
        const inspectionType = getInspectionType(
          protocol?.treatments?.[0].clearedToWork,
          protocol?.treatments?.[0].clearedToRace
        );
        const notes = protocol.treatments?.[0].notes || "";

        return (
          checkSubstring(name, clearSearchText(searchQuery)) ||
          checkSubstring(recType, searchQuery) ||
          checkSubstring(procedure, clearSearchText(searchQuery)) ||
          checkSubstring(drugName, clearSearchText(searchQuery)) ||
          checkSubstring(vaccine, clearSearchText(searchQuery)) ||
          checkSubstring(drugRoute, clearSearchText(searchQuery)) ||
          checkSubstring(drugDosage, clearSearchText(searchQuery)) ||
          checkSubstring(limbTreated, clearSearchText(searchQuery)) ||
          checkSubstring(conditionTreated, clearSearchText(searchQuery)) ||
          checkSubstring(structure, clearSearchText(searchQuery)) ||
          checkSubstring(description, clearSearchText(searchQuery)) ||
          checkSubstring(testName, clearSearchText(searchQuery)) ||
          checkSubstring(testResults, clearSearchText(searchQuery)) ||
          checkSubstring(dental, clearSearchText(searchQuery)) ||
          checkSubstring(inspectionType, clearSearchText(searchQuery)) ||
          checkSubstring(notes, clearSearchText(searchQuery))
        );
      });
    }

    return result;
  }, [protocols, searchQuery]);

  const renderProtocolItem = useCallback(
    (item: TreatmentProtocolResponse, index: number) => {
      const firstTreatment = _.head(item.treatments);
      const inspectionType =
        firstTreatment?.recType ===
        HorseMedicalRecType.MandatoryPreRaceAndPreWorkVetInspection
          ? getInspectionType(
              firstTreatment?.clearedToWork,
              firstTreatment?.clearedToRace
            )
          : "";

      const drugRoute =
        firstTreatment?.recType === HorseMedicalRecType.DrugAdministered ||
        firstTreatment?.recType === HorseMedicalRecType.IntralesionalInjection
          ? firstTreatment.drugRoute
          : null;

      const currentType = getCurrentType(firstTreatment?.recType || "");

      const subTitle = getFormattedTitle([
        splitCamelCase(currentType),
        firstTreatment?.procedure,
        firstTreatment?.drugName,
        firstTreatment?.vaccine,
        drugRoute,
        firstTreatment?.drugDosage,
        firstTreatment?.limbTreated,
        firstTreatment?.conditionTreated,
        firstTreatment?.structure,
        firstTreatment?.description,
        firstTreatment?.testName,
        firstTreatment?.testResults,
        firstTreatment?.dental,
        inspectionType,
        firstTreatment?.notes,
      ]);
      return (
        <ProtocolsListItem
          key={`${item.protocolName}-${index}`}
          id={item.treatmentProtocolId || ""}
          name={item.protocolName || ""}
          item={firstTreatment}
          description={subTitle}
          bordered={index < protocols.length - 1}
          handleDelete={onOpenChange}
          handleEditProtocol={handleEdit}
          handleProtocolClick={handleProtocolClick}
        />
      );
    },
    [handleEdit, handleProtocolClick, onOpenChange, protocols.length]
  );

  return (
    <RouteWithTransition id={"route-MyProtocolsContainer"}>
      <div
        style={styles}
        className="px-4 pb-safe-bottom sm:pb-safe-bottom-28 bg-mainBackground flex flex-1 flex-col max-w-full items-center overflow-hidden"
      >
        <div className="flex mb-4 justify-between w-full xl:w-2/3 items-end">
          <div className="flex flex-col flex-1">
            <BackButton styles={cn(isConnected ? "pt-2" : "pt-7 sm:pt-2")} />
            <h1 className="text-2xl font-semibold pb-2 sm:pb-8">
              {t("Protocols.myProtocols")}
            </h1>
            <div className="text-tDefault text-base lg:text-sm mb-2">
              {t("AddRecord.search")}
            </div>
            <SearchInput
              value={searchQuery}
              onChange={handleSearch}
              placeholder={t("AddRecord.search")}
            />
          </div>
        </div>
        <ScrollArea
          className="flex-1 w-full xl:w-2/3 bg-white rounded-[16px] shadow-custom overflow-y-auto overflow-x-hidden"
          scrollWidth="0"
        >
          {protocols.length === 0 ? (
            <div className="p-4 text-center">
              {t("Protocols.noProtocolsFound")}
            </div>
          ) : (
            _.map(
              filteredProtocols,
              (protocol: TreatmentProtocolResponse, index: number) =>
                renderProtocolItem(protocol, index)
            )
          )}
        </ScrollArea>
        <Link href={routes.ADD_PROTOCOL}>
          <div className="fixed sm:static bottom-6 left-0 sm:justify-center flex flex-1 w-full px-4 pb-insets-bottom sm:pb-0 mt-4">
            <Button
              className="w-full sm:w-72"
              variant="outline"
              title={t("Protocols.addProtocol")}
            />
          </div>
        </Link>
      </div>
      <ModalDialog
        open={isOpen}
        title={t("Protocols.deleteProtocol")}
        description={t("Protocols.areYouSure")}
        buttonTitle={t("Protocols.delete")}
        onCancelClick={handleCancelClick}
        onSubmitClick={handleSubmit}
      />
    </RouteWithTransition>
  );
};
