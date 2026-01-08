import { AssortedAutocompleteDto } from "@/Types/global-types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../api";

type TGetFieldAutocompleteVariables = {
  field: string;
  text: string;
};

const getFieldAutocomplete = async ({
  field,
  text,
}: TGetFieldAutocompleteVariables) => {
  const value = encodeURIComponent(text);
  const response = await apiClient.get<AssortedAutocompleteDto[]>(
    `/horsemedical/autocomplete/${field}/${value}`
  );
  return response.data;
};

export const useGetFieldAutocomplete = ({
  field,
  text,
  enabled,
}: {
  field: string;
  text: string;
  enabled?: boolean;
}) =>
  useQuery<AssortedAutocompleteDto[], Error>({
    queryKey: ["getFieldAutocomplete", field, text],
    queryFn: () =>
      getFieldAutocomplete({ field: field || "", text: text || "" }),
    enabled,
    refetchOnReconnect: true,
  });
