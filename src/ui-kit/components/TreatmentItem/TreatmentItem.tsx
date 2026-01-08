import {
  getMainOptions,
  mapOptionsToProps,
  TOption,
} from "@/runnersQcApp/containers/AddRecordContainer/helper";
import { TreatmentTemplateModel } from "@/Types";
import _ from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo } from "react";
import { ItemComponent } from "./ItemComponent";

export type TreatmentItemProps = {
  treatment: TreatmentTemplateModel;
};

export const TreatmentItem: React.FC<TreatmentItemProps> = ({ treatment }) => {
  const t = useTranslations();

  const options = useMemo(() => {
    if (!treatment) {
      return;
    }

    return mapOptionsToProps(
      t,
      treatment as any,
      getMainOptions(t, treatment?.recType || "")
    );
  }, [t, treatment]);

  const renderItem = useCallback((option: TOption) => {
    switch (option.key) {
      case "recType":
        return null;

      default:
        return <ItemComponent key={option.key} option={option} />;
    }
  }, []);

  return (
    <div className="w-full flex flex-col sm:grid md:grid-cols-2 sm:gap-4">
      {_.map(options, renderItem)}
    </div>
  );
};
