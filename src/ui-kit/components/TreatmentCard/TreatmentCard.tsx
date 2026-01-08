import { HorseMedicalRecType } from "@/Types/global-types";
import { useTranslations } from "next-intl";
import React, { memo, useCallback } from "react";

type TreatmentCardProps = {
  id: string;
  index: number | string;
  title?: HorseMedicalRecType;
  subTitle?: string;
  editable?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

export const TreatmentCard: React.FC<TreatmentCardProps> = memo(
  ({ id, index, title, subTitle, editable = true, onEdit, onDelete }) => {
    const t = useTranslations();

    const handleEdit = useCallback(() => {
      onEdit?.(id);
    }, [id, onEdit]);

    const handleDelete = useCallback(() => {
      onDelete?.(id);
    }, [id, onDelete]);

    return (
      <div className="my-2 px-4 bg-w0 border rounded-xl border-b5 overflow-hidden">
        <div className="flex flex-row pt-4 pb-2">
          <div className="flex w-10 h-10 rounded-sm border-2 border-b5 justify-center items-center">
            <div className="text-tDefault text-lg">{index}</div>
          </div>
          <div className="px-2">
            <div className="text-base text-tDefault max-w-250">{title}</div>
            <div className="text-sm text-tDefault pr-5">{subTitle}</div>
          </div>
        </div>
        {editable ? (
          <>
            <div className="h-px bg-b7 self-stretch" />
            <div className="flex flex-row">
              <div onClick={handleEdit}>
                <div className="mr-6 pt-2 pb-4 text-blue text-sm underline cursor-pointer">
                  {t("Protocols.edit")}
                </div>
              </div>
              <div onClick={handleDelete}>
                <div className="mr-6 pt-2 pb-4 text-blue text-sm underline cursor-pointer">
                  {t("Protocols.remove")}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    );
  }
);

TreatmentCard.displayName = "TreatmentCard";
