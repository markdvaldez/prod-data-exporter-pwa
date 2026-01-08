import { UseFileUploadType } from "@/hooks/useFileUpload";
import {
  getMainOptions,
  mapOptionsToProps,
} from "@/runnersQcApp/containers/AddRecordContainer/helper";
import { getFormattedId } from "@/runnersQcApp/pages/MainPage/helpers";
import { AudioPlayerList } from "@/ui-kit/blocks/AudioPlayer/AudioPlayerList";
import { AudioVoiceRecorder } from "@/ui-kit/blocks/AudioVoiceRecorder";
import { NotesFormField } from "@/ui-kit/blocks/FormFields/NotesFormField";
import { Button } from "@/ui-kit/components/Button";
import { ConfirmationListItem } from "@/ui-kit/components/ConfirmationList";
import { FilePreviewSquare } from "@/ui-kit/components/FilePreviewSquare";
import { FullFileViewer } from "@/ui-kit/components/FullFileViewer";
import { UploadCloudIcon } from "@/ui-kit/components/Icons/UploadCloudIcon";
import { useIsMobile } from "@/ui-kit/hooks/useMobile";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { splitWords } from "../../addRecordAndProtocolConfig";

export type RecordOverviewProps = {
  formData: any;
  filesProps: UseFileUploadType;
  currentFiles: File[];
};

export const Overview: React.FC<RecordOverviewProps> = ({
  formData,
  filesProps,
  currentFiles,
}) => {
  const t = useTranslations();

  const { setValue, getValues } = useFormContext();
  const location = useWatch({ name: "treatmentLocation" });
  const hisaHorseId = useWatch({ name: "hisaHorseId" });
  const hisaHorseName = useWatch({ name: "hisaHorseName" });

  const isMobile = useIsMobile();
  const {
    files: allFiles,
    selectedFile,
    isDragActive,
    open,
    onDrop,
    removeFile,
    getRootProps,
    getInputProps,
    setSelectedFile,
  } = filesProps;

  const { audioFiles, files } = useMemo(() => {
    const audio = _.filter(allFiles, (file) =>
      _.includes(["audio/mpeg", "audio/wav", "audio/mp3"], file?.type)
    );
    return {
      audioFiles: audio,
      files: _.difference(allFiles, audio),
    };
  }, [allFiles]);

  const { curAudioFiles, curFiles } = useMemo(() => {
    const audio = _.filter(currentFiles, (file) =>
      _.includes(["audio/mpeg", "audio/wav", "audio/mp3"], file?.type)
    );
    return {
      curAudioFiles: audio,
      curFiles: _.difference(currentFiles, audio),
    };
  }, [currentFiles]);

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

  const { horseName, horseHisaId } = useMemo(() => {
    return {
      horseName: hisaHorseName || "-",
      horseHisaId: getFormattedId(hisaHorseId || "-"),
    };
  }, [hisaHorseId, hisaHorseName]);

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
        <ConfirmationListItem
          key={"confirmation-list-item-Location"}
          label={t("AddRecord.location")}
          value={location?.horseLocationName || location?.locationName}
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
            key="notes"
            name="notes"
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
          {_.map(curFiles, (file, index) => (
            <FilePreviewSquare
              key={index}
              file={file}
              onRemove={() => removeFile(file)}
              onClick={() => setSelectedFile(file)}
              withDownload
              withDeleteIcon={false}
            />
          ))}
          {_.map(files, (file, index) => (
            <FilePreviewSquare
              key={index}
              file={file}
              onRemove={() => removeFile(file)}
              onClick={() => setSelectedFile(file)}
              withDownload
            />
          ))}
          <div className="flex flex-col w-full">
            <AudioPlayerList
              files={curAudioFiles}
              onDelete={removeFile}
              showIcon={false}
            />
            <AudioPlayerList
              files={audioFiles}
              onDelete={removeFile}
              showIcon
            />
          </div>
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
