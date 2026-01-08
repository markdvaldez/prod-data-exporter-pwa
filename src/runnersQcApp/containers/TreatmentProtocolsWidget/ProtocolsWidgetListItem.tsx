import { ChevronRightIcon } from "@/ui-kit/components/Icons/ChevronRightIcon";
import { DocumentIcon } from "@/ui-kit/components/Icons/DocumentIcon";
import { Separator } from "@/ui-kit/components/Separator";
import React, { useCallback } from "react";

export type ProtocolsWidgetListItemProps = {
  id: string;
  name: string;
  description: string;
  bordered: boolean;
  onClick: (id: string) => void;
};

export const ProtocolsWidgetListItem: React.FC<
  ProtocolsWidgetListItemProps
> = ({ id, name, description, bordered, onClick }) => {
  const handleItemClick = useCallback(() => {
    onClick(id);
  }, [id, onClick]);

  return (
    <div
      className="group flex flex-row sm:py-3 p-3 rounded-sm xs:items-start xl:items-center bg-w0 hover:cursor-pointer hover:bg-a8 transition-colors duration-200 relative"
      onClick={handleItemClick}
    >
      <div className="flex flex-1 flex-row pb-2 sm:pb-0">
        <DocumentIcon />
        <div className="text-tDefault text-sm pl-2">{name}</div>
      </div>
      <div className="flex flex-1 xs:justify-start sm:justify-normal text-tDefault text-sm">
        {description}
      </div>
      <ChevronRightIcon className="self-center ml-3" />
      {bordered ? (
        <Separator className="absolute left-3 right-3 bottom-0" />
      ) : null}
    </div>
  );
};
