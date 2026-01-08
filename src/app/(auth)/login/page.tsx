"use client";

import { BottomContainer } from "@/prodDataExporter/containers/BottomContainer";
import routes from "@/routes";
import { getConfig } from "@/services/appConfig";
import { resetAuthStore } from "@/services/store/modules/auth";
import { selectNextStep } from "@/services/store/modules/auth/selectors";
import { NoConnectionView } from "@/shared/NetworkStatus";
import { RequestAccess } from "@/shared/RequestAccess";
import { NextStep } from "@/Types";
import { CreateAccountInfo } from "@/ui-kit/blocks/CreateAccountInfo";
import { LoginForm } from "@/ui-kit/blocks/LoginForm";
import { useIsSmallPhone } from "@/ui-kit/hooks/useSmallPhone";
import { cn } from "@/ui-kit/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageSlider from "@/ui-kit/components/ImageSlider";

export default function LoginPage() {
  const dispatch = useDispatch();
  const nextStep = useSelector(selectNextStep);
  const router = useRouter();

  const isSmallPhone = useIsSmallPhone();

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

  const { imageWidth, imageHeight, logoSrc, logoWhiteSrc } = useMemo(() => {
    const { logo, logoWhite } = getConfig();
    return {
      imageWidth: isSmallPhone ? 80 : 120,
      imageHeight: isSmallPhone ? 80 : 120,
      logoSrc: logo,
      logoWhiteSrc: logoWhite,
    };
  }, [isSmallPhone]);

  useEffect(() => {
    dispatch(resetAuthStore());
  }, [dispatch]);

  useEffect(() => {
    if (nextStep === NextStep.DASHBOARD) {
      router.push(routes.DASHBOARD);
    }
  }, [dispatch, nextStep, router]);

  if (nextStep === NextStep.DASHBOARD) {
    return null;
  }

  if (nextStep === NextStep.REQUEST_ACCESS) {
    return <RequestAccess />;
  }

  return (
    <>
      <NoConnectionView classStyles="flex flex-row justify-center items-center absolute inset-x-0 top-0 bg-e0 text-white p-1 z-50" />

      <div className="p-10 bg bg-mint min-h-svh flex items-center justify-center bg-[url('/images/body-bg.jpg')]">
        <div className="grid p-5 lg:grid-cols-2 rounded-[15px] overflow-hidden max-w-[80%] w-[1200px] mx-auto shadow-[0_12px_32px_-4px_rgba(0,0,0,0.40)] bg-grass/90">
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
            {/* <div className="flex justify-center items-center mt-2 sm:mt-4 block lg:hidden inset-x-0">
              <Image
                alt="Logo"
                src={logoSrc}
                width={imageWidth}
                height={imageHeight}
                className={cn(
                  isSmallPhone ? "w-15 h-15" : "w-28 h-28 md:w-40 md:h-40"
                )}
              />
            </div> */}
            <div className="flex justify-center mb-5">
              <Image
                priority
                alt="Logo"
                src={logoWhiteSrc}
                width={150}
                height={150}
              />
            </div>
            <div className={cn("flex justify-center", isSmallPhone && "pt-0")}>
              <div className="w-full max-w-md border-b border-w0 pb-5 mb-4">
                <LoginForm />
              </div>
            </div>
            <div className="hidden md:flex justify-center pb-6">
              <div className="w-full max-w-md">
                <CreateAccountInfo />
              </div>
            </div>
            <div className="mt-auto">
              <BottomContainer withAssistance />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
