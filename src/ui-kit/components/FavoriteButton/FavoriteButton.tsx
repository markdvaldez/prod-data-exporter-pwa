import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import { memo } from "react";
import { FavoriteIcon } from "../Icons/FavoriteIcon";
import { FavoriteOnIcon } from "../Icons/FavoriteOnIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";

type FavoriteButtonProps = {
  className?: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = memo(
  ({ className, isActive, onClick }) => {
    const t = useTranslations("Location");

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={onClick}
              className={cn("p-2 hover:cursor-pointer", className)}
            >
              {isActive ? <FavoriteOnIcon /> : <FavoriteIcon />}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm text-tDefault font-normal">
              {isActive ? t("removeFromFavorites") : t("addToFavorites")}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

FavoriteButton.displayName = "FavoriteButton";
