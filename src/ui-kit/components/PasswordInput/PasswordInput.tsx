import { RequestErrorType } from "@/utils/errors";
import { useTranslations } from "next-intl";
import { useCallback, useMemo, useState } from "react";
import { OffEyeIcon } from "../Icons/OffEyeIcon";
import { OnEyeIcon } from "../Icons/OnEyeIcon";
import { Input } from "../Input";
import { InputProps } from "../Input/Input";

export type PasswordInputProps = InputProps & {
  error?: string | RequestErrorType | null;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  ...props
}) => {
  const t = useTranslations("Auth");

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);

  const fieldType = useMemo(() => {
    return secureTextEntry ? "password" : "text";
  }, [secureTextEntry]);

  const toggleType = useCallback(() => {
    setSecureTextEntry((prev) => !prev);
  }, []);

  return (
    <div className="relative w-full">
      <Input
        type={fieldType}
        placeholder={t("enterYourPassword")}
        error={error}
        {...props}
      />
      <div
        className="absolute inset-y-0 end-3 flex items-center ps-3 "
        onClick={toggleType}
      >
        {secureTextEntry ? <OnEyeIcon /> : <OffEyeIcon />}
      </div>
    </div>
  );
};
