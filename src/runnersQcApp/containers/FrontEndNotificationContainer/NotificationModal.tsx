import { Button } from "@/ui-kit/components/Button";
import { Dialog, DialogTitle } from "@/ui-kit/components/Dialog";
import DOMPurify from "dompurify";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useMemo } from "react";
import { NotificationContent } from "./NotificationContent";
import { TFrontEndNotification } from "./helpers";

export type NotificationModalProps = {
  isOpen: boolean;
  onClose: (responseOption: string) => void;
  onSubmit: (responseOption: string) => void;
  data?: TFrontEndNotification;
};

export const NotificationModal: React.FC<NotificationModalProps> = memo(
  ({ isOpen, onClose, onSubmit, data }) => {
    const t = useTranslations("FrontendNotification");

    const renderButtons = useMemo(() => {
      if (!_.isEmpty(data?.responseOptions)) {
        return _.map(data?.responseOptions, (option) => (
          <Button
            key={`button-${option}`}
            title={option}
            onClick={() => onSubmit(option)}
          />
        ));
      } else {
        return (
          <Button
            key={"button-ok"}
            title={t("ok")}
            onClick={() => onSubmit(t("ok"))}
          />
        );
      }
    }, [data?.responseOptions, onSubmit, t]);

    const handleClose = useCallback(() => onClose?.(t("ok")), [onClose, t]);

    const sanitizedHtml = DOMPurify.sanitize(data?.details || "");

    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <NotificationContent className="flex flex-col px-4 pt-4 w-3/4">
          <DialogTitle className="flex justify-center text-xl">
            {data?.messageTitle}
          </DialogTitle>
          <div className="flex flex-col flex-1 justify-between">
            <span
              className="text-base text-tDefault pb-8"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
            {renderButtons}
          </div>
        </NotificationContent>
      </Dialog>
    );
  }
);

NotificationModal.displayName = "NotificationModal";
