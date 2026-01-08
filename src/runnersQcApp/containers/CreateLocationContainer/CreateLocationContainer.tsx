import { Address, LocationResponse, LocationType } from "@/Types";
import _ from "lodash";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";

import { usePostLocation } from "@/services/api/modules/locations/addLocationMutation";
import { setTreatmentLocation } from "@/services/store/modules/locations";
import { TLocation } from "@/services/store/modules/locations/types";
import { Button } from "@/ui-kit/components/Button";
import { toast } from "@/ui-kit/hooks/useToast";
import { extractError } from "@/utils/errors";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  CountryType,
  getListItemLocationAddress,
} from "../SearchLocationAddressContainer/helpers";
import { SearchType } from "../SearchLocationContainer/SearchLocationContainer";
import { CreateFormView } from "./components";
import {
  getFormCreateLocationFields,
  getLocationNameForSuccess,
  getShortZipCode,
  getStateCodeByName,
} from "./helpers";

export type CreateLocationContainerProps = {
  locationType: LocationType;
  selectedLocationAddress: any;
  handleChangeType: (type: SearchType) => void;
  onClose: () => void;
  onChange: (nextLocation?: TLocation) => void;
};

export type FormHandlers = {
  submitForm: () => void;
  resetForm: () => void;
};

export type TFormFields = {
  locationName: string;
  equibaseCode?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  zipPostalCode?: string | null;
  country?: string | null;
  unitAptBoxNumber?: string | null;
  notes?: string | null;
};

export type TVariables = {
  address: Address;
  name: string;
  trackCode: string[];
  type: LocationType;
};

export const CreateLocationContainer: React.FC<CreateLocationContainerProps> =
  memo(
    ({
      locationType,
      selectedLocationAddress,
      handleChangeType,
      onClose,
      onChange,
    }) => {
      const formRef = useRef<FormHandlers>(null);

      const t = useTranslations("Location");
      const dispatch = useDispatch();

      const { getValues } = useFormContext();

      const name = getValues("locationName");

      const [activeIndex, setActiveIndex] = useState(0);
      const [formData, setFormData] = useState<Partial<TFormFields> | null>();
      const [innerTreatmentLocation, setInnerTreatmentLocation] =
        useState<LocationResponse | null>(null);

      const { mutateAsync, isPending } = usePostLocation();

      const formOptions = useMemo(() => {
        return getFormCreateLocationFields(locationType);
      }, [locationType]);

      const descriptionFirst = useMemo(() => {
        return getLocationNameForSuccess(
          innerTreatmentLocation?.name,
          innerTreatmentLocation?.locationId,
          t
        );
      }, [innerTreatmentLocation?.locationId, innerTreatmentLocation?.name, t]);

      const descriptionSecond = useMemo(() => {
        return `${t("address")}: ${getListItemLocationAddress(
          innerTreatmentLocation?.address
        )}`;
      }, [innerTreatmentLocation?.address, t]);

      const handleBackClick = useCallback(() => {
        if (activeIndex === 1) {
          setActiveIndex(0);
        } else {
          handleChangeType("choose");
        }
      }, [activeIndex, handleChangeType]);

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

      const onSubmit = useCallback(
        async (data: Partial<TFormFields>) => {
          try {
            const optionNames = _.map(
              formOptions.fields,
              (field) => field.name
            );
            const formValues = _.pick(data, optionNames) || {};
            setFormData(formValues);
            setActiveIndex(activeIndex + 1);

            const zipCode =
              data?.country === CountryType.USA
                ? getShortZipCode(data?.zipPostalCode)
                : data?.zipPostalCode;

            const variables = {
              address: {
                city: data?.city || "",
                country: data?.country || "",
                state: getStateCodeByName(data?.state),
                street: data?.street || "",
                unitAptBoxNumber: data?.unitAptBoxNumber || "",
                zipPostalCode: zipCode || "",
              },
              name: data?.locationName || "",
              trackCode: data?.equibaseCode ? [data?.equibaseCode] : [],
              type: locationType,
            };

            const result = await addLocationRequest(variables);
            if (result) {
              const location = {
                locationId: result.locationId || "",
                locationName: result.name || "",
              };
              onChange?.(location);
              setInnerTreatmentLocation(result);
              dispatch(setTreatmentLocation({ location }));
              setActiveIndex(activeIndex + 1);
            }
          } catch (e) {}
        },
        [
          activeIndex,
          addLocationRequest,
          dispatch,
          formOptions.fields,
          locationType,
          onChange,
        ]
      );

      const handleNextClick = useCallback(() => {
        if (activeIndex === 0) {
          formRef.current?.submitForm();
        } else if (activeIndex === 1) {
          setActiveIndex(activeIndex + 1);
        } else if (formData && activeIndex > 1) {
          onSubmit(formData);
        }
      }, [activeIndex, formData, onSubmit]);

      return (
        <>
          <ScrollArea className="flex-1 flex-col items-center overflow-y-auto">
            <CreateFormView
              {...{
                ref: formRef,
                locationType,
                onSubmit,
                selectedLocationAddress,
              }}
            />
          </ScrollArea>
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
              fetching={isPending}
              onClick={handleNextClick}
            />
          </div>
        </>
      );
    }
  );

CreateLocationContainer.displayName = "CreateLocationContainer";
