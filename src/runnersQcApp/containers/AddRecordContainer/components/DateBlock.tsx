import { getNow } from "@/runnersQcApp/shared/DateUtils";
import { mergeText } from "@/runnersQcApp/shared/TextUtils";
import { THorse, TPerson } from "@/runnersQcApp/shared/types";
import { selectUserData } from "@/services/store/modules/auth/selectors";
import { updateDescription } from "@/services/store/modules/locations";
import { selectLocationDescription } from "@/services/store/modules/locations/selectors";
import { TLocation } from "@/services/store/modules/locations/types";
import { DateField } from "@/ui-kit/blocks/FormFields/DateField";
import { LocationField } from "@/ui-kit/blocks/FormFields/LocationField";
import { TimeField } from "@/ui-kit/blocks/FormFields/TimeField";
import { TreatedByField } from "@/ui-kit/blocks/FormFields/TreatedByField";
import { TreatmentLocation } from "@/ui-kit/components/TreatmentLocation";
import { useDeviceOrientation } from "@/ui-kit/hooks/useDeviceOrientation";
import { cn } from "@/ui-kit/lib/utils";
import { getFormattedId } from "@/utils/formatters";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SearchLocationContainer } from "../../SearchLocationContainer";
import { SearchPersonContainer } from "../../SearchPersonContainer";
import { TFieldName, TFormFields } from "../types";
export type DateBlockProps = {
  activeIndex: number;
  treatedPerson?: TPerson | null;
  handlePersonChange: (item: TPerson) => void;
};

export const DateBlock: React.FC<DateBlockProps> = ({
  activeIndex,
  treatedPerson,
  handlePersonChange,
}) => {
  const t = useTranslations("AddRecord");
  const dispatch = useDispatch();
  const orientation = useDeviceOrientation();

  const [isOpen, serIsOpen] = useState(false);
  const [isPersonsModalOpen, serIsPersonsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    serIsPersonsModalOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    serIsPersonsModalOpen(false);
  }, []);

  const locationDescription = useSelector(selectLocationDescription);
  const userData = useSelector(selectUserData);

  const { control, setValue, getValues, setError } = useFormContext();

  const innerLocation = useWatch({ name: "treatmentLocation", control });
  const horses = useWatch({ name: "horses", control });

  const location = useMemo(() => {
    const horse: THorse | undefined = _.head(horses);
    if (!horse?.locationId) {
      return;
    }
    return {
      locationId: horse.locationId || "",
      locationName: horse.locationName || "",
    };
  }, [horses]);

  const treatedByPerson = useMemo(() => {
    if (treatedPerson) {
      const treatedByPersonFormattedId = getFormattedId(
        treatedPerson.hisaPersonId
      );
      return `${treatedPerson.hisaPersonName} (${treatedByPersonFormattedId})`;
    }

    return undefined;
  }, [treatedPerson]);

  const isShownBanner = useMemo(() => {
    const horse: THorse | undefined = _.head(horses);
    return horse && horse?.locationId && !innerLocation?.locationId
      ? true
      : false;
  }, [horses, innerLocation]);

  const { minimumDate, maximumDate } = useMemo(() => {
    const now = getNow();
    const _minimumDate = now.startOf("day").minus({ year: 1 }).toJSDate();
    const _maximumDate = now.endOf("day").plus({ days: 2 }).toJSDate();
    return {
      minimumDate: _minimumDate,
      maximumDate: _maximumDate,
    };
  }, []);

  const setFormValues = useCallback(
    (data?: Partial<TFormFields>) => {
      if (data) {
        _.forEach(data, (value, key) => {
          setValue(key as TFieldName, value);
        });
      }
    },
    [setValue]
  );

  const handleOnConfirm = useCallback(() => {
    setFormValues({
      treatmentLocation: location as any,
    });
  }, [location, setFormValues]);

  const handleChangeLocation = useCallback(
    (nextLocation?: TLocation) => {
      serIsOpen((prev) => !prev);
      if (nextLocation?.locationId) {
        setFormValues({ treatmentLocation: nextLocation as any });
      }
    },
    [setFormValues]
  );

  const handleChange = useCallback(
    (nextPerson?: TPerson) => {
      serIsPersonsModalOpen((prev) => !prev);
      if (nextPerson?.hisaPersonId) {
        const formattedId = getFormattedId(nextPerson?.hisaPersonId);
        setFormValues({
          treatedByPerson: `${nextPerson.hisaPersonName} (${formattedId})`,
        });
        handlePersonChange(nextPerson);
        handleClose();
      }
    },
    [handleClose, handlePersonChange, setFormValues]
  );

  useEffect(() => {
    if (locationDescription) {
      const prevNotes = getValues("notes");
      setValue("notes", mergeText(prevNotes, locationDescription, "\n"));
      dispatch(updateDescription({ text: "" }));
    }
  }, [dispatch, getValues, locationDescription, setValue]);

  useEffect(() => {
    if (!_.isEmpty(innerLocation)) {
      setError("treatmentLocation", {
        type: "manual",
        message: "",
      });
    }
  }, [activeIndex, innerLocation, setError]);

  useEffect(() => {
    if (treatedPerson) {
      setFormValues({
        treatedByPerson: treatedByPerson,
      });
    }
  }, [setFormValues, treatedByPerson, treatedPerson, userData]);

  return (
    <>
      <div className="flex-grow pb-4 bg-mainBackground">
        <div className="sm:pl-8">
          <div className="md:pt-2 text-lg md:text-xl text-tDefault font-semibold">
            {t("setDateTime")}
          </div>
          <div
            className={cn(
              "flex flex-1 justify-between",
              orientation === "landscape" ? "flex-row" : "sm:flex-col"
            )}
          >
            <DateField
              name="date"
              label={`${t("date")}*`}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
            <div
              className={cn(
                "flex flex-1",
                orientation === "landscape" ? "ml-3" : "ml-3 sm:ml-0"
              )}
            >
              <TimeField name="time" label={t("time")} />
            </div>
          </div>
          <div className="mt-6 text-sm font-semibold text-tDefault mb-2">
            {`${t("treatedBy")}*`}
          </div>
          <TreatedByField
            name="treatedByPerson"
            onPersonChange={handleChange}
          />
          <div className="mt-6 text-sm font-semibold text-tDefault mb-2">
            {`${t("treatmentLocation")}*`}
          </div>
          {isShownBanner && location ? (
            <TreatmentLocation
              location={location}
              label={
                horses.length > 1
                  ? t("wereTheHorsesTreated")
                  : t("wasTheHorsesTreated")
              }
              onConfirm={handleOnConfirm}
              onCancel={handleChangeLocation}
            />
          ) : (
            <LocationField
              name="treatmentLocation"
              onLocationChange={handleChangeLocation}
            />
          )}
        </div>
      </div>
      <SearchLocationContainer
        isOpen={isOpen}
        onChange={handleChangeLocation}
        onClose={handleChangeLocation}
      />
      <SearchPersonContainer
        isOpen={isPersonsModalOpen}
        onChange={handleChange}
        onClose={handleClose}
      />
    </>
  );
};
