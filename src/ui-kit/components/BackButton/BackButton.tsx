import { ArrowLeftIcon } from "@/ui-kit/components/Icons/ArrowLeftIcon";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";

export const BackButton: React.FC<{ styles: string }> = memo(({ styles }) => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Link
      href="#"
      onClick={(e) => {
        e.preventDefault();
        router.back();
      }}
    >
      <div className={cn("flex flex-row items-center gap-2 pb-2", styles)}>
        <ArrowLeftIcon />
        <span className="text-lg sm:text-sm text-tDefault">
          {t("HorseReport.back")}
        </span>
      </div>
    </Link>
  );
});

BackButton.displayName = "BackButton";
