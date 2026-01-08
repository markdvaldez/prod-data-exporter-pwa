import { cn } from "@/ui-kit/lib/utils";
import { LocateFixed } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";

type LocationIconButtonProps = {
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

export const LocationIconButton: React.FC<LocationIconButtonProps> = ({
  isActive,
  className,
  onClick,
}) => {
  const t = useTranslations("Location");
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "w-10 h-10 min-w-10 flex justify-center items-center text-a0 rounded-full bg-w0 border border-b8 transition-colors duration-200 outline-0",
              isActive && "bg-a0 text-w0",
              className
            )}
            onClick={onClick}
          >
            <LocateFixed size={28} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm text-tDefault font-normal">
            {t("useMyCurrentLocation")}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
