import { TreatmentTemplateModel } from "@/Types";
import { ChevronRightIcon } from "@/ui-kit/components/Icons/ChevronRightIcon";
import { DocumentIcon } from "@/ui-kit/components/Icons/DocumentIcon";
import { PencilIcon } from "@/ui-kit/components/Icons/PencilIcon";
import { TrashIcon } from "@/ui-kit/components/Icons/TrashIcon";
import { Separator } from "@/ui-kit/components/Separator";
import { cn } from "@/ui-kit/lib/utils";
import React, { useCallback } from "react";

export type ProtocolsListItemProps = {
  name: string;
  id: string;
  isApplying?: boolean;
  errorMessage?: string;
  hasTreatmentAllFields?: boolean;
  withIcons?: boolean;
  description: string;
  bordered: boolean;
  item: TreatmentTemplateModel | undefined;
  handleDelete?: (id: string) => void;
  handleEdit?: (item: TreatmentTemplateModel) => void;
  handleEditProtocol?: (id: string) => void;
  handleProtocolClick?: (id: string) => void;
};

export const ProtocolsListItem: React.FC<ProtocolsListItemProps> = ({
  name,
  id,
  isApplying,
  errorMessage,
  withIcons = true,
  hasTreatmentAllFields = true,
  item,
  description,
  bordered,
  handleDelete,
  handleEdit,
  handleEditProtocol,
  handleProtocolClick,
}) => {
  const onDeleteClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (id && handleDelete) {
        handleDelete(id);
      }
    },
    [handleDelete, id]
  );

  const onEditClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (handleEditProtocol) {
        handleEditProtocol(id);
      }
      if (item && handleEdit) {
        handleEdit(item);
      }
    },
    [handleEdit, handleEditProtocol, id, item]
  );

  const onProtocolClick = useCallback(() => {
    if (handleProtocolClick) {
      handleProtocolClick(id);
    }
  }, [handleProtocolClick, id]);

  return (
    <>
      <div
        className={cn(
          "group flex flex-row justify-between items-center p-3 relative rounded-sm bg-w0 hover:cursor-pointer hover:bg-a8 transition-colors duration-200",
          !hasTreatmentAllFields ? "border border-e0" : "mb-4"
        )}
        onClick={onProtocolClick}
      >
        <div className="flex flex-1 flex-col">
          <div role="img" className="flex flex-row">
            <DocumentIcon />
            <div className="text-tDefault text-sm pl-3 font-semibold">
              {name}
            </div>
          </div>
          <div className="flex flex-1 justify-start text-b4 text-sm pr-4 pt-2 pl-8">
            {description}
          </div>
        </div>
        {withIcons ? (
          <div className="flex flex-row">
            <div
              role="img"
              data-testid="edit-button"
              className="flex border-b8 pl-4 rounded-sm p-2 justify-center items-center cursor-pointer"
              onClick={onEditClick}
            >
              <PencilIcon />
            </div>
            <div
              role="img"
              data-testid="delete-button"
              className="flex border-b8 pl-4 rounded-sm p-2 justify-center items-center cursor-pointer"
              onClick={onDeleteClick}
            >
              <TrashIcon />
            </div>
          </div>
        ) : null}
        {!isApplying ? <ChevronRightIcon className="self-center ml-3" /> : null}
        {bordered ? (
          <Separator
            data-testid="separator"
            className="absolute left-3 right-3 bottom-0"
          />
        ) : null}
      </div>
      {errorMessage && !hasTreatmentAllFields ? (
        <div className="text-e0 text-xs mb-3 mt-1">{errorMessage}</div>
      ) : null}
    </>
  );
};
