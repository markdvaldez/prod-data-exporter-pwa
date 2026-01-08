import { AddTreatmentLocationWidget } from "@/ui-kit/components/AddTreatmentLocationWidget";
import { ConfirmTreatmentLocation } from "@/ui-kit/components/ConfirmTreatmentLocation";
import { Loader } from "@/ui-kit/components/Loader";
import { getFormattedLocationWithQuotes } from "@/utils/locationId";
import { getListItemLocationAddress } from "./helpers";

export const ConfirmContent = ({
  foundLocation,
  isPending,
  onConfirm,
  onClose,
  handleChangeType,
  t,
}: any) => {
  if (isPending) {
    return (
      <div className="flex justify-center w-full p-8">
        <Loader />
      </div>
    );
  }
  if (foundLocation) {
    return (
      <div className="pt-6">
        <ConfirmTreatmentLocation
          title={`${t("locationFound")}: ${getFormattedLocationWithQuotes({
            name: foundLocation?.name,
            hisaId: foundLocation?.locationId,
          })}`}
          description={`${t("locationAddress")}: ${getListItemLocationAddress(
            foundLocation?.address
          )}`}
          onConfirm={onConfirm}
          onCancel={onClose}
        />
      </div>
    );
  }
  return (
    <div className="pt-3">
      <AddTreatmentLocationWidget
        title={t("weCouldNotFound")}
        onConfirm={handleChangeType}
        onCancel={onClose}
      />
    </div>
  );
};
