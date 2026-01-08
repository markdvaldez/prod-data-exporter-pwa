"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui-kit/components/Table/Table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui-kit/components/DropdownMenu";
import { Settings2 } from "lucide-react";
//import { Badge } from "@/ui-kit/components/badge";
import { Button } from "@/ui-kit/components/ui/button";
import { DropButton } from "@/ui-kit/components/ui/drop-button";
import { ScrollArea, ScrollBar } from "@/ui-kit/components/ScrollArea";
import {
  RunnersResult,
  RunnersResultResponse,
} from "@/Types/runners-result.types";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui-kit/components/Select";
import { RUNNERS_RESULT_CONFIG } from "@/services/api/modules/runnersResult/config";
import { useDispatch } from "react-redux";
import { DataTableColumnHeader } from "@/ui-kit/components/RunnersQCTable/column-header";

interface RunnersResultTableProps {
  className?: string;
  data: RunnersResult[];
  onRowClick?: (row: RunnersResult) => void;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  pagination: any;
  setPagination: any;
}

interface ColumnDefinition {
  accessorKey: string;
  enableSorting: boolean;
  enableHiding: boolean;
  columVisibility: boolean | undefined;
  headerText: string;
  header: any;
}

export const RunnersResultTable: React.FC<RunnersResultTableProps> = ({
  className = "",
  data,
  onRowClick,
  pageIndex,
  pageSize,
  totalPages,
  pagination,
  setPagination,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCardClick = (runner: RunnersResult) => {
    if (onRowClick) {
      onRowClick(runner);
    } else {
      handleRowClick(runner);
    }
  };

  const handleRowClick = (result: RunnersResult) => {
    //dispatch(setTreatmentLocation({ location }));
    router.push(routes.RUNNERS_QC_DETAIL(result.id, result.timestamp));
  };

  const columnsDef: ColumnDefinition[] = [
    {
      accessorKey: "id",
      enableSorting: true,
      enableHiding: false,
      columVisibility: true,
      headerText: "ID",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
    },
    {
      accessorKey: "timestamp",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "Timestamp",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Timestamp" />
      ),
    },
    {
      accessorKey: "raceCourse",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "Race Course",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Course" />
      ),
    },
    {
      accessorKey: "raceTrackName",
      enableSorting: true,
      enableHiding: true,
      headerText: "Race Track Name",
      columVisibility: false,
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Track Name" />
      ),
    },
    {
      accessorKey: "raceDate",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "Race Date",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Date" />
      ),
    },
    {
      accessorKey: "raceDescription",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "Race Description",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Description" />
      ),
    },
    {
      accessorKey: "raceDistanceFurlong",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "Race Dsitance Furlong",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Distance Furlong" />
      ),
    },
    {
      accessorKey: "raceDistanceFurlongRound",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "Race Distance Furlong Round",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Distance Furlong Round" />
      ),
    },
    {
      accessorKey: "raceFootnote",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "raceFootnote",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Footnote" />
      ),
    },
    {
      accessorKey: "raceOffTime",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "Race Off Time",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Off Time" />
      ),
    },
    {
      accessorKey: "racePostTime",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "Race Post Time",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Post Time" />
      ),
    },
    {
      accessorKey: "racePurse",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "Race Purse",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Purse" />
      ),
    },
    {
      accessorKey: "raceRaceNumber",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "Race Number",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Number" />
      ),
    },
    {
      accessorKey: "raceTrackId",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "Race Track ID",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Track ID" />
      ),
    },
    {
      accessorKey: "raceType",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "Race Type",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Race Type" />
      ),
    },
    {
      accessorKey: "starterClaimedPriceUsa",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Claimed Price USA",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Claimed Price USA" />
      ),
    },
    {
      accessorKey: "starterClaimIndicator",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Claim Indicator",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Claim Indicator" />
      ),
    },
    {
      accessorKey: "starterClaimingPriceWaived",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Claiming Price Waived",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Claiming Price Waived" />
      ),
    },
    {
      accessorKey: "starterDnf",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter DNF",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter DNF" />
      ),
    },
    {
      accessorKey: "starterEarnings",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Earnings",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Earnings" />
      ),
    },
    {
      accessorKey: "starterHisaRegulated",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Hisa Regulated",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Hisa Regulated" />
      ),
    },
    {
      accessorKey: "starterHorseBreedType",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter Horse Breed Type",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Breed Type" />
      ),
    },
    {
      accessorKey: "starterHorseColor",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Color",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Color" />
      ),
    },
    {
      accessorKey: "starterHorseDamName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Dam Name",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Dam Name" />
      ),
    },
    {
      accessorKey: "starterHorseFoaled",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Foaled",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Foaled" />
      ),
    },
    {
      accessorKey: "starterHorseHisaId",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter Horse Hisa ID",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Hisa ID" />
      ),
    },
    {
      accessorKey: "starterHorseMicrochips",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Microchips",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Microchips" />
      ),
    },
    {
      accessorKey: "starterHorseName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter Horse Name",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Name" />
      ),
    },
    {
      accessorKey: "starterHorseReferenceNumber",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Reference Number",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Reference Number" />
      ),
    },
    {
      accessorKey: "starterHorseRegistry",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Registry",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Registry" />
      ),
    },
    {
      accessorKey: "starterHorseSex",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Sex",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Sex" />
      ),
    },
    {
      accessorKey: "starterHorseSireName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Sire Name",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Sire Name" />
      ),
    },
    {
      accessorKey: "starterHorseTattoo",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Horse Tattoo",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Horse Tattoo" />
      ),
    },
    {
      accessorKey: "starterJockeyFirstName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Jockey First Name",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Jockey First Name" />
      ),
    },
    {
      accessorKey: "starterJockeyLastName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "Starter Jockey Last Name",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="Starter Jockey Last Name" />
      ),
    },
    {
      accessorKey: "starterJockeyHisaId",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Jockey Hisa ID",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Jockey Hisa ID" />
      ),
    },
    {
      accessorKey: "starterJockeyLastName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Jockey Last Name",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Jockey Last Name" />
      ),
    },
    {
      accessorKey: "starterJockeyReferenceNumber",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Jockey Reference Number",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Jockey Reference Number" />
      ),
    },
    {
      accessorKey: "starterJockeyType",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Jockey Type",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Jockey Type" />
      ),
    },
    {
      accessorKey: "starterLengthBehindAtFinish",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Length Behind At Finish",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Length Behind At Finish" />
      ),
    },
    {
      accessorKey: "starterOdds",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Odds",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Odds" />
      ),  
    },
    {
      accessorKey: "starterOfficialPosition",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Official Position",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Official Position" />
      ),
    },
    {
      accessorKey: "starterOwnerHisaId",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "staarter Owner Hisa ID",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Owner Hisa ID" />
      ),
    },
    {
      accessorKey: "starterOwnerFirstName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter Owner First Name",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Owner First Name" />
      ),
    },
    {
      accessorKey: "starterOwnerLastName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter Owner Last Name",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Owner Last Name" />
      ),
    },
    {
      accessorKey: "starterOwnerReferenceNumber",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Owner Reference Number",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Owner Reference Number" />
      ),
    },
    {
      accessorKey: "starterOwnerType",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Owner Type",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Owner Type" />
      ),
    },
    {
      accessorKey: "starterPositionAtPointOfCall1",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Position At Point Of Call 1",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Position At Point Of Call 1" />
      ),
    },
    {
      accessorKey: "starterPositionAtPointOfCall2",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Position At Point Of Call 2",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Position At Point Of Call 2" />
      ),
    },
    {
      accessorKey: "starterPositionAtPointOfCall3",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Position At Point Of Call 3",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Position At Point Of Call 3" />
      ),
    },
    {
      accessorKey: "starterPositionAtPointOfCall4",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Position At Point Of Call 4",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Position At Point Of Call 4" />
      ),
    },
    {
      accessorKey: "starterPositionAtPointOfCall5",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Position At Point Of Call 5",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Position At Point Of Call 5" />
      ),
    },
    {
      accessorKey: "starterPostPosition",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Post Position",      
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Post Position" />
      ),
    },
    {
      accessorKey: "starterProgramNumber",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Program Number",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Program Number" />
      ),
    },
    {
      accessorKey: "starterRecordType",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Record Type",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Record Type" />
      ),
    },
    {
      accessorKey: "starterScratched",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Scratched",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Scratched" />
      ),
    },
    {
      accessorKey: "starterShakes",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Shakes",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Shakes" />
      ),
    },
    {
      accessorKey: "starterTrainerHisaId",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter Trainer Hisa ID",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Trainer Hisa ID" />
      ),
    },
    {
      accessorKey: "starterTrainerFirstName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter Trainer First Name",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Trainer First Name" />
      ),
    },
    {
      accessorKey: "starterTrainerLastName",
      enableSorting: true,
      enableHiding: true,
      columVisibility: true,
      headerText: "starter Trainer Last Name",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Trainer Last Name" />
      ),
    },
    {
      accessorKey: "starterTrainerReferenceNumber",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Trainer Reference Number",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Trainer Reference Number" />
      ),
    },
    {
      accessorKey: "starterTrainerType",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Trainer Type",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Trainer Type" />
      ),
    },
    {
      accessorKey: "starterVoidIndicator",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Void Indicator",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Void Indicator" />
      ),
    },
    {
      accessorKey: "starterVoidReason",
      enableSorting: true,
      enableHiding: true,
      columVisibility: false,
      headerText: "starter Void Reason",
      header: ({ column }: any) => (
        <DataTableColumnHeader column={column} title="starter Void Reason" />
      ),
    },
  ];

  const columns = useMemo<ColumnDef<RunnersResult>[]>(() => columnsDef, []);

  type ColumnKey = keyof RunnersResult;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    //id: columnsDef.filter(col => col.accessorKey === 'id')[0]?.columVisibility || false,
    timestamp:
      columnsDef.filter((col) => col.accessorKey === "timestamp")[0]
        ?.columVisibility || false,
    raceDate:
      columnsDef.filter((col) => col.accessorKey === "raceDate")[0]
        ?.columVisibility || false,
    raceCourse:
      columnsDef.filter((col) => col.accessorKey === "raceCourse")[0]
        ?.columVisibility || false,
    raceDistanceFurlong:
      columnsDef.filter((col) => col.accessorKey === "raceDistanceFurlong")[0]
        ?.columVisibility || false,
    raceDistanceFurlongRound:
      columnsDef.filter(
        (col) => col.accessorKey === "raceDistanceFurlongRound"
      )[0]?.columVisibility || false,
    raceFootnote:
      columnsDef.filter((col) => col.accessorKey === "raceFootnote")[0]
        ?.columVisibility || false,
    raceOffTime:
      columnsDef.filter((col) => col.accessorKey === "raceOffTime")[0]
        ?.columVisibility || false,
    racePostTime:
      columnsDef.filter((col) => col.accessorKey === "racePostTime")[0]
        ?.columVisibility || false,
    racePurse:
      columnsDef.filter((col) => col.accessorKey === "racePurse")[0]
        ?.columVisibility || false,
    raceRaceNumber:
      columnsDef.filter((col) => col.accessorKey === "raceRaceNumber")[0]
        ?.columVisibility || false,
    raceTrackId:
      columnsDef.filter((col) => col.accessorKey === "raceTrackId")[0]
        ?.columVisibility || false,
    raceTrackName:
      columnsDef.filter((col) => col.accessorKey === "raceTrackName")[0]
        ?.columVisibility || false,
    raceType:
      columnsDef.filter((col) => col.accessorKey === "raceType")[0]
        ?.columVisibility || false,
    starterClaimedPriceUsa:
      columnsDef.filter(
        (col) => col.accessorKey === "starterClaimedPriceUsa"
      )[0]?.columVisibility || false,
    starterClaimIndicator:
      columnsDef.filter((col) => col.accessorKey === "starterClaimIndicator")[0]
        ?.columVisibility || false,
    starterClaimingPriceWaived:
      columnsDef.filter(
        (col) => col.accessorKey === "starterClaimingPriceWaived"
      )[0]?.columVisibility || false,
    starterDnf:
      columnsDef.filter((col) => col.accessorKey === "starterDnf")[0]
        ?.columVisibility || false,
    starterEarnings:
      columnsDef.filter((col) => col.accessorKey === "starterEarnings")[0]
        ?.columVisibility || false,
    starterHisaRegulated:
      columnsDef.filter((col) => col.accessorKey === "starterHisaRegulated")[0]
        ?.columVisibility || false,
    starterHorseBreedType:
      columnsDef.filter((col) => col.accessorKey === "starterHorseBreedType")[0]
        ?.columVisibility || false,
    starterHorseColor:
      columnsDef.filter((col) => col.accessorKey === "starterHorseColor")[0]
        ?.columVisibility || false,
    starterHorseDamName:
      columnsDef.filter((col) => col.accessorKey === "starterHorseDamName")[0]
        ?.columVisibility || false,
    starterHorseFoaled:
      columnsDef.filter((col) => col.accessorKey === "starterHorseFoaled")[0]
        ?.columVisibility || false,
    starterHorseHisaId:
      columnsDef.filter((col) => col.accessorKey === "starterHorseHisaId")[0]
        ?.columVisibility || false,
    starterHorseMicrochips:
      columnsDef.filter(
        (col) => col.accessorKey === "starterHorseMicrochips"
      )[0]?.columVisibility || false,
    starterHorseName:
      columnsDef.filter((col) => col.accessorKey === "starterHorseName")[0]
        ?.columVisibility || false,
    starterHorseReferenceNumber:
      columnsDef.filter(
        (col) => col.accessorKey === "starterHorseReferenceNumber"
      )[0]?.columVisibility || false,
    starterHorseRegistry:
      columnsDef.filter((col) => col.accessorKey === "starterHorseRegistry")[0]
        ?.columVisibility || false,
    starterHorseSex:
      columnsDef.filter((col) => col.accessorKey === "starterHorseSex")[0]
        ?.columVisibility || false,
    starterHorseSireName:
      columnsDef.filter((col) => col.accessorKey === "starterHorseSireName")[0]
        ?.columVisibility || false,
    starterHorseTattoo:
      columnsDef.filter((col) => col.accessorKey === "starterHorseTattoo")[0]
        ?.columVisibility || false,
    starterJockeyFirstName:
      columnsDef.filter(
        (col) => col.accessorKey === "starterJockeyFirstName"
      )[0]?.columVisibility || false,
    starterJockeyHisaId:
      columnsDef.filter((col) => col.accessorKey === "starterJockeyHisaId")[0]
        ?.columVisibility || false,
    starterJockeyLastName:
      columnsDef.filter((col) => col.accessorKey === "starterJockeyLastName")[0]
        ?.columVisibility || false,
    starterJockeyReferenceNumber:
      columnsDef.filter(
        (col) => col.accessorKey === "starterJockeyReferenceNumber"
      )[0]?.columVisibility || false,
    starterJockeyType:
      columnsDef.filter((col) => col.accessorKey === "starterJockeyType")[0]
        ?.columVisibility || false,
    starterLengthBehindAtFinish:
      columnsDef.filter(
        (col) => col.accessorKey === "starterLengthBehindAtFinish"
      )[0]?.columVisibility || false,
    starterOdds:
      columnsDef.filter((col) => col.accessorKey === "starterOdds")[0]
        ?.columVisibility || false,
    starterOfficialPosition:
      columnsDef.filter(
        (col) => col.accessorKey === "starterOfficialPosition"
      )[0]?.columVisibility || false,
    starterOwnerFirstName:
      columnsDef.filter((col) => col.accessorKey === "starterOwnerFirstName")[0]
        ?.columVisibility || false,
    starterOwnerHisaId:
      columnsDef.filter((col) => col.accessorKey === "starterOwnerHisaId")[0]
        ?.columVisibility || false,
    starterOwnerLastName:
      columnsDef.filter((col) => col.accessorKey === "starterOwnerLastName")[0]
        ?.columVisibility || false,
    starterOwnerReferenceNumber:
      columnsDef.filter(
        (col) => col.accessorKey === "starterOwnerReferenceNumber"
      )[0]?.columVisibility || false,
    starterOwnerType:
      columnsDef.filter((col) => col.accessorKey === "starterOwnerType")[0]
        ?.columVisibility || false,
    starterPositionAtPointOfCall1:
      columnsDef.filter(
        (col) => col.accessorKey === "starterPositionAtPointOfCall1"
      )[0]?.columVisibility || false,
    starterPositionAtPointOfCall2:
      columnsDef.filter(
        (col) => col.accessorKey === "starterPositionAtPointOfCall2"
      )[0]?.columVisibility || false,
    starterPositionAtPointOfCall3:
      columnsDef.filter(
        (col) => col.accessorKey === "starterPositionAtPointOfCall3"
      )[0]?.columVisibility || false,
    starterPositionAtPointOfCall4:
      columnsDef.filter(
        (col) => col.accessorKey === "starterPositionAtPointOfCall4"
      )[0]?.columVisibility || false,
    starterPositionAtPointOfCall5:
      columnsDef.filter(
        (col) => col.accessorKey === "starterPositionAtPointOfCall5"
      )[0]?.columVisibility || false,
    starterPostPosition:
      columnsDef.filter((col) => col.accessorKey === "starterPostPosition")[0]
        ?.columVisibility || false,
    starterProgramNumber:
      columnsDef.filter((col) => col.accessorKey === "starterProgramNumber")[0]
        ?.columVisibility || false,
    starterRecordType:
      columnsDef.filter((col) => col.accessorKey === "starterRecordType")[0]
        ?.columVisibility || false,
    starterScratched:
      columnsDef.filter((col) => col.accessorKey === "starterScratched")[0]
        ?.columVisibility || false,
    starterShakes:
      columnsDef.filter((col) => col.accessorKey === "starterShakes")[0]
        ?.columVisibility || false,
    starterTrainerFirstName:
      columnsDef.filter(
        (col) => col.accessorKey === "starterTrainerFirstName"
      )[0]?.columVisibility || false,
    starterTrainerHisaId:
      columnsDef.filter((col) => col.accessorKey === "starterTrainerHisaId")[0]
        ?.columVisibility || false,
    starterTrainerLastName:
      columnsDef.filter(
        (col) => col.accessorKey === "starterTrainerLastName"
      )[0]?.columVisibility || false,
    starterTrainerReferenceNumber:
      columnsDef.filter(
        (col) => col.accessorKey === "starterTrainerReferenceNumber"
      )[0]?.columVisibility || false,
    starterTrainerType:
      columnsDef.filter((col) => col.accessorKey === "starterTrainerType")[0]
        ?.columVisibility || false,
    starterVoidIndicator:
      columnsDef.filter((col) => col.accessorKey === "starterVoidIndicator")[0]
        ?.columVisibility || false,
    starterVoidReason:
      columnsDef.filter((col) => col.accessorKey === "starterVoidReason")[0]
        ?.columVisibility || false,
  });
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });
  console.log("Columns:", pageIndex, pageSize, pagination);

  return (
    <div className="w-full">
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DropButton variant="outline" size="sm" className="gap-2">
              <Settings2 className="h-4 w-4" />
              <span className="hidden sm:inline">Columns</span>
            </DropButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-72 max-h-[60vh] overflow-y-auto"
          >
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table.getAllColumns().map((column, index) => {
              const columnDef = column.columnDef as any;
              return (
                <DropdownMenuCheckboxItem
                  key={`menu-item-${column.id}-${index}`}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columnDef?.headerText || column.columnDef?.header}
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className={`w-full bg-white shadow-sm border-2 overflow-hidden rounded-md ${className}`}
      >
        {/* Desktop table view */}
        <div className="hidden lg:block w-full relative">
          <div className="max-h-[55vh]">
            <Table className="block max-h-[55vh] overflow-auto min-w-[2200px]">
              <TableHeader className="bg-gray-50 border-b border-b-gray-800 sticky top-0 z-20 shadow-sm">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="border-b border-b-gray-800"
                  >
                    {headerGroup.headers.map((header, index) => {
                      return (
                        <TableHead
                          key={`header-item-${header.id}-${index}`}
                          className="whitespace-nowrap min-w-[160px] px-4 py-2 text-center text-base font-medium text-gray-600"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={`row-item-${row.id}-${index}`}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell, index) => (
                        <TableCell
                          key={`cell-item-${cell.id}-${index}`}
                          className="whitespace-nowrap min-w-[160px] px-4 py-3 text-center text-sm"
                        >
                          {cell.column.id === "id" ? (
                            <Button
                              variant="link"
                              size="sm"
                              className="flex items-center m-auto gap-2 text-blue-600 hover:text-blue-800"
                              onClick={() => handleRowClick(row.original)}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Button>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Mobile / tablet card view */}
        <div className="lg:hidden w-full max-h-[50vh] overflow-y-auto overscroll-y-contain">
          <div className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row, index) => {
              const runner = row.original;

              return (
                <div
                  key={`${runner.id ?? row.id}-${index}`}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleCardClick(runner)}
                >
                  <div className="flex flex-col space-y-2">
                    {/* Top row: ID / basic race info */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center flex-wrap gap-1">
                          <span className="text-base font-medium text-gray-900 truncate max-w-[180px]">
                            {runner.id}
                          </span>

                          {runner.starterDnf && (
                            <span className="text-[14px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                              DNF
                            </span>
                          )}
                        </div>

                        <span className="text-[14px] text-gray-500 mt-0.5">
                          {runner.raceDate} · Race {runner.raceDate} · Race{" "}
                          {runner.raceRaceNumber}
                        </span>
                      </div>

                      <div className="flex flex-col items-end space-y-1 text-right flex-shrink-0">
                        <span className="text-[14px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                          {runner.raceType}
                        </span>
                        <span className="text-[14px] text-gray-500">
                          {runner.raceTrackId} · {runner.raceCountry}
                        </span>
                      </div>
                    </div>

                    {/* Middle: quick metrics */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[14px] text-gray-700 mt-1">
                      <div>
                        <span className="text-gray-500">Race Course: </span>
                        <span>{runner.raceCourse}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Distance (rnd): </span>
                        <span>{runner.raceDistanceFurlongRound} f</span>
                      </div>

                      <div>
                        <span className="text-gray-500">Purse: </span>
                        <span>
                          {runner.racePurse != null
                            ? `$${runner.racePurse.toLocaleString()}`
                            : "-"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Horse Breed: </span>
                        <span>{runner.starterHorseBreedType}</span>
                      </div>
                    </div>

                    {/* Trainer/Owner */}
                    <div className="mt-1 text-[14px] text-gray-600">
                      <div>
                        <span className="text-gray-500">Horse Name: </span>
                        {runner.starterHorseName}
                      </div>
                      <div>
                        <span className="text-gray-500">Owner: </span>
                        {runner.starterOwnerLastName}
                      </div>
                      <div>
                        <span className="text-gray-500">Trainer: </span>
                        {runner.starterTrainerFirstName}{" "}
                        {runner.starterTrainerLastName}
                      </div>
                    </div>

                    {/* Bottom meta */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[14px] text-gray-500 truncate max-w-[60%]">
                        HISA Horse: {runner.starterHorseHisaId}
                      </span>
                      <span className="text-[14px] text-gray-500 truncate max-w-[40%] text-right">
                        Owner ID: {runner.starterOwnerHisaId}
                      </span>
                    </div>

                    {/* Tap hint */}
                    <div className="text-right mt-1">
                      <span className="text-blue-600 text-[14px] font-medium">
                        Tap for details
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-5 pb-0">
        {/* Left side: rows per page */}
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {RUNNERS_RESULT_CONFIG.PAGE_SIZE_OPTIONS.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Right side: page info + buttons, right-aligned */}
        <div className="flex items-center space-x-2 ml-auto">
          <div className="text-sm font-medium text-right">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
