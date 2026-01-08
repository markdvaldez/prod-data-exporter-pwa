import _ from "lodash";
import React, { memo, useCallback, useMemo } from "react";

import { Button } from "@/ui-kit/components/Button";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { useTranslations } from "next-intl";
import { SearchType } from "../SearchLocationContainer/SearchLocationContainer";
import { TypeItem } from "./TypeItem";
import { getTypeOptions } from "./helpers";

export const ChooseLocationType: React.FC<{
  activeType: string | null;
  handleChangeType: (type: SearchType) => void;
  handleSetActiveType: (type: string) => void;
}> = memo(({ activeType, handleChangeType, handleSetActiveType }) => {
  const t = useTranslations("Location");

  const { typeOptions } = useMemo(() => {
    return {
      typeOptions: getTypeOptions(t),
    };
  }, [t]);

  const handleClick = useCallback(
    (id: string) => {
      handleSetActiveType(id);
    },
    [handleSetActiveType]
  );

  const handleConfirm = useCallback(() => {
    handleChangeType("fillForm");
  }, [handleChangeType]);

  const handleCancelClick = useCallback(() => {
    handleChangeType("address");
  }, [handleChangeType]);

  return (
    <>
      <ScrollArea className="flex flex-1 flex-col items-center bg-w0 pl-4 pr-8 pt-4">
        {_.map(typeOptions, (option) => {
          const isActive = option.id === activeType;
          return (
            <TypeItem
              key={option.id}
              item={option}
              isActive={isActive}
              onClick={() => handleClick(option.id)}
            />
          );
        })}
      </ScrollArea>
      <div className="flex justify-end">
        <Button
          className="bg-transparent border-1 border-a0"
          variant="outline"
          title={t("cancel")}
          onClick={handleCancelClick}
        />
        <Button
          className="flex rounded-xl ml-4 px-8 w-32"
          title={t("confirm")}
          disabled={!activeType}
          onClick={handleConfirm}
        />
      </div>
    </>
  );
});

ChooseLocationType.displayName = "ChooseLocationType";
