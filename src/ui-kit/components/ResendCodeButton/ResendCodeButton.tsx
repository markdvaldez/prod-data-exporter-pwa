import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";

export type ResendCodeButtonProps = {
  timeout?: number;
  disabled?: boolean;
  onClick?: () => void;
};

const DEFAULT_TIMEOUT = 30;

export const ResendCodeButton: React.FC<ResendCodeButtonProps> = ({
  timeout = DEFAULT_TIMEOUT,
  disabled,
  onClick,
}) => {
  const t = useTranslations("Auth");

  const [isDisabled, setIsDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeout);

  const formattedText = useMemo(() => {
    const formattedTime = timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`;
    return isDisabled
      ? `${t("resendCodeIn")} ${formattedTime}`
      : t("resendCode");
  }, [isDisabled, t, timeLeft]);

  const textClass = useMemo(() => {
    return isDisabled ? "text-tDefault text-sm" : "text-a0";
  }, [isDisabled]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDisabled) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer);
            setIsDisabled(false);
            return timeout;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isDisabled, timeout]);

  const handleResendCode = () => {
    setIsDisabled(true);
    onClick?.();
  };

  return (
    <div
      className={cn(
        "max-w-xs py-2 cursor-pointer",
        disabled && "cursor-default"
      )}
      onClick={handleResendCode}
    >
      <div className={textClass}>{formattedText}</div>
    </div>
  );
};
