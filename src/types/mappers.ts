import type { z } from "zod/v3";
import type {
  getActiveAccountsSuccessResponseSchema,
  getAdminDashboardSuccessResponseSchema,
  getAdminProfileSuccessResponseSchema,
  getDetailSppgReportSuccessResponseSchema,
  getPendingAccountsSuccessResponseSchema,
  getPublicDashboardReviewsSuccessResponseSchema,
  getPublicDashboardSppgReportsSuccessResponseSchema,
  getPublicProfileSuccessResponseSchema,
  getPublicSppgListSuccessResponseSchema,
  getSchoolDashboardReviewsSuccessResponseSchema,
  getSchoolDashboardSppgReportsSuccessResponseSchema,
  getSchoolProfileSuccessResponseSchema,
  getSchoolSppgListSuccessResponseSchema,
  getSppgDailyReportByIdSuccessResponseSchema,
  getSppgDashboardSuccessResponseSchema,
  getSppgPeriodicReportsSuccessResponseSchema,
  getSppgProfileSuccessResponseSchema,
  loginSuccessResponseSchema,
  registerPublicSuccessResponseSchema,
  registerSchoolSuccessResponseSchema,
  registerSppgSuccessResponseSchema,
} from "@/lib/api/dto";
import type {
  TAdminAccessDetail,
  TAdminActiveAccount,
  TAdminComplaint,
  TAdminComplaintStatus,
  TAdminDashboard,
  TAdminPendingAccount,
  TAdminProfile,
  TAdminStatistics,
  TAdminVendorWarning,
  TAuthRegistrationResult,
  TAuthSession,
  TBudget,
  TPublicProfile,
  TPublicReview,
  TReviewSppgTarget,
  TSchoolProfile,
  TSppg,
  TSppgDashboard,
  TSppgPeriodicReport,
  TSppgProfile,
  TSppgReport,
  TSppgReportDetail,
  TSppgReportSummary,
  TSppgStatistics,
} from "./ui";

type PublicDashboardReviewItem =
  | z.infer<
      typeof getPublicDashboardReviewsSuccessResponseSchema
    >["data"][number]
  | z.infer<
      typeof getSchoolDashboardReviewsSuccessResponseSchema
    >["data"][number];
type SppgDashboardReviewItem =
  SppgDashboardResponse["laporan_masyarakat"][number];
type DashboardReviewMapperInput =
  | PublicDashboardReviewItem
  | (SppgDashboardReviewItem & {
      author_name: string;
      display_author: string;
      location_name: string;
      sppg?: { sppg_name: string } | null;
    });

type PublicDashboardReportItem =
  | z.infer<
      typeof getPublicDashboardSppgReportsSuccessResponseSchema
    >["data"][number]
  | z.infer<
      typeof getSchoolDashboardSppgReportsSuccessResponseSchema
    >["data"][number];

type SppgDailyReportDetailItem =
  | z.infer<typeof getSppgDailyReportByIdSuccessResponseSchema>["data"]
  | z.infer<typeof getDetailSppgReportSuccessResponseSchema>["data"];
type SppgDashboardResponse = z.infer<
  typeof getSppgDashboardSuccessResponseSchema
>["data"];
type AdminDashboardResponse = z.infer<
  typeof getAdminDashboardSuccessResponseSchema
>["data"];
type AdminProfileResponse = z.infer<
  typeof getAdminProfileSuccessResponseSchema
>["data"];
type ActiveAccountsResponse = z.infer<
  typeof getActiveAccountsSuccessResponseSchema
>["data"][number];
type LoginResponse = z.infer<typeof loginSuccessResponseSchema>["data"];
type PendingAccountsResponse = z.infer<
  typeof getPendingAccountsSuccessResponseSchema
>["data"][number];
type ReviewSppgTargetResponse =
  | z.infer<typeof getPublicSppgListSuccessResponseSchema>["data"][number]
  | z.infer<typeof getSchoolSppgListSuccessResponseSchema>["data"][number];
type PublicProfileResponse = z.infer<
  typeof getPublicProfileSuccessResponseSchema
>["data"];
type PeriodicReportsResponse = z.infer<
  typeof getSppgPeriodicReportsSuccessResponseSchema
>["data"];
type SchoolProfileResponse = z.infer<
  typeof getSchoolProfileSuccessResponseSchema
>["data"];
type SppgProfileResponse = z.infer<
  typeof getSppgProfileSuccessResponseSchema
>["data"];
type RegisterResponse =
  | z.infer<typeof registerPublicSuccessResponseSchema>
  | z.infer<typeof registerSchoolSuccessResponseSchema>
  | z.infer<typeof registerSppgSuccessResponseSchema>;
type DashboardRecentReportItem =
  SppgDashboardResponse["riwayat_laporan"][number];

const DEFAULT_ATTACHMENT_URL = "https://placehold.co/1200x800?text=No+Image";
const DEFAULT_VENDOR_ADDRESS = "Alamat vendor belum tersedia";
const DEFAULT_ADMIN_ACCESS_DETAILS: TAdminAccessDetail[] = [
  {
    id: "manage-sppg",
    label: "Mengelola Vendor SPPG",
  },
  {
    id: "manage-accounts",
    label: "Mengelola Akun",
  },
  {
    id: "monitor-data",
    label: "Memantau Data",
  },
];

function mapReviewStatusToAdminComplaintStatus(
  status: "MENUNGGU" | "INVESTIGASI" | "SELESAI",
): TAdminComplaintStatus {
  switch (status) {
    case "MENUNGGU":
      return "PENDING";
    case "INVESTIGASI":
      return "INVESTIGATING";
    case "SELESAI":
      return "RESOLVED";
  }
}

function createNutritionalFacts(values: {
  energy: number | null | undefined;
  protein: number | null | undefined;
  carbohydrate: number | null | undefined;
  fat: number | null | undefined;
}) {
  return {
    calories: {
      inKcal: values.energy ?? 0,
      inDciPercent: 0,
    },
    proteinGrams: {
      inGrams: values.protein ?? 0,
      inDciPercent: 0,
    },
    carbGrams: {
      inGrams: values.carbohydrate ?? 0,
      inDciPercent: 0,
    },
    fatGrams: {
      inGrams: values.fat ?? 0,
      inDciPercent: 0,
    },
  };
}

function createSppgAuthor(values: {
  id: number | string;
  username?: string;
  name: string;
  address?: string | null;
}): TSppg {
  const id = String(values.id);

  return {
    id,
    role: "SPPG",
    username: values.username ?? values.name.toLowerCase().replace(/\s+/g, "-"),
    sppgId: id,
    sppgName: values.name,
    address: values.address ?? DEFAULT_VENDOR_ADDRESS,
  };
}

function createReviewTarget(values: {
  id: null | number | string;
  name?: string | null;
  username?: string;
}) {
  const id = values.id === null ? "" : String(values.id);

  return {
    id,
    username: values.username ?? values.name ?? "sppg",
    sppgId: id,
    sppgName: values.name ?? "SPPG",
  };
}

function hasSppgName(
  dto: DashboardReviewMapperInput,
): dto is DashboardReviewMapperInput & { sppg: { sppg_name: string } | null } {
  return "sppg" in dto;
}

function hasBudgets(
  dto: SppgDailyReportDetailItem,
): dto is SppgDailyReportDetailItem & {
  budgets: Array<{
    id_budget: number | string;
    item_name: string;
    item_price: number | string;
  }>;
} {
  return "budgets" in dto;
}

function hasAttachmentMetadata(
  attachment: SppgDailyReportDetailItem["attachments"][number],
): attachment is SppgDailyReportDetailItem["attachments"][number] & {
  entity_type: string;
  file_category: null | string;
  id_attachment: number | string;
} {
  return (
    "id_attachment" in attachment &&
    "entity_type" in attachment &&
    "file_category" in attachment
  );
}

export function mapPublicDashboardReviewDtoToDomain(
  dto: DashboardReviewMapperInput,
): TPublicReview {
  const imageUrl = dto.attachments?.[0]?.file_url ?? DEFAULT_ATTACHMENT_URL;
  const sppgName = hasSppgName(dto) ? dto.sppg?.sppg_name : undefined;

  return {
    id: String(dto.id_review),
    title: dto.title ?? "Laporan Masyarakat",
    imageUrl,
    postedAt: new Date(dto.createdAt ?? new Date().toISOString()),
    ratingScore: dto.rating_score ?? 0,
    reporterName: dto.display_author.split("-")[0] ?? "Anonim",
    forSppg: createReviewTarget({
      id: dto.id_sppg,
      name: sppgName,
    }),
    content: dto.description ?? "",
  };
}

export function mapReviewSppgTargetDtoToDomain(
  dto: ReviewSppgTargetResponse,
): TReviewSppgTarget {
  return {
    id: dto.id_sppg,
    name: dto.sppg_name,
    address: dto.sppg_address ?? DEFAULT_VENDOR_ADDRESS,
  };
}

export function mapPublicDashboardSppgReportDtoToDomain(
  dto: PublicDashboardReportItem,
): TSppgReport {
  return {
    id: String(dto.id_daily_report),
    title: dto.menu_name,
    author: createSppgAuthor({
      id: dto.id_sppg,
      name: dto.sppg.sppg_name,
      address: dto.sppg.sppg_address,
    }),
    mealTime: dto.meal_time ?? "Makan Siang",
    imageUrl: dto.attachments?.[0]?.file_url ?? DEFAULT_ATTACHMENT_URL,
    postedAt: new Date(dto.date_report),
    nutritionalFacts: createNutritionalFacts({
      energy: dto.energy,
      protein: dto.protein,
      carbohydrate: dto.carbohydrate,
      fat: dto.fat,
    }),
    content: dto.menu_description ?? "",
    status: "SUBMITTED",
  };
}

export function mapSppgDailyReportDetailDtoToDomain(
  dto: SppgDailyReportDetailItem,
): TSppgReportDetail {
  const budgets = hasBudgets(dto) ? dto.budgets : [];

  const report: TSppgReport = {
    id: String(dto.id_daily_report),
    title: dto.menu_name,
    author: createSppgAuthor({
      id: dto.id_sppg,
      name: "SPPG",
    }),
    mealTime: dto.meal_time ?? "Makan Siang",
    imageUrl: dto.attachments?.[0]?.file_url ?? DEFAULT_ATTACHMENT_URL,
    postedAt: new Date(dto.date_report),
    nutritionalFacts: createNutritionalFacts({
      energy: dto.energy,
      protein: dto.protein,
      carbohydrate: dto.carbohydrate,
      fat: dto.fat,
    }),
    content: dto.menu_description ?? "",
    status: "SUBMITTED",
  };

  const budget: TBudget = {
    id: String(dto.id_daily_report),
    items: budgets.map((item) => ({
      id: String(item.id_budget),
      name: item.item_name,
      price: Number(item.item_price),
    })),
    totalPrice: budgets.reduce((sum, item) => sum + Number(item.item_price), 0),
    attachments:
      dto.attachments?.map((attachment) => ({
        id: hasAttachmentMetadata(attachment)
          ? String(attachment.id_attachment)
          : attachment.file_url,
        label: hasAttachmentMetadata(attachment)
          ? (attachment.file_category ?? attachment.entity_type)
          : "Lampiran",
        url: attachment.file_url,
        mimeType: attachment.file_type ?? "application/octet-stream",
      })) ?? [],
  };

  return {
    ...report,
    budget,
    relatedReports: [],
  };
}

function mapDashboardRecentReportDtoToDomain(
  dto: DashboardRecentReportItem,
): TSppgReportSummary {
  return {
    id: String(dto.id_daily_report),
    title: dto.menu_name,
    postedAt: new Date(dto.date_report),
    status: "SUBMITTED",
  };
}

export function mapSppgDashboardDtoToDomain(
  dto: SppgDashboardResponse,
): TSppgDashboard {
  const statistics: TSppgStatistics = {
    isDailyReportSubmitted: dto.widgets.status_hari_ini === "SELESAI",
    weeklyCalories: {
      average: dto.widgets.rata_rata_kalori,
      percentFromLastWeek: 0,
    },
    budget: {
      monthly: {
        remaining: dto.widgets.sisa_anggaran ?? 0,
        status: (dto.widgets.sisa_anggaran ?? 0) > 0 ? "SAFE" : "RISKY",
      },
    },
    publicReviews: {
      total: dto.widgets.total_laporan_masyarakat,
    },
  };

  return {
    sppgName: dto.sppg_name,
    statistics,
    recentReports: dto.riwayat_laporan.map(mapDashboardRecentReportDtoToDomain),
    publicReviews: dto.laporan_masyarakat.map((review) => {
      return mapPublicDashboardReviewDtoToDomain({
        ...review,
        author_name: review.school?.school_name ?? "Anonim",
        display_author: review.school?.school_name ?? "Anonim",
        location_name: review.school?.school_name ?? "Sekolah",
      });
    }),
  };
}

export function mapSppgProfileDtoToDomain(
  dto: SppgProfileResponse,
): TSppgProfile {
  const address = dto.sppg_address ?? DEFAULT_VENDOR_ADDRESS;

  return {
    id: dto.id_user,
    role: "SPPG",
    username: dto.user.username,
    sppgId: dto.id_sppg,
    sppgName: dto.sppg_name,
    address,
    description: "Deskripsi profil belum tersedia.",
    email: dto.user.email,
    location: address,
    registrationCode: dto.user.bgn_code ?? "-",
    accountStatus: dto.user.account_status,
  };
}

export function mapPublicProfileDtoToDomain(
  dto: PublicProfileResponse,
  options: {
    userId: string;
  },
): TPublicProfile {
  return {
    id: options.userId,
    role: "PUBLIC",
    username: dto.username,
    displayName: dto.username,
    email: dto.email,
  };
}

export function mapAdminProfileDtoToDomain(
  dto: AdminProfileResponse,
  options: {
    userId: string;
  },
): TAdminProfile {
  return {
    id: options.userId,
    role: "ADMIN",
    username: dto.username,
    name: dto.name ?? dto.username,
    email: dto.email,
    accessDetails: DEFAULT_ADMIN_ACCESS_DETAILS,
  };
}

// FIXME: fixate, this email fallback based on username is hacky

export function mapSchoolProfileDtoToDomain(
  dto: SchoolProfileResponse,
  options: {
    email?: string;
    username: string;
  },
): TSchoolProfile {
  return {
    id: dto.id_user,
    role: "SCHOOL",
    username: options.username,
    schoolId: dto.id_school,
    schoolName: dto.school_name,
    address: dto.school_address ?? "",
    displayName: dto.school_name,
    email: options.email ?? `${options.username}@pagar.app`,
  };
}

export function mapActiveAccountDtoToDomain(
  dto: ActiveAccountsResponse,
): TAdminActiveAccount {
  return {
    id: dto.id_user,
    username: dto.username,
    role: dto.role,
    createdAt: new Date(dto.createdAt),
  };
}

export function mapPendingAccountDtoToDomain(
  dto: PendingAccountsResponse,
): TAdminPendingAccount {
  return {
    id: dto.id_user,
    username: dto.username,
    role: dto.role,
    createdAt: new Date(dto.createdAt),
    registrationCode: dto.registration_code ?? null,
    bgnCode: dto.bgn_code ?? null,
  };
}

export function mapLoginDtoToDomain(dto: LoginResponse): TAuthSession {
  return {
    token: dto.token,
    user: {
      id: dto.user.id_user,
      role: dto.user.role,
      username: dto.user.username,
    },
  };
}

export function mapRegisterDtoToDomain(
  dto: RegisterResponse,
): TAuthRegistrationResult {
  return {
    message: dto.message,
    user: {
      id: dto.data.id_user,
      role: dto.data.role,
      username: dto.data.username,
    },
  };
}

export function mapAdminDashboardDtoToDomain(
  dto: AdminDashboardResponse,
): TAdminDashboard {
  const warnings: TAdminVendorWarning[] = dto.vendor_warnings.map(
    (warning, index) => ({
      id: String(index + 1),
      name: warning.nama_vendor,
      rating: warning.rating,
      reportsCount: warning.jumlah_laporan,
    }),
  );

  const complaints: TAdminComplaint[] = dto.recent_complaints.map(
    (complaint) => ({
      id: String(complaint.id_review),
      authorName: complaint.user?.username ?? "Anonim",
      title: complaint.title ?? "Keluhan",
      vendorName: complaint.id_sppg ? `SPPG ${complaint.id_sppg}` : "Vendor",
      imageUrl: DEFAULT_ATTACHMENT_URL,
      status: mapReviewStatusToAdminComplaintStatus(complaint.status_review),
    }),
  );

  const statistics: TAdminStatistics = {
    reports: {
      total: dto.statistics.totalReports,
    },
    sppg: {
      total: dto.statistics.totalSppg,
    },
    school: {
      total: dto.statistics.totalSchool,
    },
    public: {
      total: dto.statistics.totalPublic,
    },
    reviews: {
      school: 0,
      public: complaints.length,
      total: complaints.length,
    },
    sppgWarnings: {
      total: warnings.length,
      sppgs: warnings,
    },
  };

  return {
    statistics,
    complaints,
    warnings,
  };
}

export function mapPeriodicReportsDtoToDomain(
  dto: PeriodicReportsResponse,
): TSppgPeriodicReport[] {
  const buckets = new Map<string, TSppgPeriodicReport>();

  for (const report of dto.reports) {
    const date = new Date(report.date_report);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${monthIndex}`;

    if (!buckets.has(key)) {
      const periode = new Intl.DateTimeFormat("id-ID", {
        month: "long",
        year: "numeric",
      }).format(date);
      buckets.set(key, {
        id: key,
        periode,
        monthIndex,
        status: "VERIFIED",
        totalMeal: 0,
        totalBudget: 0,
      });
    }

    const current = buckets.get(key);

    if (!current) {
      continue;
    }

    current.totalMeal += report.total_portion ?? 0;
    current.totalBudget +=
      report.budgets?.reduce((sum, item) => sum + Number(item.item_price), 0) ??
      0;
  }

  return Array.from(buckets.values()).sort((left, right) => {
    return left.monthIndex - right.monthIndex;
  });
}
