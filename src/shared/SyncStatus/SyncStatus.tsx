import { useAppDispatch } from "@/services/store/hooks";
import { forceUpload } from "@/services/store/modules/offlineQueue";
import {
  selectIsDataSynced,
  selectIsQueueSyncing,
  selectOfflineRecords,
} from "@/services/store/modules/offlineQueue/selectors";
import { ForceUpdateModal } from "@/ui-kit/blocks/ForceUpdateModal";
import { SidebarSyncStatus } from "@/ui-kit/components/SidebarSyncStatus";
import { useTranslations } from "next-intl";
import { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";

export const SyncStatus = memo(() => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const isDataSynced = useSelector(selectIsDataSynced);
  const isSyncing = useSelector(selectIsQueueSyncing);
  const [isVisible, setIsVisible] = useState(false);
  const offlineRecords = useSelector(selectOfflineRecords);

  const handleClick = useCallback(() => {
    if (!isDataSynced) {
      setIsVisible(true);
    }
  }, [isDataSynced]);

  const handleSubmit = useCallback(() => {
    dispatch(forceUpload());
    setIsVisible(false);
  }, [dispatch]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <>
      <SidebarSyncStatus
        title={isDataSynced ? t("Main.synced") : t("Main.notSynced")}
        isDataSynced={isDataSynced}
        isSyncing={isSyncing}
        onClick={handleClick}
      />
      <ForceUpdateModal
        isVisible={isVisible}
        data={offlineRecords}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
});

SyncStatus.displayName = "SyncStatus";
