"use client";

import _ from "lodash";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useUserPermissions } from "@/hooks/useAuthUser";
import { checkNormalizedMatch } from "@/runnersQcApp/shared/CompareUtils";
import { getNow, formatToISODate } from "@/runnersQcApp/shared/DateUtils";
import { THorse, THorseMedicalRecord } from "@/runnersQcApp/shared/types";

import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import { getHorseMedical } from "@/services/store/modules/horseMedical";
import {
  selectHorsesByPerson,
  selectIsFetching,
  selectSearchHorsesResult,
} from "@/services/store/modules/horses/selectors";

import {
  clearKeepFilters,
  resetFilters,
  setKeepFilters,
} from "@/services/store/modules/history";

import { useSearchHorses } from "@/services/api/modules/horses/searchHorses";

import { BackButton } from "@/ui-kit/components/BackButton";
import { Loader } from "@/ui-kit/components/Loader";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";

import { HeaderSection } from "./Components/HeaderSection";
import { RecordFilters } from "./Components/RecordFilters";
import { RecordList } from "./Components/RecordList";
import { RecordTable } from "./Components/RecordTable";

import routes from "@/routes";
import {
  selectHistoryDateFrom,
  selectHistoryDateTo,
  selectHistoryKeepFilters,
  selectHistoryRecTypes,
} from "@/services/store/modules/history/selectors";
import {
  selectHorseMedical,
  selectIsSyncing,
} from "@/services/store/modules/horseMedical/selectors";
import { NotFoundPage } from "@/ui-kit/blocks/NotFoundPage";
import { cn } from "@/ui-kit/lib/utils";
import { FilterRecType, getComparator } from "./helpers";

export const HorseReportContainer: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isMobile = useIsMobile();
  const isConnected = useInternetConnection();

  const { permissions } = useUserPermissions();
  const myHorses = useSelector(selectHorsesByPerson) as THorse[];
  const searchResult = useSelector(selectSearchHorsesResult);
  const hisaPersonId = useSelector(selectHisaPersonId);
  const initialRecords = useSelector(
    selectHorseMedical
  ) as THorseMedicalRecord[];
  const isSyncing = useSelector(selectIsSyncing);
  const dateFrom = useSelector(selectHistoryDateFrom);
  const dateTo = useSelector(selectHistoryDateTo);
  const recTypes = useSelector(selectHistoryRecTypes);
  const keepFilters = useSelector(selectHistoryKeepFilters);
  const isFetching = useSelector(selectIsFetching);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    column: string;
    direction: "asc" | "desc";
  }>({
    column: "date",
    direction: "desc",
  });
  const [openSheet, setOpenSheet] = useState(false);

  const horse = useMemo<THorse | undefined>(() => {
    const all = [...myHorses, ...searchResult];
    return all.find((h) => h.hisaHorseId === id);
  }, [myHorses, searchResult, id]);

  const hisaHorseId = horse?.hisaHorseId ?? id;

  const { data, isFetching: isFetchingHorse } = useSearchHorses(
    hisaHorseId,
    isConnected && !!hisaHorseId
  );

  // const isMyHorse = useMemo(
  //   () =>
  //     _.includes(
  //       [
  //         horse?.ownerHisaId,
  //         horse?.responsiblePersonHisaId,
  //         ...(horse?.attendingVet || []),
  //       ],
  //       hisaPersonId
  //     ),
  //   [horse, hisaPersonId]
  // );

  // const isRegulatoryVet = useMemo(
  //   () => _.includes(permissions?.generalAuthGroups, "RegulatoryVet"),
  //   [permissions]
  // );

  const records = useMemo(
    () => initialRecords.filter((r) => r.hisaHorseId === id),
    [initialRecords, id]
  );

  const defaultTo = formatToISODate(getNow());
  const defaultFrom = formatToISODate(getNow().minus({ years: 1 }));
  const filterCount = useMemo(() => {
    let c = 0;
    if (dateFrom !== defaultFrom || dateTo !== defaultTo) c++;
    if (recTypes.length > 0) c++;
    return c;
  }, [dateFrom, dateTo, recTypes, defaultFrom, defaultTo]);

  const filteredRecords = useMemo(() => {
    const lower = searchQuery.toLowerCase();
    const recTypesActive =
      recTypes.length > 0 &&
      recTypes.length < Object.values(FilterRecType).length;
    return records.filter((item) => {
      if (!item.date) return false;
      const dt = DateTime.fromISO(item.date);
      const inRange =
        dt >= DateTime.fromISO(dateFrom) && dt <= DateTime.fromISO(dateTo);
      const matchSearch =
        checkNormalizedMatch(item.hisaHorseMedicalId, searchQuery) ||
        item.recType.toLowerCase().includes(lower) ||
        item.conditionTreated?.toLowerCase().includes(lower);
      const matchType = !recTypesActive || recTypes.includes(item.recType);
      return inRange && matchSearch && matchType;
    });
  }, [records, searchQuery, dateFrom, dateTo, recTypes]);

  const sortedRecords = useMemo(() => {
    const arr = [...filteredRecords];
    const cmp = getComparator(sortConfig.column);
    arr.sort((a, b) =>
      sortConfig.direction === "asc" ? cmp(a, b) : -cmp(a, b)
    );
    return arr;
  }, [filteredRecords, sortConfig]);

  const handleSort = useCallback((column: string) => {
    setSortConfig((prev) =>
      prev.column === column
        ? { column, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { column, direction: "asc" }
    );
  }, []);

  const onItemPress = useCallback(
    (recordId?: string) => {
      if (recordId) {
        dispatch(setKeepFilters());
        router.push(routes.RECORD_DETAIL(recordId));
      }
    },
    [dispatch, router]
  );

  const onHorseClick = useCallback(
    (horseId: string) => {
      if (horseId) {
        router.push(routes.HORSE(horseId));
      }
    },
    [router]
  );

  const newHorse = useMemo(() => {
    return _.head(data);
  }, [data]) as THorse;

  useEffect(() => {
    if (isConnected && hisaHorseId) {
      dispatch(getHorseMedical({ horseIds: [hisaHorseId] }));
    }
  }, [dispatch, hisaHorseId, isConnected]);

  useEffect(() => {
    if (keepFilters) {
      dispatch(clearKeepFilters());
    } else {
      dispatch(resetFilters());
    }
  }, [dispatch, keepFilters]);

  if (isFetchingHorse || isFetching || isSyncing) {
    return (
      <RouteWithTransition
        id="routeHorseReportLoader"
        className="w-full h-screen flex items-center justify-center bg-mainBackground"
      >
        <Loader size="lg" />
      </RouteWithTransition>
    );
  }

  if (!horse && !newHorse) return <NotFoundPage />;

  return (
    <RouteWithTransition
      id={"routeHorseReportScreen"}
      className="w-full h-screen overflow-hidden"
    >
      <ScrollArea className="w-full h-screen max-h-[calc(100vh-150px)] sm:max-h-[calc(100vh-24px)] bg-mainBackground scroll-thin overflow-y-auto">
        <div className="marker:w-full px-4 flex flex-col items-center max-w-[100vw]">
          <div className="flex w-full xl:w-2/3 flex-col">
            <BackButton styles={cn(isConnected ? "pt-2" : "pt-7 sm:pt-2")} />
          </div>
          <HeaderSection horse={newHorse} />
        </div>
        {!!newHorse ? (
          <>
            <div className="sticky top-0 z-10 bg-mainBackground w-full px-4 flex flex-col items-center max-w-[100vw]">
              <RecordFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterCount={filterCount}
                openSheet={openSheet}
                setOpenSheet={setOpenSheet}
              />
            </div>

            <div className="sticky top-10 w-full px-4 flex flex-col items-center max-w-[100vw] z-0">
              {isMobile || window.innerHeight <= 500 ? (
                <RecordList
                  records={sortedRecords}
                  onItemPress={onItemPress}
                  onHorseClick={onHorseClick}
                />
              ) : (
                <RecordTable
                  records={sortedRecords}
                  onItemPress={onItemPress}
                  handleSort={handleSort}
                  onHorseClick={onHorseClick}
                />
              )}
            </div>
          </>
        ) : null}
      </ScrollArea>
    </RouteWithTransition>
  );
};
