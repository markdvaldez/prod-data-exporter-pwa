"use client";

import { useDocumentsQuery } from "@/hooks/useDocumentsQuery";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import {
  checkDateWithZone,
  convertTime24To12h,
  getDateTime,
  getFormattedDate,
  getNow,
} from "@/runnersQcApp/shared/DateUtils";
import { THorseMedicalRecord } from "@/runnersQcApp/shared/types";
import routes from "@/routes";
import { selectHorseMedical } from "@/services/store/modules/horseMedical/selectors";
import { AudioPlayerList } from "@/ui-kit/blocks/AudioPlayer/AudioPlayerList";
import { NotFoundPage } from "@/ui-kit/blocks/NotFoundPage";
import { EditButton } from "@/ui-kit/components/EditButton";
import { FilePreviewSquare } from "@/ui-kit/components/FilePreviewSquare";
import { FullFileViewer } from "@/ui-kit/components/FullFileViewer";
import { ArrowLeftIcon } from "@/ui-kit/components/Icons/ArrowLeftIcon";
import { Loader } from "@/ui-kit/components/Loader";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { cn } from "@/ui-kit/lib/utils";
import _ from "lodash";
import { RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { isEditable } from "../addRecordAndProtocolConfig";
import { RecordDetailsListItem } from "./RecordDetailsListItem";
import {
  TOption,
  getOptions,
  getPreparedRecord,
  mapOptionsToProps,
} from "./helpers";

export const RecordDetailsContainer: React.FC = () => {
  const t = useTranslations("HistoryDetails");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const records = useSelector(selectHorseMedical);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const record = useMemo(() => {
    return records.find(
      (r) => r.hisaHorseMedicalId === id || r.internalId === id
    );
  }, [records, id]);

  const {
    files: innerFiles,
    isLoading,
    isConverting,
    refetch,
  } = useDocumentsQuery(record?.hisaHorseMedicalId || "");

  const { audioFiles, files } = useMemo(() => {
    const audio = _.filter(innerFiles, (file) =>
      _.includes(["audio/mpeg", "audio/wav", "audio/mp3"], file?.type)
    );
    return {
      audioFiles: audio,
      files: _.difference(innerFiles, audio),
    };
  }, [innerFiles]);

  const { editable } = useMemo(() => {
    const now = getNow().endOf("day");
    const recordDate =
      getDateTime((record?.lastUpdate || "").split("T")[0]) ||
      getDateTime(record?.date);

    return {
      editable:
        recordDate &&
        checkDateWithZone({ dt1: now, dt2: recordDate, maxDays: 2 }) &&
        isEditable(record?.recType),
    };
  }, [record]);

  const options = useMemo(() => {
    if (record) {
      const preparedRecord = getPreparedRecord(record as THorseMedicalRecord);
      return mapOptionsToProps(
        preparedRecord,
        getOptions(t, preparedRecord?.recType),
        t
      );
    }
  }, [record, t]);

  const renderTableRow = useCallback(
    (item: TOption, index: number) => {
      const isLastItem = options && index === options.length - 1;

      const getValue = (key: string, value?: string) => {
        switch (key) {
          case "hisaHorseMedicalId":
            return getFormattedId(value || "");
          case "date":
            return getFormattedDate(value);
          case "time":
            return convertTime24To12h(value);
          default:
            return value || "";
        }
      };

      return (
        <RecordDetailsListItem
          key={`option-${item.key}`}
          label={item.label}
          value={getValue(item.key, item.value)}
          isLastItem={isLastItem}
        />
      );
    },
    [options]
  );

  const handleEdit = useCallback(() => {
    router.push(routes.EDIT_RECORD(id as string));
  }, [id, router]);

  const handleRefetch = useCallback(() => {
    if (!isLoading && !isConverting) {
      refetch();
    }
  }, [isLoading, isConverting, refetch]);

  const renderFiles = useMemo(() => {
    if ((isLoading && !innerFiles.length) || isConverting) {
      return <Loader size="sm" />;
    }
    if (files.length || audioFiles.length) {
      return (
        <>
          <div className="flex flex-wrap gap-4 pt-2">
            {_.map(files, (file, index) => (
              <FilePreviewSquare
                key={index}
                file={file}
                onClick={() => setSelectedFile(file)}
                withDownload
                withDeleteIcon={false}
              />
            ))}
          </div>
          <div className="flex flex-col w-full">
            <AudioPlayerList files={audioFiles} />
          </div>
          {selectedFile && (
            <FullFileViewer
              file={selectedFile}
              onClose={() => setSelectedFile(null)}
              withDownload
            />
          )}
        </>
      );
    }
    return (
      <span className="text-base font-light">{t("noAttachmentsYet")}</span>
    );
  }, [
    audioFiles,
    files,
    innerFiles.length,
    isConverting,
    isLoading,
    selectedFile,
    t,
  ]);

  if (!record) return <NotFoundPage />;

  return (
    <RouteWithTransition
      id="route-RecordDetailsContainer"
      className="w-full h-screen overflow-hidden bg-mainBackground"
    >
      <ScrollArea className="w-full bg-mainBackground h-screen max-h-[calc(100vh-150px)] sm:max-h-[calc(100vh-24px)]  scroll-thin overflow-y-auto">
        <div className="w-full px-4 flex flex-col items-center max-w-[100vw] pb-12">
          <div className="flex w-full lg:w-2/3 flex-col">
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              <div className="flex flex-row items-center gap-2 pb-2 pt-2">
                <ArrowLeftIcon />
                <span className="text-sm text-tDefault">{t("back")}</span>
              </div>
            </Link>
            <div className="flex flex-1 justify-between items-center pb-4">
              <div className="flex flex-1 items-center">
                <h1 className="text-2xl font-semibold">{t("recordDetails")}</h1>
                {record?.isSynced ? null : (
                  <div className="bg-d2 px-2 ml-2 rounded-md text-tDefault text-sm">
                    {t("dataNotSynced")}
                  </div>
                )}
              </div>
              {editable ? (
                <EditButton title={t("edit")} onClick={handleEdit} />
              ) : null}
            </div>
          </div>

          <div className="bg-white rounded-[16px] shadow p-4 mb-3 w-full lg:w-2/3">
            <div className="space-y-1">{_.map(options, renderTableRow)}</div>
          </div>

          <div className="w-full items-center lg:w-2/3 max-w-[100vw]">
            <div className="flex items-center gap-2">
              <span className="text-base font-light text-tPlaceholder">
                {t("attachments")}
              </span>
              <RefreshCw
                onClick={handleRefetch}
                className={cn(
                  "text-tPlaceholder cursor-pointer",
                  (isLoading || isConverting) &&
                    "pointer-events-none opacity-50"
                  // isLoading || (isConverting && "animate-spin")
                )}
                width={16}
                height={16}
              />
            </div>
            {renderFiles}
          </div>
        </div>
      </ScrollArea>
    </RouteWithTransition>
  );
};
