import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useMemo } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./InputOTP";

export type InputOTPControlledProps = {
  value?: string;
  error?: string;
  handleChangeValue: (value: string) => void;
  handleFocus: () => void;
};

export const InputOTPControlled: React.FC<InputOTPControlledProps> = ({
  value,
  error,
  handleChangeValue,
  handleFocus,
}) => {
  const t = useTranslations("Auth");

  const textColor = useMemo(() => {
    return error ? "text-e0" : "text-tDefault";
  }, [error]);

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={handleChangeValue}
        onFocus={handleFocus}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} error={error} />
          <InputOTPSlot index={1} error={error} />
          <InputOTPSlot index={2} error={error} />
          <InputOTPSlot index={3} error={error} />
          <InputOTPSlot index={4} error={error} />
          <InputOTPSlot index={5} error={error} />
        </InputOTPGroup>
      </InputOTP>
      <div className={`text-center ${textColor} text-sm`}>
        {error ? (
          error
        ) : (
          <>
            {value === "" ? (
              <>{t("enterOneTimePassword")}</>
            ) : (
              <>{`${t("youEntered")}: ${value}`}</>
            )}
          </>
        )}
      </div>
    </div>
  );
};
