import { clearSearchText } from "@/runnersQcApp/shared/TextUtils";

import { selectIsFetching } from "@/services/store/modules/locations/selectors";
import { searchPersonsAction } from "@/services/store/modules/persons";
import { selectPersonsList } from "@/services/store/modules/persons/selectors";
import { TPerson } from "@/Types";
import { SearchPersonListItem } from "@/ui-kit/components/SearchPersonListItem";
import { getFormattedId } from "@/utils/formatters";
import { debounce } from "lodash";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecords, searchWordFilterFn } from "./helpers";
import { SearchPersonProps } from "./SearchPersonContainer";

const MIN_LENGTH = 1;

export const useSearchPersonLogic = (props: SearchPersonProps) => {
  const { onClose, onChange } = props;

  const t = useTranslations();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");

  const isFetching = useSelector(selectIsFetching);
  const persons = useSelector(selectPersonsList);

  const handleApiCallRef = useRef(
    debounce((searchText: string, dispatch) => {
      if (searchText.length >= MIN_LENGTH) {
        dispatch(searchPersonsAction({ searchText }));
      }
    }, 600)
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e?.preventDefault?.();

      const nextValue = e?.target?.value || "";

      setSearchText(nextValue);
      handleApiCallRef.current(clearSearchText(nextValue), dispatch);
    },
    [dispatch]
  );

  const handleClose = useCallback(() => {
    setSearchText("");
    onClose?.();
  }, [onClose]);

  const handleBack = useCallback(() => {
    setSearchText("");
  }, []);

  const handleItemPress = useCallback(
    (nextPerson: TPerson) => {
      onChange?.(nextPerson);
    },
    [onChange]
  );

  const filteredData = useMemo(() => {
    if (!searchText) return [];

    const filtersToApply = [searchWordFilterFn];
    return filterRecords(persons, filtersToApply, {
      searchWord: searchText,
    });
  }, [persons, searchText]);

  const renderItem = useCallback(
    (person: TPerson, index: number, arrayLength: number) => {
      const { hisaPersonName, hisaPersonId } = person;
      const hisaId = getFormattedId(hisaPersonId);

      return (
        <SearchPersonListItem
          key={`SearchPersonListItem-${hisaPersonId}`}
          title={hisaPersonName}
          description={hisaId}
          itemStyles="my-2"
          value={person}
          onClick={handleItemPress}
        />
      );
    },
    [handleItemPress]
  );

  return {
    t,
    searchText,
    setSearchText,
    persons: filteredData,
    renderItem,
    handleBack,
    handleSearch,
    handleClose,
    isFetching,
  };
};
