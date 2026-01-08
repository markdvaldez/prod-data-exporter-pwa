import { useTranslations } from "next-intl";
import { memo } from "react";

type QueueItemProps = {
  id: string;
  day?: string;
  month?: string;
  horseName?: string;
  horseId?: string;
  description?: string;
  conditionTreated?: string;
  thirdField?: string;
  bordered?: boolean;
  drug: string;
  isSynced?: boolean;
  recType?: string;
  onClick?: () => void;
};

export const QueueItem: React.FC<QueueItemProps> = memo(
  ({
    day,
    month,
    horseName,
    horseId,
    description,
    conditionTreated,
    drug,
    thirdField,
    isSynced,
    recType,
  }) => {
    const t = useTranslations();
    return (
      <>
        <div className="group flex flex-row h-18 p-3 mb-3 bg-w0 border bg-border rounded-sm items-center hover:cursor-pointer transition-colors duration-200 relative">
          <div className="flex flex-col w-10 h-10 border-r items-center justify-center">
            <div className="text-lg font-semibold text-tDefault">{day}</div>
            <div className="text-xs font-medium text-tDefault">{month}</div>
          </div>
          <div className="flex flex-col flex-1 pl-3 truncate">
            <div className="text-tDefault font-normal text-sm ">
              <span className="font-semibold mr-2">{horseName}</span>
              {horseId}
            </div>
            {recType ? (
              <div className="text-tPlaceholder text-sm mt-1">{recType}</div>
            ) : null}

            {description ? (
              <div className="text-tPlaceholder text-sm mt-1">
                {description}
              </div>
            ) : null}
            {drug ? (
              <div className="text-tPlaceholder text-sm mt-1">{`${t(
                "Widget.drugName"
              )}: ${drug}`}</div>
            ) : (
              <>
                {conditionTreated ? (
                  <div className="text-tPlaceholder text-sm mt-1">{`${t(
                    "Widget.conditionTreated"
                  )}: ${conditionTreated}`}</div>
                ) : (
                  <div className="text-tPlaceholder text-sm mt-1">
                    {thirdField}
                  </div>
                )}
              </>
            )}
          </div>
          {isSynced ? null : (
            <div className="bg-d2 px-2 py-1 text-tDefault text-xs rounded-lg absolute top-0 right-0">
              {t("AddRecord.dataNotSynced")}
            </div>
          )}
        </div>
      </>
    );
  }
);

QueueItem.displayName = "QueueItem";
