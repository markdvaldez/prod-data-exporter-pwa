import { UseFileUploadType } from "@/hooks/useFileUpload";
import { splitWords } from "@/runnersQcApp/containers/addRecordAndProtocolConfig";
import {
  getMainOptions,
  mapOptionsToProps,
} from "@/runnersQcApp/containers/AddRecordContainer/helper";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { THorse } from "@/runnersQcApp/shared/types";
import { Button } from "@/ui-kit/components/Button";
import { ConfirmationListItem } from "@/ui-kit/components/ConfirmationList";
import { FilePreviewSquare } from "@/ui-kit/components/FilePreviewSquare";
import { FullFileViewer } from "@/ui-kit/components/FullFileViewer";
import { UploadCloudIcon } from "@/ui-kit/components/Icons/UploadCloudIcon";
import { TreatmentHorseListItem } from "@/ui-kit/components/TreatmentHorseListItem";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { AudioPlayerList } from "../AudioPlayer/AudioPlayerList";
import { AudioVoiceRecorder } from "../AudioVoiceRecorder";
import { NotesFormField } from "../FormFields/NotesFormField";

export type RecordOverviewProps = {
  formData: any;
  filesProps: UseFileUploadType;
};

export const RecordOverview: React.FC<RecordOverviewProps> = ({
  formData,
  filesProps,
}) => {
  const t = useTranslations();
  const isMobile = useIsMobile();
  const {
    files: currentFiles,
    isDragActive,
    selectedFile,
    open,
    onDrop,
    removeFile,
    getRootProps,
    getInputProps,
    setSelectedFile,
  } = filesProps;

  const { audioFiles, files } = useMemo(() => {
    const audio = _.filter(currentFiles, (file) =>
      _.includes(["audio/mpeg", "audio/wav", "audio/mp3"], file?.type)
    );
    return {
      audioFiles: audio,
      files: _.difference(currentFiles, audio),
    };
  }, [currentFiles]);

  const { setValue, getValues } = useFormContext();
  const horses: THorse[] = useWatch({ name: "horses" });
  const location = useWatch({ name: "treatmentLocation" });

  const mainOptions = useMemo(() => {
    return getMainOptions(t, formData?.recType || "");
  }, [formData?.recType, t]);

  const options = useMemo(() => {
    return mapOptionsToProps(
      t,
      formData as any,
      _.filter(mainOptions, (option) => option.key !== "notes")
    );
  }, [formData, mainOptions, t]);

  const { numberOfHorses, horseName, horseHisaId } = useMemo(() => {
    const firstHorse = _.head(horses);
    return {
      numberOfHorses: horses?.length || 0,
      horseName: firstHorse?.name || "-",
      horseHisaId: getFormattedId(firstHorse?.hisaHorseId || ""),
    };
  }, [horses]);

  const renderItem = useCallback((item: any) => {
    return (
      <ConfirmationListItem
        key={item.key}
        label={item.label}
        value={splitWords(item.value)}
        withDivider
      />
    );
  }, []);

  const handleTranscription = useCallback(
    (text: string) => {
      if (text) {
        const prevNotes = getValues("notes") || "";
        const newNotes = _.trim(`${prevNotes} ${text}`);
        setValue("notes", newNotes);
      }
    },
    [getValues, setValue]
  );

  const handleAudioFile = useCallback(
    (audioFile: File) => {
      onDrop([audioFile]);
    },
    [onDrop]
  );

  return (
    <div className="flex flex-1 flex-col sm:px-4 pb-10 bg-mainBackground">
      <div className="sm:pl-4">
        <div className="text-xl text-tDefault">{t("AddRecord.overview")}</div>
        <div className="text-md sm:text-sm text-tPlaceholder my-2">
          {t("AddRecord.checkIfAll")}
        </div>
        {numberOfHorses > 1 ? (
          <TreatmentHorseListItem
            key={"confirmation-list-item-horses"}
            label={t("AddRecord.horsesList")}
            value={numberOfHorses}
            horses={horses}
            withDivider
          />
        ) : (
          <>
            <ConfirmationListItem
              key={"confirmation-list-item-horse"}
              label={t("AddRecord.horseName")}
              value={horseName}
              withDivider
            />
            <ConfirmationListItem
              key={"confirmation-list-item-Horse-number"}
              label={t("AddRecord.horseHisaId")}
              value={horseHisaId}
              withDivider
            />
          </>
        )}
        <ConfirmationListItem
          key={"confirmation-list-item-Location"}
          label={t("AddRecord.location")}
          value={
            `${location?.locationName} (${getFormattedId(
              location?.locationId
            )})` || "-"
          }
          withDivider
        />
        <ConfirmationListItem
          key={"confirmation-list-item-TreatedBy"}
          label={t("HistoryDetails.treatedBy")}
          value={formData?.treatedByPerson || "-"}
          withDivider
        />
        {_.map(options, renderItem)}
        <div className="flex flex-col relative">
          <AudioVoiceRecorder
            className="absolute right-0 z-10"
            onChange={handleTranscription}
            onAudioRecorded={handleAudioFile}
          />
          <NotesFormField
            name="notes"
            key="notes"
            label={t("AddRecord.notes")}
            placeholder={t("AddRecord.addYourNotes")}
          />
        </div>
        {isMobile ? (
          <>
            <Button
              variant="outline"
              size="sm"
              title={t("AddRecord.attachFiles")}
              onClick={open}
              className="mt-4"
            />
            <input {...getInputProps()} style={{ display: "none" }} />
          </>
        ) : (
          <div
            {...getRootProps()}
            className={`flex flex-col border-2 border-dashed px-16 py-8 rounded-sm cursor-pointer items-center justify-center mt-4 ${
              isDragActive ? "border-blue" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <UploadCloudIcon className="pb-4" />
            <span className="text-tDefault text-center">
              {t("FilesUpload.chooseFileOrDrag")}
            </span>
          </div>
        )}
        <div className="flex flex-wrap gap-4 mt-4">
          {_.map(files, (file, index) => (
            <FilePreviewSquare
              key={index}
              file={file}
              onRemove={() => removeFile(file)}
              onClick={() => setSelectedFile(file)}
              withDownload
            />
          ))}
        </div>
        <div className="flex flex-col w-full">
          <AudioPlayerList files={audioFiles} onDelete={removeFile} showIcon />
        </div>
        {selectedFile && (
          <FullFileViewer
            file={selectedFile}
            onClose={() => setSelectedFile(null)}
            withDownload
          />
        )}
      </div>
    </div>
  );
};
