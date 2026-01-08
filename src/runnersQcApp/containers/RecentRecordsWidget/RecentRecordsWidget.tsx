import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { getDayISO, getShortMonthISO } from "@/runnersQcApp/shared/DateUtils";
import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import routes from "@/routes";
import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import { selectHorseMedical } from "@/services/store/modules/horseMedical/selectors";
import { selectIsSearching } from "@/services/store/modules/horses/selectors";
import { Card, CardContent, CardHeader } from "@/ui-kit/components/Card";
import { RecordsWidgetListItem } from "@/ui-kit/components/RecordsWidgetListItem";
import { Skeleton } from "@/ui-kit/components/Skeleton";
import _, { isEmpty, map, times } from "lodash";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { FORM_FIELDS } from "../addRecordAndProtocolConfig";
import { getThirdField } from "./helpers";

const RecentRecordsWidget: React.FC = memo(() => {
  const t = useTranslations("Widget");
  const router = useRouter();
  const horseMedicalRecords = useSelector(selectHorseMedical);
  const hisaPersonId = useSelector(selectHisaPersonId);
  const isLoading = useSelector(selectIsSearching);

  const records = useMemo(() => {
    return _.filter(
      horseMedicalRecords,
      (record) =>
        record.treatingHisaPersonId === hisaPersonId ||
        record.createdBy === hisaPersonId ||
        record.updatedBy === hisaPersonId
    );
  }, [hisaPersonId, horseMedicalRecords]);

  const resentRecords = useMemo(() => _.take(records, 3), [records]);

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

      const innerRecType = _.get(FORM_FIELDS, [recType, "label"], "");

      return (
        <RecordsWidgetListItem
          key={`record-${hisaHorseMedicalId}`}
          id={internalId || ""}
          day={getDayISO(date)}
          month={getShortMonthISO(date)}
          horseName={hisaHorseName || ""}
          horseId={horseId}
          conditionTreated={conditionTreated || ""}
          drug={drugName || ""}
          recType={innerRecType}
          thirdField={thirdField}
          isSynced={isSynced}
          bordered={index < resentRecords.length - 1}
          onClick={() => {
            router.push(
              routes.RECORD_DETAIL(item.hisaHorseMedicalId || internalId || "")
            );
          }}
        />
      );
    },
    [resentRecords.length, router, t]
  );

  if (isLoading && isEmpty(resentRecords)) {
    return (
      <Card className="flex flex-col flex-1 w-full max-w-sm sm:max-w-md shadow-custom min-h-[372px]">
        <CardHeader className="flex flex-row justify-between px-4 text-base font-semibold text-tDefault">
          <Skeleton className="h-5 w-[160px] rounded-xl" />
          <Skeleton className="h-4 w-[80px] rounded-xl" />
        </CardHeader>
        <CardContent className="pb-2 mx-1">
          {times(3, (i) => (
            <div
              key={`item-${i}`}
              className="flex flex-row h-24 px-3 items-center"
            >
              <Skeleton className="h-10 w-10 rounded--xl" />
              <div className="flex-1 flex-column px-3">
                <Skeleton className="h-4 w-48 rounded-xl" />
                <Skeleton className="h-4 w-64 rounded-xl mt-2" />
                <Skeleton className="h-4 w-64 rounded-xl mt-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isEmpty(resentRecords)) {
    return (
      <Card className="flex flex-col flex-1 w-full max-w-sm sm:max-w-md shadow-custom min-h-[372px]">
        <CardHeader className="flex flex-row justify-between px-4 text-base font-semibold text-tDefault">
          {t("recentRecords")}
        </CardHeader>
        <CardContent className="h-72 flex flex-1 items-center justify-center">
          <div className="text-base font-normal text-tDefault">No Records</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col flex-1 w-full max-w-sm sm:max-w-md mt-6 xl:mt-0 shadow-custom">
      <CardHeader className="flex flex-row justify-between sm:pb-0 px-4 text-base font-semibold text-tDefault">
        {t("recentRecords")}
        <Link
          href={routes.RECENT_RECORDS}
          className="text-sm text-a0 font-medium"
        >
          {t("seeAll")}
        </Link>
      </CardHeader>
      <CardContent className="pb-2 mx-1">
        {map(resentRecords, renderItem)}
      </CardContent>
    </Card>
  );
});

RecentRecordsWidget.displayName = "RecentRecordsWidget";

export { RecentRecordsWidget };
