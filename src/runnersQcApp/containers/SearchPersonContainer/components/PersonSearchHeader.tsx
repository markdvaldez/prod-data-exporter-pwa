import { SearchInputSecondary } from "@/ui-kit/components/SearchInput/SearchInputSecondary";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  searchText: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const PersonSearchHeader: React.FC<Props> = ({
  searchText,
  onSearch,
}) => {
  const t = useTranslations();

  return (
    <div className="flex-col pb-2 pt-4 bg-main-background">
      <div className="flex items-center justify-between w-full relative">
        <SearchInputSecondary
          value={searchText}
          onChange={onSearch}
          placeholder={t("AddRecord.typeToSearch")}
        />
      </div>
    </div>
  );
};
