import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { getDayISO, getShortMonthISO } from "@/runnersQcApp/shared/DateUtils";
import { getRecType } from "@/runnersQcApp/shared/TextUtils";
import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { getThirdField } from "../../RecentRecordsWidget/helpers";
import { ReportListItemMobile } from "./ReportListItemMobile";

type RecordListProps = {
  records: THorseMedicalRecord[];
  onItemPress: (id: string) => void;
  onHorseClick?: (horseId: string) => void;
};

export const RecordList: React.FC<RecordListProps> = ({
  records,
  onItemPress,
  onHorseClick,
}) => {
  const t = useTranslations("HorseReport");

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: records.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="w-full bg-white rounded-[16px] mb-8 shadow relative"
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = records[virtualRow.index];
          if (!item) return null;
          const {
            internalId,
            date,
            conditionTreated,
            isSynced,
            hisaHorseMedicalId,
            recType,
          } = item;
          const horseMedicalId = getFormattedId(hisaHorseMedicalId || "");
          const thirdField = getThirdField(item, t);
          const descriptionText = getRecType(t, recType);
          return (
            <ReportListItemMobile
              key={`record-${hisaHorseMedicalId}`}
              id={item.internalId || ""}
              day={getDayISO(date)}
              month={getShortMonthISO(date)}
              onClick={() =>
                onItemPress(hisaHorseMedicalId || internalId || "")
              }
              horseId={horseMedicalId}
              thirdField={thirdField}
              description={descriptionText}
              conditionTreated={conditionTreated || ""}
              isSynced={isSynced}
              bordered={virtualRow.index < virtualRow.size - 1}
              onHorseClick={onHorseClick}
              actualHorseId={item.hisaHorseId}
            />
          );
        })}
      </div>
      {records.length === 0 && (
        <div className="flex min-h-20 items-center justify-center p-12">
          <span>{t("noRecords")}</span>
        </div>
      )}
    </div>
  );
};
