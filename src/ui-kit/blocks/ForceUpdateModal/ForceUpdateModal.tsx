import { FORM_FIELDS } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import { getThirdField } from "@/runnersQcApp/containers/RecentRecordsWidget/helpers";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { getDayISO, getShortMonthISO } from "@/runnersQcApp/shared/DateUtils";
import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { Button } from "@/ui-kit/components/Button";
import { QueueItem } from "@/ui-kit/components/QueueItem";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import { get, map, noop } from "lodash";
import { useTranslations } from "next-intl";
import { memo, useCallback, useMemo } from "react";
import { ModalContent } from "./ModalContent";

type ForceUpdateModalProps = {
  isVisible: boolean;
  data: THorseMedicalRecord[];
  onClose: () => void;
  onSubmit: () => void;
};

export const ForceUpdateModal: React.FC<ForceUpdateModalProps> = memo(
  ({ isVisible, data, onClose, onSubmit }) => {
    const t = useTranslations();
    const { title } = useMemo(() => {
      return {
        title: `${data.length} outgoing records not synced`,
      };
    }, [data.length]);

    const renderItem = useCallback(
      (item: THorseMedicalRecord, index: number) => {
        const {
          internalId,
          date,
          hisaHorseName,
          conditionTreated,
          isSynced,
          drugName,
          hisaHorseId,
          hisaHorseMedicalId,
          recType,
        } = item;
        const horseId = getFormattedId(hisaHorseId || "");
        const thirdField = getThirdField(item as any, t);

        const innerRecType = get(FORM_FIELDS, [recType, "label"], "");

        return (
          <QueueItem
            key={`queue-record-${hisaHorseMedicalId}`}
            id={internalId || ""}
            day={getDayISO(date)}
            month={getShortMonthISO(date)}
            horseName={hisaHorseName || ""}
            horseId={horseId}
            conditionTreated={conditionTreated || ""}
            drug={drugName || ""}
            recType={innerRecType}
            thirdField={thirdField}
            isSynced={false}
            bordered={index < data?.length - 1}
            onClick={noop}
          />
        );
      },
      [data?.length, t]
    );

    return (
      <Dialog open={isVisible} onOpenChange={onClose}>
        <ModalContent className="w-full max-w-full h-full sm:h-[80vh] md:max-w-xl sm:max-h-[90vh] flex flex-col px-4 pt-4">
          <DialogTitle className="flex justify-center text-xl">
            {title}
          </DialogTitle>
          <ScrollArea className="flex flex-1 flex-col">
            {map(data, renderItem)}
          </ScrollArea>
          <div className="flex w-full mt-4 max-w-xs self-center justify-stretch">
            <Button
              className="w-full"
              title={t("Main.synchronizeData")}
              onClick={onSubmit}
            />
          </div>
        </ModalContent>
      </Dialog>
    );
  }
);

ForceUpdateModal.displayName = "ForceUpdateModal";
