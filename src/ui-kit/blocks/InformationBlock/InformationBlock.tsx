import { SearchIcon } from "@/ui-kit/components/Icons/SearchIcon";
import { cn } from "@/ui-kit/lib/utils";
import React, { memo } from "react";

type InformationViewProps = {
  icon: string;
  iconSize: string;
  text: string;
  iconRoundBg: string;
  stylesClassName?: string;
};

export const InformationBlock: React.FC<InformationViewProps> = memo(
  ({ icon, text, iconSize, iconRoundBg, stylesClassName }) => {
    return (
      <div className="flex flex-col justify-center items-center pt-12">
        <div
          className={cn(
            "flex justify-center items-center rounded-full",
            iconRoundBg,
            iconSize
          )}
        >
          <SearchIcon width={48} height={48} />
        </div>
        <div className="text-tDefault pt-4 text-center max-w-52 pb-8">
          {text}
        </div>
      </div>
    );
  }
);

InformationBlock.displayName = "InformationBlock";
