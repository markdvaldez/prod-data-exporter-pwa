import { getFormattedTitle } from "@/runnersQcApp/shared/TextUtils";
import { TLocationAddress } from "@/services/store/modules/locations/types";
import { Address, LocationSearchResponse } from "@/Types";
import _ from "lodash";

export enum CountryType {
  USA = "USA",
  Canada = "Canada",
  Mexico = "Mexico",
  UK = "UK",
  France = "France",
  Germany = "Germany",
  Ireland = "Ireland",
  Australia = "Australia",
}

export const getShortZipCode = (zipCode: string | null | undefined) => {
  if (!zipCode) {
    return;
  }
  return _.split(zipCode, "", 5).join("");
};

export const getListItemLocationAddress = (
  address: Address | null | undefined
) => {
  const addressParts = _.compact([
    address?.street,
    address?.city,
    address?.state,
    address?.zipPostalCode,
    address?.country,
  ]);

  return `${addressParts.join(", ")}`;
};

export const mapLocationAddressesToProps = (
  data: Address[] | []
): TLocationAddress[] | [] =>
  _.map(data, (item, index) => {
    const zipPostalCode =
      item?.country === CountryType.USA
        ? getShortZipCode(item?.zipPostalCode)
        : item?.zipPostalCode;
    const newItem = { ...item, zipPostalCode };

    return {
      addressId: `${item.zipPostalCode}-${index}` || "",
      address: getListItemLocationAddress(newItem as Address) || "",
      item: newItem as Address,
    };
  });

export const filterLocationByAddress = (
  locations: LocationSearchResponse[],
  address?: TLocationAddress
) => {
  const newAddressZipCode = (address?.item?.zipPostalCode || "").slice(0, 5);
  const newLocationressZipCode = (address?.item?.zipPostalCode || "").slice(
    0,
    5
  );
  return _.find(locations, (location) => {
    return (
      location.address?.city === address?.item?.city &&
      location.address?.country === address?.item?.country &&
      location.address?.state === address?.item?.state &&
      newLocationressZipCode === newAddressZipCode &&
      _.includes(location.address?.street, address?.item?.street)
    );
  });
};

export const getLocationViewTitle = (
  location: LocationSearchResponse | undefined
) => {
  return getFormattedTitle({
    name: location?.name,
    hisaId: location?.locationId,
  });
};
