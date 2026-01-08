import { InformationBlock } from "@/ui-kit/blocks/InformationBlock";
import { SearchLocationListItem } from "@/ui-kit/components/SearchLocationListItem";
import { isEmpty, map } from "lodash";

export const SearchResults = ({
  searchText,
  isFetching,
  filteredLocations,
  handleItemPress,
  t,
}: any) => {
  if (!searchText) {
    return (
      <InformationBlock
        icon="search"
        iconSize="h-24 w-24"
        text={t("startSearch")}
        iconRoundBg="bg-c3"
      />
    );
  }
  if (!isFetching && searchText.length >= 2 && isEmpty(filteredLocations)) {
    return (
      <InformationBlock
        icon="search"
        iconSize="h-24 w-24"
        text={t("notFound")}
        iconRoundBg="bg-c3"
      />
    );
  }
  return map(filteredLocations, (address, index: number) => {
    return (
      <SearchLocationListItem
        key={`SearchLocationListItem-${address.addressId}`}
        label={address.address}
        itemStyles="bg-w0"
        value={address}
        isAddress={true}
        searchText={searchText}
        bordered={index !== filteredLocations.length - 1}
        onClick={handleItemPress}
      />
    );
  });
};
