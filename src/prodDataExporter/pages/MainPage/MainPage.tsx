import { usePrefetch } from "@/services/pwa/usePrefetch";
import { forceUpload } from "@/services/store/modules/offlineQueue";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProdDataExporterContainer } from "@/prodDataExporter/containers/ProdDataExporterContainer";  

export const MainPage = () => {
  const dispatch = useDispatch();
  const t = useTranslations("Main");

  usePrefetch();

  useEffect(() => {
    dispatch(forceUpload());
  }, [dispatch]);

  return (
    <ProdDataExporterContainer />
  );
};
