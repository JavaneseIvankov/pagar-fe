export const queryKeys = {
  reports: {
    list: () => ["reports", "list"] as const,
    detail: (id: string) => ["reports", "detail", id] as const,
  },
  publicReviews: {
    list: () => ["public-reviews", "list"] as const,
  },
  sppgDashboard: {
    detail: () => ["sppg-dashboard"] as const,
  },
  adminDashboard: {
    detail: () => ["admin-dashboard"] as const,
  },
  periodicReports: {
    list: () => ["periodic-reports", "list"] as const,
  },
  profile: {
    current: () => ["profile", "current"] as const,
    sppg: () => ["profile", "sppg"] as const,
    admin: () => ["profile", "admin"] as const,
  },
};
