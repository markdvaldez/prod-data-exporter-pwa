import { TPerson } from "@/Types";
import { Dialog, DialogTitle } from "@/ui-kit/components/Dialog";
import { LocationDialogContent } from "@/ui-kit/components/LocationDialogContent";
import { ScrollArea } from "@/ui-kit/components/ScrollArea";
import { AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import React from "react";
import { PersonSearchHeader } from "./components/PersonSearchHeader";
import { PersonSearchResults } from "./components/PersonSearchResults";
import { useSearchPersonLogic } from "./useSearchPersonLogic";

export type SearchPersonProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onChange: (nextPerson?: TPerson) => void;
};

export const SearchPersonContainer: React.FC<SearchPersonProps> = (props) => {
  const t = useTranslations();
  const { isOpen } = props;
  const {
    searchText,
    isFetching,
    persons,
    handleSearch,
    handleBack,
    handleClose,
    renderItem,
  } = useSearchPersonLogic(props);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <AnimatePresence mode="wait">
        <LocationDialogContent className="gap-0 p-0 w-full h-full max-h-screen sm:h-[90vh] sm:max-h-[90vh] md:max-w-xl rounded-none sm:rounded-2xl flex flex-col overflow-x-hidden">
          <DialogTitle className="pt-6 px-6 pb-0 text-2xl text-t-default flex justify-start">
            {t("AddRecord.selectPerson")}
          </DialogTitle>
          <div className="flex flex-col w-full px-4 bg-main-background ">
            <PersonSearchHeader
              searchText={searchText}
              onSearch={handleSearch}
            />
          </div>
          <ScrollArea
            className="pb-4 px-4 flex-1 flex-col items-center no-scrollbar"
            scrollWidth="w-0"
          >
            <PersonSearchResults
              isFetching={isFetching}
              data={persons}
              searchText={searchText}
              renderItem={renderItem}
            />
          </ScrollArea>
        </LocationDialogContent>
      </AnimatePresence>
    </Dialog>
  );
};
