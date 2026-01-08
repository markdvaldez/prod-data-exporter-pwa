const routes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  LOGIN: "/login",
  // MFA: "/mfa",
  ADD_RECORD: (id?: string) =>
    id ? `/dashboard/add-record/?horseId=${id}` : "/dashboard/add-record",
  ADD_PROTOCOL: "/dashboard/add-protocol",
  LOCATIONS: "/dashboard/locations",
  EDIT_RECORD: (id: string) => `/dashboard/edit-record/?id=${id}`,
  EDIT_PROTOCOL: (id: string) => `/dashboard/edit-protocol/?id=${id}`,
  HORSES: "/dashboard/horses",
  HORSE: (id: string) => `/dashboard/horse/?horseId=${id}`,
  PROTOCOLS: "/dashboard/protocols",
  // PROTOCOL: (id: string) => `/dashboard/protocol/?id=${id}`,
  RECENT_RECORDS: "/dashboard/records",
  RECORD_DETAIL: (id: string) => `/dashboard/record/?id=${id}`,
  SEARCH: "/dashboard/search",
  SETTINGS: "/dashboard/settings",
  REQUEST_ACCESS: "/request-access",
  APPLY_PROTOCOL: (id: string) => `/dashboard/apply-protocol/?id=${id}`,
  TRANSACTION_LOGS: "/dashboard/transaction-logs",
  TRANSACTION_LOG_DETAIL: (entityId: string, timestamp: string) => 
    `/dashboard/transaction-logs/detail?entityId=${encodeURIComponent(entityId)}&timestamp=${encodeURIComponent(timestamp)}`,
  RUNNERS_QC: "/dashboard/runners-qc",
  RUNNERS_QC_DETAIL: (pk: string, sk: string) =>
  `/dashboard/runners-qc/detail?pk=${encodeURIComponent(
    pk
  )}&sk=${encodeURIComponent(sk)}`,
};

export default routes;
export type RouteNames = typeof routes;
