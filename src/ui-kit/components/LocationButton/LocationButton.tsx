import { ChevronRight } from "lucide-react";
import React from "react";

export type LocationButtonProps = {
  title: string;
  onButtonClick?: () => void;
};

export const LocationButton: React.FC<LocationButtonProps> = ({
  title,
  onButtonClick,
}) => {
  return (
    <div
      className="flex flex-row justify-between items-center p-3 border border-b8 rounded-md cursor-pointer"
      onClick={onButtonClick}
    >
      <div className="text-sm text text-tDefault">{title}</div>
      <div className="min-w-6 min-h-6">
        <ChevronRight />
      </div>
    </div>
  );
};
