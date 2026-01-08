"use client";

import { checkNormalizedMatch } from "@/runnersQcApp/shared/CompareUtils";
import { getNow, formatToISODate } from "@/runnersQcApp/shared/DateUtils";
import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import routes from "@/routes";
import { selectHisaPersonId } from "@/services/store/modules/auth/selectors";
import {
  clearKeepFilters,
  resetFilters,
  setKeepFilters,
} from "@/services/store/modules/history";
import {
  selectHistoryDateFrom,
  selectHistoryDateTo,
  selectHistoryKeepFilters,
  selectHistoryRecTypes,
} from "@/services/store/modules/history/selectors";
import { syncHorseMedical } from "@/services/store/modules/horseMedical";
import {
  selectHorseMedical,
  selectIsSyncing,
} from "@/services/store/modules/horseMedical/selectors";
import { BackButton } from "@/ui-kit/components/BackButton";
import { DataTable } from "@/ui-kit/components/DataTable";
import { Loader } from "@/ui-kit/components/Loader";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { SearchInput } from "@/ui-kit/components/SearchInput";
import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import { cn } from "@/ui-kit/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";
import _ from "lodash";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { columnDefs } from "./Components/columnDefs";
import { FiltersSheet } from "./Components/FiltersSheet";
import { RecordList } from "./Components/RecordList";
import { FilterRecType, getComparator } from "./helpers";

type SortConfig = {
  column: string;
  direction: "asc" | "desc";
};

export const HistoryContainer: React.FC = () => {
  const t = useTranslations("History");
  const isMobile = useIsMobile();
  const router = useRouter();
  const dispatch = useDispatch();

  const isConnected = useInternetConnection();

  const dateFrom = useSelector(selectHistoryDateFrom);
  const dateTo = useSelector(selectHistoryDateTo);
  const recTypes = useSelector(selectHistoryRecTypes);
  const keepFilters = useSelector(selectHistoryKeepFilters);

  const allRecords = useSelector(selectHorseMedical) as THorseMedicalRecord[];
  const isSyncing = useSelector(selectIsSyncing);
  const personId = useSelector(selectHisaPersonId);

  const sortedRec = useMemo(() => {
    return [...allRecords].sort((a, b) => {
      const dateTimeA = DateTime.fromISO(`${a.date}T${a.time ?? "00:00:00"}`);
      const dateTimeB = DateTime.fromISO(`${b.date}T${b.time ?? "00:00:00"}`);
      return dateTimeB.toMillis() - dateTimeA.toMillis();
    });
  }, [allRecords]);

  const records = useMemo(() => {
    return _.filter(
      sortedRec,
      (record) =>
        record.treatingHisaPersonId === personId ||
        record.createdBy === personId ||
        record.updatedBy === personId
    );
  }, [personId, sortedRec]);

  const [searchQuery, setSearchQuery] = useState("");
  const [openSheet, setOpenSheet] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({
    column: "date",
    direction: "desc",
  });

  const defaultTo = formatToISODate(getNow());
  const defaultFrom = formatToISODate(getNow().minus({ years: 1 }));

  const filterCount = useMemo(() => {
    let count = 0;
    if (dateFrom !== defaultFrom || dateTo !== defaultTo) count++;
    if (recTypes.length > 0) count++;
    return count;
  }, [dateFrom, dateTo, recTypes, defaultFrom, defaultTo]);

  const filteredRecords = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const availableRecTypes = Object.values(FilterRecType);
    const recTypesFilterActive =
      recTypes.length > 0 && recTypes.length < availableRecTypes.length;

    return records.filter((item: THorseMedicalRecord) => {
      if (!item.date) return false;
      const recordDate = DateTime.fromISO(item.date);

      const isInDateRange =
        recordDate >= DateTime.fromISO(dateFrom) &&
        recordDate <= DateTime.fromISO(dateTo);
      const matchesSearch =
        item.hisaHorseName?.toLowerCase().includes(lowerQuery) ||
        checkNormalizedMatch(item.hisaHorseId, searchQuery) ||
        checkNormalizedMatch(item.hisaHorseMedicalId, searchQuery) ||
        item.locationName?.toLowerCase().includes(lowerQuery);
      const matchesRecType =
        !recTypesFilterActive || recTypes.includes(item.recType);
      return isInDateRange && matchesSearch && matchesRecType;
    });
  }, [records, dateFrom, dateTo, searchQuery, recTypes]);
  const handleSort = useCallback((column: string) => {
    setSortConfig((prev) => {
      if (prev && prev.column === column) {
        return { column, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        return { column, direction: "asc" };
      }
    });
  }, []);

  const sortedRecords = useMemo(() => {
    const filtered = [...filteredRecords];
    if (sortConfig) {
      const comparator = getComparator(sortConfig.column);
      filtered.sort((a, b) => {
        const res = comparator(a, b);
        return sortConfig.direction === "asc" ? res : -res;
      });
    }
    return filtered;
  }, [filteredRecords, sortConfig]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCloseSheet = useCallback(() => {
    setOpenSheet(!openSheet);
  }, [openSheet]);

  const onItemPress = useCallback(
    (id?: string) => {
      if (id) {
        dispatch(setKeepFilters());
        router.push(routes.RECORD_DETAIL(id));
      }
    },
    [router, dispatch]
  );

  const desktopColumns = columnDefs({ t, onItemPress, handleSort });

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: sortedRecords.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 5,
  });

  useEffect(() => {
    dispatch(syncHorseMedical());
    if (keepFilters) {
      dispatch(clearKeepFilters());
    } else {
      dispatch(resetFilters());
    }
  }, [dispatch]);

  if (isSyncing && !records.length) {
    return (
      <div
        className="w-full overflow-x-hidden bg-mainBackground flex flex-col items-center justify-center"
        style={{ height: "100vh" }}
      >
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <RouteWithTransition
      id="route-HistoryScreen"
      className="w-full h-screen overflow-x-hidden bg-mainBackground"
    >
      <div className="w-full px-4 flex flex-col items-center max-w-[100vw] h-full">
        <div className="flex mb-4 justify-between w-full xl:w-2/3 items-end">
          <div className="flex flex-col flex-1">
            <BackButton styles={cn(isConnected ? "pt-2" : "pt-7 sm:pt-2")} />
            <h1 className="text-2xl font-semibold pb-2 sm:pb-8">
              {t("records")}
            </h1>
            <div className="mt-2">
              <SearchInput
                value={searchQuery}
                onChange={handleSearch}
                placeholder={t("search")}
              />
            </div>
          </div>
          <div
            className="flex px-3 py-2 items-center justify-center bg-white border border-[#191C1F]/10 rounded-sm cursor-pointer h-12 sm:h-10 ml-2"
            onClick={handleCloseSheet}
          >
            <span className="text-tDefault text-base lg:text-sm font-normal">
              {t("filters")}
              {filterCount > 0 ? " • " + filterCount : ""}
            </span>
          </div>
          <FiltersSheet open={openSheet} onClose={handleCloseSheet} />
        </div>

        {isMobile ? (
          <RecordList records={sortedRecords} onItemPress={onItemPress} />
        ) : (
          <div className="w-full xl:w-2/3 bg-white rounded-[16px] mb-8 shadow overflow-hidden">
            <DataTable
              columns={desktopColumns}
              data={sortedRecords}
              maxHeight="calc(100vh - 220px)"
            />
          </div>
        )}
      </div>
    </RouteWithTransition>
  );
};
