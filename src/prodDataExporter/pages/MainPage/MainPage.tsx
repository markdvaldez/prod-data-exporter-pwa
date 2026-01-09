import { usePrefetch } from "@/services/pwa/usePrefetch";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProdDataExporterContainer } from "@/prodDataExporter/containers/ProdDataExporterContainer";  

export const MainPage = () => {
  const dispatch = useDispatch();
  const t = useTranslations("Main");

  usePrefetch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <ProdDataExporterContainer />
  );
};
