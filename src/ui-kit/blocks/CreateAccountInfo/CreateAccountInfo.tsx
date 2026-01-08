import { getConfig } from "@/services/appConfig";
import { Accordion } from "@/ui-kit/components/Accordion";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const CreateAccountInfo = () => {
  const t = useTranslations("Auth");

  const registerURL = useMemo(() => {
    const config = getConfig();
    return config.REGISTER_URL;
  }, []);

  const featuresArray = [t("accessToHISA"), t("accessToMedEnt")];

  return (
    <div className={cn("flex flex-col gap-6")}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl text-w0 font-medium">{t("createAccount")}</h1>
      </div>
      {/* <div className="grid gap-4">
        <div className="text-w0 text-sm">{t("explore")}</div>
        <Accordion
          items={featuresArray}
          itemClassName="ml-2 mt-1 text-w0"
          classNameTrigger="text-w0"
        />
      </div> */}
      <a
        href={registerURL}
        target="_blank"
        className="bg-beige text-b0 hover:bg-mint/90 hover:text-b0/90 h-12 sm:h-10 rounded-[5px] px-4 py-2 text-center border border-beige"
      >
        <div className="text-tDefault">{t("signUp")}</div>
      </a>
    </div>
  );
};
