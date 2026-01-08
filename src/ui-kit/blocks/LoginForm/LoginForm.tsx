import { getConfig } from "@/services/appConfig";
import { loginRequest, resetError } from "@/services/store/modules/auth";
import {
  selectAuthError,
  selectIsAuthFetching,
  selectNextStep,
} from "@/services/store/modules/auth/selectors";
import { Button } from "@/ui-kit/components/Button";
import { Input } from "@/ui-kit/components/Input";
import { PasswordInput } from "@/ui-kit/components/PasswordInput";
import { cn } from "@/ui-kit/lib/utils";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectIsAuthFetching);
  const nextStep = useSelector(selectNextStep);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        dispatch(loginRequest({ username, password }));
      } catch (e) {}
    },
    [dispatch]
  );

  const { forgotPasswordURL, registerURL } = useMemo(() => {
    const config = getConfig();
    return {
      forgotPasswordURL: config.FORGOT_PASSWORD_URL,
      registerURL: config.REGISTER_URL,
    };
  }, []);

  const handleChange = useCallback(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <form
      data-testid="login-form"
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-2 sm:gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-0 sm:gap-2 text-center">
        <h1 className="text-xl sm:text-2xl font-medium text-w0">
          {t("Auth.login")}
        </h1>
        <div className="text-sm sm:text-base font-semibold text-w0">
          {t("Auth.loginDescription")}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Input
            id="username"
            type="text"
            name="username"
            error={error}
            placeholder={t("Auth.enterYourUsername")}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <PasswordInput
            id="password"
            name="password"
            autoComplete="password"
            error={error}
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div className="text-base text-e0 ">{error?.message}</div>
        ) : null}
        <div className="flex items-center justify-center">
          <a
            href={forgotPasswordURL}
            target="_blank"
            className="text-sm text-w0 underline-offset-4 hover:underline"
          >
            {t("Auth.forgotPassword")}
          </a>
        </div>
        <Button
          type="submit"
          className="w-full"
          fetching={isLoading}
          title={t("Auth.continue")}
        />
        <div className="block lg:hidden flex items-center justify-center ">
          <a
            href={registerURL}
            target="_blank"
            className="text-sm text-w0 underline-offset-4 hover:underline"
          >
            {t("Auth.register")}
          </a>
        </div>
      </div>
    </form>
  );
};
