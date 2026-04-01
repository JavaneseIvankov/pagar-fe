export const queryKeys = {
  reports: {
    list: () => ["reports", "list"] as const,
    detail: (id: string) => ["reports", "detail", id] as const,
  },
  publicReviews: {
    list: () => ["public-reviews", "list"] as const,
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
