"use client";
import { BottomContainer } from "@/runnersQcApp/containers/BottomContainer";
import { useAppAccessMutation } from "@/services/api/modules/auth/fetchAppAccess";
import { getConfig } from "@/services/appConfig";
import { handleSignOut } from "@/services/aws/amplifyActions";
import { restartAuth } from "@/services/store/modules/auth";
import {
  selectHisaPersonId,
  selectUserData,
} from "@/services/store/modules/auth/selectors";
import { CreateAccountInfo } from "@/ui-kit/blocks/CreateAccountInfo";
import { RequestAccessForm } from "@/ui-kit/blocks/RequestAccessForm";
import { useIsSmallPhone } from "@/ui-kit/hooks/useSmallPhone";
import { useToast } from "@/ui-kit/hooks/useToast";
import { cn } from "@/ui-kit/lib/utils";
import { extractError } from "@/utils/errors";
import _ from "lodash";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FormEvent, useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSlider from "@/ui-kit/components/ImageSlider";

export const RequestAccess: React.FC = () => {
  const t = useTranslations("Auth");
  const dispatch = useDispatch();

  const userData = useSelector(selectUserData);

  const { mutateAsync, isPending } = useAppAccessMutation();

  const [innerUser, setInnerUser] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSetUser = useCallback((user: string) => {
    setInnerUser(_.trim(user).toLowerCase());
  }, []);

  const handleSetError = useCallback((error: string) => {
    setErrorMessage(error);
  }, []);

  const handleBackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      dispatch(restartAuth());
      handleSignOut();
    },
    [dispatch]
  );

  const appName = getConfig().permissionName;
  const hisaPersonId = useSelector(selectHisaPersonId);

  const isSmallPhone = useIsSmallPhone();
  const { toast } = useToast();

  const { imageWidth, imageHeight, logoSrc, logoWhiteSrc } = useMemo(() => {
    const { logo, logoWhite } = getConfig();
    return {
      imageWidth: isSmallPhone ? 80 : 120,
      imageHeight: isSmallPhone ? 80 : 120,
      logoSrc: logo,
      logoWhiteSrc: logoWhite,
    };
  }, [isSmallPhone]);

  const slides = [
    {
      src: '/images/slides/slide-1.jpg',
      alt: 'Protecting the Sport, Elevating Safety',
      title: 'Protecting the Sport, Elevating Safety',
      description: 'We oversee uniform integrity and safety rules across U.S. thoroughbred racing, so every race-day brings fairness, transparency, and high standards that serve participants and fans alike.',
    },
    {
      src: '/images/slides/slide-2.jpg',
      alt: 'Empowering Voices, Supporting Connections',
      title: 'Empowering Voices, Supporting Connections',
      description: 'From jockeys to trainers, owners to veterinarians — we provide the tools, resources, and guidance you need to comply, connect, and thrive within a regulated, professional framework.',
    },
    {
      src: '/images/slides/slide-3.jpg',
      alt: 'A Future Rooted in Trust & Innovation',
      title: 'A Future Rooted in Trust & Innovation',
      description: 'We’re committed to evolving medicine control, data transparency and welfare practices — so racing moves forward with accountability, clarity and unwavering confidence.',
    },
  ]

  const handleSendRequest = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        if (!innerUser) {
          setErrorMessage(t("errorMessage"));
          return;
        }
        if (innerUser !== userData?.userName?.toLowerCase()) {
          setErrorMessage(t("incorrectUsername"));
          return;
        }
        const data = await mutateAsync({
          userId: hisaPersonId,
          appName: appName,
        });

        if (data) {
          toast({
            title: t("accessRequestSent"),
            variant: "default",
          });
        } else {
          toast({
            title: t("accessRequestError"),
            variant: "destructive",
          });
        }
        dispatch(restartAuth());
        handleSignOut();
      } catch (e) {
        setErrorMessage(extractError(e).message || null);
      }
    },
    [
      appName,
      dispatch,
      hisaPersonId,
      innerUser,
      mutateAsync,
      t,
      toast,
      userData?.userName,
    ]
  );

  return (
    <div className="p-10 bg bg-mint min-h-svh flex items-center justify-center bg-[url('/images/body-bg.jpg')]">
      <div className="grid p-5 lg:grid-cols-2 rounded-[15px] overflow-hidden max-w-[80%] w-[1300px] mx-auto shadow-[0_12px_32px_-4px_rgba(0,0,0,0.40)] bg-a0">
        {/* LEFT PANEL */}
        <div className="hidden bg-a0 lg:flex lg:flex-col lg:h-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-center">
              <div className="block"> 
                <div className="w-full h-full">
                  <ImageSlider slides={slides} />
                </div>                
              </div>
            </div>
          </div>
        </div>
        
        {/* RIGHT PANEL */}
        <div className="flex flex-col h-full p-5 relative">
          <div className="flex justify-center mb-5">
            <Image
              priority
              alt="Logo"
              src={logoWhiteSrc}
              width={150}
              height={150}
            />
          </div>
          <div className={cn("flex justify-center", isSmallPhone && "pt-8 landscape:pt-28")}>
            <div className="w-full max-w-sm border-b border-w0 pb-5 mb-4">
              <RequestAccessForm
                isLoading={isPending}
                error={errorMessage}
                handleBackClick={handleBackClick}
                handleSendRequest={handleSendRequest}
                handleSetUser={handleSetUser}
                handleSetError={handleSetError}
              />
            </div>
          </div>
          <div className="hidden md:flex justify-center pb-6">
              <div className="w-full max-w-sm">
                <CreateAccountInfo />
              </div>
            </div>
          <div className="mt-auto">
            <BottomContainer withAssistance />
          </div>
        </div>
      </div>
    </div>
  );
};
