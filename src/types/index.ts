// NOTE: currently we'll stick with types/index.ts because i am not sure on how should we should structure types directory.

export type TRole = "ADMIN" | "PUBLIC" | "SCHOOL" | "SPPG";

export type TUser = {
  id: string;
  role: TRole;
  username: string;
  //   registrationCode: string;  // TODO: confirm, what is this?
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

export type TNutritionalFact = {
  label: string;
  value: number;
  unit: string;
  dciPercent: number;
};

export type TSppgReport = {
  id: string;
  title: string;
  author: TSppg;
  mealTime: string;
  imageUrl: string;
  postedAt: Date;
  nutritionalFacts: TNutritionalFact[];
  content: string;
};

export type TPublicReview = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: Date;
  ratingScore: number;
  forSppg: Omit<TSppg, "address" | "role">;
  content: string;
};

export type TBudgetItem = {
  id: string;
  name: string;
  price: number;
};

type TAttachments = {
  label: string;
  id: string;
  url: string;
  mimeType: string;
};

export type TBudget = {
  id: string;
  items: TBudgetItem[];
  totalPrice: number;
  attachments: TAttachments[];
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

export type TSppgPeriodicReport = {
  id: string;
  url: string;
  periode: string;
  monthIndex: number; // [0 - 11];
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
    sppgs: {
      id: TSppg["sppgId"];
      name: TSppg["sppgName"];
      detail: string;
    };
  };
};

export type TPublicReviewHistory = {
  reviews: TPublicReview[];
};
