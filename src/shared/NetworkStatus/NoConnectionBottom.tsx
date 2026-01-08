import { AnimatePresence, motion } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

export type NoConnectionViewProps = {
  classStyles?: string;
  isOffline: boolean;
};

export const NoConnectionBottom: React.FC<NoConnectionViewProps> = ({
  classStyles,
  isOffline,
}) => {
  const t = useTranslations();

  return (
    <AnimatePresence>
      {isOffline ? (
        <motion.div
          className={classStyles}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WifiOff color="#FF4141" size={16} />
          <span className="pl-2 text-sm text-e0">{t("Main.offLine")}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
