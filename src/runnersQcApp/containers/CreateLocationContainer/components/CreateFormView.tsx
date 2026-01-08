import { Address, LocationType } from "@/Types";
import { CountryField } from "@/ui-kit/blocks/FormFields/CountryField";
import { StateField } from "@/ui-kit/blocks/FormFields/StateFieldNext";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useTranslations } from "next-intl";
import React, { forwardRef, memo, useImperativeHandle, useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { getFormCreateLocationFields, getStateByCode } from "../helpers";
import { CreateLocationField } from "./CreateLocationField";

export type CreateFormViewProps = {
  locationType: LocationType;
  selectedLocationAddress: Address | undefined;
  onSubmit: (data: any) => void;
};

type TFormFields = {
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

export const CreateFormView: React.FC<CreateFormViewProps> = memo(
  forwardRef(({ locationType, selectedLocationAddress, onSubmit }, ref) => {
    const t = useTranslations("Location");

    const formOptions = useMemo(() => {
      return getFormCreateLocationFields(locationType);
    }, [locationType]);

    const state = useMemo(() => {
      return getStateByCode(selectedLocationAddress?.state);
    }, [selectedLocationAddress?.state]);

    const methods = useForm<TFormFields>({
      resolver: standardSchemaResolver(formOptions?.schema),
      defaultValues: {
        locationName: "",
        equibaseCode: "",
        street: selectedLocationAddress?.street || "",
        city: selectedLocationAddress?.city || "",
        state: state,
        zipPostalCode: selectedLocationAddress?.zipPostalCode || "",
        country: selectedLocationAddress?.country || "USA",
        unitAptBoxNumber: selectedLocationAddress?.unitAptBoxNumber || "",
      },
      mode: "onSubmit",
      reValidateMode: "onSubmit",
    });
    const { handleSubmit, reset, control, watch } = methods;

    const country = useWatch({ name: "country", control });

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        handleSubmit(onSubmit)();
      },
      resetForm: () => reset(),
    }));

    return (
      <FormProvider {...methods}>
        <div className="flex flex-1 flex-col w-full px-4">
          <div className="pb-2">
            <CreateLocationField
              key="locationName"
              fieldKey="locationName"
              name="locationName"
              placeholder={t("locationNameLabel")}
              label={`${t("locationNameLabel")}*`}
            />
          </div>
          {locationType === LocationType.Racetrack ? (
            <div className="pb-2">
              <CreateLocationField
                key="equibaseCode"
                fieldKey="equibaseCode"
                name="equibaseCode"
                placeholder={t("equibaseCode")}
                label={`${t("equibaseCode")}*`}
              />
            </div>
          ) : null}

          <div className="pb-2">
            <CountryField label={`${t("country")}*`} />
          </div>
          <div className="pb-2">
            <CreateLocationField
              key="street"
              fieldKey="street"
              name="street"
              placeholder={t("streetName")}
              label={`${t("street")}*`}
            />
          </div>
          {locationType !== LocationType.Racetrack ? (
            <div className="pb-2">
              <CreateLocationField
                key="unitAptBoxNumber"
                fieldKey="unitAptBoxNumber"
                name="unitAptBoxNumber"
                placeholder={t("unitOrPoBox")}
                label={t("unitOrPoBox")}
              />
            </div>
          ) : null}
          <div className="pb-2">
            <CreateLocationField
              key="city"
              fieldKey="city"
              name="city"
              placeholder={t("city")}
              label={`${t("city")}*`}
            />
          </div>
          {country === "USA" || !country ? (
            <div className="pb-2">
              <StateField label={`${t("state")}*`} defaultValue={state} />
            </div>
          ) : (
            <div className="pb-2">
              <CreateLocationField
                key="state"
                fieldKey="state"
                name="state"
                placeholder={t("stateOrProvince")}
                label={`${t("stateOrProvince")}*`}
              />
            </div>
          )}
          <div className="pb-2">
            <CreateLocationField
              key="zipPostalCode"
              fieldKey="zipPostalCode"
              name="zipPostalCode"
              placeholder={t("zipCode")}
              label={`${t("zipCode")}*`}
            />
          </div>
        </div>
      </FormProvider>
    );
  })
);
