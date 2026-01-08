export interface HistoryState {
dateFrom: string;
dateTo: string;
recTypes: string[];
keepFilters: boolean;
}

export interface SetFiltersPayload {
dateFrom: string;
dateTo: string;
recTypes: string[];
}