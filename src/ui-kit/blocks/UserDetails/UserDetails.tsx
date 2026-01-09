"use client";
import { useUserPermissions } from "@/hooks/useAuthUser";
import {
  getFormattedId,
  getUserInitials,
} from "@/prodDataExporter/pages/MainPage/helpers";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui-kit/components/Card";
import { CopyIcon } from "@/ui-kit/components/Icons/CopyIcon";
import { Input } from "@/ui-kit/components/Input";
import { Label } from "@/ui-kit/components/Label";
import { Separator } from "@/ui-kit/components/Separator";
import { Toaster } from "@/ui-kit/components/Toaster";
import { useToast } from "@/ui-kit/hooks/useToast";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export const UserDetails: React.FC = () => {
  const t = useTranslations("Main");
  const { toast } = useToast();

  const { userData } = useUserPermissions();

  const initials = useMemo(() => {
    return getUserInitials(userData);
  }, [userData]);

  const { firstName, lastName, email, phoneNumber, personId } = useMemo(() => {
    return {
      firstName: userData?.name?.firstName,
      lastName: userData?.name?.lastName,
      email: userData?.email,
      phoneNumber: userData?.mobileNumber,
      personId: getFormattedId(userData?.hisaPersonId),
    };
  }, [
    userData?.email,
    userData?.hisaPersonId,
    userData?.mobileNumber,
    userData?.name?.firstName,
    userData?.name?.lastName,
  ]);

  const copyToClipBoard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(userData?.hisaPersonId || "");
      toast({
        title: "Person ID copied to clipboard",
        variant: "default",
      });
    } catch (err) {}
  }, [toast, userData?.hisaPersonId]);

  return (
    <div className="w-full bg-mainBackground sm:pl-8 sm:pr-8 pt-2 min-h-screen flex flex-col items-center">
      <Card className="w-full mx-4 md:w-10/12 xl:w-7/12">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {t("myDetails")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center pl-6 pr-6 gap-4">
            <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl md:rounded-3xl bg-a0 text-lg font-bold text-w0">
              {initials}
            </div>
            <div className="flex flex-1 flex-col gap-2 pl-6 pr-6 sm:pr-0 pt-1 sm:pb-0 sm:mr-3">
              <Label htmlFor="personId">{t("personId")}</Label>
              <div
                data-testid="person-id-copy"
                className="flex flex-row cursor-pointer"
                onClick={copyToClipBoard}
              >
                <div>{personId}</div>
                <CopyIcon width={16} height={16} className="ml-2" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 pb-6 mt-4">
            <Separator className="flex mt-2" />
            <div className="sm:flex sm:flex-1 sm:flex-row sm:justify-space-between ">
              <div className="flex flex-1 flex-col gap-2 pl-6 pr-6 sm:pr-0 pb-4 sm:pb-0 sm:mr-3">
                <Label htmlFor="firstName">{t("firstName")}</Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  defaultValue={firstName as string}
                  readOnly
                />
              </div>
              <Separator className="flex mt-2 block sm:hidden" />
              <div className="flex flex-1 flex-col pt-4 sm:pt-0 pr-6 pl-6 sm:pl-0 gap-2 sm:ml-3">
                <Label htmlFor="lastName">{t("lastName")}</Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  defaultValue={lastName as string}
                  readOnly
                />
              </div>
            </div>
            <Separator className="flex mt-2" />
            <div className="flex pl-6 pr-6 sm:flex-1 flex-col gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                defaultValue={email as string}
                readOnly
              />
            </div>
            <Separator className="flex mt-2" />
            <div className="flex pl-6 pr-6 sm:flex-1 flex-col gap-2">
              <Label htmlFor="phoneNumber">{t("phoneNumber")}</Label>
              <Input
                id="phoneNumber"
                placeholder="No phone number"
                defaultValue={phoneNumber as string}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};
