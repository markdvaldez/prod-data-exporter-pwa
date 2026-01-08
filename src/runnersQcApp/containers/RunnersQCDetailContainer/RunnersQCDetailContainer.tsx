"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { RouteWithTransition } from "@/ui-kit/components/RouteWithTransition";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui-kit/components/Card";
import { Button } from "@/ui-kit/components/Button";
import { NotFoundPage } from "@/ui-kit/blocks/NotFoundPage";
import { LoaderLottie } from "@/ui-kit/components/LoaderLottie";
import { useRunnersResultById } from "@/services/api/modules/runnersResult";

export const RunnersQCDetailContainer: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const partitionKey = searchParams.get("pk");
  const sortKey = searchParams.get("sk");

  const {
    data: runner,
    isLoading,
    error,
  } = useRunnersResultById({
    id: partitionKey,
    timestamp: sortKey,
  });

   if (isLoading) return <LoaderLottie />;
   
  if (!partitionKey || !sortKey) {
    return <NotFoundPage />;
  }

  if (!runner) {
    return <NotFoundPage />;
  }

  return (
    <RouteWithTransition
      id="route-RunnersQCDetailContainer"
      className="w-full h-screen overflow-hidden bg-mainBackground"
    >
      <ScrollArea className="w-full bg-w0 h-full scroll-thin overflow-y-auto">
        <div className="w-full px-8 sm:px-6 lg:px-8 py-8 bg-cream rounded-lg flex flex-col items-center max-w-[100vw] pb-32">
          <div className="flex w-full flex-col">
            <div className="flex flex-col gap-2 pb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Runner details
              </h1>
              <p className="text-sm text-gray-600">
                {runner?.id} · {runner?.raceDate} · Race{" "}
                {runner?.raceRaceNumber}
              </p>
              <p className="text-sm text-gray-600">
                Current as of: {runner?.currentAsOf} Incremental:{" "}
                {runner?.currentAsOfIncremental}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <Card className="mb-2 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Race information</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-2 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Track</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>
                      {runner?.raceTrackId} ({runner?.raceTrackName})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Country</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceCountry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Race Number</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceRaceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Race Type</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Course</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceCourse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Condition</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceCondition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceDistance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Distance (Furlong)</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceDistanceFurlong}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Purse</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.racePurse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Claiming Price</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceClaimingPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Off Time</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.raceOffTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Post Time</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.racePostTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Race Criteria</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.hisaCriteriaRace}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location Id</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.locationId}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-2 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">
                    Result & Starter Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-2 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Official Position</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterOfficialPosition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Length behind at finish
                    </span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterLengthBehindAtFinish}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Post Position</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterPostPosition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Program Number</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterProgramNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Record Type</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterRecordType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scratched</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterScratched}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shakes</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterShakes}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Odds</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterOdds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Claimed Price USA</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterClaimedPriceUsa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Claiming Indicator</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterClaimIndicator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Claiming Price Waived</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterClaimingPriceWaived}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">DNF</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterDnf}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Earnings</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">HISA Regualted</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHisaRegulated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Void Indicator</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterVoidIndicator}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Void Reason</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterVoidReason}</span>
                  </div>

                  {runner?.raceFootnote && (
                    <div className="pt-2">
                      <span className="text-gray-500 block mb-1">Note</span>
                      <p className="text-gray-900 text-base">
                        {runner.raceFootnote}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="mb-2 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Horse Information</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-2 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Horse</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>
                      {runner?.starterHorseName} ({runner?.starterHorseHisaId})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Breed Type</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseBreedType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Color</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseColor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sex</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseSex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Dam</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseDamName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sire</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseSireName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Foaled</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseFoaled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Micro Chips</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseMicrochips}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tattoo</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseTattoo}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Reference Number</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseReferenceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Registry</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>{runner?.starterHorseRegistry}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-2 bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">Connections</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6 space-y-2 text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jockey</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>
                      {runner?.starterJockeyFirstName}{" "}
                      {runner?.starterJockeyLastName} (
                      {runner?.starterJockeyHisaId})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Jockey Ref /Type</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>
                      {runner?.starterJockeyReferenceNumber} /{" "}
                      {runner?.starterJockeyType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Trainer</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>
                      {runner?.starterTrainerFirstName}{" "}
                      {runner?.starterTrainerLastName} (
                      {runner?.starterTrainerHisaId})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Trainer Ref /Type</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>
                      {runner?.starterTrainerReferenceNumber} /{" "}
                      {runner?.starterTrainerType}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Owner</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>
                      {runner?.starterOwnerFirstName}{" "}
                      {runner?.starterOwnerLastName} (
                      {runner?.starterOwnerHisaId})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Owner Ref /Type</span>
                    <div className="flex-grow mx-2 relative">
                      <div className="absolute inset-0 top-1/2 border-t border-dashed border-gray-300"></div>
                    </div>
                    <span>
                      {runner?.starterOwnerReferenceNumber} /{" "}
                      {runner?.starterOwnerType}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full mb-8 mt-3">
              <div className="relative">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.back();
                  }}
                >
                  <div className="px-3 py-3 text-center text-sm font-medium text-w0 hover:text-gray-700 bg-grass hover:bg-gray-200 border border-grass hover:border-gray-300 rounded-[5px] transition-colors max-w-[250px] cursor-pointer">
                    Back to Runners QC
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </RouteWithTransition>
  );
};
