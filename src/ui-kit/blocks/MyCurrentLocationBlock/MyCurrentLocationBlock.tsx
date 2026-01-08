import { LocationIconButton } from "@/ui-kit/components/LocationIconButton";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import React, { memo } from "react";

type MyCurrentLocationProps = {
  className?: string;
  onSubmit: () => void;
};

export const MyCurrentLocationBlock: React.FC<MyCurrentLocationProps> = memo(
  ({ className, onSubmit }) => {
    const t = useTranslations("Location");
    return (
      <div
        className={cn(
          "flex flex-col justify-center items-center pt-8 gap-2",
          className
        )}
      >
        <div className="text-base text-tDefault text-center">
          {t("toFindALocation")}
        </div>
        <div className="text-base text-tDefault">{t("or")}</div>
        <div
          className={
            "flex justify-center items-center text-base text-a0 font-semibold hover:cursor-pointer"
          }
          onClick={onSubmit}
        >
          {t("useMyCurrentLocation")}
          <LocationIconButton className="ml-2" onClick={onSubmit} />
        </div>
        <div className="text-tDefault pt-4 text-center max-w-52 pb-8"></div>
      </div>
    );
  }
);

MyCurrentLocationBlock.displayName = "MyCurrentLocationBlock";
