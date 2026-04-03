export const queryKeys = {
  reports: {
    list: (params: { limit: number; page: number; search?: string }) =>
      [
        "reports",
        "list",
        params.page,
        params.limit,
        params.search ?? "",
      ] as const,
    infinite: (params: { limit: number; search?: string }) =>
      ["reports", "infinite", params.limit, params.search ?? ""] as const,
    detail: (id: string) => ["reports", "detail", id] as const,
  },
  publicReviews: {
    list: (params: { limit: number; page: number; search?: string }) =>
      [
        "public-reviews",
        "list",
        params.page,
        params.limit,
        params.search ?? "",
      ] as const,
    infinite: (params: { limit: number; search?: string }) =>
      [
        "public-reviews",
        "infinite",
        params.limit,
        params.search ?? "",
      ] as const,
  },
  sppgReviews: {
    list: (params: { limit: number; page: number }) =>
      ["sppg-reviews", "list", params.page, params.limit] as const,
    infinite: (params: { limit: number }) =>
      ["sppg-reviews", "infinite", params.limit] as const,
  },
  reviewSubmission: {
    context: () => ["review-submission", "context"] as const,
  },
  sppgDashboard: {
    detail: () => ["sppg-dashboard"] as const,
  },
  adminDashboard: {
    detail: () => ["admin-dashboard"] as const,
  },
  adminAccounts: {
    active: () => ["admin-accounts", "active"] as const,
    pending: () => ["admin-accounts", "pending"] as const,
  },
  periodicReports: {
    all: () => ["periodic-reports"] as const,
    list: (params: { endDate: string; startDate: string }) =>
      ["periodic-reports", "list", params.startDate, params.endDate] as const,
  },
  profile: {
    current: () => ["profile", "current"] as const,
    sppg: () => ["profile", "sppg"] as const,
    admin: () => ["profile", "admin"] as const,
  },
};
