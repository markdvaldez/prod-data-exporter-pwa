"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Share, SquarePlus } from "lucide-react";
import { useTranslations } from "next-intl";

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

import { TableListItem } from "../../components/TableListItem";
import { PWAInstallPromptProps } from "../PWAInstallPrompt/PWAInstallPrompt";
import {
  AccordionContent,
  AccordionItem,
  Accordion as AccordionMain,
} from "./AccordionParts";
import { ButtonIcon } from "./ButtonIcon";

export const PWAInstallPromptIos = ({
  isSmallScreen,
  onCancel,
  onClose,
}: PWAInstallPromptProps) => {
  const t = useTranslations("Pwa");
  const [isOpen, setIsOpen] = useState(false);

  const options = useMemo(
    () => [
      { title: t("openInYourMainBrowser"), iconSrc: Compass, iconColor: "#007AFF" },
      { title: t("pressShare"), iconSrc: Share, iconColor: "#007AFF" },
      { title: t("scrollDown"), iconSrc: SquarePlus, iconColor: "#FFFFFF" },
    ],
    [t]
  );

  const animationProps = useMemo(
    () => ({
      initial: { opacity: 0, y: isSmallScreen ? 200 : -200 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeInOut" as const },
    }),
    [isSmallScreen]
  );

  const { name, logoWhiteSrc } = useMemo(() => {
    const { logoWhite, name } = getConfig();
    return { name, logoWhiteSrc: logoWhite };
  }, []);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <motion.div
      className="fixed bottom-4 left-1.5 right-1.5 z-50 sm:bottom-auto sm:top-4 sm:left-auto sm:right-4 bg-transparent"
      {...animationProps}
    >
      <Card className="w-full sm:w-[364px] bg-tDefault rounded-xl shadow-xl drop-shadow-xl">
        <CardHeader className="space-y-1.5 p-4 relative">
          <div className="flex flex-1 items-start">
            <Image priority alt="Logo" src={logoWhiteSrc} width={56} height={56} />
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
          <AccordionMain type="single" collapsible value={isOpen ? "item-1" : undefined}>
            <AccordionItem value="item-1">
              <AccordionContent>
                {options.map((item) => (
                  <TableListItem
                    key={`table-list-item-${item.title}`}
                    title={item.title}
                    iconSrc={item.iconSrc}
                    iconColor={item.iconColor}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </AccordionMain>

          <div className="flex gap-4">
            <Button
              className="flex-0"
              variant="outline"
              title={t("notNow")}
              onClick={onCancel}
            />

            <ButtonIcon className="flex-1 px-4" onClick={toggle}>
              {isOpen ? t("hideInstruction") : t("addToHomeScreen")}
              <SquarePlus size={24} />
            </ButtonIcon>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};