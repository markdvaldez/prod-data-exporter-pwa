import { useScreenSize } from "@/hooks/useScreenSize";
import {
  getCurrentType,
  getFormattedTitle,
  getInspectionType,
  splitCamelCase,
} from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { ProtocolsListItem } from "@/runnersQcApp/containers/MyProtocolsContainer/ProtocolListItem";
import { checkSubstring } from "@/runnersQcApp/shared/CompareUtils";
import { clearSearchText } from "@/runnersQcApp/shared/TextUtils";
import routes from "@/routes";
import { selectProtocolsByUserId } from "@/services/store/modules/protocols/selectors";
import { TreatmentProtocolResponse } from "@/Types";
import { Button } from "@/ui-kit/components/Button";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import _ from "lodash";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Panel from "../Panel/Panel";

export type ApplyProtocolPanelProps = {
  isOpen: boolean;
  horseId: string;
  handleOpen: () => void;
};

export const ApplyProtocolPanel: React.FC<ApplyProtocolPanelProps> = ({
  isOpen,
  horseId,
  handleOpen,
}) => {
  const t = useTranslations();
  const screen = useScreenSize();
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const protocols = useSelector(selectProtocolsByUserId);

  const filteredProtocols = useMemo(() => {
    let result = [...protocols];
    if (searchText) {
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
          checkSubstring(name, clearSearchText(searchText)) ||
          checkSubstring(recType, searchText) ||
          checkSubstring(procedure, clearSearchText(searchText)) ||
          checkSubstring(drugName, clearSearchText(searchText)) ||
          checkSubstring(vaccine, clearSearchText(searchText)) ||
          checkSubstring(drugRoute, clearSearchText(searchText)) ||
          checkSubstring(drugDosage, clearSearchText(searchText)) ||
          checkSubstring(limbTreated, clearSearchText(searchText)) ||
          checkSubstring(conditionTreated, clearSearchText(searchText)) ||
          checkSubstring(structure, clearSearchText(searchText)) ||
          checkSubstring(description, clearSearchText(searchText)) ||
          checkSubstring(testName, clearSearchText(searchText)) ||
          checkSubstring(testResults, clearSearchText(searchText)) ||
          checkSubstring(dental, clearSearchText(searchText)) ||
          checkSubstring(inspectionType, clearSearchText(searchText)) ||
          checkSubstring(notes, clearSearchText(searchText))
        );
      });
    }

    return result;
  }, [protocols, searchText]);

  const containerStyle = useMemo(
    () => ({ height: screen.height - 40 }),
    [screen.height]
  );

  const handleProtocolClick = useCallback(
    (id: string) => {
      const queryParams = new URLSearchParams({ id, hisaHorseId: horseId });
      router.push(`/dashboard/apply-protocol/?${queryParams.toString()}`);
    },
    [horseId, router]
  );

  const renderProtocolItem = useCallback(
    (item: TreatmentProtocolResponse, index: number) => {
      const firstTreatment = _.head(item.treatments);

      const inspectionType = getInspectionType(
        firstTreatment?.clearedToWork,
        firstTreatment?.clearedToRace
      );

      const currentType = getCurrentType(firstTreatment?.recType || "");

      const subTitle = getFormattedTitle([
        splitCamelCase(currentType),
        firstTreatment?.procedure,
        firstTreatment?.drugName,
        firstTreatment?.vaccine,
        firstTreatment?.drugRoute,
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
          withIcons={false}
          name={item.protocolName || ""}
          item={firstTreatment}
          description={subTitle}
          bordered={index < protocols.length - 1}
          handleProtocolClick={handleProtocolClick}
        />
      );
    },
    [handleProtocolClick, protocols.length]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  return (
    <Panel
      className="w-full md:w-1/2 lg:w-1/3"
      open={isOpen}
      title={t("Protocols.selectProtocol")}
      onClose={handleOpen}
    >
      <div
        className="flex flex-col bg-mainBackground pb-4"
        style={containerStyle}
      >
        <div className="mb-4 px-4 pt-2">
          <SearchInput
            value={searchText}
            onChange={handleSearchChange}
            placeholder={t("AddRecord.search")}
          />
        </div>

        <ScrollArea className="flex flex-col flex-1 scroll-thin">
          <div
            className="bg-white rounded-[16px] shadow-custom min-w-0 mx-4 p-4"
            style={{ maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}
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
          </div>
        </ScrollArea>
        <Link href={routes.ADD_PROTOCOL}>
          <div className="flex justify-center mx-4 pb-safe-bottom mt-4">
            <Button
              className="w-full sm:w-72"
              variant="outline"
              title={t("Protocols.addProtocol")}
            />
          </div>
        </Link>
      </div>
    </Panel>
  );
};
