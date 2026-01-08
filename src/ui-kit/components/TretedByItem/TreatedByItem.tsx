import { useTranslations } from "next-intl";
import React from "react";

export type TreatedByItemProps = {
  treatedByPerson: string;
};

export const TreatedByItem: React.FC<TreatedByItemProps> = ({
  treatedByPerson,
}) => {
  const t = useTranslations();

  return (
    <div className="flex w-full flex-row bg-w0 mt-2 justify-between items-start border rounded-md border-b8 py-2 px-4">
      <div className="text-base sm:text-sm text-tDefault font-semibold">
        {t("AddRecord.treatedBy")}
      </div>
      <div className="text-base sm:text-sm text-tDefault pl-4">
        {treatedByPerson}
      </div>
    </div>
  );
};
