import { getDayISO, getShortMonthISO } from "@/runnersQcApp/shared/DateUtils";
import { getRecType } from "@/runnersQcApp/shared/TextUtils";
import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { HistoryListItemMobile } from "@/ui-kit/components/HistoryListItem/HistoryListItemMobile";
import { getFormattedId } from "@/utils/formatters";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { getThirdField } from "../../RecentRecordsWidget/helpers";

type RecordListProps = {
  records: THorseMedicalRecord[];
  onItemPress: (id: string) => void;
};

export const RecordList: React.FC<RecordListProps> = ({
  records,
  onItemPress,
}) => {
  const t = useTranslations("History");

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: records.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  return (
    <div
      className="w-full max-h-[calc(100vh-150px)] bg-white rounded-[16px] mb-8 pb-20 shadow relative overflow-y-auto"
      ref={parentRef}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = records[virtualRow.index];
          const {
            internalId,
            date,
            hisaHorseName,
            conditionTreated,
            isSynced,
            hisaHorseId,
            hisaHorseMedicalId,
            recType,
          } = item;
          const horseId = getFormattedId(hisaHorseId || "");
          const thirdField = getThirdField(item as any, t);
          const descriptionText = getRecType(t, recType);
          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <HistoryListItemMobile
                key={`record-${hisaHorseMedicalId}`}
                horseId={horseId}
                day={getDayISO(date)}
                thirdField={thirdField}
                month={getShortMonthISO(date)}
                horseName={hisaHorseName || ""}
                isSynced={isSynced}
                conditionTreated={conditionTreated || ""}
                description={descriptionText}
                bordered={virtualRow.index < records.length - 1}
                onClick={() =>
                  onItemPress(hisaHorseMedicalId || internalId || "")
                }
              />
            </div>
          );
        })}
        {records.length === 0 && (
          <div className="flex items-center justify-center p-12">
            <span>{t("noRecords")}</span>
          </div>
        )}
      </div>
    </div>
  );
};
