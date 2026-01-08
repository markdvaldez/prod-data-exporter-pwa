import { usePostLocation } from "@/services/api/modules/locations/addLocationMutation";
import { setTreatmentLocation } from "@/services/store/modules/locations";
import { LocationResponse, LocationType } from "@/Types/global-types";
import { Button } from "@/ui-kit/components/Button";
import { toast } from "@/ui-kit/hooks/useToast";
import { extractError } from "@/utils/errors";
import { useTranslations } from "next-intl";
import React, { memo, useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  CountryType,
  getListItemLocationAddress,
  getShortZipCode,
} from "../../SearchLocationAddressContainer/helpers";
import { TFormFields, TVariables } from "../CreateLocationContainer";
import { getStateCodeByName } from "../helpers";
import { ConfirmViewItem } from "./ConfirmViewItem";

export type ConfirmCreateLocationViewProps = {
  formData: Partial<TFormFields> | null;
  locationType: LocationType;
  handleSetInnerLocation: (location: LocationResponse) => void;
  handleBackClick: () => void;
};

export const ConfirmCreateLocationView: React.FC<ConfirmCreateLocationViewProps> =
  memo(
    ({ formData, locationType, handleSetInnerLocation, handleBackClick }) => {
      const t = useTranslations("Location");
      const dispatch = useDispatch();

      const { mutateAsync, isPending } = usePostLocation();

      const addLocationRequest = useCallback(
        async (newLocation: TVariables) => {
          try {
            const response = await mutateAsync(newLocation);
            toast({
              title: t("success"),
              variant: "default",
            });
            return response;
          } catch (error: any) {
            toast({
              title: extractError(error?.data || error).message,
              variant: "destructive",
            });
          }
        },
        [mutateAsync, t]
      );

      const locationAddress = useMemo(() => {
        return getListItemLocationAddress(formData);
      }, [formData]);

      const handleConfirm = useCallback(async () => {
        const zipCode =
          formData?.country === CountryType.USA
            ? getShortZipCode(formData?.zipPostalCode)
            : formData?.zipPostalCode;

        const variables = {
          address: {
            city: formData?.city || "",
            country: formData?.country || "",
            state: getStateCodeByName(formData?.state),
            street: formData?.street || "",
            unitAptBoxNumber: formData?.unitAptBoxNumber || "",
            zipPostalCode: zipCode || "",
          },
          name: formData?.locationName || "",
          trackCode: formData?.equibaseCode ? [formData?.equibaseCode] : [],
          type: locationType,
        };

        const result = await addLocationRequest(variables);
        if (result) {
          const location = {
            locationId: result.locationId || "",
            locationName: result.name || "",
          };
          handleSetInnerLocation(result);
          dispatch(setTreatmentLocation({ location }));
        }
      }, [
        addLocationRequest,
        dispatch,
        formData?.city,
        formData?.country,
        formData?.equibaseCode,
        formData?.locationName,
        formData?.state,
        formData?.street,
        formData?.unitAptBoxNumber,
        formData?.zipPostalCode,
        handleSetInnerLocation,
        locationType,
      ]);

      return (
        <>
          <div className="flex flex-1 flex-col bg-w0 p-4">
            <div className="text-xl text-tDefault">{t("locationDetails")}</div>
            <div className="pt-4">
              <ConfirmViewItem
                name={t("locationName")}
                value={formData?.locationName}
              />
            </div>
            {formData?.equibaseCode ? (
              <ConfirmViewItem
                name={t("equibaseCode")}
                value={formData.equibaseCode}
              />
            ) : null}
            <ConfirmViewItem name={t("address")} value={locationAddress} />
            {formData?.unitAptBoxNumber ? (
              <ConfirmViewItem
                name={t("unitOrPoBox")}
                value={formData.unitAptBoxNumber}
              />
            ) : null}
          </div>
          <div className="flex justify-end">
            <Button
              className="bg-transparent border-1 border-a0"
              variant="outline"
              title={t("back")}
              onClick={handleBackClick}
            />
            <Button
              className="flex rounded-xl ml-4 px-8 w-32"
              title={t("confirm")}
              onClick={handleConfirm}
            />
          </div>
        </>
      );
    }
  );

ConfirmCreateLocationView.displayName = "ConfirmCreateLocationView";
