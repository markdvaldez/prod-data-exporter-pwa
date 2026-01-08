import { getConfig } from "@/services/appConfig";
import { Button } from "@/ui-kit/components/Button";
import { CloseButton } from "@/ui-kit/components/CloseButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui-kit/components/ui/card";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";

export type PWAInstallPromptProps = {
  isSmallScreen?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
};

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  isSmallScreen,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const t = useTranslations("Pwa");
  const animationProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 200 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
    []
  );

  const { name, logoWhiteSrc } = useMemo(() => {
    const { logoWhite, name } = getConfig();
    return {
      name,
      logoWhiteSrc: logoWhite,
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-4 left-1.5 right-1.5 sm:left-auto sm:right-4 bg-transparent z-50"
      {...animationProps}
    >
      <Card className="w-full sm:w-[364px] bg-tDefault rounded-xl shadow-xl drop-shadow-xl">
        <CardHeader className="space-y-1.5 p-4 relative">
          <div className="flex flex-1 items-start">
            <Image
              className="rounded-xl"
              alt="Logo"
              src={logoWhiteSrc}
              width={64}
              height={64}
            />
            <div className="flex flex-col pl-3">
              <CardTitle className="text-w0 text-md">
                {t("installApp", { name })}
              </CardTitle>
              <CardDescription className="text-w0">
                {t("thisSiteHasAppFunctionality")}
              </CardDescription>
            </div>
          </div>
          <CloseButton
            className="absolute top-0 right-2"
            variant="light"
            onClick={onClose}
          />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex gap-4">
            <Button
              className="flex-1"
              variant="outline"
              title={t("notNow")}
              onClick={onCancel}
            />
            <Button
              className="flex-1"
              title={t("install")}
              onClick={onConfirm}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
