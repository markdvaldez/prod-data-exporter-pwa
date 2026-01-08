import { SearchInput } from "@/ui-kit/components/SearchInput";
import { useTranslations } from "next-intl";
import { FiltersSheet } from "./FiltersSheet";

type RecordFiltersProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filterCount: number;
  openSheet: boolean;
  setOpenSheet: (value: boolean) => void;
};

export const RecordFilters: React.FC<RecordFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filterCount,
  openSheet,
  setOpenSheet,
}) => {
  const t = useTranslations("HorseReport");

  return (
    <div className="flex mb-4 justify-between w-full xl:w-2/3 items-end">
      <div className="flex flex-col flex-1">
        <span className="text-tDefault text-lg xl:text-base font-semibold pt-4 pb-1">
          {t("recentRecords")}
        </span>

        <div className="mt-2">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("search")}
          />
        </div>
      </div>
      <div
        className="flex px-3 py-2 items-center bg-white border border-[#191C1F]/10 rounded-sm cursor-pointer ml-2 h-12 sm:h-10"
        onClick={() => setOpenSheet(!openSheet)}
      >
        <span className="text-tDefault text-base font-normal">
          {t("filters")} {filterCount > 0 ? `• ${filterCount}` : ""}
        </span>
      </div>
      <FiltersSheet open={openSheet} onClose={() => setOpenSheet(false)} />
    </div>
  );
};
