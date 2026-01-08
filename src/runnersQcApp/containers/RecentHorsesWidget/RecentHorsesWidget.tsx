import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { THorse } from "@/runnersQcApp/shared/types";
import routes from "@/routes";
import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import {
  selectHorsesByPerson,
  selectIsSearching,
} from "@/services/store/modules/horses/selectors";
import { Button } from "@/ui-kit/components/Button";
import { Card, CardContent, CardHeader } from "@/ui-kit/components/Card";
import { HorseDetailsListItem } from "@/ui-kit/components/HorseDetailsListItem";
import { Skeleton } from "@/ui-kit/components/Skeleton";
import _, { isEmpty, map } from "lodash";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

const RecentHorsesWidget: React.FC = memo(() => {
  const t = useTranslations("Widget");
  const router = useRouter();
  const myHorses = useSelector(selectHorsesByPerson);
  const hisaPersonId = useSelector(selectHisaPersonId);
  const isLoading = useSelector(selectIsSearching);

  const resentHorses = useMemo(() => _.take(myHorses, 3), [myHorses]);

  const renderItem = useCallback(
    (item: THorse, index: number) => (
      <HorseDetailsListItem
        key={`horse-${item.hisaHorseId}`}
        hisaHorseId={getFormattedId(item?.hisaHorseId || "")}
        name={item.name}
        canRace={item.canRace}
        canWork={item.canWork}
        responsiblePerson={item?.responsiblePersonName || ""}
        locationName={item?.locationName || ""}
        bordered={index < resentHorses.length - 1}
        onClick={() => {
          router.push(routes.HORSE(item.hisaHorseId));
        }}
      />
    ),
    [resentHorses.length, router]
  );

  const handleSearch = useCallback(() => {
    router.push(routes.SEARCH);
  }, [router]);

  if (isLoading && isEmpty(resentHorses)) {
    return (
      <Card className="flex flex-col flex-1 w-full max-w-sm sm:max-w-md shadow-custom xl:mr-6 min-h-[372px]">
        <CardHeader className="flex flex-row justify-between px-4 text-base font-semibold text-tDefault">
          <Skeleton className="h-5 w-[160px] rounded-xl" />
          <Skeleton className="h-4 w-[80px] rounded-xl" />
        </CardHeader>
        <CardContent className="pb-2 mx-1">
          <div className="flex flex-row h-24 px-3 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 flex-column px-3">
              <Skeleton className="h-4 w-48 rounded-xl" />
              <Skeleton className="h-4 w-64 rounded-xl mt-1" />
              <Skeleton className="h-4 w-64 rounded-xl mt-1" />
            </div>
          </div>
          <div className="flex flex-row h-24 px-3 mt-1 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 flex-column px-3">
              <Skeleton className="h-4 w-48 rounded-xl" />
              <Skeleton className="h-4 w-64 rounded-xl mt-1" />
              <Skeleton className="h-4 w-64 rounded-xl mt-1" />
            </div>
          </div>
          <div className="flex flex-row h-24 px-3 mt-1 items-center">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 flex-column px-3">
              <Skeleton className="h-4 w-48 rounded-xl" />
              <Skeleton className="h-4 w-64 rounded-xl mt-2" />
              <Skeleton className="h-4 w-64 rounded-xl mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isEmpty(resentHorses)) {
    return (
      <Card className="flex-1 w-full max-w-sm sm:max-w-md shadow-custom xl:mr-6 min-h-[372px]">
        <CardHeader className="flex flex-row justify-between px-4 text-base font-semibold text-tDefault">
          {t("recentHorses")}
        </CardHeader>
        <CardContent className="h-72 flex flex-1 flex-col items-center justify-center">
          <div className="text-base font-normal text-tDefault">
            No horses yet
          </div>
          <Button
            className="mt-4"
            title="Start your search!"
            variant="outline"
            onClick={handleSearch}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col flex-1 w-full max-w-sm sm:max-w-md shadow-custom xl:mr-6">
      <CardHeader className="flex flex-row justify-between sm:pb-0 px-4 text-base font-semibold text-tDefault">
        {t("recentHorses")}
        <Link href={routes.HORSES} className="text-sm text-a0 font-medium">
          {t("myHorses")}
        </Link>
      </CardHeader>
      <CardContent className="pb-2 mx-1">
        {map(resentHorses, renderItem)}
      </CardContent>
    </Card>
  );
});

RecentHorsesWidget.displayName = "RecentHorsesWidget";

export { RecentHorsesWidget };
