import { useInternetConnection } from "@/ui-kit/hooks/useInternetConnection";
import { AnimatePresence, motion } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

export type NoConnectionViewProps = {
  classStyles?: string;
};

export const NoConnectionView: React.FC<NoConnectionViewProps> = ({
  classStyles,
}) => {
  const t = useTranslations();
  const isConnected = useInternetConnection();

  return (
    <AnimatePresence>
      {!isConnected ? (
        <motion.div
          className={classStyles}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WifiOff />
          <div className="pl-8">{t("noConnection")}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
