import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const queryClient = new QueryClient();

export const getQueryClient = cache(() => queryClient);
