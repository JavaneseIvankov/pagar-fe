export type TRole = "ADMIN" | "PUBLIC" | "SCHOOL" | "SPPG";
export type TAccountStatus = "PENDING" | "APPROVED" | "REJECTED";

export type TUser = {
  id: string;
  role: TRole;
  username: string;
};

export type TAuthSession = {
  token: string;
  user: TUser;
};

export type TAuthRegistrationResult = {
  message: string;
  user: TUser;
};

export type TAdmin = TUser & {
  role: "ADMIN";
};

export type TPublic = TUser & {
  role: "PUBLIC";
};

export type TSppg = TUser & {
  role: "SPPG";
  sppgId: string;
  sppgName: string;
  address: string;
};

export type TSchool = TUser & {
  role: "SCHOOL";
  schoolId: string;
  schoolName: string;
  address: string;
};

export type TPublicProfile = TPublic & {
  displayName: string;
  email: string;
};

export type TSchoolProfile = TSchool & {
  displayName: string;
  email: string;
};

export type TSppgProfile = TSppg & {
  description: string;
  email: string;
  location: string;
  registrationCode: string;
  accountStatus: TAccountStatus;
};

export type TAdminAccessDetail = {
  id: string;
  label: string;
};

export type TManagedAccountRole = "SCHOOL" | "SPPG";

export type TAdminAccountRoleFilter = "ALL" | TManagedAccountRole;

export type TAdminAccountDecision = "APPROVED" | "REJECTED";

export type TAdminCreateManagedAccountInput =
  | {
      email: string;
      password: string;
      registrationCode?: string;
      role: "SCHOOL";
      schoolAddress: string;
      schoolName: string;
      username: string;
    }
  | {
      bgnCode?: string;
      email: string;
      password: string;
      role: "SPPG";
      sppgAddress: string;
      sppgName: string;
      username: string;
    };

export type TAdminManagedAccount = {
  id: string;
  username: string;
  role: TManagedAccountRole;
  createdAt: Date;
};

export type TAdminActiveAccount = TAdminManagedAccount;

export type TAdminPendingAccount = TAdminManagedAccount & {
  bgnCode: string | null;
  registrationCode: string | null;
};

export type TAdminAccountStatusUpdateResult = {
  accountStatus: TAdminAccountDecision;
  id: string;
};

export type TAdminProfile = TAdmin & {
  accessDetails: TAdminAccessDetail[];
  email: string;
  name: string;
};

export type TCurrentProfile = TPublicProfile | TSchoolProfile;

export type TPaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
};

export type TPaginatedResult<TItem> = {
  items: TItem[];
  meta: TPaginationMeta;
};

export type TNutritionalFacts = {
  calories: {
    inKcal: number;
    inDciPercent: number;
  };
  proteinGrams: {
    inGrams: number;
    inDciPercent: number;
  };
  carbGrams: {
    inGrams: number;
    inDciPercent: number;
  };
  fatGrams: {
    inGrams: number;
    inDciPercent: number;
  };
};

export type TSppgReportStatus = "SUBMITTED";

export type TSppgReport = {
  id: string;
  title: string;
  author: TSppg;
  mealTime: string;
  imageUrl: string;
  postedAt: Date;
  nutritionalFacts: TNutritionalFacts;
  content: string;
  status: TSppgReportStatus;
};

export type TSppgReportSummary = {
  id: string;
  title: string;
  postedAt: Date;
  status: TSppgReportStatus;
};

export type TPublicReview = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: Date;
  ratingScore: number;
  reporterName: string;
  forSppg: Omit<TSppg, "address" | "role">;
  content: string;
};

export type TSppgReview = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: Date;
  ratingScore: number;
  reporterName: string;
  content: string;
};

export type TReviewSppgTarget = {
  address: string;
  id: string;
  name: string;
};

export type TBudgetItem = {
  id: string;
  name: string;
  price: number;
};

export type TAttachment = {
  label: string;
  id: string;
  url: string;
  mimeType: string;
};

export type TBudget = {
  id: string;
  items: TBudgetItem[];
  totalPrice: number;
  attachments: TAttachment[];
};

export type TSppgReportDetail = TSppgReport & {
  relatedReports: TSppgReport[];
  budget: TBudget;
};

export type TSppgStatistics = {
  isDailyReportSubmitted: boolean;
  weeklyCalories: {
    average: number;
    percentFromLastWeek: number;
  };
  budget: {
    monthly: {
      remaining: number;
      status: "SAFE" | "RISKY";
    };
  };
  publicReviews: {
    total: number;
  };
};

export type TSppgDashboard = {
  sppgName: string;
  statistics: TSppgStatistics;
  recentReports: TSppgReportSummary[];
  publicReviews: TPublicReview[];
};

export type TSppgPeriodicReport = {
  id: string;
  periode: string;
  monthIndex: number;
  status: "VERIFIED" | "NOT_VERIFIED";
  totalMeal: number;
  totalBudget: number;
};

export type TAdminStatistics = {
  reports: {
    total: number;
  };
  sppg: {
    total: number;
  };
  school: {
    total: number;
  };
  public: {
    total: number;
  };
  reviews: {
    school: number;
    public: number;
    total: number;
  };
  sppgWarnings: {
    total: number;
    sppgs: TAdminVendorWarning[];
  };
};

export type TAdminComplaintStatus = "PENDING" | "INVESTIGATING" | "RESOLVED";

export type TAdminComplaint = {
  id: string;
  authorName: string;
  description: string;
  title: string;
  vendorName: string;
  imageUrl: string;
  status: TAdminComplaintStatus;
};

export type TAdminVendorWarning = {
  id: string;
  name: string;
  rating: number;
  reportsCount: number;
};

export type TAdminDashboard = {
  statistics: TAdminStatistics;
  complaints: TAdminComplaint[];
  warnings: TAdminVendorWarning[];
};

export type TPublicReviewHistory = {
  reviews: TPublicReview[];
};
