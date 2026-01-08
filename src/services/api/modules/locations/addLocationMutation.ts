import { LocationResponse } from "@/Types";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api";

const postLocation = async (variables: LocationResponse) => {
  const response = await apiClient.post<LocationResponse>(
    "/location",
    variables
  );
  return response.data;
};

export const usePostLocation = () => {
  return useMutation({ mutationFn: postLocation });
};
