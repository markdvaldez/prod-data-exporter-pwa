"use client";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import { FormEvent, useCallback } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

type RequestAccessFormType = {
  isLoading?: boolean;
  error?: string | null;
  handleBackClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleSendRequest: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleSetUser: (user: string) => void;
  handleSetError: (error: string) => void;
};

export type RequestAccessFormTypes = React.ComponentPropsWithoutRef<"form"> &
  RequestAccessFormType;

export const RequestAccessForm = ({
  className,
  isLoading,
  error,
  handleBackClick,
  handleSendRequest,
  handleSetUser,
  handleSetError,
  ...props
}: RequestAccessFormTypes) => {
  const t = useTranslations("Auth");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleSetUser(event.target.value);
      handleSetError("");
    },
    [handleSetError, handleSetUser]
  );

  return (
    <form
      data-testid="request-access-form"
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSendRequest}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-bold text-w0">{t("accessError")}</h1>
        <h1 className="text-lg font-medium text-w0">{t("confirmUserName")}</h1>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Input
            id="userName"
            type="text"
            placeholder={t("enterYourUsername")}
            onChange={handleChange}
          />
          {error ? <div className="text-e0">{error}</div> : null}
        </div>

        <Button
          type="submit"
          className="w-full"
          title={t("sendRequest")}
          fetching={isLoading}
        />
        <div
          className="flex items-center justify-center"
          onClick={handleBackClick}
        >
          <a
            href="/login"
            className="text-sm text-a0 underline-offset-4 hover:underline"
          >
            {t("backToLogin")}
          </a>
        </div>
      </div>
    </form>
  );
};
