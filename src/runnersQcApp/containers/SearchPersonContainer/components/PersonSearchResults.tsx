import { TPerson } from "@/Types";
import { InformationBlock } from "@/ui-kit/blocks/InformationBlock";
import { Loader } from "@/ui-kit/components/Loader";
import { map } from "lodash";
import { useTranslations } from "next-intl";
import React, { JSX } from "react";

type Props = {
  isFetching: boolean;
  data: TPerson[];
  searchText: string;
  renderItem: (loc: TPerson, idx: number, length: number) => JSX.Element;
};

export const PersonSearchResults: React.FC<Props> = ({
  isFetching,
  data,
  searchText,
  renderItem,
}) => {
  const t = useTranslations();

  const hasSearchText = !!searchText && searchText.length >= 1;
  const hasFiltered = !!data.length;

  if (isFetching && hasSearchText && !hasFiltered) {
    return (
      <div className="flex justify-center w-full p-8">
        <Loader />
      </div>
    );
  }

  if (!isFetching && hasSearchText && !hasFiltered) {
    return (
      <InformationBlock
        icon="search"
        iconSize="h-24 w-24"
        text={t("AddRecord.noResultsFound")}
        iconRoundBg="bg-c3"
      />
    );
  }

  return <>{map(data, renderItem)}</>;
};
