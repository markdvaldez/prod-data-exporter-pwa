import CacheInvalidationDemo from "@/components/CacheInvalidationDemo";
import { RecentHorsesWidget } from "@/runnersQcApp/containers/RecentHorsesWidget";
import { RecentRecordsWidget } from "@/runnersQcApp/containers/RecentRecordsWidget";
import { TransactionLogsContainer } from "@/runnersQcApp/containers/TransactionLogsContainer";
import { TreatmentProtocolsWidget } from "@/runnersQcApp/containers/TreatmentProtocolsWidget";
import routes from "@/routes";
import { usePrefetch } from "@/services/pwa/usePrefetch";
import { forceUpload } from "@/services/store/modules/offlineQueue";
import { Protocol40Icon } from "@/ui-kit/components/Icons/Protocol40Icon";
import { Record40Icon } from "@/ui-kit/components/Icons/Record40Icon";
import { MainButton } from "@/ui-kit/components/MainButton";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RunnersQCContainer } from "@/runnersQcApp/containers/RunnersQCContainer";  

export const MainPage = () => {
  const dispatch = useDispatch();
  const t = useTranslations("Main");

  usePrefetch();

  useEffect(() => {
    dispatch(forceUpload());
  }, [dispatch]);

  return (
    <RunnersQCContainer />
  );
};
