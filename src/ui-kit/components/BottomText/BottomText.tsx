import { useTranslations } from "next-intl";

const ASSISTANCE = "tel:18775132919";
const ASSISTANCE_PHONE = "1-877-513-2919";
const VERSION = "TP-1, V:2025-01-30v1.0.0-DEV";

export const BottomText = () => {
  const t = useTranslations("Auth");
  return (
    <div className="flex flex-col items-center text-center md:flex-row md:justify-between ">
      <div className="flex text-tPlaceholder text-xs">
        {t("call")}
        <a
          href={ASSISTANCE}
          className="text-tPlaceholder text-xs font-bold ml-1 mr-1"
        >
          {ASSISTANCE_PHONE}
        </a>
        {t("forAssistance")}
      </div>
      <div className="text-tPlaceholder text-xs mt-1 sm:mt-0">{VERSION}</div>
    </div>
  );
};
